import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './ReportPage.scss';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AtlanticTable from '../../components/AtlanticTable/AtlanticTable';
import DatePicker from '../../components/DatePicker/DatePicker';
import ReportHeader from '../../components/ReportHeader/ReportHeader';

function ReportPage(){

    function sortObjectByKeys(o) {
        return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
    }
    //access the URL parameters to know which record and garage we are currently on
    let params = useParams();

    //set the state variables
    const [atlanticAllData, setatlanticAllData] = useState([]);
    const [atlanticNoDiscount, setAtlanticNoDiscount] = useState([]);
    const [atlanticDiscount, setAtlanticDiscount] = useState([]);
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [garage, setGarage] = useState(params.garageName);
    const [inDate, setInDate]  = useState("");
    const [outDate, setOutDate] = useState("");
    
    //tally of payments that have no discount applied
    let atlanticTicketsSoldPerRateTable = {
        '30min': 0,
        '1hr': 0,
        '2hr': 0,
        '10hr': 0,
        '24hr': 0,
        'Early': 0,
    }

    //table of regular rates
    let atlanticRates = {
        '30min': 3,
        '1hr': 6,
        '2hr': 15,
        '10hr': 23,
        '24hr': 40,
        'Early': 10,
    }

    //tally of payments using each discount type 
    let atlanticDiscountsTable = {}

    //find number of payments for each non-discount rate
    //atlanticNoDiscount = only including payments where total_amount == total_value
    atlanticTicketsSoldPerRateTable['30min'] = atlanticNoDiscount.filter(payment=> payment.total_amount === 3).length;
    atlanticTicketsSoldPerRateTable['1hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 6).length;
    atlanticTicketsSoldPerRateTable['Early'] = atlanticNoDiscount.filter(payment => payment.total_amount === 10).length;
    atlanticTicketsSoldPerRateTable['2hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 15).length;
    atlanticTicketsSoldPerRateTable['10hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 23).length;
    atlanticTicketsSoldPerRateTable['24hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 40).length;
    
    //fill the discounts table with tally
    atlanticDiscount.forEach(payment => {
        
        //check for misc tickets
        if(!payment.discount_name){
            atlanticDiscountsTable['Misc. Tickets'] = {
                tally : (atlanticDiscountsTable['Misc. Tickets'] ? (atlanticDiscountsTable['Misc. Tickets'].tally + 1) : 1),
                totalPaid: (atlanticDiscountsTable['Misc. Tickets'] ? (atlanticDiscountsTable['Misc. Tickets'].totalPaid + parseInt(payment.total_amount)) : parseInt(payment.total_amount))
            }
        //all other regular discout tickets
        }else{
            atlanticDiscountsTable[payment.discount_name] = {
                tally: (atlanticDiscountsTable[payment.discount_name] ? (atlanticDiscountsTable[payment.discount_name].tally + 1) : 1) ,
                totalPaid : (atlanticDiscountsTable[payment.discount_name] ? (atlanticDiscountsTable[payment.discount_name].totalPaid + parseInt(payment.total_amount)) : parseInt(payment.total_amount) )
            }
        }
    });
    
    console.log(atlanticDiscountsTable);
    console.log(atlanticAllData.filter(payment => !(atlanticDiscount.includes(payment) || atlanticNoDiscount.includes(payment)) ))

    //table of total $$$ revenue of each ticket type of non-discount tix - total including tax
    let atlanticTotalWTaxTable = {
        '30min': (atlanticRates['30min'] * atlanticTicketsSoldPerRateTable['30min']),
        '1hr': (atlanticRates['1hr'] * atlanticTicketsSoldPerRateTable['1hr']),
        '2hr': (atlanticRates['2hr'] * atlanticTicketsSoldPerRateTable['2hr']),
        '10hr': (atlanticRates['10hr'] * atlanticTicketsSoldPerRateTable['10hr']),
        '24hr': (atlanticRates['24hr'] * atlanticTicketsSoldPerRateTable['24hr']),
        'Early': (atlanticRates['Early'] * atlanticTicketsSoldPerRateTable['Early'])
    }
    
    const generateReport = () => {
        if(inDate !== "" && outDate !== ""){
            if(garage === 'Atlantic Terrace'){
                axios
                .get('http://localhost:8080/garagedata/atlanticClosed', {
                    params: {
                        inDate: Math.floor(new Date(inDate).getTime() / 1000),
                        outDate: Math.floor(new Date(outDate).getTime() / 1000)
                    }
                })
                .then((res) => {
                    setatlanticAllData(res.data);
                    setAtlanticNoDiscount(res.data.filter(payment => payment.total_amount === payment.total_value));
                    setAtlanticDiscount(res.data.filter(payment => (Object.keys(payment).includes("discount_name") || Object.values(payment).includes("misc_ticket_payment"))));
                })
                .then(()=> {
                    axios
                        .get('http://localhost:8080/garagedata/atlanticOpen', {
                            params: {
                                inDate: Math.floor(new Date(inDate).getTime() / 1000),
                                outDate: Math.floor(new Date(outDate).getTime() / 1000)                 
                            }
                        })
                        // .then((res) => {
                            //starting open = previous days open (data saved in local storage)
                            //ending day open tickets = openData.length 
                            //save ending day open tickets locally to be used as starting open tomorrow
                            //issued tickets = closed - starting
                        // })
                })
                .catch(()=>{
                    setFailedToLoad(true);  
                })

            }else{
                axios
                .get('http://localhost:8080/garagedata')
                .then((res) => { 
                    console.log(res.data)
                    setatlanticAllData(res.data);
                })
                .catch(() => {
                    setFailedToLoad(true);
                });
            } 
        } 
    }  

    return (
        
        <div>
            {failedToLoad 
            ? <p>error loading data...</p>
            :
            <> 
            <ReportHeader 
            closed={atlanticAllData.length}
            endDate={outDate}
            />
            <section>
                <DatePicker className='reportDates__picker' label={'In-Date'} setDate={setInDate}/>
                <DatePicker className='reportDates__picker' label={'Out-Date'} setDate={setOutDate}/>
                <Button onClick={generateReport} className='reportDates__button'>Generate Report</Button>
            </section>
            <AtlanticTable 
                atlanticTotalWTaxTable={atlanticTotalWTaxTable} //table of total $$$ revenue of each no discount ticket (1hr, 2hr, etc) 
                atlanticTicketsSoldPerRateTable={atlanticTicketsSoldPerRateTable} //table of number of tickets sold of each no-discount ticket (1hr, 2hr, etc) 
                atlanticDiscountsTable={sortObjectByKeys(atlanticDiscountsTable)}
            />            
            </>
            }
        </div>
    );
}

export default ReportPage; 
