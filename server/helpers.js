function hourOfDayQuery(timeCol, inDate, outDate, type) {
  return `Select datepart(hour, ${timeCol}) as hourofday, count (*) as countperhour
        From [Transactions]
        where (${timeCol} between '${inDate} 00:00:00' and '${outDate} 23:59:59') and Type='${type}' 
        Group by datepart(hour, ${timeCol})`;
}

function totalQuery(inDate, outDate) {
  return `SELECT sum(total) as total, DATEDIFF(day, '${inDate} 00:00:00', '${outDate} 23:59:59') AS date_difference
        FROM [Transactions]
        where OutDateTime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and [Type]='T'`;
}

function rateTableQuery(inDate, outDate) {
  return `SELECT InDateTime, OutDateTime, total
        FROM [Transactions]
        WHERE OutDateTime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and [Type] = 'T'`;
}

function overParkedQuery() {
  return `select  type, STOPAKey2 ,InDateTime ,  DATEDIFF(day, InDateTime,GETDATE()) as 'TotalDays'
    from  [Transactions]
    where Status='InSystem' and DATEDIFF(day, InDateTime,GETDATE()) >=7
    group by type ,InDateTime ,STOPAKey2
    order by type desc`;
}

function ticketStartNum(inDate, outDate) {
  return `SELECT Top 1 [TicketNum] FROM [Transactions]
  where indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and type = 'T'`;
}

function ticketEndNum(inDate, outDate) {
  return `SELECT 
  Top 1
  [TicketNum]
  FROM [Transactions]
  where indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' 
  and type = 'T' order by TicketNum desc`;
}

function openTicketsToday(inDate, outDate) {
  return `SELECT 
  count([TicketNum]) as openToday
  FROM [Transactions]
  where indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59'
  and outdatetime  is null
  and type = 'T'`;
}

function openPrior(inDate) {
  return `SELECT 
  count([TicketNum]) as openPrior
  FROM [Transactions]
  where indatetime <'${inDate} 00:00:00' 
  and outdatetime  is null
  and type = 'T'`;
}

function currentMonthliesIn(inDate) {
  return `SELECT 
  count(STOPAKey2) as monthliesIn
  FROM [Transactions]
  where indatetime <'${inDate} 23:59:59'
  and outdatetime  is null
  and type = 'M'`;
}

function closedTickets(inDate, outDate) {
  return `SELECT 
  count([TicketNum]) as closedTickets
  FROM [Transactions]
  where outdatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59'
  and type = 'T'`;
}

function dbConnector(garageName, db){
  
  switch (garageName) {
    case "Baxter":
      db.connection.options.database = "BaxterSync";
      break;
    case "Waverly":
      db.connection.options.database = "502WaverlySync";
      break;
    case "VanVorst":
      db.connection.options.database = "207VanvorstSync";
      break;
    case "24th Street":
        db.connection.options.database = "24thSync";
        break;
    default:
      console.log("please provide a db name");
  }
}
module.exports = {
  hourOfDayQuery,
  totalQuery,
  rateTableQuery,
  overParkedQuery,
  ticketStartNum,
  ticketEndNum,
  openTicketsToday,
  openPrior,
  currentMonthliesIn,
  closedTickets,
  dbConnector
};
