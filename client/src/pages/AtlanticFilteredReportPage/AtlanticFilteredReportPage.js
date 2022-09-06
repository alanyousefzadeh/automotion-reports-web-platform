import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AtlanticFilteredReportPage.scss";
import { useParams, Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import AtlanticTable from "../../components/AtlanticTable/AtlanticTable";
import DatePicker from "../../components/DatePicker/DatePicker";
import ReportHeader from "../../components/ReportHeader/ReportHeader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AutomatedFilteredReportPage from "../AutomatedFilteredReportPage/AutomatedFilteredReportPage";
import Navigation from "../../components/Navigation/Navigation";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";

function FilteredReportPage() {
  const sortObjectByKeys = (o) => {
    return Object.keys(o)
      .sort()
      .reduce((r, k) => ((r[k] = o[k]), r), {});
  };
  //access the URL parameters to know which record and garage we are currently on
  let params = useParams();

  //set the state variables
  const [atlanticAllData, setatlanticAllData] = useState([]);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [err, setErr] = useState(null)
  const [garage, setGarage] = useState(params.garageName);
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  ////////////////////////////////////////
  let atlanticTable = {
    "Default Rate - 1/2hr": {
      tally: 0,
      totalPaid: 0,
    },
    "Default Rate - 1hr": {
      tally: 0,
      totalPaid: 0,
    },
    'Early': {
      tally: 0,
      totalPaid: 0,
    },
    "Default Rate - 2hr": {
      tally: 0,
      totalPaid: 0,
    },
    "Default Rate - 10hr": {
      tally: 0,
      totalPaid: 0,
    },
    "Default Rate - 24hr": {
      tally: 0,
      totalPaid: 0,
    },
  };

  let atlanticDiscountTable = {};

  let atlanticMiscTable = {
    tally: 0,
    totalPaid: 0,
  };

  //fill the tables with the closed API data
  atlanticAllData.forEach((payment) => {
    if (
      payment.total_amount === payment.total_value &&
      payment.total_amount === 3
    ) {
      atlanticTable["Default Rate - 1/2hr"] = {
        tally: atlanticTable["Default Rate - 1/2hr"].tally + 1,
        totalPaid:
          atlanticTable["Default Rate - 1/2hr"].totalPaid +
          parseFloat(payment.total_amount),
      };
    } else if (
      payment.total_amount === payment.total_value &&
      payment.total_amount === 6
    ) {
      atlanticTable["Default Rate - 1hr"] = {
        tally: atlanticTable["Default Rate - 1hr"].tally + 1,
        totalPaid:
          atlanticTable["Default Rate - 1hr"].totalPaid +
          parseFloat(payment.total_amount),
      };
    } else if (
      payment.total_amount === payment.total_value &&
      payment.total_amount === 10
    ) {
      atlanticTable["Early"] = {
        tally: atlanticTable["Early"] ? atlanticTable["Early"].tally + 1 : 1,
        totalPaid:
          atlanticTable["Early"].totalPaid + parseFloat(payment.total_amount),
      };
    } else if (
      payment.total_amount === payment.total_value &&
      payment.total_amount === 15
    ) {
      atlanticTable["Default Rate - 2hr"] = {
        tally: atlanticTable["Default Rate - 2hr"].tally + 1,
        totalPaid:
          atlanticTable["Default Rate - 2hr"].totalPaid +
          parseFloat(payment.total_amount),
      };
    } else if (
      payment.total_amount === payment.total_value &&
      payment.total_amount === 23
    ) {
      atlanticTable["Default Rate - 10hr"] = {
        tally: atlanticTable["Default Rate - 10hr"].tally + 1,
        totalPaid:
          atlanticTable["Default Rate - 10hr"].totalPaid +
          parseFloat(payment.total_amount),
      };
    } else if (
      payment.total_amount === payment.total_value &&
      payment.total_amount === 40
    ) {
      atlanticTable["Default Rate - 24hr"] = {
        tally: atlanticTable["Default Rate - 24hr"].tally + 1,
        totalPaid:
          atlanticTable["Default Rate - 24hr"].totalPaid +
          parseFloat(payment.total_amount),
      };
    } else if (payment.discount_name) {
      if (
        payment.discount_name === "ParkWhiz" ||
        payment.discount_name === "SpotHero"
      ) {
        atlanticDiscountTable[payment.discount_name] = {
          tally: atlanticDiscountTable[payment.discount_name]
            ? atlanticDiscountTable[payment.discount_name].tally + 1
            : 1,
          totalPaid: atlanticDiscountTable[payment.discount_name]
            ? atlanticDiscountTable[payment.discount_name].totalPaid +
              parseFloat(payment.reservation_value)
            : parseFloat(payment.reservation_value),
        };
      } else {
        atlanticDiscountTable[payment.discount_name] = {
          tally: atlanticDiscountTable[payment.discount_name]
            ? atlanticDiscountTable[payment.discount_name].tally + 1
            : 1,
          totalPaid: atlanticDiscountTable[payment.discount_name]
            ? atlanticDiscountTable[payment.discount_name].totalPaid +
              parseFloat(payment.total_amount)
            : parseFloat(payment.total_amount),
        };
      }
    } else {
      atlanticMiscTable = {
        tally: atlanticMiscTable.tally + 1,
        totalPaid:
          atlanticMiscTable.totalPaid + parseFloat(payment.total_amount),
      };
    }
  });

  console.log(atlanticMiscTable);
  /////
  const genPDF = () => {
    let file = html2canvas(document.getElementById("pdf-report")).then(
      function (canvas) {
        const doc = new jsPDF("p", "mm", "a4");
        const img = canvas.toDataURL("image/png", 6.0);
        doc.addImage(img, "PNG", 10, 10, 180, 150);
        let date = new Date().toLocaleTimeString();
        let saveInfo = `${
          garage.split(" ")[0]
        }-${outDate}-generated-${date}.pdf`;
        doc.save(saveInfo);
        return saveInfo;
      }
    );
    return file;
  };

  const email = async () => {
    const token = sessionStorage.getItem("token");
    let filepath = await genPDF();
    axios.post(
      "https://automotion-server.herokuapp.com/emailGenerator",
      {
        file: filepath,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
  };

  const generateReport = () => {
    const token = sessionStorage.getItem('token');
    if (garage === "Atlantic Terrace") {
      if (inDate === null || outDate === null) {
        //default report (partial report)
        axios
          .get("https://automotion-server.herokuapp.com/garagedata/atlanticClosed", {
            params: {
              inDate: new Date().setHours(3, 0, 0, 0),
              outDate: new Date().getTime(),
            },
            headers: {
              authorization: 'Bearer ' + token
          }
          })
          .then((res) => {
            setatlanticAllData(res.data);
            setIsLoading(false)
          })
          .catch((error) => {
            setFailedToLoad(true);
            setErr(error.response.data)
          });
      } else {
        //filtered report
        setIsLoading(true)
        axios
          .get("https://automotion-server.herokuapp.com/garagedata/atlanticClosed", {
            params: {
              inDate: new Date(`${inDate} 03:00:00`).getTime(),
              outDate: new Date(`${outDate} 03:00:00`).getTime(),
            },
            headers: {
              authorization: 'Bearer ' + token
          }
          })
          .then((res) => {
            setatlanticAllData(res.data);
            setIsLoading(false)
          })
          .catch((error) => {
            setFailedToLoad(true);
            setErr(error.response.data)
          });
      }
    }
  };

  useEffect(() => {
    generateReport();
  }, []);

  return (
    <div>
      {/* <Logout/> */}
      <Navigation/>
      <p className="atlantic__filtered">{garage} Garage Filtered Report</p>
      {garage !== "Atlantic Terrace" ? (
        <AutomatedFilteredReportPage />
      ) : (
        <div className="report">
          {failedToLoad ? (
            <p>error: {err} <Link to='/login'>Login</Link></p>
          ) : (
            <div id="pdf-report">
              <section className="datepicker m-2">
                <DatePicker label={"In-Date - 3AM"} setDate={setInDate} />
                <DatePicker label={"Out-Date - 3AM"} setDate={setOutDate} />
              </section>
              <Button onClick={generateReport} className="button">
                Generate Report
              </Button>
              <Button onClick={genPDF} className="button">
                Download PDF
              </Button>
              <Button onClick={email} className="button">
                Send as Email
              </Button>
              {isLoading ? <LoadingSpinner/> :
              <AtlanticTable
                atlanticTable={atlanticTable}
                atlanticDiscountTable={sortObjectByKeys(atlanticDiscountTable)}
                atlanticMiscTable={atlanticMiscTable}
              />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FilteredReportPage;