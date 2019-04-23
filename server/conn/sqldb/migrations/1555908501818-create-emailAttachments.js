const {
  engine, timestamps, keys, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('emailAttachments', Object
      .assign(properties('emailAttachment', DataTypes), {
        user_id: keys('users'),
        attachment_id: keys('attachments'),
      }, timestamps(3, DataTypes)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('emailAttachments');
  },
};
