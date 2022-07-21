import { useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";

function Transactions(){
    const [inDate, setInDate] = useState(null)
    const [outDate, setOutDate] = useState(null)
    const [response, setResponse] = useState([])
    const [startTicket, setStartTicket] = useState(null)
    const [endTicket, setEndTicket] = useState(null)
    const [ticketsIssued, setTicketsIssued] = useState(null)
    
    let table = {}
    //make table
    for(let i = 0; i< 24; i++){
        table[i] = {
            transientIn: 0,
            transientOut: 0,
            monthlyIn: 0,
            monthlyOut: 0,
            total: 0
        }
    }
    //fill table
    if(response.length > 0){
        response.forEach((transaction) =>{
            //check time
            //check type
            //     
        })
    }

    
    
    const getData = () => {
        // console.log(table)
        if(inDate == null || outDate == null){
            alert("in/out dates must be selected")
        }
        if(inDate != null && outDate != null){
            axios.get("http://localhost:8080/garagedata/transactions", {
            params: {
                inDate: `${inDate} 03:00:00`,
                outDate: `${outDate} 03:00:00`
            }
            })
            .then((res) =>{
                console.log(res.data)
            // setResponse(res.data)
            // setTicketsIssued(res.data.length)
            // if(res.data.length > 0){
            //     setStartTicket(res.data[0].TicketNum)
            //     setEndTicket(res.data[res.data.length-1].TicketNum)
            // }
            })
        }
    }

    let openTixToday = 0
    response.forEach((ticket) => {
        if(ticket.OutDateTime == null){
            openTixToday += 1
        }
    })

    return(
        <>
        <ul>
        <li>transactions</li>
        <li>tix issued: {ticketsIssued}</li>
        <li>open tix today: {openTixToday}</li>
        <li>starting ticktet: {startTicket}</li>
        <li>ending ticket: {endTicket}</li>
        </ul>

        <DatePicker label={'In-Date'} setDate={setInDate}/>
        <DatePicker label={'Out-Date'} setDate={setOutDate}/>
        <Button onClick={getData}>Generate Table </Button>
        </>
    )
}

export default Transactions