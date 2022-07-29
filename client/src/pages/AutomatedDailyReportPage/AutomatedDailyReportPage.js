import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import ReactDOMServer from "react-dom/server";
import { useParams, Link } from "react-router-dom";
import RateTable from "../../components/RateTable/RateTable";
import OverParkedTable from "../../components/OverParked/OverParkedTable";
import {padTo2Digits, formatDate} from './helpers';

function AutomatedDailyReportPage() {
  const [response, setResponse] = useState(null);
  const [failedtoLoad, setFailedtoLoad] = useState(false);
  const [err, setErr] = useState(null);
  // const [rateData, setRateData] = useState(null);

  const [total, setTotal] = useState(0);
  

  let transientInTable = new Array(24).fill(0);
  let transientOutTable = new Array(24).fill(0);
  let monthlyInTable = new Array(24).fill(0);
  let monthlyOutTable = new Array(24).fill(0);

  const { garageName } = useParams();
  console.log("db", garageName);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1)
  const formattedDate = formatDate(yesterday)

  const getData = async() => {
    console.log(formattedDate)
    
    const token = sessionStorage.getItem("token");
    let data = null;

    try { 
      const promise = await axios.get(
        "http://localhost:8080/garagedata/transactions",
        {
          params: {
            inDate: formattedDate,
            outDate: formattedDate,
            garage: garageName,
          },
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      data = promise.data;
      console.log(data);
      setResponse(data);
      if (data.total[0].total != null) {
        setTotal(data.total[0].total);
      }
    } catch (err) {
      setFailedtoLoad(true);
      setErr(err.response.data);
    }
  };

  if (!!failedtoLoad) {
    return (
      <p>
        {err} <Link to="/login">login</Link>
      </p>
    );
  }

  if (response != null) {
    //console.log(response)
    response.tInDateTimes.forEach((hour) => {
      transientInTable[hour.hourofday] = hour.countperhour;
    });

    response.tOutDateTimes.forEach((hour) => {
      transientOutTable[hour.hourofday] = hour.countperhour;
    });

    response.mInDateTimes.forEach((hour) => {
      monthlyInTable[hour.hourofday] = hour.countperhour;
    });

    response.mOutDateTimes.forEach((hour) => {
      monthlyOutTable[hour.hourofday] = hour.countperhour;
    });
  }

  // let openTixToday = 0
  // response.forEach((ticket) => {
  //     if(ticket.OutDateTime == null){
  //         openTixToday += 1
  //     }
  // })
  return (
    // <h1>Automated garage daily reports coming soon...</h1>
    <div className="report">
      {/* <ul>
        <li>AutomatedFilteredReportPage</li>
        <li>tix issued: {ticketsIssued}</li>
        <li>open tix today: {openTixToday}</li>
        <li>starting ticktet: {startTicket}</li>
        <li>ending ticket: {endTicket}</li>
        </ul> */}
    <Button onClick={getData}>Generate Table </Button>
       <p>Daily report for: yesterday {formattedDate} 12:00AM - 11:59 PM</p>
      <TransactionTable
        monthlyInTable={monthlyInTable}
        monthlyOutTable={monthlyOutTable}
        transientInTable={transientInTable}
        transientOutTable={transientOutTable}
        total={total}
      />
      {response ? (
        <>
          <RateTable
            // inDate={inDate}
            // outDate={outDate}
            garageName={garageName}
            rateData={response.rateTable}
          />
          <OverParkedTable overParkedData={response.overParked} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AutomatedDailyReportPage;
