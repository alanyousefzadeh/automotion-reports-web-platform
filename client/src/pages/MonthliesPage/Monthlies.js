import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Monthlies() {

const [monthliesData, setMonthliesData] = useState(null)
const [isLoading, setIsLoading] = useState(false)

async function fetchMonthliesData() {
    setIsLoading(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_FILTER_BY_RATE_URL);
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
    <div>Monthlies</div>
  )
}
