require('dotenv').config();
const { initializeApp } = require('firebase-admin/app');
const express = require("express");
const app = express();
const cors = require("cors");

/////////////////
var admin = require("firebase-admin");

//var serviceAccount = (process.env.SERVICE_KEY);

admin.initializeApp({
  credential: admin.credential.cert('./service_key.json'),
  databaseURL: "https://automotion-web-platform-default-rtdb.firebaseio.com"
});



const loginRoute = require('./routes/loginRoute');
const garageRoute = require('./routes/garageRoute');
const emailRoute = require('./routes/emailRoute');
const currentUserRoute = require('./routes/currentUserRoute');
const retrievalTimeRoute = require('./routes/retrievalTimeRoute')
const atlanticOpenAPIRoute = require('./routes/atlanticOpenAPI')
const schemehornAPIRoute = require('./routes/schemehornAPIRoute')
const filterByRateRoute = require('./routes/filterByRateRoute')
const monthliesRoute = require('./routes/monthliesRoute')

const port = process.env.PORT || 8080;

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/login', loginRoute);
app.use('/garagedata', garageRoute);
app.use('/emailGenerator', emailRoute);
app.use('/currentUser', currentUserRoute);
app.use('/retrievalTime', retrievalTimeRoute);
app.use('/atlanticOpenAPI', atlanticOpenAPIRoute)
app.use('/schemehorn', schemehornAPIRoute)
app.use('/filterByRate', filterByRateRoute)
app.use('/monthlies', monthliesRoute)
app.use('/admindelete', (req, res) =>{

  const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    admin.auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
})

//port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})