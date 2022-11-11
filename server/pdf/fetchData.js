const helpers = require("../helpers");

require("dotenv").config();

let inDate;
let outDate;
let knex;

const setDate = (date) => {
  inDate = date.inDate;
  outDate = date.outDate;
}

const dbConfiguration = (currentGarage) => {
  let dbName;
 switch (currentGarage) {
  case "Baxter": dbName = 'BaxterSync'
    break;
  case "Waverly": dbName = "502WaverlySync";
    break;
  case "VanVorst": dbName = "207VanvorstSync";
    break;
  default:
    console.log("please provide a db name");
}
  
let db = {
  client: "mssql",
    connection: {
      server: "automotionserver.database.windows.net",
      user: "accounting",
      password: "Aut0m0ti0n",
      options: {
        port: 1433,
        database: dbName,
        encrypt: true,
      },
    },
  };
  knex = require("knex")(db);
}


//query for InDateTime type = M
const mInDateTime = async () => {
  return await knex.raw(
    helpers.hourOfDayQuery("InDateTime", inDate, outDate, "M")
  );
}

//query for OutDateTime type = M
const mOutDataTime = async () => {
  return await knex.raw(
    helpers.hourOfDayQuery("OutDateTime", inDate, outDate, "M")
  );
}

//query for InDateTime type = T
const tInDateTime = async () => {
  return await knex.raw(
    helpers.hourOfDayQuery("InDateTime", inDate, outDate, "T")
  );
}

//query for OutDateTime type = T
const tOutDateTime = async () => {
  return await knex.raw(
    helpers.hourOfDayQuery("OutDateTime", inDate, outDate, "T")
  );
}

//query for all tickets
const allTickets = async () => {
  return await knex
    .from("Transactions")
    .select("InDateTime", "OutDateTime", "TicketNum", "Total", "Type")
    .whereBetween("InDateTime", [`${inDate} 00:00:00`, `${outDate} 23:59:59`]);
}

//query transaction table total $
const totalQuery = async () => {
  const total = await knex.raw(helpers.totalQuery(inDate, outDate));
  return total[0].total;
}

//query for rate table
const rateTable = async () => {
  return await knex.raw(helpers.rateTableQuery(inDate, outDate));
}

//query for over parked cars
const overParked = async () => {
  return await knex.raw(helpers.overParkedQuery());
}

//query for starting ticket num
const ticketStart = async () => {
  console.log('inDate', inDate);
  console.log('outDate', outDate);
  const ticketStartNum = await knex.raw(helpers.ticketStartNum(inDate, outDate));
  return ticketStartNum[0].TicketNum;
}

//query for end ticket num
const ticketEnd = async () => {
  const ticketEndNum = await knex.raw(helpers.ticketEndNum(inDate, outDate));
  return ticketEndNum[0].TicketNum;
}

//query for open tickets today
const openTicketsToday = async () => {
  const openTickets = await knex.raw(helpers.openTicketsToday(inDate, outDate));
  return openTickets[0].openToday;
}

//query for open prior
const openPrior = async () => {
  const openPrior = await knex.raw(helpers.openPrior(inDate));
  return openPrior[0].openPrior;
}

//query for current monthlies in
const currentMonthliesIn = async () => {
  const currentMonthliesIn = await knex.raw(helpers.currentMonthliesIn(inDate));
  return currentMonthliesIn[0].monthliesIn;
}

//query for closed tickets
const closedTickets = async () => {
  const closedTickets = await knex.raw(helpers.closedTickets(inDate, outDate))
  return closedTickets[0].closedTickets;
}

module.exports = { mInDateTime, mOutDataTime, tInDateTime, tOutDateTime, allTickets, rateTable, overParked, ticketStart, ticketEnd, openTicketsToday, openPrior, currentMonthliesIn, closedTickets, totalQuery, setDate,dbConfiguration };
