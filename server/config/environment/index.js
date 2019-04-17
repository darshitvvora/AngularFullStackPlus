'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';
import dotenv from 'dotenv';

const root = path.normalize(`${__dirname}/../../..`);

const env = dotenv.config({ path: path.join(root, '.env') });
const IS_DEV = env.NODE_ENV === 'development';
const { DOMAIN, PREFIX } = env;

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root,

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3111,

  // Server port
  port: process.env.PORT || 9111,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'c3-secret'
  },

  URLS: {
    SLACK: process.env.URLS_SLACK,
    CDN: process.env.URLS_CDN,
  },
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  env,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {});
