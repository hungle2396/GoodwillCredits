'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Event, {
        through: 'userevents',
        as: 'events',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    googleId: DataTypes.STRING,
    registrationType: DataTypes.ENUM('google', 'email'),
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User'
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};