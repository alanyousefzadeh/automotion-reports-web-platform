import Table from 'react-bootstrap/Table';

function AtlanticTable(props) {
    const {atlanticTicketsSoldPerRateTable, atlanticTotalWTaxTable} = props;

    //total number of all atlantic tickets sold without any discount 
    let atlanticTotalTicketsSoldNoDiscount = Object.values(atlanticTicketsSoldPerRateTable).reduce((sum, value) => {
        return sum + value;
    }, 0)

    //total $$$ revenue w/ tax of all non-discount tickets combined
    let atlanticTotalWTaxPaid = Object.values(atlanticTotalWTaxTable).reduce((sum, value) => {
        return (sum + value);
    }, 0)

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
                    <td>{atlanticTicketsSoldPerRateTable['30min']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTaxTable['30min'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 1h</td>
                    <td>{atlanticTicketsSoldPerRateTable['1hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTaxTable['1hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 2h</td>
                    <td>{atlanticTicketsSoldPerRateTable['2hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTaxTable['2hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 10h</td>
                    <td>{atlanticTicketsSoldPerRateTable['10hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTaxTable['10hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Default Board - 24h</td>
                    <td>{atlanticTicketsSoldPerRateTable['24hr']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTaxTable['24hr'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>Early Bird</td>
                    <td>{atlanticTicketsSoldPerRateTable['Early']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTaxTable['Early'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td>$0 Tickets</td>
                    <td>{atlanticTicketsSoldPerRateTable['zero']}</td>
                    <td>$$$$</td>
                    <td>{`$${atlanticTotalWTaxTable['zero'].toFixed(2)}`}</td>
                </tr>
                <tr>
                    <th>Totals:</th>
                    <th>{atlanticTotalTicketsSoldNoDiscount}</th>
                    <th>$$$$</th>
                    <th>{`$${atlanticTotalWTaxPaid.toFixed(2)}`}</th>
                </tr>
            </tbody>
            </Table>

    )
}

export default AtlanticTable;

