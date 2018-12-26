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


2. Run `npm install --save dotenv` to install dotenv module. Add .env file in root folder. Import dotenv module in server/config/environment/index.js.
   configure it with root folder `import dotenv from 'dotenv';
                                  
                                  const root = path.normalize(`${__dirname}/../../..`);
                                  const env = dotenv.config({ path: path.join(root, '.env') });` 
    export env variable
                      `module.exports = _.merge(
                         all,
                         env,
                         require('./shared'),
                         require(`./${process.env.NODE_ENV}.js`) || {});`
                         
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
