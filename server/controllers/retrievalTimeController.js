require("dotenv").config();
const {dbConnector} = require('../helpers')

let db = {
  client: "mssql",
  connection: {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    options: {
      port: 1433,
      database: "",
      encrypt: true,
    },
  },
};

exports.time = async (req, res) => {
  const currentGarage = await req.query.garage;
 
  //set the correct db in the db object
  dbConnector(currentGarage, db)
  
  //console log to confirm coorect db connection made
  console.log(db.connection.options.database)
 
  const knex = await require("knex")(db);
 
  const inDate = req.query.inDate;
  const outDate = req.query.outDate;
  const type = req.query.type;
  const num = req.query.num;

  if(num !== "") {
    let data = await knex.raw(
      `SELECT 
      [Type]
     ,[InDateTime]
     ,[OutDateTime]
     ,[LastRetrievalDateTime]
     ,[Status]
     ,[STOPAKey2]
     ,[TicketNum]
     ,[Oversize]
     ,DATEDIFF(minute, LastRetrievalDateTime, OutDateTime) AS waitTime
      FROM [Transactions]
      WHERE (indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and type = '${type}' and stopakey2 = ${num}) or (outdatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and type = '${type}' and stopakey2 = ${num})` 
    );
    res.send(data)
  } else {
    let data = await knex.raw(
      `SELECT 
      [Type]
     ,[InDateTime]
     ,[OutDateTime]
     ,[LastRetrievalDateTime]
     ,[Status]
     ,[STOPAKey2]
     ,[TicketNum]
     ,[Oversize]
     ,DATEDIFF(minute, LastRetrievalDateTime, OutDateTime) AS waitTime
      FROM [Transactions]
      WHERE (indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and type = '${type}') or (outdatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and type = '${type}')`
      
    );
    res.send(data);
  }
};
