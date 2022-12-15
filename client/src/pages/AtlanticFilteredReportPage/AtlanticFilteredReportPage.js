import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AtlanticFilteredReportPage.scss";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AtlanticTable from "../../components/AtlanticTable/AtlanticTable";
import DatePicker from "../../components/DatePicker/DatePicker";
import Navigation from "../../components/Navigation/Navigation";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import EmailFormDisplayToggler from "../../components/EmailFormToggler/EmailFormDisplayToggler";

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
  const [err, setErr] = useState(null);
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    Early: {
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

  const generateReport = () => {
    if (inDate === null || outDate === null) {
      const token = sessionStorage.getItem('token');
      //default report (partial report)
      axios
        .get(
          process.env.REACT_APP_ATLANTIC_CLOSED_URL,
          {
            params: {
              inDate: new Date().setHours(3, 0, 0, 0),
              outDate: new Date().getTime(),
            },
            headers: {
              authorization: 'Bearer ' + token
            }
          }
        )
        .then((res) => {
          setatlanticAllData(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setFailedToLoad(true);
          setErr(error.response.data);
        });
    } else {
      //filtered report
      setIsLoading(true);
      const token = sessionStorage.getItem('token');
      axios
        .get(
          process.env.REACT_APP_ATLANTIC_CLOSED_URL,
          {
            params: {
              inDate: new Date(`${inDate}T03:00:00`).getTime(),
              outDate: new Date(`${outDate}T03:00:00`).getTime(),
            },
            headers: {
              authorization: 'Bearer ' + token
            }
          }
        )
        .then((res) => {
          setatlanticAllData(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setFailedToLoad(true);
          setErr(error.response.data);
        });
    }
  };

  useEffect(() => {
    generateReport();
  }, []);

  return (
    <div>
      <Navigation />
      <p className="atlantic__filtered">Atlantic Terrace Filtered Report</p>
      <div className="report">
        {failedToLoad ? (
          <p>
            error: {err} <Link to="/login">Login</Link>
          </p>
        ) : (
          <div id="pdf-report">
            <section className="datepicker m-2">
              <DatePicker label={"In-Date - 3AM"} setDate={setInDate} />
              <DatePicker label={"Out-Date - 3AM"} setDate={setOutDate} />
            </section>
            <Button onClick={generateReport} className="button">
              Generate Report
            </Button>
            <EmailFormDisplayToggler />
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="atlantic-filtered-table">
                <AtlanticTable
                  atlanticTable={atlanticTable}
                  atlanticDiscountTable={sortObjectByKeys(atlanticDiscountTable)}
                  atlanticMiscTable={atlanticMiscTable}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilteredReportPage;
