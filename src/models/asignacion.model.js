const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AsignacionSchema = Schema({
    idAlumno:  {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    idCurso: {type: Schema.Types.ObjectId, ref: 'Cursos'}
});

module.exports = mongoose.model('Asignaciones', AsignacionSchema);