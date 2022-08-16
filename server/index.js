require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
// const axios = require("axios");

const loginRoute = require('./routes/loginRoute');
const garageRoute = require('./routes/garageRoute');
const emailRoute = require('./routes/emailRoute');
const currentUserRoute = require('./routes/currentUserRoute');
const retrievalTimeRoute = require('./routes/retrievalTimeRoute')
const atlanticOpenAPIRoute = require('./routes/atlanticOpenAPI')

const port = process.env.PORT || 8080;

//middleware
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"

//   )
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "POST, PUT, PATCH, GET, DELETE"
//     )
//     return res.status(200).json({})
//   }
//   next()
// })
/////end cors////
app.use(express.json());

//Routes
app.use('/login', loginRoute);
app.use('/garagedata', garageRoute);
app.use('/emailGenerator', emailRoute);
app.use('/currentUser', currentUserRoute);
app.use('/retrievalTime', retrievalTimeRoute);
app.use('/atlanticOpenAPI', atlanticOpenAPIRoute)

//port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})