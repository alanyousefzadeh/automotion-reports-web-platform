import React from 'react'
import Table from "react-bootstrap/Table";

export default function InUseMonthlies(props) {

  const {data, garage} = props  
  return (
    <div>
        <p>{garage} In Use Monthlies: {data.length}</p>
        <Table striped bordered className="monthlies report table-sm">
        <thead>
          <tr className="table-warning">
            <th>#</th>
            <th>Name</th>
            <th>BC</th>
            <th>Start</th>
            <th>End</th>
            <th>In Use</th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  )
}
