const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const _ = require("lodash")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const config = require("config")

mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Conected To Users Database..."))
    .catch(err => console.log(err))


router.post("/", async (req, res) => {
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send("user already registered")

    // const { error } = validate(req.body);
    // if (error) return res.status(400).send()

    const user = await new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"))
    res.header("x-auth-tooken", token).send(_.pick(user, ["name", "email"]));
})

module.exports = router