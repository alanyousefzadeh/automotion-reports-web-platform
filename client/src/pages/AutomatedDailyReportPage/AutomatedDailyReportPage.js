import React, { useState, useEffect } from "react";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import { useParams, Link } from "react-router-dom";
import RateTable from "../../components/RateTable/RateTable";
import OverParkedTable from "../../components/OverParked/OverParkedTable";
import Navigation from "../../components/Navigation/Navigation";
import "./AutomatedDailyReport.scss";
import AutomatedDailyHeader from "../../components/AutomatedDailyHeader/AutomatedDailyHeader";
import EmailFormDisplayToggler from "../../components/EmailFormDisplayToggler";
import { automatedGarageAPI, formatDate } from "./AutomatedDailyReportHelpers";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";

function AutomatedDailyReportPage() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [err, setErr] = useState(null);
  const [total, setTotal] = useState(0);

  let transientInTable = new Array(24).fill(0);
  let transientOutTable = new Array(24).fill(0);
  let monthlyInTable = new Array(24).fill(0);
  let monthlyOutTable = new Array(24).fill(0);

  const { garageName } = useParams();
  console.log("db", garageName);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = formatDate(yesterday);

  useEffect(() => {
    automatedGarageAPI(
      garageName,
      setFailedToLoad,
      setErr,
      setResponse,
      setTotal,
      formattedDate,
      setIsLoading
    );
  }, []);

  if (!!failedToLoad) {
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

  return (
    isLoading ? <LoadingSpinner/> :
    <div className="report">
      <Navigation />
      <p className="daily-report__header">
        {garageName} Daily Report for: Yesterday {formattedDate}, 12:00AM -
        11:59PM
      </p>
      <EmailFormDisplayToggler />
      <AutomatedDailyHeader
        ticketStart={
          response.ticketStart.length > 0
            ? response.ticketStart[0].TicketNum
            : ""
        }
        ticketEnd={
          response.ticketEnd.length > 0 ? response.ticketEnd[0].TicketNum : ""
        }
        currentMonthliesIn={response.currentMonthliesIn[0].monthliesIn}
        openPrior={response.openPrior[0].openPrior}
        openTicketsToday={response.openTicketsToday[0].openToday}
        closedTickets={response.closedTickets[0].closedTickets}
      />
      <TransactionTable
        monthlyInTable={monthlyInTable}
        monthlyOutTable={monthlyOutTable}
        transientInTable={transientInTable}
        transientOutTable={transientOutTable}
        total={total}
      />
      {response ? (
        <>
          <RateTable garageName={garageName} rateData={response.rateTable} />
          <OverParkedTable overParkedData={response.overParked} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AutomatedDailyReportPage;
