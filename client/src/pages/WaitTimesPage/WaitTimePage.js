import React, { useState, useEffect } from "react";
import "./WaitTimePage.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { formatDate } from "./helpers";
import DatePicker from "../../components/DatePicker/DatePicker";
import TypePicker from "../../components/TypePicker/TypePicker";
import TicketSelect from "../../components/TicketSelect/TicketSelect";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import Navigation from "../../components/Navigation/Navigation";

function WaitTimePage() {
  const [waitTimeData, setWaitTimeData] = useState(null);
  const [inDate, setIndate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [type, setType] = useState("M");
  const [num, setNum] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const { garageName } = useParams();

  async function fetchData() {
    let response = [];
    if (inDate !== null && outDate !== null) {
      setIsLoading(true);
      response = await axios.get("https://automotion-server.herokuapp.com/retrievalTime", {
        params: {
          garage: garageName,
          inDate,
          outDate,
          type,
          num,
        },
      });
    }
    setIsLoading(false);
    setWaitTimeData(response.data);
  }

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
            <DatePicker label={"In-Date 12:00AM"} setDate={setIndate} />
            <DatePicker label={"Out-Date 11:59PM"} setDate={setOutDate} />
            <div className="selectors">
              <TypePicker label={"Type"} type={type} setType={setType} />
              <TicketSelect label={"Ticket Number"} num={num} setNum={setNum} />
            </div>
            <Button className ='report-button'onClick={fetchData}>Generate Table</Button>
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="wait-table">
            <Table striped bordered className="table-sm table-font">
              <thead>
                <tr className="table-warning">
                  <th>Num</th>
                  <th>In</th>
                  <th>Out</th>
                  <th>Retrieval</th>
                  <th>Wait mins.</th>
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
                        <td>
                          {data.STOPAKey2}
                        </td>
                        <td>
                          {new Date(
                            data.InDateTime.slice(0, -1)
                          ).toLocaleString()}
                        </td>
                        <td>
                          {data.OutDateTime ? new Date(
                            data.OutDateTime.slice(0, -1)
                          ).toLocaleString(): ""}
                        </td>
                        <td>
                          {data.LastRetrievalDateTime ? new Date(
                            data.LastRetrievalDateTime.slice(0, -1)
                          ).toLocaleString(): ""}
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
