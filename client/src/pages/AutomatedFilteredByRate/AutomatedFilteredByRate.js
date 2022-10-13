import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import DatePicker from '../../components/DatePicker/DatePicker'
import Button from "react-bootstrap/Button";
import axios from 'axios'


export default function AutomatedFilteredByRate() {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [rate, setRate] = useState(null)

    const { garageName } = useParams()
    console.log(garageName)
    const clickHandler = () => {
        axios
            .get('http://localhost:8080/filterByRate', {
                params: {
                    rate, startDate, endDate, garageName
                }
            })
    }
    return (
        <div className='report'>
            <DatePicker label={'Starting Date'} setDate={setStartDate} />
            <DatePicker label={'Ending Date'} setDate={setEndDate} />
            <select onChange={(e) => setRate(e.target.value)}>
                <option value="25">Early Bird - $25</option>
                <option value="15">Up to 1/2 Hr - $15</option>
                <option value="25">Up to 1 - $25</option>
                <option value="32">Up to 2 - $32</option>
                <option value="42">Up to 3 - $42</option>
                <option value="46">Up to 12 - $46</option>
                <option value="45">Up to 24 - $55</option>
                {/* <option value="">Other</option> */}
            </select>
            <Button onClick={clickHandler} className="button">
            </Button>
        </div>
    )
}
