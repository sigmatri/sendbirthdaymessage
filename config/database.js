const Sequelize = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALEC,
});
module.exports.database = sequelize