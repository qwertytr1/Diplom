const { DataTypes } = require('sequelize');
const sequelize2 = require('../config/database2');
const UsersModel = sequelize2.define('usersData', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
	email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
	phone: { type: DataTypes.STRING(20), allowNull: false, unique: true },
	password: { type: DataTypes.STRING(300), allowNull: false },
	role:{type: DataTypes.STRING(45), allowNull: false, defaultValue: 'user'}
  }, { timestamps: false, tableName: 'usersData', underscored: true});

  module.exports = UsersModel;