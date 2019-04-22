const crypto = require('crypto');

const properties = require('./user.property');

const salt = 'DYhG93b0fIxfs2guVoUubasdfajfkljasdjfaklsdjflakrfWwvniR2G0FgaC9mi';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', Object
    .assign(properties(DataTypes)), {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: 'updated_on',
      deletedAt: 'deleted_on',
    });


  User.associate = (db) => {
    User.belongsTo(db.User, {
      as: 'Creator',
      foreignKey: 'created_by',
    });

    User.belongsTo(db.User, {
      as: 'Updater',
      foreignKey: 'updated_by',
    });

    User.belongsTo(db.User, {
      as: 'Destroyer',
      foreignKey: 'deleted_by',
    });
  };

  return User;
};

