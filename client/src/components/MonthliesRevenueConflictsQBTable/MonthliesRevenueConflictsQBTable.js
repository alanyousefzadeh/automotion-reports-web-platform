import React from 'react'
import Table from "react-bootstrap/Table";

export default function MonthliesRevenueConflictsQBTable(props) {

  const { payments, fob, name, type, rate, fobStatusIndex } = props
  
  //set to store all FOBs in QBs
  let fobsInQuickBooks = new Set()
  payments.forEach(payment => {
    if(payment.length > 28){
        fobsInQuickBooks.add(payment[28])
    }

    console.log(fobsInQuickBooks)
  });
  
  let filteredPayments = payments.filter((payment)=> (payment[fobStatusIndex] === "Active") && !fobsInQuickBooks.has(payment[fob] ) )
  console.log(filteredPayments)

  return (
    <Table striped bordered className="table-sm report">
    <thead>
        <tr className="table-warning">
            <th>Name</th>
            <th>FOB</th>
            <th>Type</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        {filteredPayments.map((payment, i) => {
            let paymentEdited = payment[rate].replace(/[$,]/g, '')
            if(paymentEdited > 0)
            return (
                    <tr key={i}>
                        <td>{payment[name]}</td>
                        <td>{payment[fob]}</td>
                        <td>{payment[type]}</td>
                        <td>{payment[rate]}</td>
                    </tr>
                );
            }
        )}
    </tbody>
</Table>
  )
}
