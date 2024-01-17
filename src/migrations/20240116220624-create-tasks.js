'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskName: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      startedAt: {
        type: Sequelize.DATE
      },
      finishedAt: {
        type: Sequelize.DATE
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      server: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};