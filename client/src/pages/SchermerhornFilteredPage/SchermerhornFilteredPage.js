import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./SchermerhornFilteredPage.scss";

function SchermerhornFilteredPage() {
  const [inDate, setInDate] = useState("2022-09-01");
  const [outDate, setOutDate] = useState("2022-09-01");
  const [data, setData] = useState(null);

  const getSchermerhornData = async () => {
    let response = await axios.post("http://localhost:8080/schermerhorn", {
      inDate,
      outDate,
      inTime: "12:00 AM",
      outTime: "11:59:59 PM",
    });
    setData(response.data);
  };

  useEffect(() => {
    getSchermerhornData();
  }, []);
  let location = [];
  let rate = [];
  let count = [];
  //parking
  let disc = [];
  let tax1 = [];
  let tax4 = [];
  let tip = [];
  let convFee = [];
  let total = [];

  let totalCount = 0;
  let totalDisc = 0;
  let totalTax1 = 0;
  let finalTotal = 0;

  let rows = null;
  let xmlContent = data;
  let parser = new DOMParser();
  let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
  console.log(xmlDOM);
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
  totalDisc = disc.reduce((prev, curr) => prev + curr, 0)
  totalTax1 = tax1.reduce((prev, curr) => prev + curr, 0)
  finalTotal = total.reduce((prev, curr) => prev + curr, 0.00)
  }

  return (
    
    <>
    {console.log(rate, tax1, total)}
      <Table striped bordered className="table-sm table-font schermerhorn">
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
                <td>{total[i].toFixed(2)}</td>
              </tr>
            );
          })}
          <tr className="table-success">
            <td>
              <b>Totals:</b>
            </td>
            <td>{totalCount}</td>
            <td className="disc">${totalDisc.toFixed(2)}</td>
            <td>${totalTax1.toFixed(2)}</td>
            <td>${finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default SchermerhornFilteredPage;
