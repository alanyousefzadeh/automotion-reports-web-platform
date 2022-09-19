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

function ReportSelectPage() {
  let { garageName } = useParams();
  return (
    <>
      <Navigation />
      <h4 className="garage__title">{garageName} Garage Reports</h4>
      <div className="cards d-flex justify-content-center">
        {garageName === "Schemehorn" ? (
          <>
          <ReportCard
            key={1}
            name={garageName}
            title={"Daily Report"}
          />
          <ReportCard
            key={3}
            name={garageName}
            title={"Filtered Report"}
          /></>
        ) : (
          reports.map((report) => (
            <ReportCard
              key={report.id}
              name={garageName}
              title={report.title}
            />
          ))
        )}
        {garageName === "Atlantic Terrace" ? (
          <ReportCard title="Open Tickets Report" />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ReportSelectPage;
