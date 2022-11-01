import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import ActiveMonthlies from '../../components/ActiveMonthlies/ActiveMonthlies'
import InActiveMonthlies from '../../components/InActiveMonthlies/InActiveMonthlies'
import RepoMonthlies from '../../components/RepoMonthlies/RepoMonthlies'
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';
import InUseMonthlies from '../../components/InUseMonthlies/InUseMonthlies';
import './MonthliesPage.scss'

export default function Monthlies() {

  const [monthliesData, setMonthliesData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState(null)

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
      setIsLoading(false);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMonthliesData();
  }, []);

  return (

    <div className='monthliesSelect'>
      {
        isLoading ? <LoadingSpinner /> :
          <div className='report'>
            <p>Select a report from the dropdown menu</p>
            <select name="reports" onChange={(e) => setType(e.target.value)}>
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
