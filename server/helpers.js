function sqlQuery(timeCol, inDate, outDate, type){
    return (`Select count (*) as countperhour, datepart(hour, ${timeCol}) as hourofday
    From [dbo].[Transactions]
    where (${timeCol} between '${inDate} 00:00:00' and '${outDate} 23:59:59') and Type='${type}' 
    Group by datepart(hour, ${timeCol})`)
}

module.exports = {
    sqlQuery
}
