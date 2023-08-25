'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'status', {
      type: Sequelize.ENUM,
      values: ['Pending', 'Rejected', 'Approved'],
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.deleteColumn('tasks', 'status');
  }
};