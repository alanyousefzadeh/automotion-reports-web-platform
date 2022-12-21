import React from 'react'
import Table from "react-bootstrap/Table";

export default function MonthliesRevenueConflictsGSTable(props) {

    const { payments, fob, name, type, rate, fobStatusIndex } = props

    let fobsInQuickBooks = new Set()
    payments.slice(1).forEach(payment => {
        //lenghts > 28 on google sheets are QBs Fobs
        if (payment.length > 28) {
            //payment[28] is the fob number in QBs
            fobsInQuickBooks.add(payment[28])
        }

        console.log(fobsInQuickBooks)
    });

    //set to store all FOBs in QBs
    let fobsInGoogleSheets = new Set()
    payments.forEach(payment => {
        fobsInGoogleSheets.add(payment[fob])
    });
    console.log("fobs in GS", fobsInGoogleSheets)

    //filter for payments in QBs that arent in Google Sheets (GS)
    let filteredPayments = Array.from(fobsInQuickBooks).filter((fob) => !fobsInGoogleSheets.has(fob))

    console.log("fobs not in GS",filteredPayments)

    // let QBsNotInGS = .map(payment => {
    //     if(!fobsInGoogleSheets.has(payment[28])){
    //         return payment[26]
    //     }
    // })
    // console.log("QBsNotInGS", QBsNotInGS)
    // const sum = filteredPayments.reduce((total, payment) => {
    //     // Check if the amount is a valid string
    //     console.log("total:", payment[rate], "name:", payment[name])

    //     if (((payment[fobStatusIndex] === "Active") || payment[fobStatusIndex] === 'Last Month') && payment[rate].length > 0) {
    //         // Remove the dollar sign and parse the string as an integer
    //         const amountAsInt = parseFloat(payment[rate].slice(1));
    //         // Add the amount to the total and return the new total
    //         return total + amountAsInt;
    //     }
    //     // Otherwise, return the total unchanged
    //     return total;
    // }, 0);
    return (
        <Table striped bordered className="table-sm report">
            <thead>
                {/* <tr className="table-success">
                    <th>{ }</th>
                    <th></th>
                    <th>Total:</th>
                    <th>${sum.toLocaleString()}</th>
                </tr> */}
            </thead>
            <thead>
                <tr className="table-warning">
                    <th>Name</th>
                    <th>FOB</th>
                    {/* <th>Type</th> */}
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment, i) => {
                    //let paymentEdited = payment[rate].replace(/[$,]/g, '')
                    if (filteredPayments.includes(payment[28]))
                        return (
                            <tr key={i}>
                                <td>{payment[26]}</td>
                                <td>{payment[28]}</td>
                                {/* //<td>{payment[type]}</td> */}
                                <td>${payment[27]}</td>
                            </tr>
                        );
                }
                )}
            </tbody>
        </Table>
    
    )
}
