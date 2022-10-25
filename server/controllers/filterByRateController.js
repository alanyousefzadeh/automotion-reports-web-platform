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

exports.filterByRate = async (req, res) => {
    const currentGarage = req.query.garageName;
    console.log(currentGarage)
    //set the database garage
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
    console.log(db.connection.options.database)
    const knex = await require("knex")(db);
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let rate = req.query.rate
    let filterByRateData;

    //query for rate

    //check if the 25 charge in Baxter is an early bird rate
    if (rate == 25 && currentGarage === "Baxter") {
        filterByRateData = await knex.raw(
            `SELECT count(total) as count, CAST(outdatetime AS DATE) as date
        FROM Transactions
        where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = ${rate}
        and DATEDIFF(mi, InDateTime, outDateTime) > 60
        GROUP BY CAST(outdatetime AS DATE)`
        )
    }

    //check if the 15 charge in Waverly is an early bird rate
    else if (rate == 15 && currentGarage === "Waverly") {
        filterByRateData = await knex.raw(
            `SELECT count(total) as count, CAST(outdatetime AS DATE) as date
            FROM Transactions
            where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = ${rate}
            and DATEDIFF(mi, InDateTime, outDateTime) > 120
            GROUP BY CAST(outdatetime AS DATE)`
        )
    } else if (rate === "NC/0") {
        filterByRateData = await knex.raw(
        `SELECT paytype, Total, TicketNum, InDateTime, OutDateTime
        FROM Transactions
        where (paytype = 'NC' or total = 0) and outDateTime between '${startDate}' and '${endDate}'`)

    } else if(rate === "Other") {

        switch(currentGarage){
            case("Baxter"):
            filterByRateData = await knex.raw(
                `SELECT Total, TicketNum, InDateTime, OutDateTime
                FROM Transactions
                where outDateTime between '${startDate}' and '${endDate}' and Total NOT IN (0, 15, 25, 32, 42, 46, 55)`)
            break;
            case("VanVorst"):
            filterByRateData = await knex.raw(
                `SELECT Total, TicketNum, InDateTime, OutDateTime
                FROM Transactions
                where outDateTime between '${startDate}' and '${endDate}' and Total NOT IN (0, 3.56, 10.67, 13.04, 17.78, 20.15, 20.44)`)
            break;
            case("Waverly"):
            filterByRateData = await knex.raw(
                `SELECT Total, TicketNum, InDateTime, OutDateTime
                FROM Transactions
                where outDateTime between '${startDate}' and '${endDate}' and Total NOT IN (0, 5, 15, 20, 25, 35)`)
            break;
            
        }
    //all other non-early bird charges
    } else {
        filterByRateData = await knex.raw(
            `SELECT count(total) as count, CAST(outdatetime AS DATE) as date 
        FROM Transactions
        where OutDateTime between '${startDate}T00:00:00' and '${endDate}T23:59:59' and type = 'T' and total = ${rate}
        GROUP BY CAST(outdatetime AS DATE)`
        );
    }
    res.send(filterByRateData);

};



