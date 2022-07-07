import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AtlanticTable from '../../components/AtlanticTable/AtlanticTable';
import DatePicker from '../../components/DatePicker/DatePicker';

function ReportPage(){
    let params = useParams();
    const [atlanticAllData, setatlanticAllData] = useState([]);
    const [atlanticNoDiscount, setAtlanticNoDiscount] = useState([]);
    const [atlanticWithDiscount, setAtlanticWithDiscount] = useState([]);
    const [data, setData] = useState({});
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [garage, setGarage] = useState(params.garageName);
    const [inDate, setInDate]  = useState("");
    const [outDate, setOutDate] = useState("");
    
    //tally of payments that have no discount applied
    let atlanticNumberOfPayments = {
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

    atlanticNumberOfPayments['zero'] = atlanticAllData.filter(payment=> payment.total_amount === 0).length;
    atlanticNumberOfPayments['30min'] = atlanticNoDiscount.filter(payment=> payment.total_amount === 3).length;
    atlanticNumberOfPayments['1hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 6).length;
    atlanticNumberOfPayments['Early'] = atlanticNoDiscount.filter(payment => payment.total_amount === 10).length;
    atlanticNumberOfPayments['2hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 15).length;
    atlanticNumberOfPayments['10hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 23).length;
    atlanticNumberOfPayments['24hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 40).length;

    let atlanticDiscountData = atlanticAllData.filter(payment=> Object.keys(payment).includes("discount_name"));
    console.log(atlanticDiscountData);
    
    
    let atlanticTotalTickets = Object.values(atlanticNumberOfPayments).reduce((sum, value) => {
        return sum + value;
    }, 0)
    let atlanticTotalWTax = {
        'zero': (atlanticRates['zero'] * atlanticNumberOfPayments['zero']),
        '30min': (atlanticRates['30min'] * atlanticNumberOfPayments['30min']),
        '1hr': (atlanticRates['1hr'] * atlanticNumberOfPayments['1hr']),
        '2hr': (atlanticRates['2hr'] * atlanticNumberOfPayments['2hr']),
        '10hr': (atlanticRates['10hr'] * atlanticNumberOfPayments['10hr']),
        '24hr': (atlanticRates['24hr'] * atlanticNumberOfPayments['24hr']),
        'Early': (atlanticRates['Early'] * atlanticNumberOfPayments['Early'])
    }
    let atlanticTotalWTaxPaid = Object.values(atlanticTotalWTax).reduce((sum, value) => {
        return (sum + value);
    }, 0)
    
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
                atlanticTotalWTax={atlanticTotalWTax} 
                atlanticNumberOfPayments={atlanticNumberOfPayments}
                atlanticTotalTickets={atlanticTotalTickets}
                atlanticTotalWTaxPaid={atlanticTotalWTaxPaid}
            />
            
            </>
            }
        </div>
    );
}

export default ReportPage; 
