import React, { useState, useEffect} from 'react';
import axios from 'axios';

function WaitTimePage() {

    const [waitTimeData, setWaitTimeData] = useState(null);
    const [inDate, setIndate] = useState(null)
    const [outDate, setOutDate] = useState(null)
    const [type, setType] = useState(null)
    const [num, setNum] = useState(null)


    useEffect(async() => {
        let response = await axios.get("http://localhost:8080/retrievalTime", {
            params: {
                inDate,
                outDate,
                type,
                num
            }
        })
        setWaitTimeData(response)
    }, [])
  
    return (
      <div>WaitTimePage</div>
    )
}

export default WaitTimePage;
