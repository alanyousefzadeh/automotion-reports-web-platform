import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import DatePicker from '../../components/DatePicker/DatePicker'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from 'axios'
import RatePicker from '../../components/RatePicker/RatePicker';


export default function AutomatedFilteredByRate() {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [rate, setRate] = useState(null)
    const [data, setData] = useState(null)

    const { garageName } = useParams()
    console.log(garageName)

    const clickHandler = async () => {
        if (rate && startDate && endDate) {
            const promise = await axios
                .get('http://localhost:8080/filterByRate', {
                    params: {
                        rate, startDate, endDate, garageName
                    }
                })
            setData(promise.data)
        } else {
            alert("please select a rate and start/end date")
        }
    }
    return (
        <div className='report'>
            <DatePicker label={'Starting Date'} setDate={setStartDate} />
            <DatePicker label={'Ending Date'} setDate={setEndDate} />
            <RatePicker
                garage={garageName}
                setRate={setRate}
            />
            <Button onClick={clickHandler} className="button">
                Submit
            </Button>
            <Table striped bordered className="report table-sm">
                <thead>
                    <tr className="table-warning">
                        <th>Count</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data && (data).map((record, index) => {

                        return (
                            <tr key={index} >
                                <td>{record.count}</td>
                                <td>{record.date.split('T')[0]}</td>
                                <td>${record.count * rate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}
