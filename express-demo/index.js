const express = require("express");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to vidly database..."))
    .catch(err => console.log(err));

const helmet = require('helmet');
const config = require("config")
const morgan = require('morgan')
// const logger = require("./middleware/logger")
// const a = require("./middleware/authenticate")
const app = express();
const Joi = require("joi");
const debug = require("debug")("app:debug");
const courses = require("./routes/courses")
const home = require("./routes/home")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(logger)
// app.use(a)
app.use(helmet())
app.use("/api/genres/", courses)
app.use("/", home)

//HTML merkup converter: pug
app.set("view engine", "pug");
app.set("views", "./views");

console.log(app.get("env"))
console.log(config.get("name"))
console.log(config.get("mail.host"))
// console.log(config.get("mail.password"))
if (app.get("env") === "development") {
    app.use(morgan('tiny'))
    debug("Morgan is enabled...")
}





//PORT

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on PORT ${port}`)
})