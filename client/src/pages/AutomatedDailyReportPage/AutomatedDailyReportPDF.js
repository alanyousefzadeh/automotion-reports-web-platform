import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const AutomatedDailyReportPdf = (props) => {
    const { formattedDate, garageName, response } = props;
    const [url, setUrl] = useState(null); 

    useEffect(() => {
        return () => {
            if (url !== null) {
                URL.revokeObjectURL(url);
            }
        };
    }, [url]);

    const ticketStart = response.ticketStart.length > 0 ? response.ticketStart[0].TicketNum : "";
    const ticketEnd = response.ticketEnd[0].TicketNum;


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
                        [ticketStart, ticketEnd, response.ticketEnd[0].TicketNum == '' ? 0 : response.ticketEnd[0].TicketNum - response.ticketStart[0].TicketNum + 1, response.openTicketsToday[0].openToday, response.openPrior[0].openPrior, response.closedTickets[0].closedTickets]
                    ]
                },
            },
            { text: 'A simple table with nested elements', style: 'subheader' },
            {
                style: 'tableExample',
                table: {
                    body: [
                        ['Total Spaces', 'Current T In', 'Current M In', 'Total Parked', 'Free Spaces', 'Reserved for Monthlies'],
                        [spaces, response.openTicketsToday[0].openToday + response.openPrior[0].openPrior, response.currentMonthliesIn[0].monthliesIn, response.openTicketsToday[0].openToday + response.openPrior[0].openPrior + response.currentMonthliesIn[0].monthliesIn, spaces - (response.openTicketsToday[0].openToday + response.openPrior[0].openPrior + response.currentMonthliesIn[0].monthliesIn), 0],

                    ]
                }
            }

        ],
        defaultStyle: {
            font: "NimbusSans"
        }
    };

    const create = () => {
        pdfMake.createPdf(docDefinition).open();
        // const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        // pdfDocGenerator.getBlob((blob) => {
        //   const url = URL.createObjectURL(blob);
        //   setUrl(url);
        // });
    };

    return <div>
        <button onClick={create}>Create</button>
    </div>
}


export default AutomatedDailyReportPdf;