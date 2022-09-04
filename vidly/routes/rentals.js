const express = require("express");
const router = require("router");
const { Rental, validate } = require("../models/rentals");
const Movie = require("../models/movies");
const Customer = require("../models/customers")
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/api/vidly")
    .then(() => console.log("Connected to Rentals Database..."))
    .catch(err => console.log(err));

router.post("/", async (req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("There is no Customer with the given ID!");
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("There is no Movie with the given ID!")

    let rental = await new Rental({
        customer: {
            name: customer.name || "DefaultName",
            isGold: customer.isGold || false,
            phone: customer.phone || "01024965221"
        },
        movie: {

        }
    })
})