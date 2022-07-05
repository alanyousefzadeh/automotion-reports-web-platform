import React, { useState, useEffect} from 'react';
import axios from 'axios';


function ReportPage(){
    const [data, setData] = useState({})
    const [failedToLoad, setFailedToLoad] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8080/garagedata')
            .then((res) => { 
                console.log(res.data)
                setData(res.data);
            })
            .catch(() => {
                setFailedToLoad(true);
            });
    }, []);

    return (
        
        <div>
            {failedToLoad 
            ? <p>error loading data...</p>
            :
            <>
                <p>InDateTime: {data.InDateTime}</p>
                <p>OutDateTime: {data.OutDateTime}</p>
                <p>OverSize: {data.Oversize}</p>
                <p>Status: {data.Status}</p>
            </>
            }
        </div>
    );
}

export default ReportPage; 
