const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/db');
const rateLimit = require("express-rate-limit");

// Configure dotenv to load .env file
require('dotenv').config();

// Express app
const app = express();

// Connect to mongodb database
const uri = `mongodb+srv://dioninsanity-barrows-bingo:X03k4zHFdgEmanXl@dioninsanity-barrows-bi.naldis3.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Registering cors
app.use(cors());

// Configure BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure morgan
app.use(morgan("dev"));

// Define first route
app.get("/", (req, res) => {
    console.log("Hello World!");
});

// Configure limit to requests per second
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 Minute
    max: 100, // Limit each IP to 100 requests per Minute,
    standardHeaders: true, // Send standard rate limit headers
    legacyHeaders: false, // Disable deprecated rate limit headers
    message: "Too many requests from this IP, please try again in a minute"
})
app.use(limiter);

// Define user route
const userRoutes = require("./api/user/route/user");
app.use("/user", userRoutes);

// Define bingocard route
const bingoCardRoutes = require("./api/bingocard/route/bingocard");
app.use("/bingocard", bingoCardRoutes);

// Define generalbingocard route
const generalBingoCardRoutes = require("./api/bingocard/route/generalbingocard");
app.use("/generalbingocard", generalBingoCardRoutes);

// Define player route
const playerRoutes = require("./api/bingocard/route/player");
app.use("/player", playerRoutes);

app.listen(8080, () => {
    console.log(`App is running on 8080`);
});