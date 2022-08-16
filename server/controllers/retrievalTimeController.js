require("dotenv").config();
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
  console.log("test");
  const currentGarage = await req.query.garage;
  switch (currentGarage) {
    case "Baxter":
      db.connection.options.database = "BaxterSync";
      break;
    case "Waverly":
      db.connection.options.database = "502WaverlySync";
      break;
    case "VanVorst":
      db.connection.options.database = "207VanvorstSync";
      break;
    default:
      console.log("please provide a db name");
  }
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
      WHERE indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and type = '${type}' and stopakey2 = ${num}
      and [OutDateTime] IS NOT NULL and [LastRetrievalDateTime] IS NOT NULL`
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
      WHERE indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and type = '${type}' 
      and [OutDateTime] IS NOT NULL and [LastRetrievalDateTime] IS NOT NULL`
    );
    res.send(data);
  }
};
