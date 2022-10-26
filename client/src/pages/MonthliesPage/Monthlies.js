import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import ActiveMonthlies from '../../components/ActiveMonthlies/ActiveMonthlies'
import InActiveMonthlies from '../../components/InActiveMonthlies/InActiveMonthlies'
import RepoMonthlies from '../../components/RepoMonthlies/RepoMonthlies'
import LoadingSpinner from '../../components/LoadingWheel/LoadingWheel';

export default function Monthlies() {

const [monthliesData, setMonthliesData] = useState(null)
const [isLoading, setIsLoading] = useState(true)

const {garageName} = useParams()
async function fetchMonthliesData() {
    //setIsLoading(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_MONTHLIES);
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
    
    isLoading ? <LoadingSpinner/> : 
    <div className='report'>
      <ActiveMonthlies
      data={monthliesData.monthliesInUse}
      garage={garageName}/>
      <InActiveMonthlies
      data={monthliesData.monthliesExpired}
      garage={garageName}/>
      <RepoMonthlies
      data={monthliesData.monthliesRepo}
      garage={garageName}/>
    </div>
    
  )
}
