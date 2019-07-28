//require importar librerias 3 o personalizadas
var express = require('express');

var mongoose = require('mongoose');

//inicializacion variables
var app = express();

//conexion a labd
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;
    console.log("Base de datos: \x1b[32m%s\x1b[0m", "online");

})

//rutas

app.get('/', (req, res, next) => {

    res.status(401).json({
        response: true,
        message: 'Mensaje ok'
    });

});

// escuchar peticiones
app.listen(3000, () => {
    console.log("express server 3000: \x1b[32m%s\x1b[0m", "online");
});