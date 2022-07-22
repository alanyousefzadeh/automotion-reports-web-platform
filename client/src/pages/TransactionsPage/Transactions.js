import { useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";

function Transactions(){
    const [inDate, setInDate] = useState(null)
    const [outDate, setOutDate] = useState(null)
    const [response, setResponse] = useState([])
    // const [startTicket, setStartTicket] = useState(null)
    // const [endTicket, setEndTicket] = useState(null)
    // const [ticketsIssued, setTicketsIssued] = useState(null)
    
    let transientInTable = new Array(24).fill(0)
    let transientOutTable = new Array(24).fill(0)
    let monthlyInTable = new Array(24).fill(0)
    let monthlyOutTable = new Array(24).fill(0)
    
    const getData = async () => {

        let data = null
        if(inDate == null || outDate == null){
            alert("in/out dates must be selected")
        }
        if(inDate != null && outDate != null){
            let promise = await axios
                .get("http://localhost:8080/garagedata/transactions", {
                    params: {
                        inDate: `${inDate} 03:00:00`,
                        outDate: `${outDate} 03:00:00`
                    }
                })
            data = promise.data                    
            setResponse(data)
        }
    }
    //         // setTicketsIssued(res.data.length)
    //         // if(res.data.length > 0){
    //         //     setStartTicket(res.data[0].TicketNum)
    //         //     setEndTicket(res.data[res.data.length-1].TicketNum)
    //         // }
    // }
    console.log(response)
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

    console.log(monthlyInTable)
    console.log(monthlyOutTable)
    console.log(transientOutTable)
    console.log(transientInTable)
    


    // let openTixToday = 0
    // response.forEach((ticket) => {
    //     if(ticket.OutDateTime == null){
    //         openTixToday += 1
    //     }
    // })

    return(
        <>
        {/* <ul>
        <li>transactions</li>
        <li>tix issued: {ticketsIssued}</li>
        <li>open tix today: {openTixToday}</li>
        <li>starting ticktet: {startTicket}</li>
        <li>ending ticket: {endTicket}</li>
        </ul> */}

        <DatePicker label={'In-Date'} setDate={setInDate}/>
        <DatePicker label={'Out-Date'} setDate={setOutDate}/>
        <Button onClick={getData}>Generate Table </Button>
        </>
    )
}

export default Transactions