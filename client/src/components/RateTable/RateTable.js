import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  makeBaxterRateTable,
  makeWaverlyRateTable,
  makeVanVorstRateTable,
} from "./helpers";
import Table from "react-bootstrap/Table";

function RateTable(props) {
  const { inDate, outDate, garageName, rateData } = props;

  const BaxterBuckets = [
    "Early Bird",
    "Up to 1/2 hour",
    "Up to 1 hour",
    "Up to 2 hours",
    "Up to 3 hours",
    "Up to 12 hours",
    "Up to 24 hours",
    "Other",
  ];
  const baxterPrices = [25, 15, 25, 32, 42, 46, 55, 'N/A'];

  const WaverlyBuckets = [
    "Early Bird",
    "Up to 1/2 hour",
    "Up to 2 hours",
    "Up to 3 hours",
    "Up to 8 hours",
    "Up to 24 hours",
    "Other",
  ];
  const waverlyPrices = [15, 5, 15, 20, 25, 35, 'N/A'];

  const VanVorstBuckets = [
    "Up to 1/2 hour",
    "Up to 1 hour",
    "Up to 2 hours",
    "Up to 3 hours",
    "Up to 12 hours",
    "Up to 24 hours",
    "Other",
  ];
  const vanvorstPrices = [3.56, 10.67, 13.04, 17.78, 20.15, 28.44, 'N/A'];

  console.log(garageName);

  const ratesTable = {};

  //function to initialize all buckets to zero
  const makeBuckets = (array) => {
    array.forEach((bucket) => {
      ratesTable[bucket] = {
        count: 0,
        revenue: 0,
      };
    });
  };

  let buckets = null;
  let prices = null;

  switch (garageName) {
    case "Baxter":
      console.log("Baxter");
      makeBuckets(BaxterBuckets);
      makeBaxterRateTable(rateData, ratesTable);
      buckets = BaxterBuckets;
      prices = baxterPrices;
      break;
    case "Waverly":
      console.log("Waverly");
      makeBuckets(WaverlyBuckets);
      makeWaverlyRateTable(rateData, ratesTable);
      buckets = WaverlyBuckets;
      prices = waverlyPrices;
      break;
    case "VanVorst":
      console.log("Vanvorst");
      makeBuckets(VanVorstBuckets);
      makeVanVorstRateTable(rateData, ratesTable);
      buckets = VanVorstBuckets;
      prices = vanvorstPrices;
      break;
    default:
      console.log("provide a garage name");
  }

  console.log(ratesTable);

  return (
    <>
      <Table striped bordered className="report" size="sm">
        <thead>
          <tr className="table-warning">
            <th>Type of Rate</th>
            <th>Number of Cars</th>
            <th>Rate Price</th>
            <th className="table-success">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((bucket, index) => {
            return (
              <tr key={index}>
                <th>{bucket}</th>
                <td>{ratesTable[bucket].count}</td>
                <td>${prices[index]}</td>
                <td className="table-success">{`$${ratesTable[
                  bucket
                ].revenue.toFixed(2)}`}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default RateTable;
