const mongoose = require("mongoose");
const Joi = require("joi")

let User = mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 6,
        maxlength: 255
    }
}))

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(30).required(),
//         email: Joi.string(),
//         password: Joi.string().min(5).max(30)
//     }
//     return Joi.validate(user, schema)
// }

exports.User = User;
// exports.validate = validateUser