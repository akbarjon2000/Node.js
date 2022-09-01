const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/vidly");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

})

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
})

const Movie = mongoose.model("Movie", movieSchema);

// async function createMovie(title, genre) {
//     const movie = await new Movie({
//         title,
//         genre
//     })
//     const newgenre = await genre;
//     const genreResult = await newgenre.save()
//     const result = await movie.save();

//     console.log(result, genreResult);
// }


module.exports = Movie;
// createMovie("Qalb iffati", new Genre({ name: "Qalb iffatining Songi Nutqtasida Allohga Toliq Boglanishi", numberInStock: 100, dailyRentalRate: 10000000 }))