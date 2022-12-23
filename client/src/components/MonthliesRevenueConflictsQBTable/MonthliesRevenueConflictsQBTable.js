import React from 'react'
import Table from "react-bootstrap/Table";

export default function MonthliesRevenueConflictsQBTable(props) {

    const { payments, fob, name, type, rate, fobStatusIndex } = props

    //set to store all FOBs in QBs
    let fobsInQuickBooks = new Set()
    payments.forEach(payment => {
        //lenghts > 28 on google sheets are QBs Fobs
        if (payment.length > 28) {
            //payment[28] is the fob number in QBs
            fobsInQuickBooks.add(payment[28])
        }
    });

    //payments in Google Sheets that aren't in QuickBooks
    let filteredPayments = payments.filter((payment) => {
        return (payment[fobStatusIndex] === "Active" ||
            payment[fobStatusIndex] === 'Last Month') &&
            !fobsInQuickBooks.has(payment[fob])
    })

    console.log(filteredPayments)

    const sum = filteredPayments.reduce((total, payment) => {
        // Check if the amount is a valid string
        if (((payment[fobStatusIndex] === "Active") || payment[fobStatusIndex] === 'Last Month') && payment[rate].length > 0) {
            // Remove the dollar sign and parse the string as an integer
            const amountAsInt = parseFloat(payment[rate].slice(1));
            // Add the amount to the total and return the new total
            return total + amountAsInt;
        }
        // Otherwise, return the total unchanged
        return total;
    }, 0);
    return (
        <Table striped bordered className="table-sm report">
            <thead>
                <tr className="table-success">
                    <th>{ }</th>
                    <th></th>
                    <th>Total:</th>
                    <th>${sum.toLocaleString()}</th>
                </tr>
            </thead>
            <thead>
                <tr className="table-warning">
                    <th>Name</th>
                    <th>FOB</th>
                    <th>Type</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {filteredPayments.map((payment, i) => {
                    let paymentEdited = payment[rate].replace(/[$,]/g, '')
                    if (paymentEdited > 0)
                        return (
                            <tr key={i}>
                                <td>{payment[name]}</td>
                                <td>{payment[fob]}</td>
                                <td>{payment[type]}</td>
                                <td>{payment[rate]}</td>
                            </tr>
                        );
                }
                )}
            </tbody>
        </Table>
    )
}
