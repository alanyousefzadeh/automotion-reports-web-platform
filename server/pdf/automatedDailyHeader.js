const data = require('./fetchData');
const pdfHelpers = require('./pdfHelpers');


const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const formattedDate = pdfHelpers.formatDate(yesterday);

const automatedDailyHeaderTable = async () => {
    // simplify veriable
    const ticketStart = await data.ticketStart();
    const ticketEnd = await data.ticketEnd();
    const openTicketsToday = await data.openTicketsToday();
    const openPrior = await data.openPrior();
    const closedTickets = await data.closedTickets();
    const currentMonthliesIn = await data.currentMonthliesIn();

    let spaces = pdfHelpers.spaces("Waverly");

    //firstTable
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
    // console.log(ticketStart, ticketEnd , openTicketsToday, openPrior, closedTickets, currentMonthliesIn)

    const tables = {
        firstTable: {
            margin: 10,
            style: 'tableExample',
            layout: 'lightHorizontalLines',
            table: {
                widths: ['*', '*', '*', '*', '*', 'auto'],
                body: [
                    ['Ticket Start Num', 'Ticket End Num', 'Tickets Issued', 'Open Tickets Today', 'Open Prior', 'Closed Tickets'],
                    [TICKET_START_NUM, TICKET_END_NUM, TICKETS_ISSUED, OPEN_TICKETS_TODAY, OPEN_PRIOR, CLOSED_TICKETS]
                ]
            },
        },
        secondTable: {
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
        }
    }
    
    return tables;

}

// Variables();

module.exports = { automatedDailyHeaderTable }
