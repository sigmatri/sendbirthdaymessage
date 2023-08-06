const { DataTypes } = require('sequelize');
const modelName = "User"
const database = require("../config/database").database;


const User = database.define(modelName, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  sendDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isFails: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  inQueue: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});
module.exports.User = User
// console.log(User === sequelize.models.User); // true
