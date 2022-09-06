const authorize = require('../middleware/auth');
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

router.get('/me', authorize, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
})

router.post("/", async (req, res) => {
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send("user already registered")
    // joi is not functioning well!
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send()

    const user = await new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"))
    res.header("x-auth-tooken", token).send(_.pick(user, ["name", "email"]));
})

module.exports = router