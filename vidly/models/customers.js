const Joi = require('joi')
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 123,

    },
    isGold: {
        type: Boolean,
        required: true,

    },
    phone: {
        type: Number,
        required: true
    }
})
const Customer = mongoose.model('Customer', customerSchema);

// function validateGenre(customer) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//     isGold: Joi.boolean().required(),
//     phone: Joi.number().required()
//   };

//   return Joi.validate(customer, schema);
// }

module.exports = Customer;