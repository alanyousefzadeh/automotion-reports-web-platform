import React, { useState, useEffect } from "react";
import axios from "axios";
import AtlanticOpenTable from '../../components/AtlanticOpenTable/AtlanticOpenTable';
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import EmailFormDisplayToggler from "../../components/EmailFormDisplayToggler";
export default function AtlanticOpenPage() {
  const [atlanticOpenData, setAtlanticOpenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failedtoLoad, setFailedToLoad] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(process.env.REACT_APP_ATLANTIC_OPEN_URL, {
        params: {
          inDate: new Date().setHours(3, 0, 0, 0),
          outDate: Math.floor(Date.now() / 1000),
        },
      });
      setAtlanticOpenData(res.data);
      setIsLoading(false);
    } catch (err) {
      setFailedToLoad(true);
      //   setErr(err.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {isLoading ? <LoadingSpinner/> :
    <div>
      <AtlanticOpenTable data={atlanticOpenData}/>
    </div>}
    </>
  );
}
