import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
// import "./SchemehornRevenueSummaryComponent.scss";
import Navigation from "../Navigation/Navigation";
import LoadingSpinner from "../LoadingWheel/LoadingWheel";
import DatePicker from "../DatePicker/DatePicker";
import { Button } from "react-bootstrap";

function SchemehornDiscountComponent(props) {

    const {discounts} = props

  let discountDesc = [];
  let discountCount = [];
  let discountAmount= [];

  let totalDisc = 0;
  let totalDiscAmount = 0;

  let rows = null;
  let xmlContent = discounts;
  let parser = new DOMParser();
  let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
  //console.log(xmlDOM);
  if (discounts !== null) {
    rows = xmlDOM.querySelectorAll("ResultingValue");
    rows.forEach((row) => {
      
      discountDesc.push(row.children[2].children[0].children[6].innerHTML);

      discountCount.push(Number(row.children[2].children[1].children[2].innerHTML));

      discountAmount.push(Number(row.children[2].children[3].children[1].innerHTML));
    });
    
  totalDisc = discountCount.reduce((prev, curr) => prev + curr, 0);
  totalDiscAmount = discountAmount.reduce((prev, curr) => prev + curr, 0)
  
  }

  return (
    
    
    <div className="report">
    
      <>
      <p className="report">Schemehorn Discounts </p>
      <Table striped bordered className="table-sm table-font schemehorn report">
        <thead>
          <tr className="table-warning">
            <th>Discount Type</th>
            <th>Count</th>
            <th>Discounts</th>
          </tr>
        </thead>
        <tbody>
          {discountDesc.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item}</td>
                <td>{discountCount[i]}</td>
                <td>
                  {discountAmount[i]}
                </td>
              </tr>
            );
          })}
          <tr className="table-success">
            <td>
              <b>Totals:</b>
            </td>
            <th>{totalDisc}</th>
            <th className="disc">{totalDiscAmount}</th>
          </tr>
        </tbody>
      </Table>
      </>
    </div>
  );
}

export default SchemehornDiscountComponent;
