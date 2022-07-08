import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AtlanticTable from '../../components/AtlanticTable/AtlanticTable';
import DatePicker from '../../components/DatePicker/DatePicker';

function ReportPage(){
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
    let atlanticTicketsSoldNoDiscountTable = {
        'zero': 0,
        '30min': 0,
        '1hr': 0,
        '2hr': 0,
        '10hr': 0,
        '24hr': 0,
        'Early': 0,
    }

    //table of regular rates
    let atlanticRates = {
        'zero': 0,
        '30min': 3,
        '1hr': 6,
        '2hr': 15,
        '10hr': 23,
        '24hr': 40,
        'Early': 10,
    }

    //tally of payments using each discount type 
    let atlanticDiscounts = {
        'Restaurant': 0,
        'Wix': 0,
        'SpotHero': 0,
        'ParkWhiz': 0,
        'Event Rate - $45': 0,
        'BSE Comp': 0,
        'BSE Staff': 0,
        'Event Rate OS - $55': 0,
        'Concert Rate - $50': 0,
        'Concert Rate OS - $60': 0,
        'OFFLINE Reservation': 0,
        'No Charge': 0,
        'Crown Club Member': 0,
        'Other': 0
    }

    //find number of payments for each non-discount rate
                                                //atlanticAllData = entire array of all tickets
                                                //atlanticNoDiscount = only including payments where total_amount == total_value
    atlanticTicketsSoldNoDiscountTable['zero'] = atlanticAllData.filter(payment=> payment.total_amount === 0).length;
    atlanticTicketsSoldNoDiscountTable['30min'] = atlanticNoDiscount.filter(payment=> payment.total_amount === 3).length;
    atlanticTicketsSoldNoDiscountTable['1hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 6).length;
    atlanticTicketsSoldNoDiscountTable['Early'] = atlanticNoDiscount.filter(payment => payment.total_amount === 10).length;
    atlanticTicketsSoldNoDiscountTable['2hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 15).length;
    atlanticTicketsSoldNoDiscountTable['10hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 23).length;
    atlanticTicketsSoldNoDiscountTable['24hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 40).length;

    //table of total $$$ revenue of each ticket type of non-discount tix - total including tax
    let atlanticTotalWTaxTable = {
        'zero': (atlanticRates['zero'] * atlanticTicketsSoldNoDiscountTable['zero']),
        '30min': (atlanticRates['30min'] * atlanticTicketsSoldNoDiscountTable['30min']),
        '1hr': (atlanticRates['1hr'] * atlanticTicketsSoldNoDiscountTable['1hr']),
        '2hr': (atlanticRates['2hr'] * atlanticTicketsSoldNoDiscountTable['2hr']),
        '10hr': (atlanticRates['10hr'] * atlanticTicketsSoldNoDiscountTable['10hr']),
        '24hr': (atlanticRates['24hr'] * atlanticTicketsSoldNoDiscountTable['24hr']),
        'Early': (atlanticRates['Early'] * atlanticTicketsSoldNoDiscountTable['Early'])
    }
    
    useEffect(() => {
        if(inDate !== "" && outDate !== ""){
            if(garage === 'Atlantic Terrace'){
                axios
                .get('http://localhost:8080/garagedata/atlantic', {
                    params: {
                        inDate: Math.floor(new Date(inDate).getTime() / 1000),
                        outDate: Math.floor(new Date(outDate).getTime() / 1000)
                    }
                })
                .then((res) => {
                    setatlanticAllData(res.data);
                    setAtlanticNoDiscount(res.data.filter(payment => payment.total_amount === payment.total_value));
                    setAtlanticDiscount(res.data.filter(payment => Object.keys(payment).includes("discount_name")));
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
    }, [inDate, outDate]);


    return (
        
        <div>
            {failedToLoad 
            ? <p>error loading data...</p>
            :
            <> 
            <DatePicker label={'In-Date'} setDate={setInDate}/>
            <DatePicker label={'Out-Date'} setDate={setOutDate}/>
            <AtlanticTable 
                atlanticTotalWTaxTable={atlanticTotalWTaxTable} //table of total $$$ revenue of each no discount ticket (1hr, 2hr, etc) 
                atlanticTicketsSoldNoDiscountTable={atlanticTicketsSoldNoDiscountTable} //table of number of tickets sold of each no-discount ticket (1hr, 2hr, etc) 
            />
            
            </>
            }
        </div>
    );
}

export default ReportPage; 
