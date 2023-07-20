'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        allowNull: false
      },
      firstName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      lastName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          isEmail: true,
          allowNull: false
      },
      password: {
          type: Sequelize.STRING,
      },
      googleId: {
          type: Sequelize.STRING
      },
      registrationType: {
          type: Sequelize.ENUM('google', 'email'),
          allowNull: false
      },
      isAdmin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      updatedAt: {
          type: Sequelize.DATE
      },
      createdAt: {
          type: Sequelize.DATE
      }
    },
    {
      underscored: true,
      paranoid: true,
      hooks: {
        beforeValidate: (user) => {
          if (user.registrationType === "google") {
              user.username = null;
              user.password = null;
          }
        }
      }
    }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};