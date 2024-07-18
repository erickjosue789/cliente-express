'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let [clientes, clientes_metadata] = await queryInterface.sequelize.query('SELECT id FROM clientes')
    let [servicios, servicios_metadata] = await queryInterface.sequelize.query('SELECT id FROM servicios')

    await queryInterface.bulkInsert('clientexservicios', [
        { cliente_id: clientes[0].id, servicio_id: servicios[0].id, createdAt: new Date(), updatedAt: new Date() },
        { cliente_id: clientes[0].id, servicio_id: servicios[1].id, createdAt: new Date(), updatedAt: new Date() },
        { cliente_id: clientes[1].id, servicio_id: servicios[1].id, createdAt: new Date(), updatedAt: new Date() }
    ], {});
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientexservicios', null, {});
  }
};
