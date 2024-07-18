'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class servicio extends Model {
    static associate(models) {
      models.servicio.belongsToMany(models.cliente, { through: 'clientexservicios', foreignKey: "servicio_id" });
    }
  }

  servicio.init({
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'servicio',
    tableName: 'servicios'
  });
  return servicio;
};