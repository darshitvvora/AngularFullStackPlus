const properties = require('./emailThread.property');

module.exports = (sequelize, DataTypes) => {
  const EmailThread = sequelize.define('EmailThread', Object
    .assign(properties(DataTypes)), {
      tableName: 'emailThreads',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: 'updated_on',
      deletedAt: 'deleted_on',
    });


  EmailThread.associate = (db) => {
  };

  return EmailThread;
};
