'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert('servicios', [{
        descripcion: 'Servicio ' + i,
        precio: Math.floor(Math.random() * 40),
        createdAt: new Date(),
        updatedAt: new Date()
      }],{});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('servicios', null, {});
  }
};
