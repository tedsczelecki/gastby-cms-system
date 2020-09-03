import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 128],
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    avatarFileId: {
      type: DataTypes.INTEGER,
    },
    wallpaperFileId: {
      type: DataTypes.INTEGER,
    },
    about: {
      type: DataTypes.TEXT
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notificationMethod: {
      type: DataTypes.STRING,
      defaultValue: 'email'
    },
    lastActive: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.File, {
      as: 'avatar',
      foreignKey: 'avatarFileId',
    });
    User.hasOne(models.File, {
      as: 'wallpaper',
      foreignKey: 'wallpaperFileId',
    });
  };

  User.findByEmail = async email => {
    let user = await User.findOne({
      where: { email },
    });

    return user;
  };

  User.updateLastActive = async ({id}) => {
    const user = await User.findOne({
      where: {
        id
      }
    });
    await user.update({
      lastActive: sequelize.literal('CURRENT_TIMESTAMP')
    });
    return user;
  }

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

export default user;
