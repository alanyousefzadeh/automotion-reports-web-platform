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

exports.carDetails = async (req, res) => {
    const currentGarage = req.query.garageName;
   
    //set the correct db in the db object
    dbConnector(currentGarage, db)
    
    const knex = await require("knex")(db);
    
    const carId = req.query.carId
    console.log(carId)

    let carDetails = await knex.raw(
        `SELECT 
        t1.[CustomerNumber]
        ,t1.[CarBarCode]
        ,t1.[Rate]
        ,t1.[LicensePlate]
        ,t1.[Make]
        ,t1.[Model]
        ,t1.[Color]
        ,t1.[Year]
        ,t2.[CustomerName]
        ,t2.[StreetAddress]
        ,t2.[City]
        ,t2.[State]
        ,t2.[Zip]
        ,t2.[MainPhone]
        ,t2.[AltPhone]
        ,t2.[NumAllowedToPark]
        ,t2.[NumCurrentlyParked]
        FROM [MonthlyContracts] as t1 full outer join [MonthlyCustomers] as t2 on t1.customernumber = t2.customernumber
        where t1.carbarcode = ${carId}`
      );
      res.send(carDetails)
  };