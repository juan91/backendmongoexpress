var mongoose = require('mongoose');
var uniquevalidator = require('mongoose-unique-validator');
var mongoosehidden = require('mongoose-hidden');

var Schema = mongoose.Schema;


var rolesValidos = {

    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'

}

var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'], },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesario'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

usuarioSchema.plugin(uniquevalidator, { message: '{PATH} debe ser único' });
usuarioSchema.plugin(mongoosehidden, { hidden: { _id: false, password: true } });

module.exports = mongoose.model('Usuario', usuarioSchema);