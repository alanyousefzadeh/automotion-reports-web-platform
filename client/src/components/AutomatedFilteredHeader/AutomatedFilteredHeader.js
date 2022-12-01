import React from 'react'
import {useParams} from 'react-router-dom';
import Table from "react-bootstrap/Table";

export default function (props) {

  const {avgTicketPrice, transientInTotal, monthlyInTotal, totalCarsParked, totalDays } = props
  
  const {garageName} = useParams()

  let spaces;
    switch(garageName){
        case 'Baxter':
            spaces = 67
            break;
        case 'VanVorst':
            spaces = 254
            break;
        case 'Waverly':
            spaces = 32
        case '24th Street':
            spaces = 61
    }

  return (
    <div>
    <Table striped bordered className="table-sm header-mobile">
      <thead>
        <tr className="table-warning">
          <th>Total Spaces</th>
          <th>Total T. Parked</th>
          <th>Total M. Parked</th>
          <th>Total Parked</th>
          <th>Garage Utilization</th>
          <th>Avg. Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{spaces}</td>
          <td>{transientInTotal}</td>
          <td>{monthlyInTotal}</td>
          <td>{totalCarsParked}</td>
          <td>{((((transientInTotal + monthlyInTotal)/spaces)/totalDays)*100).toFixed(2)}%</td>
          <td>{avgTicketPrice}</td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
