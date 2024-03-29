import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AtlanticTable from "../../components/AtlanticTable/AtlanticTable";
import ReportHeader from "../../components/ReportHeader/ReportHeader";
import ReactDOM from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import "./AtlanticDailyReportPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import EmailComponent from "../../components/EmailComponent/EmailComponent";
import EmailFormDisplayToggler from "../../components/EmailFormToggler/EmailFormDisplayToggler";

const AtlanticDailyReportPage = () => {
  const sortObjectByKeys = (o) => {
    return Object.keys(o)
      .sort()
      .reduce((r, k) => ((r[k] = o[k]), r), {});
  };

  //set the state variables
  const [atlanticAllData, setatlanticAllData] = useState([]);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [inDate, setInDate] = useState(
    Math.floor(new Date().setHours(3, 0, 0, 0) - 24 * 60 * 60 * 1000)
  );
  const [outDate, setOutDate] = useState(
    Math.floor(new Date().setHours(3, 0, 0, 0))
  );
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /////////////////////
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

  let start = 0;
  let inDateTimeStamp = new Date(`${inDate} 03:00:00`).getTime();
  //fill the tables with the closed API data
  atlanticAllData.forEach((payment) => {
    let paymentTimestamp = new Date(payment.from_date).getTime();
    if (paymentTimestamp < inDateTimeStamp) {
      start += 1;
    }
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

  async function fetchAtlanticData() {
    setIsLoading(true);
    const token = sessionStorage.getItem('token');
    try {
      const res = await axios.get(
        process.env.REACT_APP_ATLANTIC_CLOSED_URL,
        {
          params: {
            inDate: inDate,
            outDate: outDate,
          },
          headers: {
            authorization: 'Bearer ' + token
          }
        
        }
      );
      setatlanticAllData(res.data);
      setIsLoading(false);
    } catch (err) {
      setFailedToLoad(true);
      setErr(err.response.data);
    }
  }

  useEffect(() => {
    fetchAtlanticData();
  }, []);

  return (
    <div className="report">
      {failedToLoad ? (
        <p>
          error: {err}
          <Link to="/login"> Login</Link>
        </p>
      ) : (
        <div id="pdf-report">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Navigation />
              <p className="daily__report">Atlantic Terrace Daily Report Page</p>
              <ReportHeader
                start={start}
                closed={atlanticAllData.length}
                startDate={new Date(inDate).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                })}
                endDate={new Date(outDate).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                })}
              />
              <div className="atlantic-email-toggler">
                <EmailFormDisplayToggler />
              </div>
              <AtlanticTable
                atlanticTable={atlanticTable}
                atlanticDiscountTable={sortObjectByKeys(atlanticDiscountTable)}
                atlanticMiscTable={atlanticMiscTable}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
// let html = ReactDOMServer.renderToStaticMarkup(<AtlanticDailyReportPage/>);
// console.log(html.toString());

export default AtlanticDailyReportPage;
