const properties = require('./attchment.property');

module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define('Attachment', Object
    .assign(properties(DataTypes)), {
      tableName: 'attachments',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: 'updated_on',
      deletedAt: 'deleted_on',
    });

  Attachment.associate = (db) => {};

  return Attachment;
};

