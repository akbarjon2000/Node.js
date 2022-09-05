const jwt = require("jsonwebtoken");
const config = require("config")
const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const _ = require("lodash")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Conected To Users Database..."))
    .catch(err => console.log(err))


router.post("/", async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send()

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("invalid email or password")

    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) return res.status(400).send("invalid email or password")

    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"))
    res.send(token)


})

module.exports = router