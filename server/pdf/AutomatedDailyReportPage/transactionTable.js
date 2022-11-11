const data = require('../fetchData');

// monthlyInTable
// monthlyOutTable
// transientInTable
// transientOutTable 
// total

let transientInTable = new Array(24).fill(0);
let transientOutTable = new Array(24).fill(0);
let monthlyInTable = new Array(24).fill(0);
let monthlyOutTable = new Array(24).fill(0);

let times = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
]
let totalSum = 0;


const transactionTable = async () => {
    const tInDateTime = await data.tInDateTime();
    const tOutDateTimes = await data.tOutDateTime();
    const mInDateTimes = await data.mInDateTime();
    const mOutDateTimes = await data.mOutDataTime();

    tInDateTime.forEach((hour) => {
        transientInTable[hour.hourofday] = hour.countperhour;
    });
    tOutDateTimes.forEach((hour) => {
        transientOutTable[hour.hourofday] = hour.countperhour;
    });
    mInDateTimes.forEach((hour) => {
        monthlyInTable[hour.hourofday] = hour.countperhour;
    });
    mOutDateTimes.forEach((hour) => {
        monthlyOutTable[hour.hourofday] = hour.countperhour;
    });

    let listElements = [];
    for (let i = 0; i < 24; i++) {
        let sum = transientInTable[i] + transientOutTable[i] + monthlyInTable[i] + monthlyOutTable[i];
        totalSum += sum;
        listElements.push([times[i], transientInTable[i], transientOutTable[i], monthlyInTable[i], monthlyOutTable[i], sum])
    }

    const monthlyInTotal = monthlyInTable.reduce((prevVal, currVal) => prevVal + currVal, 0)
    const monthlyOutTotal = monthlyOutTable.reduce((prevVal, currVal) => prevVal + currVal, 0)
    const transientInTotal = transientInTable.reduce((prevVal, currVal) => prevVal + currVal, 0)
    const transientOutTotal = transientOutTable.reduce((prevVal, currVal) => prevVal + currVal, 0)

    table = {
        style: 'tableExample',
        margin: [10, 10, 10, 5],
        layout: {
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
        },
        table: {
            widths: ['*', '*', '*', '*', '*', 'auto'],
            body: [['Hour', 'T. In', 'T. Out', 'M. In', 'M. Out', 'Tot.'], ...listElements,
            ['Total', transientInTotal, transientOutTotal, monthlyInTotal, monthlyOutTotal, totalSum]
            ]

        }
    }

    return table;
}
module.exports = { transactionTable }


