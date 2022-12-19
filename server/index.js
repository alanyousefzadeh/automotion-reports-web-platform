require('dotenv').config();
const { initializeApp } = require('firebase-admin/app');
const express = require("express");
const app = express();
const cors = require("cors");

const loginRoute = require('./routes/loginRoute');
const garageRoute = require('./routes/garageRoute');
const emailRoute = require('./routes/emailRoute');
const currentUserRoute = require('./routes/currentUserRoute');
const retrievalTimeRoute = require('./routes/retrievalTimeRoute')
const atlanticOpenAPIRoute = require('./routes/atlanticOpenAPI')
const schemehornAPIRoute = require('./routes/schemehornAPIRoute')
const filterByRateRoute = require('./routes/filterByRateRoute')
const monthliesRoute = require('./routes/monthliesRoute')
const adminRoute = require('./routes/adminRoute')
const wakeUpRoute = require('./routes/wakeUpRoute')
const carDetailsRoute = require('./routes/carDetailsRoute')
const googleSheetsRoute = require('./routes/googleSheetsRoute')

const port = process.env.PORT || 8080;

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/wake-up', wakeUpRoute);
app.use('/login', loginRoute);
app.use('/garagedata', garageRoute);
app.use('/emailGenerator', emailRoute);
app.use('/currentUser', currentUserRoute);
app.use('/retrievalTime', retrievalTimeRoute);
app.use('/atlanticOpenAPI', atlanticOpenAPIRoute)
app.use('/schemehorn', schemehornAPIRoute)
app.use('/filterByRate', filterByRateRoute)
app.use('/monthlies', monthliesRoute)
app.use('/admin', adminRoute)
app.use('/carDetails', carDetailsRoute)
app.use("/googleSheets", googleSheetsRoute)
 
          
//port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})