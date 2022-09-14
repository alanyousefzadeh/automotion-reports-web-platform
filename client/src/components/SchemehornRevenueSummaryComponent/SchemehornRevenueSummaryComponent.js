import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./SchemehornRevenueSummaryComponent.scss";
import Navigation from "../Navigation/Navigation";
import LoadingSpinner from "../LoadingWheel/LoadingWheel";
import DatePicker from "../DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import SchemehornDiscountComponent from "../SchemehornDiscountComponent/SchemehornDiscountComponent";

function SchemehornFilteredPage() {
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [data, setData] = useState(null);
  const [discounts, setDiscounts] = useState(null)
  const [loading, setLoading] = useState(false)

  const getSchemehornData = async () => {
    let response = await axios.post("http://localhost:8080/schemehorn", {
      inDate,
      outDate,
      inTime: "12:00 AM",
      outTime: "11:59:59 PM",
    });
    setData(response.data);
    let discountResponse = await axios.post('http://localhost:8080/schemehorn/discounts', {
      inDate,
      outDate,
      inTime: "12:00 AM",
      outTime: "11:59:59 PM",
    })
    setDiscounts(discountResponse.data)
    setLoading(false)
  };

  const getData = () => {
    if(inDate !== null && outDate !== null) {
      getSchemehornData();  
      setLoading(true)
    }else{
      alert("please provide in and out dates")
    }
  };

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
  totalDisc = disc.reduce((prev, curr) => prev + curr, 0)
  totalTax1 = tax1.reduce((prev, curr) => prev + curr, 0)
  finalTotal = total.reduce((prev, curr) => prev + curr, 0.00)
  }

  return (
    
    
    <div className="report">
      <Navigation/>
      <DatePicker
      label={'In-Date'}
      setDate={setInDate}
      />
      <DatePicker
      label={'Out-Date'}
      setDate={setOutDate}
      />
      <Button className="button" onClick={getData}>Generate Report</Button>
      {loading ? <LoadingSpinner/> :
      <>
      <p className="report">Schemehorn Revenue Summary <b>From:</b> {inDate}, 12AM <b>To:</b> {outDate}, 11:59PM</p>
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
                <td>{total[i].toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
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
            <th>${finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</th>
          </tr>
        </tbody>
      </Table>
      <SchemehornDiscountComponent
      discounts={discounts}/>
      </>
      }
    </div>
  );
}

export default SchemehornFilteredPage;
