import React from 'react'
import Table from "react-bootstrap/Table";
import './ActiveMonthlies.scss'
export default function ActiveMonthlies(props) {

  const {data, garage} = props  
  return (
    <div>
        <p>{garage} Active Monthlies: {data.length}</p>
        <Table striped bordered className="monthlies report table-sm">
        <thead>
          <tr className="table-warning">
            <th>#</th>
            <th>Name</th>
            <th>BC</th>
            <th>Start</th>
            <th>End</th>
            <th>In Use</th>
            <th>Sz</th>
          </tr>
        </thead>
        <tbody>
          {(data).map((record, index) => {
            
            return (
              <tr key={index} >
                <td>{record.CustomerNumber}</td>
                <td>{record.CustomerName}</td>
                <td>{record.CarBarCode}</td>
                <td>{new Date(record.ContractStartDate).toLocaleString()}</td>
                <td>{new Date(record.ContractEndDate).toLocaleString()}</td>
                <td>{record.InUse}</td>
                <td>{record.max}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

    </div>
  )
}
