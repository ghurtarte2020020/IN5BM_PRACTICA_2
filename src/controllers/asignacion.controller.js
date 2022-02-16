const Asignacion = require('../models/asignacion.model');

function Asignarme(req, res){

    var parametros = req.body;
    var AsignacionModel = new Asignacion()

    Asignacion.find({idAlumno: req.user.sub},(err, asignacionEncontrada) => {
        if(asignacionEncontrada.length == 3){
            return res.status(500)
            .send({ mensaje: 'Error, usted ya esta en el limite de cursos.'})
        } else{
            Asignacion.find({idCurso: parametros.idCurso, idAlumno: req.user.sub},(err, segundaAsignacionEncontrada) => {
                if(segundaAsignacionEncontrada.length == 0){
                    if(parametros.idCurso){
                        AsignacionModel.idAlumno = req.user.sub
                        AsignacionModel.idCurso = parametros.idCurso
            
                        AsignacionModel.save((err, asignacionGuardada) => {
                            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                            if(!asignacionGuardada) return res.status(404).send( { mensaje: "Error, no se agrego a ningun curso"});
                
                            return res.status(200).send({ asignacion: asignacionGuardada });
                        })
                    }
                }else{
                    return res.status(500)
                    .send({ mensaje: 'Error, usted ya se ha asignado ese curso.'})
                } 
            })
        }
    })
}

function MisAsignaciones(req, res){
    Asignacion.find({idAlumno : req.user.sub}, (err, asignacionEncontrada) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!asignacionEncontrada) return res.status(404).send({ mensaje: "Error, no se encontraron cursos asignados" });

        return res.status(200).send({ asignacion: asignacionEncontrada });
    }).populate('idAlumno', 'email nombre').populate('idCurso', 'nombreCurso')
}

module.exports = {
    Asignarme,
    MisAsignaciones,
}



