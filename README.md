# ui-themed-api-oauth-standalone

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Custom steps taken after bare angular fullstack installation

1. Angular Fullstack v4.2.3
   
   Out of the box I create an AngularJS app with an Express server.
   
   # Client
   
   ? What would you like to write scripts with? Babel
   ? Would you like to use Flow types with Babel? No
   ? What would you like to write markup with? Pug
   ? What would you like to write stylesheets with? Sass
   ? What Angular router would you like to use? uiRouter
   ? Would you like to include Bootstrap? Yes
   ? Would you like to include UI Bootstrap? Yes
   
   # Server
   
   ? What would you like to use for data modeling? Sequelize (MySQL, SQLite, MariaDB, PostgreSQL)
   ? Would you scaffold out an authentication boilerplate? No
   ? Would you like to use socket.io? Yes
   
   # Project
   
   ? What would you like to write tests with? Mocha + Chai + Sinon
   ? What would you like to write Chai assertions with? Expect


2. dotenv configuration 
  Run `npm install --save dotenv` to install dotenv module. Add .env file in root folder. Import dotenv module in server/config/environment/index.js.
   configure it with root folder `import dotenv from 'dotenv';
                                  
                                  const root = path.normalize(`${__dirname}/../../..`);
                                  const env = dotenv.config({ path: path.join(root, '.env') });` 
    export env variable
                      `module.exports = _.merge(
                         all,
                         env,
                         require('./shared'),
                         require(`./${process.env.NODE_ENV}.js`) || {});`
    Add .env to .gitignore                     
                         
3. Connect to MySQL DB
    - Remove SQLite and install MySQL
        `npm remove --save sqlite3`
        `npm i --save mysql`
    - Delete following files
        `server/config/environment/development.js`
        `server/config/environment/test.js`
        `server/config/environment/production.js` 
        Remove the below code server/config/environment/index.js from module exports in 
        `require(`./${process.env.NODE_ENV}.js`) || {}`
        
    -     
    
    - Replace Mongo connection option from  server/config/environment/index.js. with MySQL connection options
    `// MySQL connection options
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
       }`
       
       - Add MySQL connection string to .env 
         `MYSQL="mysql://username:password@192.168.0.200/testdb"`
         Replace `sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)` with  `sequelize: new Sequelize(config.MYSQL, config.sequelize.options)`
         in `server/sqldb/index.js`
         
4. Install Winston Logger
    - Add following in package.json
    ```json
      "winston": "^2.4.0",
      "winston-daily-rotate-file": "^1.7.2"      
   ```
      Run `npm i`
      
     - Create a folder in server/components/logger. Create a new file named index.js within this folder. Add following code to the file
     
       ```js
       const winston = require('winston');
        const DailyRotateFile = require('winston-daily-rotate-file');
        const Sentry = require('winston-raven-sentry');
        
        const { root, NODE_ENV, SENTRY_DSN } = require('../../config/environment');
        
        const logger = new winston.Logger({
          transports: [
            new DailyRotateFile({
              name: 'error-file',
              datePattern: '.yyyy-MM-dd.log',
              filename: `${root}/logs/error`,
            }),
            new Sentry({
              dsn: NODE_ENV === 'production' && SENTRY_DSN,
              install: true,
              config: { environment: NODE_ENV, release: '@@_RELEASE_' },
            }),
          ],
        });
        
        if (NODE_ENV !== 'production') logger.add(winston.transports.Console);
        
        module.exports = logger;
     ```
     - Add following code to .gitignore
        `logs/*`
        `!logs/.gitkeep`
        
     - Create a new folder named logs in root directory and add new file name .gitkeep
        ```sh
          mkdir logs
          touch logs/.gitkeep
        ```
        
5. Install Sentry
    - Create project in sentry https://prnt.sc/lzpczs
    - Add following to package.json and run npm install
       ```metadata json
        "winston-raven-sentry": "^1.0.1"
       ```
    - Add sentry DSN to .env
    
    - Add middleware to route.js
        ```js
          // import logger
         import logger from './components/logger';

          // Add middleware for sentry logging
          app.use(logger.transports.sentry.raven.errorHandler());

          app.use((e, req, res, next) => {
              if (!next) return null;
              const err = e;
              const { body, headers, user: u } = req;
          
              logger.error(err.message, err, {
                url: req.originalUrl,
                body,
                headers,
                user: u,
              });
          
              return res.status(500).json({ message: err.message, stack: err.stack });
            });
         ```
      - Add middleware for sentry in server/config/express.js
         ```js
            import logger from '../components/logger';

            // before view engine
           app.use(logger.transports.sentry.raven.requestHandler(true));

         ````   

