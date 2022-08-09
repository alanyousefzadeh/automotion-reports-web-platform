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
    if (inDate !== null || outDate !== null || num !== "") {
      setIsLoading(true);
      response = await axios.get("http://localhost:8080/retrievalTime", {
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
        <>
          <DatePicker label={"In-Date 12:00AM"} setDate={setIndate} />
          <DatePicker label={"Out-Date 11:59PM"} setDate={setOutDate} />
          <TypePicker label={"Type"} type={type} setType={setType} />
          <TicketSelect label={"Ticket Number"} num={num} setNum={setNum} />
          <Button onClick={fetchData}>Generate Table</Button>
          <Table striped bordered>
            <thead>
              <tr className="table-warning">
                <th>In Date Time</th>
                <th>Out Date Time</th>
                <th>Out Retrieval Date Time</th>
                <th>Waiting Time (Minutes)</th>
                <th>Car Size</th>
              </tr>
            </thead>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <tbody>
                {waitTimeData &&
                  waitTimeData.map((data, index) => {
                    const wait = data.waitTime;
                    let color = style(wait);

                    return (
                      <tr key={index}>
                        <td>
                          {new Date(
                            data.InDateTime.slice(0, -1)
                          ).toLocaleString()}
                        </td>
                        <td>
                          {new Date(
                            data.OutDateTime.slice(0, -1)
                          ).toLocaleString()}
                        </td>
                        <td>
                          {new Date(
                            data.LastRetrievalDateTime.slice(0, -1)
                          ).toLocaleString()}
                        </td>
                        <td className={color}>{wait}</td>
                        <td>{data.Oversize}</td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </Table>
        </>
      )}
    </>
  );
}

export default WaitTimePage;
