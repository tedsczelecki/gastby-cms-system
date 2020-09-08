const model = (sequelize, DataTypes) => {
  const Page = sequelize.define('page', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    siteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'sites',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    url: {
      type: DataTypes.STRING,
    },
    template: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    heroFileId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'live'
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'page',
    },
  });


  Page.associate = (models) => {
    Page.hasOne(models.PageMeta, {
      as: 'meta',
      foreignKey: 'pageId'
    })
    Page.hasMany(models.PageData, {
      as: 'data'
    })
  };
  return Page;
};

export default model;
