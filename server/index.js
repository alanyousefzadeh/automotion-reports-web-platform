require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const loginRoute = require('./routes/loginRoute');
const garageRoute = require('./routes/garageRoute')
const port = 8080;

//middleware
app.use(cors());
app.use(express.json());

//Routes
// app.use('/register', registerRoute);

app.use('/login', loginRoute);
app.use('/garagedata', garageRoute);


//port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})