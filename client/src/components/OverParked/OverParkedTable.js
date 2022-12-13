import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function OverParkedTable(props){
    const {overParkedData, garageName} = props

    return (

        <Table striped bordered className='report table-sm'>
        <thead>
            <tr className='table-warning'>
                <th>Type</th>
                <th>Ticket Number</th>
                <th>Parked In</th>
                <th>Total Days In Garage</th>
            </tr>
        </thead>
        <tbody>
        {
            overParkedData.map((data, index)=>{
                return(
                <tr key={index}>
                    <th>{data.type}</th>
                    {/* <td>{data.STOPAKey2}</td> */}
                    <td><Link to={`/reportSelect/${garageName}/daily/carDetails/${data.STOPAKey2}`}>{data.STOPAKey2}</Link></td>
                    <td>{new Date((data.InDateTime).slice(0,-1)).toLocaleString()}</td>
                    <td>{data.TotalDays}</td>
                </tr>
                )
            })
        }
        </tbody>
        </Table>
        
    )
}

export default OverParkedTable;