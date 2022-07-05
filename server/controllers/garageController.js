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