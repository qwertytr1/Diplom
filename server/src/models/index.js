const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TokenSchema = require("./token-model.js");


const User = sequelize.define('users', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  language: { type: DataTypes.STRING },
  theme: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
}, {
    timestamps: false,
});

module.exports = {
  sequelize,
  User,
  Template,
  Question,
  Results,
  Form,
  Answer,
  Comment,
  Like,
  TemplatesTag,
  TemplatesAccess,
  Tag
};
