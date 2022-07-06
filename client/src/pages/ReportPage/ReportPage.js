import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReportPage(){
    let params = useParams();
    const [atlanticData, setAtlanticData] = useState([]);
    const [atlanticNoDiscount, setAtlanticNoDiscount] = useState([]);
    const [data, setData] = useState({});
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [garage, setGarage] = useState(params.garageName);
    let atlanticPayments = {
        'zero': 0,
        '30min': 0,
        '1hr': 0,
        'Early': 0,
        '2hr': 0,
        '10hr': 0,
        '24hr': 0
    }
    atlanticPayments['zero'] = atlanticData.filter(payment=> payment.total_amount === 0).length;
    console.log('zero:', atlanticPayments['zero'])
    atlanticPayments['30min'] = atlanticNoDiscount.filter(payment=> payment.total_amount === 3).length;
    console.log('30min:', atlanticPayments['30min'])
    atlanticPayments['1hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 6).length;
    console.log('1hr:', atlanticPayments['1hr'])
    atlanticPayments['Early'] = atlanticNoDiscount.filter(payment => payment.total_amount === 10).length;
    console.log('EarlyBird:', atlanticPayments['Early'])
    atlanticPayments['2hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 15).length;
    console.log('2hr:', atlanticPayments['2hr'])
    atlanticPayments['10hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 23).length;
    console.log('10hr:', atlanticPayments['10hr'])
    atlanticPayments['24hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 40).length;
    console.log('24hr:', atlanticPayments['24hr'])
    let atlanticTotalNonDiscount = Object.values(atlanticPayments).reduce((sum, value) => {
        return sum + value;
    }, 0)
    console.log('total non discount tickets:', atlanticTotalNonDiscount)
    useEffect(() => {
        if(garage === 'Atlantic Terrace'){
            axios
            .get('http://localhost:8080/garagedata/atlantic')
            .then((res) => {
                setAtlanticData(res.data);
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
                setAtlanticData(res.data);
            })
            .catch(() => {
                setFailedToLoad(true);
            });
        }    
    }, []);


    return (
        
        <div>
            {failedToLoad 
            ? <p>error loading data...</p>
            :
            <>
                <p>InDateTime: {data.InDateTime}</p>
                <p>OutDateTime: {data.OutDateTime}</p>
                <p>OverSize: {data.Oversize}</p>
                <p>Status: {data.Status}</p>
            </>
            }
        </div>
    );
}

export default ReportPage; 
