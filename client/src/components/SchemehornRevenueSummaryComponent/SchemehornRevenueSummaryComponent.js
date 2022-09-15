import React from "react";
import Table from "react-bootstrap/Table";
import "./SchemehornRevenueSummaryComponent.scss";

function SchemehornRevenueSummaryComponent(props) {
  const { inDate, outDate, data } = props;
  let rate = [];
  let count = [];
  let disc = [];
  let tax1 = [];
  let total = [];

  let totalCount = 0;
  let totalDisc = 0;
  let totalTax1 = 0;
  let finalTotal = 0;

  let rows = null;
  let xmlContent = data;
  let parser = new DOMParser();
  let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
  //console.log(xmlDOM);
  if (data !== null) {
    rows = xmlDOM.querySelectorAll("ResultingValue");
    console.log(rows);
    rows.forEach((row) => {
      rate.push(row.children[2].children[1].children[6].innerHTML);

      count.push(Number(row.children[2].children[2].children[2].innerHTML));

      disc.push(Number(row.children[2].children[4].children[1].innerHTML));

      tax1.push(Number(row.children[2].children[6].children[1].innerHTML));

      total.push(Number(row.children[2].children[3].children[1].innerHTML));
    });

    totalCount = count.reduce((prev, curr) => prev + curr, 0);
    totalDisc = disc.reduce((prev, curr) => prev + curr, 0);
    totalTax1 = tax1.reduce((prev, curr) => prev + curr, 0);
    finalTotal = total.reduce((prev, curr) => prev + curr, 0.0);
  }

  return (
    <div className="report">
      <p className="report">
        Schemehorn Revenue Summary<br></br>
        <b>From:</b>{" "}{inDate}, 12:00AM<br></br> 
        <b>To:</b>{" "}{outDate}, 11:59PM
      </p>
      <Table striped bordered className="table-sm table-font schemehorn report">
        <thead>
          <tr className="table-warning">
            <th>Rate</th>
            <th>Count</th>
            <th>Disc</th>
            <th>Tax1</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rate.map((item, i) => {
            return (
              <tr key={i}>
                <td>{rate[i]}</td>
                <td>{count[i]}</td>
                <td className={disc[i] > 0 ? "disc" : " "}>
                  {disc[i].toFixed(2)}
                </td>
                <td>{tax1[i].toFixed(2)}</td>
                <td>
                  {total[i].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
          <tr className="table-success">
            <td>
              <b>Totals:</b>
            </td>
            <th>{totalCount}</th>
            <th className="disc">${totalDisc.toFixed(2)}</th>
            <th>${totalTax1.toFixed(2)}</th>
            <th>
              $
              {finalTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default SchemehornRevenueSummaryComponent;
