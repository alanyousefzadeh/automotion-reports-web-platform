function hourOfDayQuery(timeCol, inDate, outDate, type) {
  return `Select datepart(hour, ${timeCol}) as hourofday, count (*) as countperhour
        From [dbo].[Transactions]
        where (${timeCol} between '${inDate} 00:00:00' and '${outDate} 23:59:59') and Type='${type}' 
        Group by datepart(hour, ${timeCol})`;
}

function totalQuery(inDate, outDate) {
  return `SELECT sum(total) as total
        FROM [dbo].[Transactions]
        where OutDateTime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and [Type]='T'`;
}

function rateTableQuery(inDate, outDate) {
  return `SELECT InDateTime, OutDateTime, total
        FROM [dbo].[Transactions]
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
  FROM [dbo].[Transactions]
  where indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59' 
  and type = 'T' order by TicketNum desc`;
}

function openTicketsToday(inDate, outDate) {
  return `SELECT 
  count([TicketNum]) as openToday
  FROM [dbo].[Transactions]
  where indatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59'
  and outdatetime  is null
  and type = 'T'`;
}

function openPrior(inDate) {
  return `SELECT 
  count([TicketNum]) as openPrior
  FROM [dbo].[Transactions]
  where indatetime <'${inDate} 00:00:00' 
  and outdatetime  is null
  and type = 'T'`;
}

function currentMonthliesIn(inDate) {
  return `SELECT 
  count(STOPAKey2) as monthliesIn
  FROM [dbo].[Transactions]
  where indatetime <'${inDate} 23:59:59'
  and outdatetime  is null
  and type = 'M'`;
}

function closedTickets(inDate, outDate) {
  return `SELECT 
  count([TicketNum]) as closedTickets
  FROM [dbo].[Transactions]
  where outdatetime between '${inDate} 00:00:00' and '${outDate} 23:59:59'
  and type = 'T'`;
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
};
