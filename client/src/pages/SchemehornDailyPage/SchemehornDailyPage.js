import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import SchemehornRevenueSummaryComponent from "../../components/SchemehornRevenueSummaryComponent/SchemehornRevenueSummaryComponent";
import SchemehornDiscountComponent from "../../components/SchemehornDiscountComponent/SchemehornDiscountComponent";
import SchemehornTicketRangesComponent from "../../components/SchemehornTicketRangesComponent/SchemehornTicketRangesComponent";
import SchemehornPaymentTypeComponent from "../../components/SchemehornPaymentTypeComponent/SchemehornPaymentTypeComponent";
import { formatDate } from "../AutomatedDailyReportPage/AutomatedDailyReportHelpers";

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

  const getSchemehornData = async () => {
    
    //revenue summary API call
    let response = await axios.post(
      "https://automotion-server.herokuapp.com/schemehorn",
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
      "https://automotion-server.herokuapp.com/schemehorn/discounts",
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
      "https://automotion-server.herokuapp.com/schemehorn/tickets",
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
      "https://automotion-server.herokuapp.com/schemehorn/payments",
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
    getSchemehornData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="report">
      <Navigation />
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

export default SchemehornDailyPage;
