import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ReportPage(){
    let params = useParams();
    const [atlanticData, setAtlanticData] = useState([]);
    const [atlanticNoDiscount, setAtlanticNoDiscount] = useState([]);
    const [data, setData] = useState({});
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [garage, setGarage] = useState(params.garageName);
    let atlanticNumberOfPayments = {
        'zero': 0,
        '30min': 0,
        '1hr': 0,
        '2hr': 0,
        '10hr': 0,
        '24hr': 0,
        'Early': 0,
    }
    let atlanticRates = {
        'zero': 0,
        '30min': 3,
        '1hr': 6,
        '2hr': 15,
        '10hr': 23,
        '24hr': 40,
        'Early': 10,
    }
    atlanticNumberOfPayments['zero'] = atlanticData.filter(payment=> payment.total_amount === 0).length;
    console.log('zero:', atlanticNumberOfPayments['zero'])
    atlanticNumberOfPayments['30min'] = atlanticNoDiscount.filter(payment=> payment.total_amount === 3).length;
    console.log('30min:', atlanticNumberOfPayments['30min'])
    atlanticNumberOfPayments['1hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 6).length;
    console.log('1hr:', atlanticNumberOfPayments['1hr'])
    atlanticNumberOfPayments['Early'] = atlanticNoDiscount.filter(payment => payment.total_amount === 10).length;
    console.log('EarlyBird:', atlanticNumberOfPayments['Early'])
    atlanticNumberOfPayments['2hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 15).length;
    console.log('2hr:', atlanticNumberOfPayments['2hr'])
    atlanticNumberOfPayments['10hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 23).length;
    console.log('10hr:', atlanticNumberOfPayments['10hr'])
    atlanticNumberOfPayments['24hr'] = atlanticNoDiscount.filter(payment => payment.total_amount === 40).length;
    console.log('24hr:', atlanticNumberOfPayments['24hr'])
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
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Revenue by Rate</th>
                    <th>Tickets</th>
                    <th>Total</th>
                    <th>Total w/ Tax</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Default Board - 1/2h</td>
                    <td>{atlanticNumberOfPayments['30min']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['30min'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 1h</td>
                    <td>{atlanticNumberOfPayments['1hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['1hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 2h</td>
                    <td>{atlanticNumberOfPayments['2hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['2hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 10h</td>
                    <td>{atlanticNumberOfPayments['10hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['10hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 24h</td>
                    <td>{atlanticNumberOfPayments['24hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['24hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Early Bird</td>
                    <td>{atlanticNumberOfPayments['Early']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['Early'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>$0 Tickets</td>
                    <td>{atlanticNumberOfPayments['zero']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['zero'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Totals:</th>
                    <th>{atlanticTotalTickets}</th>
                    <th>$$$$</th>
                    <th>{`$${atlanticTotalWTaxPaid.toFixed(2)}`}</th>
                </tr>
            </tbody>
            </Table>
            </>
            }
        </div>
    );
}

export default ReportPage; 
