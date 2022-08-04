require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const loginRoute = require('./routes/loginRoute');
const garageRoute = require('./routes/garageRoute');
const emailRoute = require('./routes/emailRoute');
const currentUserRoute = require('./routes/currentUserRoute');
const retrievalTimeRoute = require('./routes/retrievalTimeRoute')

const port = 8080;

//middleware
app.use(cors());
app.use(express.json());

//Routes
// app.use('/register', registerRoute);

app.use('/login', loginRoute);
app.use('/garagedata', garageRoute);
app.use('/emailGenerator', emailRoute);
app.use('/currentUser', currentUserRoute);
app.use('retrievalTime', retrievalTimeRoute);
//port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})