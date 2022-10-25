import React from 'react'
import Table from "react-bootstrap/Table";

export default function NoChargeTable(props) {
  
  const {data} = props  
    
  return (
    <Table striped bordered className="report table-sm">
        <thead>
            <tr className="table-warning">
                <th>In</th>
                <th>Out</th>
                <th>Charge</th>
                <th>Ticket</th>
            </tr>
        </thead>
        <tbody>
            {data && (data).map((record, index) => {
                return (
                    <tr key={index} >
                        <td>{new Date(record.InDateTime).toLocaleString()}</td>
                        <td>{new Date(record.OutDateTime).toLocaleString()}</td>
                        <td>${record.Total}</td>
                        <td>{record.TicketNum}</td>
                    </tr>
                );
            })}
        </tbody>
    </Table>
  )
}
