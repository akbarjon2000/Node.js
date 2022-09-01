const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model("Rental", new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 30,
                required: true,
                trim: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: Number,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                maxlenght: 5,
                minlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}))

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
    }
    return Joi.validate(schema)
}

exports.Rental = Rental;
exports.validate = validateRental;