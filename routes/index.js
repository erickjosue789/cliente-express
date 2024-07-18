var express = require('express');
var router = express.Router();
const db = require('../models');
const { Sequelize, Op } = require('sequelize');
// Asegúrate de que los modelos están definidos correctamente en `db`
const { cliente, servicio } = db;


router.get('/clientes/json', function (req, res, next) {
  cliente.findAll({
    attributes: { exclude: ["updatedAt", 'createdAt'] },
    include: [{
      model: servicio,
      attributes: ['id', 'descripcion', 'precio', 'createdAt'],
      through: { attributes: [] }
    }],
  })
    .then(cliente => {
      res.json(cliente);
    })
    .catch(error => res.status(400).send(error))
});

router.get('/', function (req, res, next) {
  cliente.findAll({
    attributes: { exclude: ["updatedAt", 'createdAt'] },
  })
    .then(cliente => {
      res.render('index', { title: 'Listado de cliente', arrClientes: cliente });
    })
    .catch(error => res.status(400).send(error))
});

router.get('/view/:id', function (req, res, next) {
  let id = parseInt(req.params.id);

  cliente.findAll({
    attributes: { exclude: ["updatedAt", 'createdAt'] },
    include: [{
      model: servicio,
      attributes: ['id', 'descripcion', 'precio', 'createdAt'],
      through: { attributes: [] }
    }],
    where: {
      [Op.and]: [
        { 'id': id }
      ]
    }
  })
    .then(cliente => {
      res.render('cliente', { title: 'Detalles del cliente', arrClientes: cliente });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      res.status(400).send(error);
    });
});

router.get('/findAllByRate/json', function (req, res, next) {
  let lower = parseFloat(req.query.lower);
  let higher = parseFloat(req.query.higher);

  cliente.findAll({
    attributes: { exclude: ["updatedAt", 'createdAt'] },
    include: [{
      model: servicio,
      attributes: ['descripcion', 'precio', 'createdAt'],
      through: { attributes: [] },
      where: {
        precio: { [Op.between]: [lower, higher] }
      }
    }]
  })
    .then(clientes => {
      res.json(clientes);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get('/findAllByRate', function (req, res, next) {
  let lower = parseFloat(req.query.lower);
  let higher = parseFloat(req.query.higher);

  cliente.findAll({
    attributes: { exclude: ["updatedAt", 'createdAt'] },
    include: [{
      model: servicio,
      attributes: ['descripcion', 'precio', 'createdAt'],
      through: { attributes: [] },
      where: {
        precio: { [Op.between]: [lower, higher] }
      }
    }]
  })
    .then(cliente => {
      let titulo = 'Clientes con servicios de: $' + lower + ' a $' + higher;
      res.render('index', { title: titulo, arrClientes: cliente });
    })
    .catch(error => res.status(400).send(error))
});

module.exports = router;
