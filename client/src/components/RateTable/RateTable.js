import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { makeBaxterRateTable } from './helpers';
import Table from 'react-bootstrap/Table';



function RateTable(props){

    const {inDate, outDate, garageName, rateData} = props

    let rates = ['Early Bird', 'Up to 1/2 hour', 'Up to 1 hour', 'Up to 2 hours', 'Up to 3 hours', 'Up to 12 hours', 'Up to 24 hours', 'Other']

    const ratesTable = {}
    
    rates.forEach((rate) => {
        ratesTable[rate] = {
            count: 0,
            revenue: 0
        }
    })

    makeBaxterRateTable(rateData, ratesTable)
    console.log(ratesTable)

    return(
        <>
            <Table striped bordered className='report' size='sm'>
            <thead>
                <tr className=''>
                    <th>Type of Rate</th>
                    <th>Number of Cars</th>
                    <th>Rate Price</th>
                    <th className='table-success'>Revenue</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Early Bird</th>
                    <td>{ratesTable['Early Bird'].count}</td>
                    <td>$25</td>
                    <td className='table-success'>{`$${ratesTable['Early Bird'].revenue.toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Up to 2 hours</th>
                    <td>{ratesTable['Up to 2 hours'].count}</td>
                    <td>$32</td>
                    <td className='table-success'>{`$${ratesTable['Up to 2 hours'].revenue.toFixed(2)}`}</td>
                </tr>
            </tbody>
            </Table></>
    )
}

export default RateTable;