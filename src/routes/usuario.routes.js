const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrar', usuarioControlador.Registrar);
api.post('/registrarMaestro', usuarioControlador.RegistrarMaestro);
api.post('/login', usuarioControlador.Login);
api.put('/editarUsuario', md_autenticacion.Auth, usuarioControlador.EditarUsuario);
api.delete('/eliminarUsuario/', md_autenticacion.Auth, usuarioControlador.EliminarUsuario);


module.exports = api;