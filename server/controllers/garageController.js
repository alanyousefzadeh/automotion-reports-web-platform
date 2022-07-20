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

exports.transactions = (req, res) => {
    let start = req.query.inDate
    let end = req.query.outDate
    console.log(start)
    // Find the transactions
    knex
    .from('Transactions')
    .select('Type','InDateTime', 'OutDateTime', 'PayType', 'TicketNum')
    .where({Type: 'T'})
    .whereBetween('InDateTime', [start, end])
    .then((result) => {
        res.json(result);
    })
    .catch(() => {
        res.status(400).send("error fetching transactions");
    });

}; 

exports.atlanticClosed = (req, res) =>{
    let from = (req.query.inDate) 
    let to = (req.query.outDate)
    console.log(req.query)
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

