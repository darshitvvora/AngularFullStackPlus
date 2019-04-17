import _ from 'lodash';
import Sequelize from 'sequelize';

const config = require('../../config/environment');

const sqlDefaults = {
  dialect: 'mysql',
  timezone: '+05:30',
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8mb4_general_ci',
    },
  },
};

const db = {
  Sequelize,
  sequelize: new Sequelize(config.CTHREE_MYSQL, sqlDefaults),
  sequelizeLog: new Sequelize(config.LOG_MYSQL, sqlDefaults),
};

[
  // - Enums
  'User',
  // - Others
  'Log', 'Session',

].forEach(model => {
  db[model] = db.sequelize.import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model.js`);
});

[
  'UserLog',
].forEach(model => {
  db[model] = db.sequelizeLog.import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model.js`);
});

Object.keys(db).forEach(modelName => {
  if('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
