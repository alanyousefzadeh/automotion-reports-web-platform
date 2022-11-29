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

exports.monthlies = async (req, res) => {
    const currentGarage = req.query.garageName;
    console.log(currentGarage)
   
    //set the correct db in the db object
    dbConnector(currentGarage, db)
  
    //console log to confirm coorect db connection made
    console.log(db.connection.options.database)
    
    const knex = await require("knex")(db);
    
    let monthliesData = {
        monthliesActive : [],
        monthliesExpired : [],
        monthliesRepo: [], 
        monthliesInUse: []
    }
    monthliesData.monthliesActive = await knex.raw(
        `Select distinct  table1.CustomerNumber , table1.CustomerName , table2.CarBarCode ,table2.ContractStartDate,table2.ContractEndDate,case
        when table3.InUse IS NULL then 'No Record' else table3.InUse end AS InUse, max(table4.oversize) as 'max'
        from [MonthlyCustomers] as table1 full outer JOIN [MonthlyContracts] AS table2 on table1.CustomerNumber = table2.CustomerNumber
         full outer JOIN [KeyFob] as table3 on table2.CarBarCode = table3.carbarcode full outer JOIN [Transactions] as table4 on table3.CarBarCode = table4.StopaKey2
        where ContractEndDate > GETDATE()
        group by table1.CustomerNumber , table1.CustomerName , table2.CarBarCode ,table2.ContractStartDate,table2.ContractEndDate, table3.InUse`
    )

    monthliesData.monthliesExpired =  await knex.raw(
        `Select distinct  table1.CustomerNumber , table1.CustomerName  , table2.CarBarCode ,table2.ContractStartDate,table2.ContractEndDate,case
        when table3.InUse IS NULL then 'No Record' else table3.InUse end AS InUse
        from [MonthlyCustomers] as table1 FULL OUTER JOIN [MonthlyContracts]  AS table2 on table1.CustomerNumber = table2.CustomerNumber
         FULL OUTER JOIN [KeyFob] as table3 on table2.carbarcode  = table3.carbarcode
        where ContractEndDate < GETDATE()`
    )

    monthliesData.monthliesRepo = await knex.raw(
        `Select distinct  table1.CustomerNumber , table1.CustomerName  , table2.CarBarCode ,table2.ContractStartDate,table2.ContractEndDate,case
        when table3.InUse IS NULL then 'No Record' else table3.InUse end AS InUse
        from [MonthlyCustomers] as table1 FULL OUTER JOIN [MonthlyContracts]  AS table2 on table1.CustomerNumber = table2.CustomerNumber
         FULL OUTER JOIN [KeyFob] as table3 on table2.carbarcode  = table3.carbarcode
        where Repo='Y'`
    )

    monthliesData.monthliesInUse = await knex.raw(
        `Select distinct  table1.CustomerNumber , table1.CustomerName  , table2.CarBarCode ,table2.ContractStartDate,table2.ContractEndDate,case
        when table3.InUse IS NULL then 'No Record' else table3.InUse end AS InUse
        from [MonthlyCustomers] as table1 FULL OUTER JOIN [MonthlyContracts]  AS table2 on table1.CustomerNumber = table2.CustomerNumber
         FULL OUTER JOIN [KeyFob] as table3 on table2.carbarcode  = table3.carbarcode
        where inuse='Y' `
    )
    res.send(monthliesData);

};



