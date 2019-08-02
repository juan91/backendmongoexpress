var express = require('express');
var app = express();
var bycrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, userfind) => {

        if (err) {
            return res.status(500).json({
                response: false,
                message: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!userfind) {

            return res.status(400).json({
                response: false,
                message: 'Credenciales incorrectas - email',
                errors: err
            });
        }


        //permite comparar password encriptada del body con el has del password de la bd
        if (!bycrypt.compareSync(body.password, userfind.password)) {
            return res.status(400).json({
                response: false,
                message: 'Credenciales incorrectas - password',
                errors: err
            });
        }


        //crear token
        userfind.password = ";)";
        var token = jwt.sign({ usuario: userfind }, SEED, { expiresIn: 14400 }) //4horas

        res.status(200).json({
            response: true,
            usuario: userfind,
            token: token,
            id: userfind.id
        });


    });




});

module.exports = app;