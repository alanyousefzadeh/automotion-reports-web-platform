import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import MonthliesRevenueTable from '../../components/MonthliesRevenueTable/MonthliesRevenueTable';
import './MonthliesRevenuePage.scss';
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
import MonthliesRevenueConflictsQBTable from '../../components/MonthliesRevenueConflictsQBTable/MonthliesRevenueConflictsQBTable';
import MonthliesRevenueConflictsGSTable from '../../components/MonthliesRevenueConflictsGSTable/MonthliesRevenueConflictsGSTable';

export default function MonthliesRevenuePage() {

  const [payments, setPayments] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [type, setType] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();

  const { garageName } = useParams()
  console.log(garageName)

  const getMonthliesRevenue = async () => {
    const token = sessionStorage.getItem('token');

    try {
      const response = await axios
        .get("http://localhost:8080/googleSheets",
          {
            params: {
              garageName
            },
            headers: {
              authorization: 'Bearer ' + token
            }
          })
      sessionStorage.setItem(`${garageName}-monthliesRevenue`, JSON.stringify(response.data))
      setPayments(response.data)
      setIsLoading(false)

    } catch (err) {
      console.log(err)
    }
  }

  const typeParam = searchParams.get('type');
  useEffect(() => {

    setType(typeParam)
    const data = JSON.parse(sessionStorage.getItem(`${garageName}-monthliesRevenue`))

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
    <>
      <Navigation />
      {isLoading ? <LoadingSpinner /> :
        <>
          <div className='monthlies-header'>
            <select name="reports" onChange={(e) => typeHandler(e)}>
              <option value="Select">Select Report</option>
              <option value="Active">Active</option>
              <option value="ConflictsQB">Conflicts - not on QB</option>
              <option value="ConflictsGS">Conflicts - not on GS</option>
            </select>
          </div>
          <p className='monthlies_revenue_header'>{garageName} {type} Monthlies Table</p>
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
            type === "ConflictsQB" ?
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
              type === "ConflictsGS" ?
              <div>
                <MonthliesRevenueConflictsGSTable
                  payments={payments}
                  fobStatusIndex={statusIndex}
                  fob={fobIndex}
                  name={nameIndex}
                  type={typeIndex}
                  rate={rateIndex}
                />

              </div> : ""
          }

        </>
      }
    </>
  )
}
