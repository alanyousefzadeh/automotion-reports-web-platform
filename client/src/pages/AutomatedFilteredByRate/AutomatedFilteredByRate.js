import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import DatePicker from '../../components/DatePicker/DatePicker'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from 'axios'
import RatePicker from '../../components/RatePicker/RatePicker';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
import Navigation from '../../components/Navigation/Navigation';

export default function AutomatedFilteredByRate() {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [loading, setLoading] = useState(false)

    //rate = the rate that was selected, but before the submit button was clicked
    const [rate, setRate] = useState(null)

    //currRate = the rate the table is showing (after the submit button was clicked)
    const [currRate, setCurrRate] = useState(null)
    const [data, setData] = useState(null)

    const { garageName } = useParams()
    console.log(garageName)

    const clickHandler = async () => {
        if (rate && startDate && endDate) {
            setLoading(true)
            const promise = await axios
                .get("http://localhost:8080/filterByRate", {
                    params: {
                        rate, startDate, endDate, garageName
                    }
                })
            setCurrRate(rate)
            setData(promise.data)
            setLoading(false)
        } else {
            alert("please select a rate and start/end date")
        }
    }
    return (
        <div className='report'>
            <Navigation />
            <DatePicker label={'Starting Date'} setDate={setStartDate} />
            <DatePicker label={'Ending Date'} setDate={setEndDate} />
            <RatePicker
                garage={garageName}
                setRate={setRate}
            />
            <Button onClick={clickHandler} className="button">
                Submit
            </Button>
            {loading ? <LoadingSpinner /> :
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
                                    <td>${record.count * currRate}</td>
                                </tr>

                            );
                        })}
                    </tbody>
                </Table>
            }
        </div>
    )
}
