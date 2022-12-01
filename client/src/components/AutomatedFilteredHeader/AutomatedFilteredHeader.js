import React from 'react'
import Table from "react-bootstrap/Table";

export default function (props) {

  const {transientInTotal, monthlyInTotal, totalCarsParked } = props

  return (
    <div>
    <Table striped bordered className="table-sm header-mobile">
      <thead>
        <tr className="table-warning">
          <th>Total Spaces</th>
          <th>Total Transients Parked</th>
          <th>Total Monthlies Parked</th>
          <th>Total Parked</th>
          <th>Garage Utilization</th>
          <th>Avg. Ticket Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>{transientInTotal}</td>
          <td>{monthlyInTotal}</td>
          <td>{totalCarsParked}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
