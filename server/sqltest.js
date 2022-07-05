const { Connection, Request } = require("tedious");
require('dotenv').config()

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: process.env.USER, // update me
      password: process.env.PASSWORD // update me
    },
    type: "default"
  },
  server: process.env.SERVER, // update me
  options: {
    database: process.env.DATABASE, //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT TOP (3) [Type]
    ,[InDateTime]
    ,[OutDateTime]
    ,[LastRetrievalDateTime]
    ,[PayType]
   
FROM [dbo].[Transactions]`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
} 