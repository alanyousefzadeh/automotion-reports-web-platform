import React from "react";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import { useParams, Link } from "react-router-dom";
import RateTable from "../../components/RateTable/RateTable";
import OverParkedTable from "../../components/OverParked/OverParkedTable";
import Navigation from '../../components/Navigation/Navigation'
import './AutomatedDailyReport.scss'

function AutomatedDailyReportPage(props) {
  
  const {
    response,
    automatedFailedToLoad,
    automatedErr,
    total,
    formattedDate,
  } = props;

  let transientInTable = new Array(24).fill(0);
  let transientOutTable = new Array(24).fill(0);
  let monthlyInTable = new Array(24).fill(0);
  let monthlyOutTable = new Array(24).fill(0);

  const { garageName } = useParams();
  console.log("db", garageName);

  if (!!automatedFailedToLoad) {
    return (
      <p>
        {automatedErr} <Link to="/login">login</Link>
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
 
    <div className="report">
      {/* <ul>
        <li>AutomatedFilteredReportPage</li>
        <li>tix issued: {ticketsIssued}</li>
        <li>open tix today: {openTixToday}</li>
        <li>starting ticktet: {startTicket}</li>
        <li>ending ticket: {endTicket}</li>
        </ul> */}
      {/* <Button onClick={getData}>Generate Table </Button> */}
      <Navigation/>
      <p className="daily-report__header">{garageName} Daily Report for: Yesterday {formattedDate}, 12:00AM - 11:59PM</p>
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
