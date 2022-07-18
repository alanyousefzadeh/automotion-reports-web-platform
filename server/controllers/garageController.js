const axios = require('axios');

require('dotenv').config()
const knex = require('knex')({
    client : 'mssql',
    connection: {
      server : process.env.SERVER,
      user : process.env.USER,
      password : process.env.PASSWORD,
      options: {
          port: 1433,
          database : process.env.DATABASE,
          encrypt: true
      }
    }
  });

exports.garage = (req, res) => {

    // Find the user
    knex('Transactions')
        .where({ Type: 'M' })
        .first()
        .then((result) => {

            res.json(result);
        })
        .catch(() => {
            res.status(400).send("error fetching transactions");
        });
}; 

exports.atlanticClosed = (req, res) =>{
    let from = parseInt(req.query.inDate) //+ 28800;//add 8 hours to unix stamp to adjust for eastern time 3am
    let to = parseInt(req.query.outDate)// + 28800;
    console.log('from', from);
    console.log('to', to)
    const CLOSED_API_URL = `https://ssl.garagenet.com/api/N2UwNjFi/woc/reports/allClosedInventoryData?from=${from}&to=${to}`;
    axios
        .get(CLOSED_API_URL, {
            auth: {
                username:'wocreports' ,
                password: 'wqEsCg0LticrMNtG'
            }
        })
        .then(response => res.send(response.data))
            .catch((err) => {
                res.send(err);
            });
}; 

