import './AutomatedFilteredByRate.scss'
import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import DatePicker from '../../components/DatePicker/DatePicker'
import Button from "react-bootstrap/Button";
import axios from 'axios'
import RatePicker from '../../components/RatePicker/RatePicker';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
import Navigation from '../../components/Navigation/Navigation';
import NonRegularChargeTable from '../../components/NonRegularChargeTable/NonRegularChargeTable';
import AllRateTable from '../../components/AllRateTable/AllRateTable';
import RegularRateTable from '../../components/RegularRateTable/RegularRateTable';
import EmailFormDisplayToggler from "../../components/EmailFormToggler/EmailFormDisplayToggler";
import {pdfExport} from "../../components/EmailSender/EmailPdf";
import {PDFExport} from "@progress/kendo-react-pdf";

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

    const container = React.useRef(null);
    const clickHandler = async () => {
        if (rate && startDate && endDate) {
            const token = sessionStorage.getItem('token');
            setLoading(true)
            const promise = await axios
                .get(
                    process.env.REACT_APP_FILTER_BY_RATE_URL, 
                    {
                    params: {
                        rate, startDate, endDate, garageName
                    },
                    headers: {
                        authorization: 'Bearer ' + token
                      }
                })
            if(garageName === "Baxter" && rate === "Early"){
                setCurrRate(25)
            }else if(garageName === "Waverly" && rate === "Early"){
                setCurrRate(15)
            }else{
                setCurrRate(rate)
            }
            
            setData(promise.data)
            setLoading(false)
        } else {
            alert("please select a rate and start/end date")
        }
    }
    return (
        <div className='report'>
            <Navigation />
            <EmailFormDisplayToggler />
            <Button onClick={() => pdfExport(container)}>PDF</Button>
            <div id="PDFExport">
            <PDFExport  fileName={`Report for ${new Date().getFullYear()}`} forcePageBreak=".page-break" scale={0.68} paperSize="Letter" margin={{ top: 5, left: 5, right: 5, bottom: 5 }} ref={container}>
            <div>
                <p className='filter-by-rate__header'>{garageName} Filter By Rate Report</p>
            </div>
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
                <div className='rate-table-header'>
                    <p className='rate-table-header__text'>{garageName} Filter by Rate Report</p>
                    <p className='rate-table-header__text'><b>From: </b>{startDate} <b>To: </b>{endDate} </p>
                </div>
                {rate === "NC/0" || rate === "Other" ?
                    <NonRegularChargeTable
                    data={data}/> :
                    rate === "All" ?
                    <AllRateTable
                    data={data}
                    />
                    :
                    <RegularRateTable
                    data={data}
                    />

                }
                </>
            }
            </PDFExport>
            </div>
        </div>
    )
}
