const express = require('express');
const cursoControlador = require('../controllers/curso.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/crearCurso', md_autenticacion.Auth, cursoControlador.CrearCurso);
api.get('/misCursos', md_autenticacion.Auth, cursoControlador.MisCursos);
api.put('/editarCurso/:idCurso', md_autenticacion.Auth, cursoControlador.EditarCurso);
api.delete('/eliminarCurso/:idCurso', md_autenticacion.Auth, cursoControlador.EliminarCurso);

module.exports = api;