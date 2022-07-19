import { useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";

function Transactions(){
    const [inDate, setInDate] = useState(null)
    const [outDate, setOutDate] = useState(null)
    const [response, setResponse] = useState(null)
    const [startTicket, setStartTicket] = useState(null)
    const [endTicket, setEndTicket] = useState(null)
    // useEffect(()=>{
    //     axios.get("http://localhost:8080/garagedata/transactions")
    //     .then((res) =>{
    //         console.log(res.data)
    //     })
    // })
    const getData = () => {
        axios.get("http://localhost:8080/garagedata/transactions", {
            params: {
                inDate: inDate,
                outDate: outDate
            }
        })
        .then((res) =>{
            console.log(res.data)
            setResponse(res.data)
            setStartTicket(res.data[0].TicketNum)
            setEndTicket(res.data[res.data.length-1].TicketNum)
        })

    }

    return(
        <>
        <h1>transactions</h1>
        <DatePicker label={'In-Date'} setDate={setInDate}/>
        <DatePicker label={'Out-Date'} setDate={setOutDate}/>
        <Button onClick={getData}>Generate Table </Button>
        </>
    )
}

export default Transactions