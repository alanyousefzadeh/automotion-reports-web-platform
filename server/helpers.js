function sqlQuery(timeCol, inDate, outDate, type){
    return (
        `Select datepart(hour, ${timeCol}) as hourofday, count (*) as countperhour
        From [dbo].[Transactions]
        where (${timeCol} between '${inDate} 00:00:00' and '${outDate} 23:59:59') and Type='${type}' 
        Group by datepart(hour, ${timeCol})`
    )
}

module.exports = {
    sqlQuery
}
