const express = require('express');
const Genre = require("../models/genres");
const Movie = require("../models/movies");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected To Movies Database"))
    .catch(err => console.log(err));

router.get("/", async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
})

router.post("/", async (req, res) => {

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send("Please enter a valid genre id!!!")


    let movie = new Movie({
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie)

})

router.delete("/:id", async (req, res) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Please enter a valid id of Movie!");

    let deletedMovie = await Movie.deleteOne({ _id: req.params.id });
    res.send(deletedMovie);

})

router.put("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("There Doesn't Exist Any Movie With The Given ID!");

    let updatedMovie = await Movie.updateOne({ _id: req.params.id }, {
        $set: {
            title: req.body.title || movie.title,
            numberInStock: req.body.numberInStock || movie.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate || movie.dailyRentalRate
        }
    })

    res.send(updatedMovie);
})


module.exports = router;