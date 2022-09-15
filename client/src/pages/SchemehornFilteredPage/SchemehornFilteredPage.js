import React, { useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import LoadingSpinner from "../../components/LoadingWheel/LoadingWheel";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import SchemehornRevenueSummaryComponent from "../../components/SchemehornRevenueSummaryComponent/SchemehornRevenueSummaryComponent";
import SchemehornDiscountComponent from "../../components/SchemehornDiscountComponent/SchemehornDiscountComponent";
import TicketRangesComponent from "../../components/TicketRangesComponent/TicketRangesComponent";
import PaymentTypeComponent from "../../components/PaymentTypeComponent/PaymentTypeComponent";

function SchemehornFilteredPage() {
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [data, setData] = useState(null);
  const [discounts, setDiscounts] = useState(null);
  const [ticketRanges, setTicketRanges] = useState(null);
  const [paymentTypes, setPaymentTypes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSchemehornData = async () => {
    //revenue summary API call
    let response = await axios.post("http://localhost:8080/schemehorn", {
      inDate,
      outDate,
      inTime: "12:00 AM",
      outTime: "11:59:59 PM",
    });
    setData(response.data);

    //discount table API call
    let discountResponse = await axios.post(
      "http://localhost:8080/schemehorn/discounts",
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
      "http://localhost:8080/schemehorn/tickets",
      {
        inDate,
        outDate,
        inTime: "12:00 AM",
        outTime: "11:59:59 PM",
      }
    );
    setTicketRanges(ticketRangesResponse.data);
    setLoading(false);

    //payment type API call
    let paymentTypesResponse = await axios.post(
      "http://localhost:8080/schemehorn/payments",
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
    if (inDate !== null && outDate !== null) {
      getSchemehornData();
      setLoading(true);
    } else {
      alert("please provide in and out dates");
    }
  };

  return (
    <div className="report">
      <Navigation />
      <DatePicker label={"In-Date"} setDate={setInDate} />
      <DatePicker label={"Out-Date"} setDate={setOutDate} />
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

          <TicketRangesComponent ticketRanges={ticketRanges} />
          <PaymentTypeComponent paymentTypes={paymentTypes} />
        </>
      )}
    </div>
  );
}

export default SchemehornFilteredPage;
