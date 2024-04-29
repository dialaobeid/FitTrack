const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  throw new Error('JAWSDB_URL environment variable not set');
}

console.log('Database connection string:', process.env.JAWSDB_URL);

module.exports = sequelize;