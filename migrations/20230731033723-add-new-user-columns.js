'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'birthday', {
      type: Sequelize.STRING, 
    });

    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING, 
    });

    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING, 
    });

    await queryInterface.addColumn('Users', 'city', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'state', {
      type: Sequelize.STRING, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'birthday', {
      type: Sequelize.STRING, 
    });

    await queryInterface.removeColumn('Users', 'phone', {
      type: Sequelize.STRING, 
    });

    await queryInterface.removeColumn('Users', 'address', {
      type: Sequelize.STRING, 
    });

    await queryInterface.removeColumn('Users', 'city', {
      type: Sequelize.STRING,
    });

    await queryInterface.removeColumn('Users', 'state', {
      type: Sequelize.STRING, 
    });
  }
};
