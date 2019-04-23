const {
  engine, timestamps, keys, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('emailThreads', Object
      .assign(properties('emailThread', DataTypes), {
        email_id: keys('emails'),
        thread_id: keys('threads'),
      }, timestamps(3, DataTypes)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('emailThreads');
  },
};
