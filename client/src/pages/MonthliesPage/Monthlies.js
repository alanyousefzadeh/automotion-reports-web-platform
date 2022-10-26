import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ActiveMonthlies from '../../components/ActiveMonthlies/ActiveMonthlies'
import InActiveMonthlies from '../../components/InActiveMonthlies/InActiveMonthlies'
import RepoMonthlies from '../../components/RepoMonthlies/RepoMonthlies'

export default function Monthlies() {

const [monthliesData, setMonthliesData] = useState(null)
const [isLoading, setIsLoading] = useState(false)

async function fetchMonthliesData() {
    setIsLoading(true);
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
    <div className='report'>
      <ActiveMonthlies
      data={monthliesData.monthliesInUse}/>
      <InActiveMonthlies
      data={monthliesData.monthliesExpired}/>
      <RepoMonthlies
      data={monthliesData.monthliesRepo}/>
    </div>
  )
}
