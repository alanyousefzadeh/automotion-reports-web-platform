import React from "react";
import Table from "react-bootstrap/Table";

export default function TicketRangesComponent(props) {
  const { ticketRanges } = props;

  let start = []
  let end = []
  let leftOver = [];
  let totalLeftOver;
  let issued = [];
  let totalIssued;
  let redeemed = [];
  let totalRedeemed;
  let totalOutStanding;

  let rows = null;
  let xmlContent = ticketRanges;
  let parser = new DOMParser();
  let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
  //console.log(xmlDOM);
  if (ticketRanges !== null) {
    rows = xmlDOM.querySelectorAll("ResultingValue");
    console.log(rows);
    rows.forEach((row) => {
      start.push(Number(row.children[2].children[0].children[6].innerHTML));

      end.push(Number(row.children[2].children[1].children[6].innerHTML));

      leftOver.push(Number(row.children[2].children[2].children[2].innerHTML));

      issued.push(Number(row.children[2].children[3].children[2].innerHTML));

      redeemed.push(Number(row.children[2].children[4].children[2].innerHTML));
    });

    totalLeftOver = leftOver.reduce((prev, curr) => prev + curr, 0);
    totalIssued = issued.reduce((prev, curr) => prev + curr, 0);
    totalRedeemed = redeemed.reduce((prev, curr) => prev + curr, 0);
    totalOutStanding = 0
  }

  return (
    <div className="report">
      <p className="report">Ticket Ranges</p>
      <Table striped bordered className="table-sm table-font schemehorn report">
        <thead>
          <tr className="table-warning">
            <th>Start</th>
            <th>End</th>
            <th>Left Over</th>
            <th>Issued</th>
            <th>Redeemed</th>
            <th>Out - Standing</th>
          </tr>
        </thead>
        <tbody>
          {start.map((item, i) => {
            totalOutStanding += leftOver[i] - redeemed[i] + issued[i]
            return (
              <tr key={i}>
                <td>{start[i]}</td>
                <td>{end[i]}</td>
                <td>{leftOver[i]}</td>
                <td>{issued[i]}</td>
                <td>{redeemed[i]}</td>
                <td>{leftOver[i] - redeemed[i] + issued[i]}</td>
              </tr>
            );
          })}
          <tr className="table-success">
            <td>
              <b>Totals:</b>
            </td>
            <th>{" "}</th>
            <th>{totalLeftOver}</th>
            <th>{totalIssued}</th>
            <th>{totalRedeemed}</th>
            <th>{totalOutStanding}</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
