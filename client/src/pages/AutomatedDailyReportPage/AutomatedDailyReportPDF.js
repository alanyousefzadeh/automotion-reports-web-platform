import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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

    let listElements = [['Hour','T. In', 'T. Out', 'M. In', 'M. Out', 'Tot.']] // for the hours table

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
            `${garageName} Daily Report for: Yesterday ${formattedDate}, 12:00AM - 11:59PM`,
            {
                style: 'tableExample',
                table: {
                    body: [
                        ['Ticket Start Num', 'Ticket End Num', 'Tickets Issued', 'Open Tickets Today', 'Open Prior', 'Closed Tickets'],
                        [TICKET_START_NUM, TICKET_END_NUM, TICKETS_ISSUED, OPEN_TICKETS_TODAY, OPEN_PRIOR, CLOSED_TICKETS]
                    ]
                },
            },
            { text: 'A simple table with nested elements', style: 'subheader' },
            {
                style: 'tableExample',
                table: {
                    body: [
                        ['Total Spaces', 'Current T In', 'Current M In', 'Total Parked', 'Free Spaces', 'Reserved for Monthlies'],
                        [TOTAL_SPACES, CURRENT_T_IN, CURRENT_M_IN, TOTAL_PARKED, FREE_SPACES, RESERVED_FOR_MONTHLIES],

                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    body: [...listElements,
                        [ 'Total',transientInTotal,transientOutTotal, monthlyInTotal, monthlyOutTotal, totalSum]
                    ]

                }
            },

        ],
        defaultStyle: {
            font: "NimbusSans"
        }
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