import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import DatePicker from '../../components/DatePicker/DatePicker'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from 'axios'
import RatePicker from '../../components/RatePicker/RatePicker';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
import Navigation from '../../components/Navigation/Navigation';
import NonRegularChargeTable from '../../components/NonRegularChargeTable/NonRegularChargeTable';
import RegularRateTable from '../../components/RegularRateTable/RegularRateTable';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import {base64Email} from "../../components/EmailSender/EmailPdf"
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
            const token = sessionStorage.getItem('token');
            setLoading(true)
            const promise = await axios
                .get(process.env.REACT_APP_FILTER_BY_RATE_URL, {
                    params: {
                        rate, startDate, endDate, garageName
                    },
                    headers: {
                        authorization: 'Bearer ' + token
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
                setData={setData}
            />
            <Button onClick={clickHandler} className="button">
                Submit
            </Button>
            {loading ? <LoadingSpinner /> :
                <>
                {rate === "NC/0" || rate === "Other" ?
                    <NonRegularChargeTable
                    data={data}/> :
                    
                    <RegularRateTable
                    data={data}
                    currRate={currRate}/>
                }
                </>
            }
        </div>
    )
}
