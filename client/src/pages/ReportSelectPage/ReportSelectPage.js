import React, { useState, useEffect } from "react";
import ReportCard from "../../components/ReportCard/ReportCard";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./ReportSelectPage.scss";
import { isUserTech } from '../../firebase';
import { getAuth } from "firebase/auth";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";

function ReportSelectPage() {
  let { garageName } = useParams();

  const schemehornReports = ["Daily report", "Filtered Report"]
  const automatedGarageReports = ["Daily Report", "Filtered Report", "Filter By Rate", "Monthlies", "Revenue for Monthlies", "Wait Times Report"]
  const atlanticReports = ["Daily report", "Filtered Report", "Open Tickets Report"]

  const [isLoading, setIsLoading] = useState(true)
  const [isTech, setIsTech] = useState(null)

  const auth = getAuth()
  async function checkUser(){
    
    await isUserTech(auth.currentUser.email, setIsTech)
    
    setTimeout(() => 
      setIsLoading(false)
    , "500")
  }
  useEffect(() => {
 
    checkUser()
  }, [])

  return (
    <>
      <Navigation />
      {isLoading ? <LoadingSpinner />
        :
        <>
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
                  {atlanticReports.map((report, index) => {
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
                    automatedGarageReports.map((report, index) => {
                      return (
                        <div key={index} className={isTech && (report === "Daily Report" || report === "Filtered Report" || report === "Filter By Rate") ? "hidden" : ""}>
                        <ReportCard
                          
                          name={garageName}
                          title={report}
                        />
                        </div>
                      )
                    })}
                </>
            }
          </div>
        </>
      }
    </>
  );
}

export default ReportSelectPage;
