// import './ReportHeader.scss';
import Table from 'react-bootstrap/Table';
import './TransactionTable.scss'
function TransactionTable(props) {
    const {
        // garageName,
        // inDate, 
        // outDate,
        monthlyInTable,
        monthlyOutTable,
        transientInTable,
        transientOutTable, 
        monthlyInTotal,
        monthlyOutTotal,
        transientInTotal,
        transientOutTotal,
        total
    } = props;

    console.log(total)

    let listElements = []

    let times = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM','10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM','10 PM', '11 PM'
    ]

    for(let i = 0; i<24;  i++ ) {
        listElements.push([transientInTable[i], transientOutTable[i], monthlyInTable[i], monthlyOutTable[i]])
    } 

    console.log(listElements)

    return(
            <>
            <Table striped bordered className='table-sm'>
            <thead>
                <tr className='table-warning'>
                    <th className='hours'>Hour</th>
                    <th>T. In</th>
                    <th>T. Out</th>
                    <th>M. In</th>
                    <th>M. Out</th>
                    <th>Tot.</th>
                </tr>
            </thead>
            <tbody>
            {
                listElements.map((row, index)=>{
                    return(
                    <tr key={index}>
                        <th>{times[index]}</th>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                        <td>{row[0]+row[1]+row[2]+row[3]}</td>
                    </tr>
                    )
                })
            }
                <tr className='table-success'>
                    <th>Total</th>
                    <th>{transientInTotal}</th>
                    <th>{transientOutTotal}</th>
                    <th>{monthlyInTotal}</th>
                    <th>{monthlyOutTotal}</th>
                    <th>{transientInTotal+transientOutTotal+monthlyInTotal+monthlyOutTotal}</th>
                </tr>
                <tr className='table-success'>
                    <th>Total: ${total.toLocaleString(undefined, {minimumFractionDigits: 2})}</th>
                    
                </tr>
            </tbody>
            </Table>
            </>
    )
    
}

export default TransactionTable;