import { useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import ReactDOMServer from "react-dom/server";
import { useParams } from "react-router-dom";
import RateTable from '../../components/RateTable/RateTable';

function Transactions(){
    const [inDate, setInDate] = useState(null)
    const [outDate, setOutDate] = useState(null)
    const [response, setResponse] = useState(null)
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

        let data = null
        if(inDate == null || outDate == null){
            alert("in/out dates must be selected")
        }
        if(inDate != null && outDate != null){
            const promise = await axios
                .get("http://localhost:8080/garagedata/transactions", {
                    params: {
                        inDate: inDate,
                        outDate: outDate,
                        garage : garageName
                    }
                })
            data = promise.data
            console.log(data)                    
            setResponse(data)
            if(data.total[0].total != null){
                setTotal(data.total[0].total)
            }

        }
    };
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
        <li>transactions</li>
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
         <RateTable
            // inDate={inDate}
            // outDate={outDate}
            garageName={garageName}
            rateData={response.rateTable}
         />: ''
        }
        </div>
    
    )
}
const html = ReactDOMServer.renderToStaticMarkup(<Transactions/>);
console.log(html.toString());
export default Transactions