'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.User, {
        through: 'userevents',
        as: 'users',
        foreignKey: 'eventId',
      });

      // Custom association for the host
      Event.belongsTo(models.User, {
        foreignKey: 'hostId',
        as: 'host'
      });
    }
  }
  Event.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    hostId: DataTypes.UUID,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    tag: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'events',
    modelName: 'Event',
    hooks: {
      beforeUpdate: (event, options) => {
        // Check if the endDate has passed the current date
        if (event.endDate < new Date()) {
          // If the endDate has passed, set "active" to false
          event.active = false;
        }
      },
      beforeSave: (event, options) => {
        // Check if the endDate has passed the current date
        if (event.endDate < new Date()) {
          // If the endDate has passed, set "active" to false
          event.active = false;
        }
      }
    }
  });
  return Event;
};