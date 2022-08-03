import { useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import ReactDOMServer from "react-dom/server";
import { useParams, Link } from "react-router-dom";
import RateTable from '../../components/RateTable/RateTable';
import OverParkedTable from "../../components/OverParked/OverParkedTable";
import Logout from "../../components/Logout/Logout";

function AutomatedFilteredReportPage(){
    const [inDate, setInDate] = useState(null)
    const [outDate, setOutDate] = useState(null)
    const [response, setResponse] = useState(null)
    const [failedtoLoad, setFailedtoLoad ] = useState(false)
    const [err, setErr] = useState(null)
    // const [rateData, setRateData] = useState(null);

    const [total, setTotal] = useState(0)
    // const [startTicket, setStartTicket] = useState(null)
    // const [endTicket, setEndTicket] = useState(null)
    // const [ticketsIssued, setTicketsIssued] = useState(null)
    
    let transientInTable = new Array(24).fill(0)
    let transientOutTable = new Array(24).fill(0)
    let monthlyInTable = new Array(24).fill(0)
    let monthlyOutTable = new Array(24).fill(0)
    
    const {garageName} = useParams()
    console.log('db',garageName)

  
   
    const getData = async () => {
      const token = sessionStorage.getItem('token');
      let data = null;
      if (inDate == null || outDate == null) {
        alert("in/out dates must be selected");
      }
      if (inDate != null && outDate != null) {
        try {
          const promise = await axios.get(
            "http://localhost:8080/garagedata/transactions",
            {
              params: {
                inDate: inDate,
                outDate: outDate,
                garage: garageName,
              },
              headers: {
                authorization: 'Bearer ' + token
            }
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
      }
    };

    if (!!failedtoLoad){
        return (
            <p>{err} <Link to='/login'>login</Link></p>
        )
    }

    if(response != null){
        //console.log(response)
        response.tInDateTimes.forEach((hour) => {
            transientInTable[hour.hourofday] = hour.countperhour
        });
    
        response.tOutDateTimes.forEach((hour) => {
            transientOutTable[hour.hourofday] = hour.countperhour
        });
    
        response.mInDateTimes.forEach((hour) => {
            monthlyInTable[hour.hourofday] = hour.countperhour
        });
    
        response.mOutDateTimes.forEach((hour) => {
            monthlyOutTable[hour.hourofday] = hour.countperhour
        });
    }
    


    // let openTixToday = 0
    // response.forEach((ticket) => {
    //     if(ticket.OutDateTime == null){
    //         openTixToday += 1
    //     }
    // })
    return(
        
        <div className="report">
        {/* <ul>
        <li>AutomatedFilteredReportPage</li>
        <li>tix issued: {ticketsIssued}</li>
        <li>open tix today: {openTixToday}</li>
        <li>starting ticktet: {startTicket}</li>
        <li>ending ticket: {endTicket}</li>
        </ul> */}
    
        <DatePicker label={'In-Date - 12:00AM'} setDate={setInDate}/>
        <DatePicker label={'Out-Date - 11:59PM'} setDate={setOutDate}/>
        <Button onClick={getData}>Generate Table </Button>
        <TransactionTable 
            monthlyInTable={monthlyInTable}
            monthlyOutTable={monthlyOutTable}
            transientInTable={transientInTable}
            transientOutTable={transientOutTable}
            total={total}
        />
        {response ? 
        <>
         <RateTable
            // inDate={inDate}
            // outDate={outDate}
            garageName={garageName}
            rateData={response.rateTable}
         />
         <OverParkedTable
            overParkedData={response.overParked}
         />
         </>
         : ''
        }
        </div>
    
    )
}
// const html = ReactDOMServer.renderToStaticMarkup(<AutomatedFilteredReportPage/>);
// console.log(html.toString());
export default AutomatedFilteredReportPage