const properties = require('./thread.property');

module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', Object
    .assign(properties(DataTypes)), {
      tableName: 'threads',
      timestamps: true,
      underscored: true,
      paranoid: true,
      updatedAt: false,
      createdAt: 'created_on',
      deletedAt: 'deleted_on',
    });

  Thread.associate = (db) => {
  };

  return Thread;
};

