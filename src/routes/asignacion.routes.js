const express = require('express');
const asignacionCotrolador = require('../controllers/asignacion.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/asignarme', md_autenticacion.Auth, asignacionCotrolador.Asignarme);
api.get('/misAsignaciones', md_autenticacion.Auth, asignacionCotrolador.MisAsignaciones);

module.exports = api;