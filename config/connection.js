/*
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // For deployment on Heroku using JawsDB MySQL add-on
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // For local development using MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306
    }
  );
}

console.log('Database connection string:', process.env.JAWSDB_URL || 'Local connection');
*/

module.exports = sequelize;
