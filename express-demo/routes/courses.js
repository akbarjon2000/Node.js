const express = require("express");
const router = express.Router()
const Joi = require('joi')
const mongoose = require('mongoose');


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

const Genre = mongoose.model('Genre', genresSchema);

router.get("/", async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres);

})

router.get("/:id/", async (req, res) => {
    let id = req.params.id;
    var genre = await Genre.find({ id });
    if (!genre) return res.status(404).send(`Course was not found with the given ID: ${id}`)
    else res.send(genre)
})

router.post("/", async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required()
    })
    try {
        const value = await schema.validateAsync(req.body)
        let genre = new Genre({ name: req.body.name })
        genre = await genre.save();
        res.send(genre);
    }
    catch (err) {
        res.status(400).send(err.message)
    }


})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const schema = Joi.object({
        name: Joi.string().min(5).max(20)
    })
    try {
        // const value = await schema.validateAsync(req.body);
        const result = await Genre.updateOne({ id }, {
            $set: {
                name: req.body.name
            }
        })
        res.send(result);
    } catch (error) {
        res.status(400).send(error.details[0].message)
    }


})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const genre = Genre.find({ id });
    if (!genre) return res.status(404).send(`The course with the given ID: ${id} is not found`)
    const result = await Genre.deleteOne({ id });
    res.send(result);
})

module.exports = router