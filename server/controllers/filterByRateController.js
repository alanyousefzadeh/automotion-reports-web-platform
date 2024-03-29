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

exports.filterByRate = async (req, res) => {
    const currentGarage = req.query.garageName;
  
    //set the correct db in the db object
    dbConnector(currentGarage, db)
    
    //console log to confirm coorect db connection made
    console.log("25",db.connection.options.database)
   
    const knex = await require("knex")(db);
    
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let rate = req.query.rate
    let filterByRateData;

    //query for rate
    console.log(rate)

    //check for all rates in one 
    if (rate === 'All') {
        filterByRateData = await knex.raw(
            `DECLARE @inCars AS TABLE
            (
                carsIn int,
                outDate Date
            );
            insert into @inCars SELECT count(indatetime) as inCars ,  CAST(indatetime AS DATE) as indate
                    FROM [Transactions]
                    where inDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T'
                    GROUP BY CAST(indatetime AS DATE)
            SELECT count(OutDateTime) as outCars , t2.carsIn , datename(dw,OutDateTime) as dayofweek, 
            CAST(OutDateTime AS DATE) as outdate , sum(t1.total) as total
                    FROM [Transactions] as t1 full outer join @inCars as t2 on CAST(OutDateTime AS DATE) = t2.outDate
                    where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T'
                    GROUP BY CAST(OutDateTime AS DATE), datename(dw,OutDateTime),
                    t2.carsIn
                    order by CAST(OutDateTime AS DATE)`
        )

    }
    //check if the 25 charge in Baxter is an early bird rate
    else if (rate === "Early" && currentGarage === "Baxter") {
        filterByRateData = await knex.raw(
            `SELECT count(total) as count, sum(total) as total, CAST(outdatetime AS DATE) as date
    FROM Transactions
    where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = '25'
    and DATEDIFF(mi, InDateTime, outDateTime) > '60'
    GROUP BY CAST(outdatetime AS DATE)`
        )
    }

    //check if the 15 charge in Waverly is an early bird rate
    else if (rate === "Early" && currentGarage === "Waverly") {
        filterByRateData = await knex.raw(
            `SELECT count(total) as count, sum(total) as total, CAST(outdatetime AS DATE) as date
        FROM Transactions
        where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = '15'
        and DATEDIFF(mi, InDateTime, outDateTime) > 120
        GROUP BY CAST(outdatetime AS DATE)`
        )

    } else if (rate === "NC/0") {
        filterByRateData = await knex.raw(
            `SELECT paytype, Total, TicketNum, InDateTime, OutDateTime
        FROM Transactions
        where (paytype = 'NC' or total = 0) and outDateTime between '${startDate}' and '${endDate}'`)

    } else if (rate === "Other") {

        switch (currentGarage) {
            case ("Baxter"):
                filterByRateData = await knex.raw(
                    `SELECT Total, TicketNum, InDateTime, OutDateTime
                FROM Transactions
                where outDateTime between '${startDate}' and '${endDate}' and Total NOT IN (0, 15, 25, 32, 42, 46, 55)`)
                break;
            case ("VanVorst"):
                filterByRateData = await knex.raw(
                    `SELECT Total, TicketNum, InDateTime, OutDateTime
                FROM Transactions
                where outDateTime between '${startDate}' and '${endDate}' and Total NOT IN (0, 3.56, 10.67, 13.04, 17.78, 20.15, 20.44)`)
                break;
            case ("Waverly"):
                filterByRateData = await knex.raw(
                    `SELECT Total, TicketNum, InDateTime, OutDateTime
                FROM Transactions
                where outDateTime between '${startDate}' and '${endDate}' and Total NOT IN (0, 5, 15, 20, 25, 35)`)
                break;
            case ("24th Street"):
                filterByRateData = await knex.raw(
                    `SELECT Total, TicketNum, InDateTime, OutDateTime
                FROM Transactions
                where outDateTime between '${startDate}' and '${endDate}' and Total NOT IN (8, 25, 33, 39, 46)`)
                break;


        }
        //all other non-early bird charges
    } else {
        if ((currentGarage === "Baxter") && (rate === "25")) {
            filterByRateData = await knex.raw(
                `SELECT count(total) as count, sum(total) as total, CAST(outdatetime AS DATE) as date 
        FROM Transactions
        where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = ${rate}
        and DATEDIFF(mi, InDateTime, outDateTime) < '60'
        GROUP BY CAST(outdatetime AS DATE)`
            );
        } else if (currentGarage === "Waverly" && rate === "15") {
            filterByRateData = await knex.raw(
                `SELECT count(total) as count, sum(total) as total, CAST(outdatetime AS DATE) as date 
        FROM Transactions
        where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = ${rate}
        and DATEDIFF(mi, InDateTime, outDateTime) < 120
        GROUP BY CAST(outdatetime AS DATE)`
            );

        } else {
            filterByRateData = await knex.raw(
                `SELECT count(total) as count, sum(total) as total, CAST(outdatetime AS DATE) as date 
        FROM Transactions
        where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = ${rate}
        GROUP BY CAST(outdatetime AS DATE)`
            );

        }

    }
    res.send(filterByRateData);

};



