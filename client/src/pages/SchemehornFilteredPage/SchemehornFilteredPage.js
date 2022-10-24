import React, { useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import SchemehornRevenueSummaryComponent from "../../components/SchemehornRevenueSummaryComponent/SchemehornRevenueSummaryComponent";
import SchemehornDiscountComponent from "../../components/SchemehornDiscountComponent/SchemehornDiscountComponent";
import SchemehornTicketRangesComponent from "../../components/SchemehornTicketRangesComponent/SchemehornTicketRangesComponent";
import SchemehornPaymentTypeComponent from "../../components/SchemehornPaymentTypeComponent/SchemehornPaymentTypeComponent";

function SchemehornFilteredPage() {
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [data, setData] = useState(null);
  const [discounts, setDiscounts] = useState(null);
  const [ticketRanges, setTicketRanges] = useState(null);
  const [paymentTypes, setPaymentTypes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSchemehornData = async () => {

    setLoading(true);
    //revenue summary API call
    let response = await axios.post(
      process.env.REACT_APP_SCHEMEHORN_URL,
      {
        inDate,
        outDate,
        inTime: "12:00 AM",
        outTime: "11:59:59 PM",
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
      }
    );
    setPaymentTypes(paymentTypesResponse.data);
    setLoading(false);
  };
  const getData = () => {
    if ((inDate !== null && outDate !== null) && outDate >= inDate) {
      getSchemehornData();
    } else {
      alert("please provide proper in and out dates");
    }
  };

  return (
    <div className="report">
      <Navigation />
      <DatePicker label={"In-Date 12:00AM"} setDate={setInDate} />
      <DatePicker label={"Out-Date 11:59PM"} setDate={setOutDate} />
      <Button className="button" onClick={getData}>
        Generate Report
      </Button>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </div>
  );
}

export default SchemehornFilteredPage;
