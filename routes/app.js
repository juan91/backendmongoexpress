//require importar librerias 3 o personalizadas
var express = require('express');
var app = express();

//rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        response: true,
        message: 'Mensaje ok'
    });

});

module.exports = app;