const properties = require('./emailAttachment.property');

module.exports = (sequelize, DataTypes) => {
  const EmailAttachment = sequelize.define('EmailAttachment', Object
    .assign(properties(DataTypes)), {
      tableName: 'emailAttachments',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
  });

  EmailAttachment.associate = (db) => {};

  return EmailAttachment;
};

