import React from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import './AutomatedDailyHeader.scss'

export default function AutomatedDailyHeader(props) {
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
  const {
    currentMonthliesIn,
    openPrior,
    openTicketsToday,
    ticketStart,
    ticketEnd,
    closedTickets
  } = props;
  return (<>
    <Table striped bordered className="table-sm header-mobile">
      <thead>
        <tr className="table-warning">
          <th>Ticket Start Num</th>
          <th>Ticket End Num</th>
          <th>Tickets Issued</th>
          <th>Open Tickets Today</th>
          <th>Open Prior</th>
          <th>Closed Tickets</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ticketStart}</td>
          <td>{ticketEnd}</td>
          <td>{ticketEnd == '' ? 0 : ticketEnd - ticketStart + 1}</td>
          <td>{openTicketsToday}</td>
          <td>{openPrior}</td>
          <td>{closedTickets}</td>
        </tr>
      </tbody>
    </Table>
    <Table striped bordered className="table-sm header-mobile">
    <thead>
      <tr className="table-warning">
        <th>Total Spaces</th>
        <th>Current T In</th>
        <th>Current M In</th>
        <th>Total Parked</th>
        <th>Free Spaces</th>
        <th>Reserved for Monthlies</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{spaces}</td>
        <td>{openTicketsToday+openPrior}</td>
        <td>{currentMonthliesIn}</td>
        <td>{openTicketsToday+openPrior+currentMonthliesIn}</td>
        <td>{spaces-(openTicketsToday+openPrior+currentMonthliesIn)}</td>
        <td>0</td>
      </tr>
    </tbody>
  </Table></>
  );
}
