const {
  engine, timestamps, keys, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('emailRecipients', Object
      .assign(properties('emailRecipient', DataTypes), {
        user_id: keys('users'),
      }, timestamps(3, DataTypes)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('emailRecipients');
  },
};
