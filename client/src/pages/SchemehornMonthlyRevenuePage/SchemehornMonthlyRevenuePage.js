import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import MonthliesRevenueTable from '../../components/MonthliesRevenueTable/MonthliesRevenueTable';
//import './MonthliesRevenuePage.scss';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
import MonthliesRevenueConflictsQBTable from '../../components/MonthliesRevenueConflictsQBTable/MonthliesRevenueConflictsQBTable';
import MonthliesRevenueConflictsGSTable from '../../components/MonthliesRevenueConflictsGSTable/MonthliesRevenueConflictsGSTable';

export default function MonthliesRevenuePage() {

  const [payments, setPayments] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [type, setType] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();

  const getMonthliesRevenue = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios
        .get(process.env.REACT_APP_GOOGLE_SHEETS_URL,
          {
            params: {
              garageName:"Schermerhorn"
            },
            headers: {
              authorization: 'Bearer ' + token
            }
          })
      sessionStorage.setItem(`Schermerhorn-monthliesRevenue`, JSON.stringify(response.data))
      setPayments(response.data)
      setIsLoading(false)

    } catch (err) {
      console.log(err)
    }
  }

  const typeParam = searchParams.get('type');
  useEffect(() => {

    setType(typeParam)
    const data = JSON.parse(sessionStorage.getItem(`Schermerhorn-monthliesRevenue`))

    if (data) {
      setPayments(data);
      setIsLoading(false)
    } else {
      getMonthliesRevenue();
    }
  }, [typeParam]);

  const typeHandler = (e) => {
    setType(e.target.value)
    setSearchParams({ type: e.target.value })

  }

  let statusIndex = 1;
  let fobIndex = 0;
  let nameIndex = 2;
  let typeIndex = 10;
  let rateIndex = 15; 


  return (
    <>
      <Navigation />
      {isLoading ? <LoadingSpinner /> :
        <>
          <div className='monthlies-header'>
            <select name="reports" onChange={(e) => typeHandler(e)}>
              <option value="Select">Select Report</option>
              <option value="Active">Active</option>
              <option value="Conflicts (Listed in Sheets, but not in QuickBooks)">Conflicts - not on QB</option>
              <option value="Conflicts (Listed in QBs, but not in GoogleSheets)">Conflicts - not on GS</option>
            </select>
          </div>
          <p className='monthlies_revenue_header'>Schermerhorn {type}</p>
          {type === "Active" ?
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
            :
            type === "Conflicts (Listed in Sheets, but not in QuickBooks)" ?
              <div>
                <MonthliesRevenueConflictsQBTable
                  payments={payments}
                  fobStatusIndex={statusIndex}
                  fob={fobIndex}
                  name={nameIndex}
                  type={typeIndex}
                  rate={rateIndex}
                />

              </div> 
              : 
              type === "Conflicts (Listed in QBs, but not in GoogleSheets)" ?
              <div>
                <MonthliesRevenueConflictsGSTable
                  payments={payments}
                  fobStatusIndex={statusIndex}
                  fob={fobIndex}
                  name={nameIndex}
                  type={typeIndex}
                  rate={rateIndex}
                />

              </div> 
              : 
              ""
          }

        </>
      }
    </>
  )
}
