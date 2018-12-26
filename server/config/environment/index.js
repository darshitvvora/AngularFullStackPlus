'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';
import dotenv from 'dotenv';


const root = path.normalize(`${__dirname}/../../..`);
const env = dotenv.config({ path: path.join(root, '.env') });
const { log } = console;

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}*/

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root,

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'ui-themed-api-oauth-standalone-secret'
  },

  // MySQL connection options
  sequelize: {
    options: {
      dialect: 'mysql',
      timezone: '+05:30',
      logging: process.env.NODE_ENV === 'development' ? log : false,
      define: {
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8mb4_general_ci',
        },
      }
    },
  }
}
// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  env.parsed,
  require('./shared'));
