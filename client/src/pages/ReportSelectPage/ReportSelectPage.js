import React from "react";
import ReportCard from "../../components/ReportCard/ReportCard";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./ReportSelectPage.scss";

//make API call to get reports for each garage based on the garageName from URL, use sample data for now
const reports = [
  {
    id: 1,
    title: "Daily Report",
  },
  {
    id: 2,
    title: "Filtered Report",
  },
  {
    id: 3,
    title: "Wait Times Report",
  },
];

const schemehornReports = ["Daily report", "Filtered Report"]
const automatedGarageReports = ["Daily Report", "Filtered Report", "Filter By Rate", "Monthlies", "Wait Times Report"]
const atlanticReports = ["Daily report", "Filtered Report", "Open Tickets Report"]

function ReportSelectPage() {
  let { garageName } = useParams();

  return (
    <>
      <Navigation />
      <h4 className="garage__title">{garageName} Garage Reports</h4>
      <div className="cards d-flex justify-content-center">
        {garageName === "Schemehorn" ? 
          <>
            {schemehornReports.map((report, index) => {
              return (
                <div key={index}>
                  <ReportCard
                    name={garageName}
                    title={report}
                  />
                </div>)
            })}
          </>
        : 
        garageName === "Atlantic Terrace" ? 
          <>
            {atlanticReports.map((report, index)=>{
              return (
                <div key={index}>
                  <ReportCard
                    name={garageName}
                    title={report}
                  />
                </div>)
            })}
          </>
        :
          <>
          {
            automatedGarageReports.map((report, index)=>{
              return (
                <div key={index}>
                  <ReportCard
                    name={garageName}
                    title={report}
                  />
                </div>)
            })
          }
          </>
        }
      </div>
    </>    
  );
}

export default ReportSelectPage;
