'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fromStation: {
        type: Sequelize.INTEGER,
        references: {
          model: "stations",
          key: "id"
        }
      },
      toStation: {
        type: Sequelize.INTEGER,
        references: {
          model: "stations",
          key: "id"
        }
      },
      startTime: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.FLOAT
      },
      passengerCarCompanies_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "passengerCarCompanies",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trips');
  }
};