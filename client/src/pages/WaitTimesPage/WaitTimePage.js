import React, { useState, useEffect } from "react";
import "./WaitTimePage.scss";
import { Link, useParams, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import DatePicker from "../../components/DatePicker/DatePicker";
import TypePicker from "../../components/TypePicker/TypePicker";
import TicketSelect from "../../components/TicketSelect/TicketSelect";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import Navigation from "../../components/Navigation/Navigation";
import EmailFormDisplayToggler from "../../components/EmailFormToggler/EmailFormDisplayToggler";
import { set } from "firebase/database";

function WaitTimePage() {
  const [waitTimeData, setWaitTimeData] = useState(null);
  const [inDate, setIndate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  // const [form, setForm] = useState({})
  const [type, setType] = useState("M");
  const [num, setNum] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [linking, setLinking] = useState(false)

  const { garageName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // const params = useSearchParams()
  // console.log(params)
  async function fetchData() {
    setSearchParams({ inDate, outDate, type, num })
    let response = [];
    if (inDate !== null && outDate !== null) {
      const token = sessionStorage.getItem('token');

      setIsLoading(true);
      response = await axios.get(
        process.env.REACT_APP_RETRIEVAL_TIME_URL,
        {
          params: {
            garage: garageName,
            inDate,
            outDate,
            type,
            num,
          },

          headers: {
            authorization: 'Bearer ' + token
          }
        });

      setIsLoading(false);
      setWaitTimeData(response.data);
      type === 'M'? setLinking(true) : setLinking(false)
      sessionStorage.setItem(`${garageName}-waitTimeData`, JSON.stringify(response.data))
      console.log("line 73")
    }
  }
  
  useEffect(() => {

    const data = JSON.parse(sessionStorage.getItem(`${garageName}-waitTimeData`))
    const typeParam = searchParams.get('type');

    const inParam = searchParams.get('inDate');
    const outParam = searchParams.get('outDate');
    setIndate(inParam)
    setOutDate(outParam)

    typeParam === "M" ? setLinking(true) : setLinking(false)

    if (data) {
      setWaitTimeData(data);
    }

  }, [])



  function style(wait) {
    let style = "";
    if (wait < 6) {
      style = "green";
    } else if (wait < 11) {
      style = "orange";
    } else {
      style = "red";
    }
    return style;
  }

  return (
    <>
      {garageName === "Atlantic Terrace" ? (
        <p className="atlantic__wait">
          Wait Times Report Coming Soon for the Atlantic Terrace Garage
        </p>
      ) : (
        <div className="wait-time">
          <Navigation />
          <p className="heading">{garageName} Garage Wait Times Report</p>
          <div className="wait-times-pickers">
            <DatePicker value={inDate} label={"In-Date 12:00AM"} setDate={setIndate} />
            <DatePicker value={outDate} label={"Out-Date 11:59PM"} setDate={setOutDate} />
            <div className="selectors">
              <TypePicker label={"Type"} type={type} setType={setType} />
              <TicketSelect label={"Ticket Number"} num={num} setNum={setNum} />
            </div>
            <Button className="filtered-button" onClick={fetchData}>
              Generate Table
            </Button>
            <EmailFormDisplayToggler />
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="wait-table">
              <div className='rate-table-header'>
                <p className='rate-table-header__text'>{garageName} Wait Time Report</p>
                <p className='rate-table-header__text'><b>From: </b>{inDate} <b>To: </b>{outDate} </p>
              </div>
              <Table striped bordered className="table-sm table-font">
                <thead>
                  <tr className="table-warning">
                    <th>Num</th>
                    <th>In</th>
                    <th>Out</th>
                    <th>Retrieval</th>
                    <th>Wait time</th>
                    <th>Sz</th>
                  </tr>
                </thead>

                <tbody>
                  {waitTimeData &&
                    waitTimeData.map((data, index) => {
                      const wait = data.waitTime;
                      let color = style(wait);

                      return (
                        <tr key={index}>
                          {linking === true ?
                            <td>
                              <Link to={`/reportSelect/${garageName}/monthlies/carDetails/${data.STOPAKey2}`}>{data.STOPAKey2}</Link>
                            </td> :
                            <td>
                              {data.STOPAKey2}
                            </td>
                          }
                          <td>
                            {new Date(
                              data.InDateTime.slice(0, -1)
                            ).toLocaleString()}
                          </td>
                          <td>
                            {data.OutDateTime ? new Date(
                              data.OutDateTime.slice(0, -1)
                            ).toLocaleString() : ""}
                          </td>
                          <td>
                            {data.LastRetrievalDateTime ? new Date(
                              data.LastRetrievalDateTime.slice(0, -1)
                            ).toLocaleString() : ""}
                          </td>
                          <td className={color}>{wait}</td>
                          <td>{data.Oversize}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default WaitTimePage;
