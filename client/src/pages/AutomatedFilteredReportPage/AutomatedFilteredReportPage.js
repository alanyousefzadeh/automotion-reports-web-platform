import { useState, useEffect} from "react";
import axios from "axios";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import { useParams, Link, useSearchParams } from "react-router-dom";
import RateTable from "../../components/RateTable/RateTable";
import OverParkedTable from "../../components/OverParked/OverParkedTable";
import "./AutomatedFiltered.scss";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import ReactDOMServer from "react-dom/server";
import EmailFormDisplayToggler from "../../components/EmailFormDisplayToggler";
import Navigation from "../../components/Navigation/Navigation";

function AutomatedFilteredReportPage() {

  let [searchParams, setSearchParams] = useSearchParams()
  const inDate = searchParams.get("inDate")
  const outDate = searchParams.get("outDate")

  const [response, setResponse] = useState(null);
  const [failedtoLoad, setFailedtoLoad] = useState(false);
  const [err, setErr] = useState(null);

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let transientInTable = new Array(24).fill(0);
  let transientOutTable = new Array(24).fill(0);
  let monthlyInTable = new Array(24).fill(0);
  let monthlyOutTable = new Array(24).fill(0);

  const { garageName } = useParams();
  console.log("db", garageName);
  console.log("in", inDate);
  console.log("out", outDate);

  const token = sessionStorage.getItem('token');
  
  useEffect(()=>{
    getData()
  }, [])

  const getData = async () => {

    setIsLoading(true);
    const promise = await axios.get(
      process.env.REACT_APP_TRANSACTIONS_URL,
      {
        params: {
          inDate: inDate,
          outDate: outDate,
          garage: garageName,
        },
        headers: {
          authorization: "Bearer " + token,
        }
      }
    );
    let data = promise.data;

    setResponse(data);
    setIsLoading(false);
    if (data.total[0].total != null) {
      setTotal(data.total[0].total);
    }
  }


if (!!failedtoLoad) {
  return (
    <p>
      {err} <Link to="/login">login</Link>
    </p>
  );
}

if (response != null) {
  response.tInDateTimes.forEach((hour) => {
    transientInTable[hour.hourofday] = hour.countperhour;
  });

  response.tOutDateTimes.forEach((hour) => {
    transientOutTable[hour.hourofday] = hour.countperhour;
  });

  response.mInDateTimes.forEach((hour) => {
    monthlyInTable[hour.hourofday] = hour.countperhour;
  });

  response.mOutDateTimes.forEach((hour) => {
    monthlyOutTable[hour.hourofday] = hour.countperhour;
  });
}

return (
  <div className="report">
    <Navigation />
    <p className="report_title">{garageName} Garage Filtered Report</p>

    <EmailFormDisplayToggler />
    {isLoading ? (
      <LoadingSpinner />
    ) : response ? (
      <div className="filtered-report-tables">
        <TransactionTable
          monthlyInTable={monthlyInTable}
          monthlyOutTable={monthlyOutTable}
          transientInTable={transientInTable}
          transientOutTable={transientOutTable}
          total={total}
        />

        <RateTable garageName={garageName} rateData={response.rateTable} />
        <OverParkedTable overParkedData={response.overParked} />
      </div>
    ) : ""
    }
  </div>
);
  }

// const html = ReactDOMServer.renderToStaticMarkup(<AutomatedFilteredReportPage/>);
// console.log(html.toString());
export default AutomatedFilteredReportPage;
