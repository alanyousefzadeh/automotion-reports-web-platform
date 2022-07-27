function hourOfDayQuery(timeCol, inDate, outDate, type) {
  return `Select datepart(hour, ${timeCol}) as hourofday, count (*) as countperhour
        From [dbo].[Transactions]
        where (${timeCol} between '${inDate} 00:00:00' and '${outDate} 23:59:59') and Type='${type}' 
        Group by datepart(hour, ${timeCol})`;
}

function totalQuery(inDate, outDate) {
  return `SELECT sum(total) as total
        FROM [dbo].[Transactions]
        where OutDateTime between '${inDate} 00:00:00' and '${outDate} 23:59:59'`;
}

function rateTableQuery(inDate, outDate) {
  return `SELECT InDateTime, OutDateTime, total
        FROM [dbo].[Transactions]
        WHERE OutDateTime between '${inDate} 00:00:00' and '${outDate} 23:59:59' and [Type] = 'T'`;
}

function overParkedQuery(){
    return `select  type, STOPAKey2 ,InDateTime ,  DATEDIFF(day, InDateTime,GETDATE()) as 'TotalDays'
    from  [Transactions]
    where Status='InSystem' and DATEDIFF(day, InDateTime,GETDATE()) >=7
    group by type ,InDateTime ,STOPAKey2
    order by type desc`
}

module.exports = {
  hourOfDayQuery,
  totalQuery,
  rateTableQuery,
  overParkedQuery
};
