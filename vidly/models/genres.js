const mongoose = require('mongoose');
const Joi = require('joi')
const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 123,
        lowercase: true,
        enum: ["action", 'horror', 'science-fiction']
    }
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

const Genre = mongoose.model('Genre', genresSchema);

module.exports = Genre;
// module.exports = validateGenre;