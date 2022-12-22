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

    });

    //set to store all FOBs in QBs
    let fobsInGoogleSheets = new Set()
    payments.slice(1).forEach(row => {
        if ((row[fobStatusIndex] === "Active") || row[fobStatusIndex] === 'Last Month')
        fobsInGoogleSheets.add(row[fob])
    });

    //filter for payments in QBs that arent in Google Sheets (GS)
    let filteredPayments = Array.from(fobsInQuickBooks).filter((fob) => !fobsInGoogleSheets.has(fob))

    
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
