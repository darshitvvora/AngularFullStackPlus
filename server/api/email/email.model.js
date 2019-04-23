const properties = require('./email.property');

module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define('Email', Object
    .assign(properties(DataTypes)), {
      tableName: 'emails',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: 'updated_on',
      deletedAt: 'deleted_on',
    });

  Email.associate = (db) => {
  };

  return Email;
};

