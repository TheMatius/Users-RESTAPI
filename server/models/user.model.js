const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roleEnum = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role.'
};

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required.']
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roleEnum
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Se le hace un cambio a los prototipos de JS
userSchema.methods.toJSON = function() {
    let user = this;
    let objUser = user.toObject();

    delete objUser.password;

    return objUser;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

module.exports = mongoose.model('User', userSchema);