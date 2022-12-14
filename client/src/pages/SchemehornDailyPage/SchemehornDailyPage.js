import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import SchemehornRevenueSummaryComponent from "../../components/SchemehornRevenueSummaryComponent/SchemehornRevenueSummaryComponent";
import SchemehornDiscountComponent from "../../components/SchemehornDiscountComponent/SchemehornDiscountComponent";
import SchemehornTicketRangesComponent from "../../components/SchemehornTicketRangesComponent/SchemehornTicketRangesComponent";
import SchemehornPaymentTypeComponent from "../../components/SchemehornPaymentTypeComponent/SchemehornPaymentTypeComponent";
import { formatDate } from "../AutomatedDailyReportPage/AutomatedDailyReportHelpers";
import EmailFormDisplayToggler from "../../components/EmailFormToggler/EmailFormDisplayToggler";
import {pdfExport} from "../../components/EmailSender/EmailPdf";
import Button from "react-bootstrap/Button";
import {PDFExport} from "@progress/kendo-react-pdf";

function SchemehornDailyPage() {

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = formatDate(yesterday);

  const inDate = formattedDate;
  const outDate = formattedDate;
  const [data, setData] = useState(null);
  const [discounts, setDiscounts] = useState(null);
  const [ticketRanges, setTicketRanges] = useState(null);
  const [paymentTypes, setPaymentTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const container = React.useRef(null);

  const getSchemehornData = async () => {
    const token = sessionStorage.getItem('token');
    //revenue summary API call
    let response = await axios.post(
      process.env.REACT_APP_SCHEMEHORN_URL,
      {
        inDate,
        outDate,
        inTime: "12:00 AM",
        outTime: "11:59:59 PM",
      },
      {
        headers: {
          'authorization': 'Bearer ' + token
        }

      }
    );
    setData(response.data);

    //discount table API call
    let discountResponse = await axios.post(
      process.env.REACT_APP_SCHEMEHORN_DISCOUNTS_URL,
      {
        inDate,
        outDate,
        inTime: "12:00 AM",
        outTime: "11:59:59 PM",
      },
      {
        headers: {
          'authorization': 'Bearer ' + token
        }

      }
    );
    setDiscounts(discountResponse.data);

    //ticket ranges API call
    let ticketRangesResponse = await axios.post(
      process.env.REACT_APP_SCHEMEHORN_TICKETS_URL,
      {
        inDate,
        outDate,
        inTime: "12:00 AM",
        outTime: "11:59:59 PM",
      },
      {
        headers: {
          'authorization': 'Bearer ' + token
        }
      }
    );
    setTicketRanges(ticketRangesResponse.data);

    //payment type API call
    let paymentTypesResponse = await axios.post(
      process.env.REACT_APP_SCHEMEHORN_PAYMENTS_URL,
      {
        inDate,
        outDate,
        inTime: "12:00 AM",
        outTime: "11:59:59 PM",
      },

      {
        headers: {
          'authorization': 'Bearer ' + token
        }
      }
    );
    setPaymentTypes(paymentTypesResponse.data);
    setLoading(false);
  };

  const getData = () => {
    getSchemehornData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="report">
      <Navigation />
        <EmailFormDisplayToggler />
        <Button onClick={() => pdfExport(container)}>PDF</Button>
      {loading ? (
        <LoadingSpinner />
      ) : (

          <div id="PDFExport">
          <PDFExport  fileName={`Report for ${new Date().getFullYear()}`} forcePageBreak=".page-break" scale={0.68} paperSize="Letter" margin={{ top: 5, left: 5, right: 5, bottom: 5 }} ref={container}>
        <>
          <SchemehornRevenueSummaryComponent
            inDate={inDate}
            outDate={outDate}
            data={data}
          />
          <SchemehornDiscountComponent discounts={discounts} />

          <SchemehornTicketRangesComponent ticketRanges={ticketRanges} />
          <SchemehornPaymentTypeComponent paymentTypes={paymentTypes} />
        </>
          </PDFExport>
          </div>
      )}
    </div>
  );
}
export default SchemehornDailyPage;
