//require importar librerias 3 o personalizadas
var express = require('express');
var app = express();
var bycrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var middlewareAuth = require('../middlewares/authentications');

var Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role').exec(

        (err, usuarios) => {

            if (err) {
                return res.status(500).json({
                    response: false,
                    message: 'Error carcando usuarios',
                    errors: err
                });
            }

            res.status(200).json({
                response: true,
                results: usuarios
            });


        });

});


// nuevo usuario

app.post('/', middlewareAuth.verifyToken, (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bycrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
    });

    usuario.save((err, usuariosave) => {

        if (err) {
            return res.status(400).json({
                response: false,
                message: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            response: true,
            results: usuariosave
        });

    });


});

// actualizar

app.put("/:id", middlewareAuth.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {


        if (err) {
            return res.status(500).json({
                response: false,
                message: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                response: false,
                message: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;


        usuario.save((err, usuariosaved) => {

            if (err) {
                return res.status(400).json({
                    response: false,
                    message: 'Error al actualizar usuario',
                    errors: err
                });
            }


            usuariosaved.password = ';)';

            res.status(200).json({
                response: true,
                results: usuariosaved
            });

        });


    });

});

// elimnar usuario

app.delete("/:id", middlewareAuth.verifyToken, (req, res, next) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, userdeleted) => {

        if (err) {
            return res.status(500).json({
                response: false,
                message: 'Error al borrar usuario',
                errors: err
            });
        }


        if (!userdeleted) {
            return res.status(400).json({
                response: false,
                message: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe usuario con ese ID' }
            });
        }


        return res.status(200).json({
            response: false,
            message: 'El usuario con el id ' + id + ' fue eliminado',
        });
    });

});

module.exports = app;