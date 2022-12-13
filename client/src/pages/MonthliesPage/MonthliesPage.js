import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import axios from 'axios'
import ActiveMonthlies from '../../components/ActiveMonthlies/ActiveMonthlies'
import InActiveMonthlies from '../../components/InActiveMonthlies/InActiveMonthlies'
import RepoMonthlies from '../../components/RepoMonthlies/RepoMonthlies'
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
import InUseMonthlies from '../../components/InUseMonthlies/InUseMonthlies';
import Navigation from '../../components/Navigation/Navigation';
import './MonthliesPage.scss'

export default function Monthlies() {

  const [monthliesData, setMonthliesData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();


  const { garageName } = useParams()
  async function fetchMonthliesData() {
    const token = sessionStorage.getItem('token');
    setIsLoading(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_MONTHLIES,
        {
          params: {
            garageName
          },
          headers: {
            authorization: 'Bearer ' + token
          }
        });
      setMonthliesData(res.data);
      sessionStorage.setItem('monthliesData', JSON.stringify(res.data))
      setIsLoading(false);
    } catch (err) {
      console.log(err)
    }
  }

  const typeHandler = (e) => {
    setType(e.target.value)
    setSearchParams({type: e.target.value})

  }

  const typeParam = searchParams.get('type');
  console.log(typeParam)
  useEffect(() => {
  
    setType(typeParam)
    const data = JSON.parse(sessionStorage.getItem('monthliesData'))
  
    if(data){
		  setMonthliesData(data);
    }else{
      fetchMonthliesData();
    }
  }, [typeParam]);

  return (

    <div className='monthliesSelect'>
      <Navigation/>
      {
        isLoading ? <LoadingSpinner /> :
          <div className='report'>
            <p>Select a report from the dropdown menu</p>
            <select name="reports" onChange={(e) => typeHandler(e)}>
              <option value="Select">Select Report</option>
              <option value="Active">Active Monthlies</option>
              <option value="Inactive">Inactive Monthlies</option>
              <option value="Repo">Repo Monthlies</option>
              <option value="InUse">In Use Monthlies</option>
            </select>
            <div className='report'>
              {type === "Active" ?
                <ActiveMonthlies
                  data={monthliesData.monthliesActive}
                  garage={garageName} />
                : type === "Inactive" ?
                  <InActiveMonthlies
                    data={monthliesData.monthliesExpired}
                    garage={garageName} />
                  : type === "Repo" ?
                    <RepoMonthlies
                      data={monthliesData.monthliesRepo}
                      garage={garageName} />
                    : type === "InUse" ?
                      <InUseMonthlies
                        data={monthliesData.monthliesInUse}
                        garage={garageName} /> : ""
              }
            </div>
          </div>
      }
    </div>

  )
}
