import React from 'react'
import Table from "react-bootstrap/Table";
import {Link} from 'react-router-dom';

export default function InActiveMonthlies(props) {

  const {data, garage} = props
    
  return (
    <div>
        <p className='monthlies-type-header'>{garage} Inactive Monthlies: {data.length}</p>
        <Table striped bordered className="monthlies report table-sm">
        <thead>
          <tr className="table-warning">
            <th>Num.</th>
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
                <td><Link to={`/reportSelect/${garage}/monthlies/carDetails/${record.CarBarCode}`}>{record.CustomerName}</Link></td>
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
