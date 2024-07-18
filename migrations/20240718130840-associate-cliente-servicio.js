'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('clientexservicios', {
      fields: ['cliente_id'],
      name: 'cliente_id_fk',
      type: 'foreign key',
      references: {
        table: 'clientes',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
    });

    await queryInterface.addConstraint('clientexservicios', {
      fields: ['servicio_id'],
      name: 'servicio_id_fk',
      type: 'foreign key',
      references: {
        table: 'servicios',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('clientexservicios', 'cliente_id_fk')
    await queryInterface.removeConstraint('clientexservicios', 'servicio_id_fk')
  }
};
