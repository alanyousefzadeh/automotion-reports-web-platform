import Table from 'react-bootstrap/Table';
import './AtlanticTable.scss';

function AtlanticTable(props) {
    
    const {atlanticTable, atlanticDiscountTable, atlanticMiscTable} = props;

    let totalDefaultTixSold = Object.values(atlanticTable).reduce((sum, value)=>{
        return sum + value.tally;
    }, 0)
    
    let totalDiscountTixSold = Object.values(atlanticDiscountTable).reduce((sum, value)=>{
        return sum + value.tally;
    }, 0)

    let totalMiscTixSold = atlanticMiscTable.tally;
    
    let totalDefaultPaidWTax = Object.values(atlanticTable).reduce((sum, value)=>{
        return sum + value.totalPaid;
    }, 0)

    let totalDiscountPaidWTax = Object.values(atlanticDiscountTable).reduce((sum, value)=>{
        return sum + value.totalPaid;
    }, 0)

    let totalMiscPaidWTax = atlanticMiscTable.totalPaid;

    return (
        <>
        <Table striped bordered >
            <thead>
                <tr className='table-warning'>
                    <th>Revenue by Rate</th>
                    <th>Tickets</th>
                    {/* <th>Total</th> */}
                    <th>Total w/ Tax</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Default Board - 1/2h</th>
                    <td>{atlanticTable['Default Rate - 1/2hr'].tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticTable['Default Rate - 1/2hr'].totalPaid.toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Default Board - 1h</th>
                    <td>{atlanticTable['Default Rate - 1hr'].tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticTable['Default Rate - 1hr'].totalPaid.toFixed(2)}`}</td>

                </tr>
                <tr>
                    <th>Default Board - 2h</th>
                    <td>{atlanticTable['Default Rate - 2hr'].tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticTable['Default Rate - 2hr'].totalPaid.toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Default Board - 10h</th>
                    <td>{atlanticTable['Default Rate - 10hr'].tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticTable['Default Rate - 10hr'].totalPaid.toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Default Board - 24h</th>
                    <td>{atlanticTable['Default Rate - 24hr'].tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticTable['Default Rate - 24hr'].totalPaid.toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Early Bird</th>
                    <td>{atlanticTable['Early'].tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticTable['Early'].totalPaid.toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Misc. Tickets</th>
                    <td>{atlanticMiscTable.tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticMiscTable.totalPaid.toFixed(2)}`}</td>
                </tr> 
            {Object.keys(atlanticDiscountTable).map((key) => {
                return(
                <tr key={key} >
                    <th>{key}</th>
                    <td>{atlanticDiscountTable[key].tally}</td>
                    {/* <td>$$$$</td> */}
                    <td>{`$${atlanticDiscountTable[key].totalPaid.toFixed(2)}`}</td>
                </tr>
                )
            })
            }

            </tbody>
            <thead>
                <tr className='table-success'>
                    <th>All Totals:</th>
                    <th>{totalDefaultTixSold + totalDiscountTixSold + totalMiscTixSold}</th>
                    {/* <th>$$$.$$</th> */}
                    <th>{`$${(totalDefaultPaidWTax + totalDiscountPaidWTax + totalMiscPaidWTax).toFixed(2) }`}</th>

                </tr>
            </thead>
            </Table></>
    )
}

export default AtlanticTable;

