const express = require("express");
const router = express.Router()
const { Rental } = require("../models/rentals");
const Movie = require("../models/movies");
const Customer = require("../models/customers")
const mongoose = require("mongoose");
// const Fawn = require("fawn");


mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to Rentals Database..."))
    .catch(err => console.log(err));

// Fawn.init("mongodb://localhost/vidly");

router.post("/", async (req, res) => {
    // const { error } = validate(req.body)
    // if (error) return res.status(400).send(error.details[0].message)
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("There is no Customer with the given ID!");
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("There is no Movie with the given ID!")

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name || "DefaultName",
            isGold: customer.isGold || false,
            phone: customer.phone || "01024965221"
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateOut: req.body.dayOut,
        rentalFee: req.body.rentalFee
    })

    // try {

    //     new Fawn.Task()
    //         .save("rentals", rental)
    //         .update("movies", { _id: movie._id }, {
    //             $inc: {
    //                 numberInStock: -1
    //             }
    //         })
    //         .run()
    //     res.send(rental)
    // } catch (ex) {
    //     res.status(500).send("Smth Failed!!!");
    // }

    rental = await rental.save();
    movie.numberInStock--
    movie.save()

    res.send(rental)


})

router.get("/", async (req, res) => {
    const result = await Movie.find();
    res.send(result)
})

module.exports = router