// Development specific configuration
// ==================================

const { log: logging } = console;
module.exports = {

  // Sequelize connection options
  cthree: {
    username: process.env.CTHREE_MYSQL_USER,
    password: process.env.CTHREE_MYSQL_PASS,
    database: process.env.CTHREE_MYSQL_DB,
    host: process.env.CTHREE_MYSQL_HOST,
    dialect: 'mysql',
    logging,
    timezone: '+05:30',
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },

  solr: {
    host: process.env.SOLR_HOST,
    port: process.env.SOLR_PORT,
    core: process.env.SOLR_CORE,
    path: process.env.SOLR_PATH,
  },

  MINIO: {
    endPoint: process.env.MINIO_ENDPOINT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    secure: false,
    port: 8000,
  },

  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    ignoreTLS: true,
  },
};
