import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import MonthliesRevenueTable from '../../components/MonthliesRevenueTable/MonthliesRevenueTable';
import './MonthliesRevenuePage.scss';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';

export default function MonthliesRevenuePage() {

  const [payments, setPayments] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { garageName } = useParams()
  console.log(garageName)

  useEffect(() => {

    axios
      .get("http://localhost:8080/googleSheets",
        {
          params: {
            garageName
          }
        }

      )
      .then(res => {
        setPayments(res.data)
        setIsLoading(false)
      })
  }, [])

  let statusIndex;
  let fobIndex;
  let nameIndex;
  let typeIndex; 
  let rateIndex;
  switch (garageName) {
    case 'Baxter':
      statusIndex = 5;
      fobIndex = 2;
      nameIndex = 0;
      typeIndex = 13;
      rateIndex = 15;
      break;
    case 'VanVorst':
      statusIndex = 5;
      fobIndex = 4;
      nameIndex = 1;
      typeIndex = 12;
      rateIndex = 18;
      break;
    case 'Waverly':
      statusIndex = 3;
      fobIndex = 2;
      nameIndex = 0;
      typeIndex = 11;
      rateIndex = 13;
      break;
    case '24th Street':
      statusIndex = 3;
      fobIndex = 2;
      nameIndex = 0;
      typeIndex = 11;
      rateIndex = 15;
      break;
  }

  return (
    isLoading ? <LoadingSpinner /> :
      <>
        <Navigation />
        <p className='monthlies_revenue_header'>{garageName} Monthlies Revenue Table</p>
        <div>
          <MonthliesRevenueTable
            payments={payments}
            fobStatusIndex={statusIndex}
            fob={fobIndex}
            name={nameIndex}
            type={typeIndex}
            rate={rateIndex}
          />
        </div>
      </>
  )
}
