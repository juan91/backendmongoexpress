var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;



//verificar token

exports.verifyToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            res.status(401).json({
                response: false,
                message: "Error, token no válido",
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();

    });
}