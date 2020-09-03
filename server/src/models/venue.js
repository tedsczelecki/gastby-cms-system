
const user = (sequelize, DataTypes) => {
  const Venue = sequelize.define('venue', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    googlePlaceId: {
      type: DataTypes.STRING,
    },
    googleFormattedAddress: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.STRING,
    },
    lng: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    logoFileId: {
      type: DataTypes.INTEGER,
    }
  });

  Venue.associate = (models) => {
    Venue.belongsTo(models.User);
    Venue.belongsTo(models.File, {
      as: 'logo',
      foreignKey: 'logoFileId',
    })
  };

  return Venue;
};

export default user;
