import React from 'react'
import Table from "react-bootstrap/Table";

export default function AllRateTable(props) {

  const {data} = props  
  return (
    <Table striped bordered className="report table-sm">
        <thead>
            <tr className="table-warning">
                <th>In</th>
                <th>Out</th>
                <th>Day</th>
                <th>Date</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {data && (data).map((record, index) => {
                return (
                    <tr key={index} >
                        <td>{record.carsIn}</td>
                        <td>{record.outCars}</td>
                        <td>{record.dayofweek}</td>
                        <td>{record.outdate.split('T')[0]}</td>
                        <td>${record.total.toLocaleString()}</td>
                    </tr>
                );
            })}
        </tbody>
    </Table>
  )
}
