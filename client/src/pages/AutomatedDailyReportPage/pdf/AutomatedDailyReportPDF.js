import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
    makeBaxterRateTable,
    makeWaverlyRateTable,
    makeVanVorstRateTable,
  } from "../../../components/RateTable/helpers";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const AutomatedDailyReportPdf = (props) => {
    const {
        formattedDate,
        garageName,
        response,
        monthlyInTable,
        monthlyOutTable,
        transientInTable,
        transientOutTable,
        total
    } = props;
    
    const [url, setUrl] = useState(null);

    useEffect(() => {
        return () => {
            if (url !== null) {
                URL.revokeObjectURL(url);
            }
        };
    }, [url]);

    let listElements = [] // for the hours table

    let times = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
        '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
    ]
    let totalSum = 0;

    for (let i = 0; i < 24; i++) {
        let sum = transientInTable[i] + transientOutTable[i] + monthlyInTable[i] +  monthlyOutTable[i];
        totalSum += sum;
        listElements.push([times[i],transientInTable[i], transientOutTable[i], monthlyInTable[i], monthlyOutTable[i],sum])
    }

    const monthlyInTotal = monthlyInTable.reduce((prevVal, currVal) => prevVal + currVal, 0)
    const monthlyOutTotal = monthlyOutTable.reduce((prevVal, currVal) => prevVal + currVal, 0)
    const transientInTotal = transientInTable.reduce((prevVal, currVal) => prevVal + currVal, 0)
    const transientOutTotal = transientOutTable.reduce((prevVal, currVal) => prevVal + currVal, 0)

    console.log("listElements: ", listElements);
    let spaces;
    switch (garageName) {
        case 'Baxter':
            spaces = 67
            break;
        case 'VanVorst':
            spaces = 254
            break;
        case 'Waverly':
            spaces = 32
            break;
        default:
            console.log('error');
    }

    //simplify variable
    const ticketStart = response.ticketStart.length > 0 ? response.ticketStart[0].TicketNum : "";
    const ticketEnd = response.ticketEnd[0].TicketNum;
    const openTicketsToday = response.openTicketsToday[0].openToday;
    const openPrior = response.openPrior[0].openPrior
    const closedTickets = response.closedTickets[0].closedTickets;
    const currentMonthliesIn = response.currentMonthliesIn[0].monthliesIn;

    //Tables Column
    //first table
    const TICKET_START_NUM = ticketStart;
    const TICKET_END_NUM = ticketEnd;
    const TICKETS_ISSUED = ticketEnd == '' ? 0 : ticketEnd - ticketStart + 1;
    const OPEN_TICKETS_TODAY = openTicketsToday;
    const OPEN_PRIOR = openPrior;
    const CLOSED_TICKETS = closedTickets;

    //second table
    const TOTAL_SPACES = spaces;
    const CURRENT_T_IN = openTicketsToday + openPrior;
    const CURRENT_M_IN = currentMonthliesIn;
    const TOTAL_PARKED = openTicketsToday + openPrior + currentMonthliesIn;
    const FREE_SPACES = spaces - (openTicketsToday + openPrior + currentMonthliesIn);
    const RESERVED_FOR_MONTHLIES = 0;

    //rateTable data
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
          makeBaxterRateTable(response.rateTable, ratesTable);
          buckets = BaxterBuckets;
          prices = baxterPrices;
          break;
        case "Waverly":
          console.log("Waverly");
          makeBuckets(WaverlyBuckets);
          makeWaverlyRateTable(response.rateTable, ratesTable);
          buckets = WaverlyBuckets;
          prices = waverlyPrices;
          break;
        case "VanVorst":
          console.log("Vanvorst");
          makeBuckets(VanVorstBuckets);
          makeVanVorstRateTable(response.rateTable, ratesTable);
          buckets = VanVorstBuckets;
          prices = vanvorstPrices;
          break;
        default:
          console.log("provide a garage name");
      }
    
      let rateArray = [['Type of Rate','Number of Cars','Rate Price','Revenue']];
      console.log("ratesTable: ", ratesTable);
        for(let i = 0; i< buckets.length; i++){
            rateArray.push([buckets[i],ratesTable[buckets[i]].count, '$' + prices[i],'$' + ratesTable[buckets[i]].revenue.toLocaleString(undefined, {minimumFractionDigits: 2})]);
        }    
        console.log("rateArray: ", rateArray);
        console.log("prices: ", prices);

        let overParkedArray = [['Type','Ticket Number','Parked In','Total Days In Garage']];
        for(let i=0;i < response.overParked.length; i++){
            overParkedArray.push([response.overParked[i].type, response.overParked[i].STOPAKey2,new Date((response.overParked[i].InDateTime).slice(0,-1)).toLocaleString(),response.overParked[i].TotalDays])
        }

    pdfMake.fonts = {
        NimbusSans: {
            normal: "NimbusSanL-Reg.otf",
            bold: "NimbusSanL-Bol.otf",
            italics: "NimbusSanL-RegIta.otf",
            bolditalics: "NimbusSanL-BolIta.otf"
        }
    };

    const docDefinition = {
        content: [
            { text: `${garageName} Daily Report for: Yesterday ${formattedDate}, 12:00AM - 11:59PM`,
             style: 'subheader',fontSize: 15,bold: true, alignment: 'center' },
            {
                margin: 10,
                style: 'tableExample',
                layout: 'lightHorizontalLines',
                table: {
                    widths:  ['*', '*', '*', '*', '*', 'auto'],
                    body: [
                        ['Ticket Start Num', 'Ticket End Num', 'Tickets Issued', 'Open Tickets Today', 'Open Prior', 'Closed Tickets'],
                        [TICKET_START_NUM, TICKET_END_NUM, TICKETS_ISSUED, OPEN_TICKETS_TODAY, OPEN_PRIOR, CLOSED_TICKETS]
                    ]
                },
            },
            {
                margin: 10,
                style: 'tableExample',
                layout: 'lightHorizontalLines',
                table: {
                    widths:  ['*', '*', '*', '*', '*', 'auto'],
                    body: [
                        ['Total Spaces', 'Current T In', 'Current M In', 'Total Parked', 'Free Spaces', 'Reserved for Monthlies'],
                        [TOTAL_SPACES, CURRENT_T_IN, CURRENT_M_IN, TOTAL_PARKED, FREE_SPACES, RESERVED_FOR_MONTHLIES],

                    ]
                }
            },
            {
                style: 'tableExample',
                margin: [ 10, 10, 10, 5 ],  
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                    }
                },            
                table: {
                    widths:  ['*', '*', '*', '*', '*', 'auto'],
                    body: [['Hour','T. In', 'T. Out', 'M. In', 'M. Out', 'Tot.'],...listElements,
                        [ 'Total',transientInTotal,transientOutTotal, monthlyInTotal, monthlyOutTotal, totalSum]
                    ]

                }
            },
            { text: `Total: ${total.toLocaleString(undefined, {minimumFractionDigits: 2})}$`,pageBreak: 'after', style: 'subheader' },
            {
                style: 'tableExample',
                margin: 10,
                table: {
                // dontBreakRows: true,
				// keepWithHeaderRows: 1,
                    widths:  ['*', '*', '*', 'auto'],
                    body: rateArray

                }
            },
            {
                style: 'tableExample',
                margin: 10,
                table: {
                    widths:  ['*', '*', 'auto', '*'],
                    body: overParkedArray

                }
            },

        ],
        defaultStyle: {
            font: "NimbusSans",
            
        },
    };

    const create = () => {
        pdfMake.createPdf(docDefinition).download();
        // const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        // pdfDocGenerator.getBlob((blob) => {
        //   const url = URL.createObjectURL(blob);
        //   setUrl(url);
        // });
    };

    return <div>
        <Button onClick={create}>Download PDF</Button>
    </div>
}


export default AutomatedDailyReportPdf;