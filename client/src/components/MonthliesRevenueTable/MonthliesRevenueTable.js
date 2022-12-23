import React from 'react'
import Table from "react-bootstrap/Table";

export default function MonthliesRevenueTable(props) {

    const { payments, fobStatusIndex, fob, name, type, rate } = props

    console.log(payments[0])
    let sum = (payments[0][30])
    let formattedSum = parseFloat(sum.replace(/,/g, ''))

    return (
        <Table striped bordered className="table-sm report">
            <thead>
                <tr className="table-success">
                    <th></th>
                    <th></th>
                    <th>Total:</th>
                    <th>${formattedSum.toLocaleString()}</th>
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
                    if((payment[fobStatusIndex] === "Active") || payment[fobStatusIndex]==='Last Month') {
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
