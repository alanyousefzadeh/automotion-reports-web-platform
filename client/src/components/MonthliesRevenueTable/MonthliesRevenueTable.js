import React from 'react'
import Table from "react-bootstrap/Table";

export default function MonthliesRevenueTable(props) {

    const { payments, fobStatusIndex, fob, name, type, rate } = props

    const sum = payments.reduce((total, payment) => {
        // Check if the amount is a valid string
        console.log("total:", payment[rate], "name:", payment[name])
        
        if (((payment[fobStatusIndex] === "Active") || payment[fobStatusIndex]==='Last Month') && payment[rate].length > 0) {
          // Remove the dollar sign and parse the string as an integer
          const amountAsInt = parseFloat(payment[rate].slice(1));
          // Add the amount to the total and return the new total
          return total + amountAsInt;
        }
        // Otherwise, return the total unchanged
        return total;
      }, 0);

    //console.log(sum)
    let curr = 0;
    return (
        <Table striped bordered className="table-sm report">
            <thead>
                <tr className="table-success">
                    <th>{}</th>
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
                {payments.slice(1).map((payment, i) => {
                    //let paymentEdited = payment[rate].replace(/[$,]/g, '')
                    if((payment[fobStatusIndex] === "Active") || payment[fobStatusIndex]==='Last Month') {
                        //console.log("total:", payment[rate], "name:", payment[name])
                        //console.log(parseFloat(payment[rate].slice(1)))
                        curr += payment[rate] !== '' ? (parseFloat(payment[rate].slice(1))) : 0 ;
                        console.log(curr, payment[rate])
                        return (
                            <tr key={i}>
                                <td>{payment[name]}</td>
                                <td>{payment[fob]}</td>
                                <td>{payment[type]}</td>
                                <td>{payment[rate]}</td>
                            </tr>
                        );
                    }
                })}
            </tbody>
        </Table>
    )
}
