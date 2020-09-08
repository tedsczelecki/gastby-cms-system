import Sequelize from 'sequelize';

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
    },
  );
}

const models = {
  File: sequelize.import('./file'),
  Notification: sequelize.import('./notification'),
  PasswordToken: sequelize.import('./passwordToken'),
  Page: sequelize.import('./page'),
  PageData: sequelize.import('./pageData'),
  PageMeta: sequelize.import('./pageMeta'),
  Site: sequelize.import('./site'),
  SiteUser: sequelize.import('./siteUser'),
  User: sequelize.import('./user'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
