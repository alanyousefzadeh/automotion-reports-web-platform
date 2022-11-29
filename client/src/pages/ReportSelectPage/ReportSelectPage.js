import React from "react";
import ReportCard from "../../components/ReportCard/ReportCard";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./ReportSelectPage.scss";

function ReportSelectPage() {
  let { garageName } = useParams();

  const schemehornReports = ["Daily report", "Filtered Report"]
  const automatedGarageReports = ["Daily Report", "Filtered Report", "Filter By Rate", "Monthlies", "Wait Times Report"]
  const atlanticReports = ["Daily report", "Filtered Report", "Open Tickets Report"]

  return (
    <>
      <Navigation />
      <h4 className="garage__title">{garageName} Garage Reports</h4>
      <div className="cards d-flex justify-content-center">
        {garageName === "Schemehorn" ? 
          <>
            {schemehornReports.map((report, index) => {
              return (
                  <ReportCard
                    key={index}
                    name={garageName}
                    title={report}
                  />
                )
            })}
          </>
        : 
        garageName === "Atlantic Terrace" ? 
          <>
            {atlanticReports.map((report, index)=>{
              return (
                  <ReportCard
                    key={index}
                    name={garageName}
                    title={report}
                  />
                )
            })}
          </>
        :
          <>
          {
            automatedGarageReports.map((report, index)=>{
              return (
                  <ReportCard
                    key={index}
                    name={garageName}
                    title={report}
                  />
                )
          })}
          </>
        }
      </div>
    </>    
  );
}

export default ReportSelectPage;
