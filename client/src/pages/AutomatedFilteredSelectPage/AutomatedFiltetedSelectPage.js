import { useState } from "react";
import axios from "axios";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import { useParams, Link } from "react-router-dom";
import RateTable from "../../components/RateTable/RateTable";
import OverParkedTable from "../../components/OverParked/OverParkedTable";
// import "./AutomatedFiltered.scss";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import ReactDOMServer from "react-dom/server";
import EmailFormDisplayToggler from "../../components/EmailFormDisplayToggler";
import Navigation from "../../components/Navigation/Navigation";
import { useNavigate, createSearchParams } from "react-router-dom";

function AutomatedFilteredSelectPage() {
    const [inDate, setInDate] = useState(null);
    const [outDate, setOutDate] = useState(null);

    
  const { garageName } = useParams();
  const params = {inDate, outDate};

    const nav = useNavigate()

    const getFilteredReportPage = () => {
        if (inDate && outDate) {
            nav({
                pathname: `/reportSelect/${garageName}/filtered/dates`,
                search: `?${createSearchParams(params)}`
            })
        }
    }

    return (
        <div className="report">
            <Navigation />
            <p className="report_title">{garageName} Garage Filtered Report</p>
            <div className="filtered-date-picker">
                <DatePicker label={"In-Date - 12:00AM"} setDate={setInDate} />
                <DatePicker label={"Out-Date - 11:59PM"} setDate={setOutDate} />
            </div>
            <Button className="filtered-button" onClick={getFilteredReportPage}>
                Generate Table{" "}
            </Button>
        </div>
    );
}

export default AutomatedFilteredSelectPage;
