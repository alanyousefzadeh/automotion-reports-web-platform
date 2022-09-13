import React, { useState, useEffect } from "react";
import axios from "axios";

function SchermerhornFilteredPage() {
  const [inDate, setInDate] = useState("09/01/2022");
  const [outDate, setOutDate] = useState("09/01/2022");
  const [data, setData] = useState(null);

  const getSchermerhornData = async () => {
    let response = await axios.post("http://localhost:8080/schermerhorn", {
      inDate,
      outDate,
      inTime: "12:00 AM",
      outTime: "11:59:59 PM",
    });
    setData(response.data);
  };

  useEffect(() => {
    getSchermerhornData();
  }, []);
  let location = []
  let rate = []
  let count = []
  let disc = []
  let tax1 = []
  let tax4 = []
  let tip = []
  let total = []
  let convFee = []
  let xmlContent = data
  let parser = new DOMParser();
  let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
  console.log(xmlDOM)
  if(data !== null){
    let rows = xmlDOM.querySelectorAll('ResultingValue')
    console.log(rows)
    rows.forEach(row => {
      console.log(row)
      console.log('location',row.children[2].children[0].children[6])
      location.push(row.children[2].children[0].children[6].innerHTML)

      console.log('rate',row.children[2].children[1].children[6])
      rate.push(row.children[2].children[1].children[6].innerHTML)

      console.log('count',row.children[2].children[2].children[2])
      count.push(row.children[2].children[2].children[2].innerHTML)

      console.log('Disc',row.children[2].children[4].children[1])
      disc.push(row.children[2].children[4].children[1].innerHTML)

      console.log('Tax1',row.children[2].children[6].children[1])
      tax1.push(row.children[2].children[6].children[1].innerHTML)

      console.log('Tax4',row.children[2].children[9].children[1])
      tax4.push(row.children[2].children[9].children[1].innerHTML)

      console.log('tip',row.children[2].children[19].children[1])
      tip.push(row.children[2].children[19].children[1].innerHTML)

      console.log('total',row.children[2].children[3].children[1])
      total.push(row.children[2].children[3].children[1].innerHTML)

      console.log('Convenience fee', row.children[2].children[34].children[4] ,row.children[2].children[34].children[1])
      convFee.push(row.children[2].children[34].children[1].innerHTML)

    })
  }

  return (
    <>
    {
      console.log(location, rate, count, disc, tax1, tax4, tip, total, convFee)
    }
    <table id='schermerhorn'>
      <thead>
        <tr>
          <th>Location</th>
          <th>Rate</th>
          <th>Count</th>
          <th>Parking</th>
          <th>Disc</th>
          <th>Tax1</th>
          <th>Tax4</th>
          <th>Tip</th>
          <th>Conv. Fee</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {/* {rows.map((row) => {
         <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
        </tr> 
        })} */}
      </tbody>
    </table>
    </>

  )
}

export default SchermerhornFilteredPage;
