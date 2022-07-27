const axios = require("axios");
const helpers = require("../helpers");

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

exports.transactions = async (req, res) => {
  const currentGarage = req.query.garage;
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
      console.log("please provode a db name");
  }
  const knex = require("knex")(db);
  let inDate = req.query.inDate;
  let outDate = req.query.outDate;

  let data = {
    mInDateTimes: [],
    mOutDateTimes: [],
    tInDateTimes: [],
    tOutDateTimes: [],
    allTickets: [],
    total: 0,
    rateTable: {},
  };
  //query for InDateTime type = M
  let query1 = await knex.raw(
    helpers.hourOfDayQuery("InDateTime", inDate, outDate, "M")
  );
  data.mInDateTimes = query1;

  //query for OutDateTime type = M
  let query2 = await knex.raw(
    helpers.hourOfDayQuery("OutDateTime", inDate, outDate, "M")
  );
  data.mOutDateTimes = query2;

  //query for InDateTime type = T
  let query3 = await knex.raw(
    helpers.hourOfDayQuery("InDateTime", inDate, outDate, "T")
  );
  data.tInDateTimes = query3;

  //query for OutDateTime type = T
  let query4 = await knex.raw(
    helpers.hourOfDayQuery("OutDateTime", inDate, outDate, "T")
  );
  data.tOutDateTimes = query4;

  //query for all tickets
  data.allTickets = await knex
    .from("Transactions")
    .select("InDateTime", "OutDateTime", "TicketNum")
    .whereBetween("InDateTime", [`${inDate} 00:00:00`, `${outDate} 23:59:59`]);

  data.total = await knex.raw(helpers.totalQuery(inDate, outDate));

  //query for rate table
  data.rateTable = await knex.raw(helpers.rateTableQuery(inDate, outDate));

  res.send(data);
};

exports.atlanticClosed = (req, res) => {
  let from = req.query.inDate;
  let to = req.query.outDate;
  console.log(req.query);
  console.log("from", from);
  console.log("to", to);
  const CLOSED_API_URL = `https://ssl.garagenet.com/api/N2UwNjFi/woc/reports/allClosedInventoryData?from=${from}&to=${to}`;
  axios
    .get(CLOSED_API_URL, {
      auth: {
        username: "wocreports",
        password: "wqEsCg0LticrMNtG",
      },
    })
    .then((response) => res.send(response.data))
    .catch((err) => {
      res.send(err);
    });
};
