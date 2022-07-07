import Table from 'react-bootstrap/Table';

function AtlanticTable(props) {
    const {atlanticNumberOfPayments, atlanticTotalWTax, atlanticTotalTickets, atlanticTotalWTaxPaid} = props;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Revenue by Rate</th>
                    <th>Tickets</th>
                    <th>Total</th>
                    <th>Total w/ Tax</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Default Board - 1/2h</td>
                    <td>{atlanticNumberOfPayments['30min']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['30min'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 1h</td>
                    <td>{atlanticNumberOfPayments['1hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['1hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 2h</td>
                    <td>{atlanticNumberOfPayments['2hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['2hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 10h</td>
                    <td>{atlanticNumberOfPayments['10hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['10hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 24h</td>
                    <td>{atlanticNumberOfPayments['24hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['24hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Early Bird</td>
                    <td>{atlanticNumberOfPayments['Early']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['Early'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>$0 Tickets</td>
                    <td>{atlanticNumberOfPayments['zero']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTax['zero'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Totals:</th>
                    <th>{atlanticTotalTickets}</th>
                    <th>$$$$</th>
                    <th>{`$${atlanticTotalWTaxPaid.toFixed(2)}`}</th>
                </tr>
            </tbody>
            </Table>

    )
}

export default AtlanticTable;

