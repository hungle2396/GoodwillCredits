'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'zipCode', {
      type: Sequelize.STRING, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'zipCode', {
      type: Sequelize.STRING, 
    });
  }
};
