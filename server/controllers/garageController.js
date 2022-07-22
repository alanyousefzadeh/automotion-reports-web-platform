const axios = require('axios');
const helpers = require('../helpers');

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

exports.transactions = async (req, res) => {
    let inDate = req.query.inDate.slice(0,10)
    let outDate = req.query.outDate.slice(0,10)
    let data = {
        mInDateTimes : [],
        mOutDateTimes : [],
        tInDateTimes : [],
        tOutDateTimes : [],
        allTickets : []
    }
    //query for InDateTime type = M
    let query1 = await knex.raw(
        helpers.sqlQuery('InDateTime' ,inDate, outDate, "M")
    )
    data.mInDateTimes = query1

    //query for OutDateTime type = M
    let query2 = await knex.raw(
        helpers.sqlQuery('OutDateTime', inDate, outDate, "M")
    )
    data.mOutDateTimes = query2

    //query for InDateTime type = T
    let query3 = await knex.raw(
        helpers.sqlQuery('InDateTime', inDate, outDate, "T")
    )
    data.tInDateTimes = query3
    
    //query for OutDateTime type = T
    let query4 = await knex.raw(
        helpers.sqlQuery('OutDateTime', inDate, outDate, "T")
    )
    data.tOutDateTimes = query4

    //query for all tickets
    data.allTickets = await knex
        .from('Transactions')
        .select('InDateTime', 'OutDateTime', 'TicketNum')
        .whereBetween('InDateTime', [`${inDate} 00:00:00`, `${outDate} 23:59:59`])
        
    res.send(data)
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

