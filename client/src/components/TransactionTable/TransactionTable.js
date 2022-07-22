// import './ReportHeader.scss';
import Table from 'react-bootstrap/Table';
function TransactionTable(props) {
    const {
        monthlyInTable,
        monthlyOutTable,
        transientInTable,
        transientOutTable
    } = props;

    let listElements = []
    let times = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM','10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM','10 PM', '11 PM'
    ]
    for(let i = 0; i<24;  i++ ) {
        listElements.push([transientInTable[i], transientOutTable[i], monthlyInTable[i], monthlyOutTable[i]])
    } 
    console.log(listElements)
    return(
        
            <Table striped bordered size='sm'>
            <thead>
                <tr className='table-warning'>
                    <th>Hour</th>
                    <th>Transient In</th>
                    <th>Transient Out</th>
                    <th>Monthly In</th>
                    <th>Monthly Out</th>
                    <th>Total</th>
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
            </tbody>
            </Table>
    )
    
}

export default TransactionTable;