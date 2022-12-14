const Joi = require('joi');
const config = require("config")
Joi.objectId = require("joi-objectid")(Joi)
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require('./routes/auth')

const express = require('express');
const app = express();

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKet is not defined.");
    process.exit(1)
}

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals)
app.use("/api/users", users)
app.use("/api/auth", auth)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));