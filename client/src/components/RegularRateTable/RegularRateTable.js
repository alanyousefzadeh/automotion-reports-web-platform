import React from 'react'
import Table from "react-bootstrap/Table";

export default function RegularRateTable(props) {

  const {data, currRate} = props  
  return (
    <Table striped bordered className="report table-sm">
        <thead>
            <tr className="table-warning">
                <th>Count</th>
                <th>Date</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {data && (data).map((record, index) => {
                return (
                    <tr key={index} >
                        <td>{record.count}</td>
                        <td>{record.date.split('T')[0]}</td>
                        <td>${record.count * currRate}</td>
                    </tr>
                );
            })}
        </tbody>
    </Table>
  )
}
