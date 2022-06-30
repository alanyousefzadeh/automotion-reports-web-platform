import React, { useState} from 'react';
import axios from 'axios';
import Garage from '../../components/GarageCard/GarageCard';
import ReportCard from '../../components/ReportCard/ReportCard';

//make API call to get reports for each garage based on the garageId from URL, use sample data for now
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
    // const [garages, setGarages] = useState([]);
    return (

        <div className="cards d-flex justify-content-center"> 
            {reports.map(report =>(
                <ReportCard key={report.id} id={report.id} title={report.title}/>    
            ))}
        </div>
    );

}

export default ReportSelectPage;