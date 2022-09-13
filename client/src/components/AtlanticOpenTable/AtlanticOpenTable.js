import React from "react";
import Table from "react-bootstrap/Table";
import EmailFormDisplayToggler from "../EmailFormDisplayToggler";
import './AtlanticOpenTable.scss';

export default function AtlanticOpenTable(props) {
  const { data } = props;
  console.log('unsorted', data)
  data.sort(function(a, b) { return b.ticket_number - a.ticket_number  })
  
  return (
    <div className="report">
      <p className="atlantic_open_header">Atlantic Terrace Currently Open Tickets</p>
      <EmailFormDisplayToggler/>
      <Table striped bordered className="report table-sm">
        <thead>
          <tr className="table-warning">
            <th>Ticket Num/FOB</th>
            <th>From Date</th>
          </tr>
        </thead>
        <tbody>
          {(data).map((record) => {
            //replace(/\s/, 'T')
            //console.log(record.from_date.replace(/-/g, "/").replace(/\s/, 'T'))
            return (
              <tr key={record.gn_id} >
                <td>{record.ticket_number}</td>
                <td>{new Date(record.from_date.replace(/\s/, 'T')).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
        <thead>
          <tr className="table-success">
            <th>Total: {data.length} Open</th>
          </tr>
        </thead>
      </Table>
    </div>
  );
}
