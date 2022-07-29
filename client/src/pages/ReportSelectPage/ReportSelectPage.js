import React from 'react';
import ReportCard from '../../components/ReportCard/ReportCard';
import { useParams } from 'react-router-dom';
import Logout from '../../components/Logout/Logout';

//make API call to get reports for each garage based on the garageName from URL, use sample data for now
const reports = [
        {
          id: 1, 
          title: "Daily Report",

        },
        {
          id: 2, 
          title: "Partial Report",
        },
        {
          id: 3, 
          title: "Filtered Report",
        }
      ]
   
function ReportSelectPage(){
  
  let { garageName } = useParams();
  return (
    <>
    <h1>{garageName}</h1>
    <Logout/>
      <div className="cards d-flex justify-content-center"> 
          {reports.map(report =>(
              <ReportCard key={report.id} id={report.id} name={garageName} title={report.title}/>    
          ))}
      </div>
    </>
  );

}

export default ReportSelectPage;