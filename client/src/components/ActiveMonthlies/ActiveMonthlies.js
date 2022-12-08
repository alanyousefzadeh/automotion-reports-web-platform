import React, {useState} from 'react'
import Table from "react-bootstrap/Table";
import {Link} from 'react-router-dom'
import './ActiveMonthlies.scss'

export default function ActiveMonthlies(props) {

  const [showModal, setShowModal] = useState(false)
  const {data, garage} = props 
  
  const modal = () => {
    setShowModal(true)
  }

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
                <td><Link to={`/reportSelect/${garage}/monthlies/carDetails/${record.CarBarCode}`}>{record.CustomerName}</Link></td>
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
