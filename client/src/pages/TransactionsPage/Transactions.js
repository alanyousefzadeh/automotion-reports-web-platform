import { useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";

function Transactions(){
    const [inDate, setInDate] = useState(null)
    const [outDate, setOutDate] = useState(null)
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