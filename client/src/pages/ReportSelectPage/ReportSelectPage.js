import React from 'react';
import ReportCard from '../../components/ReportCard/ReportCard';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import './ReportSelectPage.scss';

//make API call to get reports for each garage based on the garageName from URL, use sample data for now
const reports = [
        {
          id: 1, 
          title: "Daily Report",

        },
        {
          id: 2, 
          title: "Wait Times Report",
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
    <Navigation/>
    <h4 className='garage__title'>{garageName} Garage Reports</h4>
      <div className="cards d-flex justify-content-center"> 
          {reports.map(report =>(
              <ReportCard key={report.id} id={report.id} name={garageName} title={report.title}/>    
          ))}
      </div>
    </>
  );

}

export default ReportSelectPage;