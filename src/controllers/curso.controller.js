const { find } = require('../models/curso.model');
const Curso = require('../models/curso.model');
const Asignacion = require('../models/asignacion.model');
const mongoose = require('mongoose');

function MisCursos(req, res) {

    if(req.user.rol != "ROL_MAESTRO"){
        return res.status(500).send({ mensaje: "No tiene autorización para ejecutar esta acción" })
    }

    Curso.find({idMaestro : req.user.sub}, (err, cursoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!cursoEncontrado) return res.status(404).send({ mensaje: "Error, no se encontraron cursos" });

        return res.status(200).send({ cursos: cursoEncontrado });
    })
}


function CrearCurso(req, res){

    var parametros = req.body;
    var cursoModel = new Curso();

    if(req.user.rol != "ROL_MAESTRO"){
        return res.status(500).send({ mensaje: "No tiene autorización para crear cursos" })
    }
    if(parametros.nombreCurso) {
        cursoModel.nombreCurso = parametros.nombreCurso;
        cursoModel.idMaestro = req.user.sub

        cursoModel.save((err, cursoGuardado) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!cursoGuardado) return res.status(404).send( { mensaje: "Error, no se agrego ningun curso"});

            return res.status(200).send({ curso: cursoGuardado });
        })
    }else{
        return res.status(500).send({mensaje: "Debe rellenar los campos necesarios"})
    }
}

function EditarCurso(req, res) {
    var idCurso = req.params.idCurso;
    var parametros = req.body;    

    Curso.findOneAndUpdate({_id: idCurso, idMaestro: req.user.sub}, parametros ,{new: true}, (err, cursoEditado)=>{
            if(err) return res.status(500).send({mensaje: "Error al editar el curso"}) 
    
            if(!cursoEditado) return res.status(500).send({mensaje: "No tiene acceso para editar el curso"})
    
    
            return res.status(200).send({mensaje: cursoEditado})
        })
}

function EliminarCurso(req, res) {
    var idCursoEliminado = req.params.idCurso; 

    Curso.find({nombreCurso:'default'},(err, cursoEncontrado) =>{
        if(cursoEncontrado.length==0){
            Curso.create({
                idMaestro: null,
                nombreCurso: "default"
            })
        }
    })


    Curso.findOne({nombreCurso:'default'},(err, cursoEncontrado2) =>{
        console.log(cursoEncontrado2)
        Asignacion.updateMany({idCurso:idCursoEliminado},{idCurso: mongoose.Types.ObjectId(cursoEncontrado2._id)},(err, prueba)=>{
            Curso.findOneAndDelete({_id: idCursoEliminado, idMaestro: req.user.sub}, (err, cursoEliminado)=>{
                if(err) return res.status(500).send({mensaje: "Error al eliminar el curso"}) 
        
                if(!cursoEliminado) return res.status(500).send({mensaje: "No tiene acceso para eliminar el curso"})
        
                return res.status(200).send({mensaje: cursoEliminado})
            })
        })
    })
    

  
}

module.exports = {
    CrearCurso,
    MisCursos,
    EditarCurso,
    EliminarCurso
}
