import React from "react";
import Table from "react-bootstrap/Table";

export default function PaymentTypes(props) {
  const { paymentTypes } = props;

  function findNodeByInnerHTML(nodelist, innerHTML) {
    for (let i = 0; i < nodelist.length; i++) {
      if (nodelist[i].children[4].innerHTML === innerHTML) return nodelist[i];
    }
  }

  let amex = [0, 0];
  let mc = [0, 0];
  let discover = [0, 0];
  let visa = [0, 0];

  let cashCount = 0;
  let cashTotal = 0;

  let ccTotalCount = 0;
  let ccTotalAmount = 0;
  
  let totals = [0,0]

  let eftpos = [0, 0]

  let noFeeCount = 0

  let comps = [0, 0]

  let totWComps = [0,0]

  let rows = null;
  let xmlContent = paymentTypes;
  let parser = new DOMParser();
  let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
  //console.log(xmlDOM);
  if (paymentTypes !== null) {
    rows = xmlDOM.querySelectorAll("ResultingValueField");

    amex[0] = Number(
      findNodeByInnerHTML(rows, "AMEXCount").children[2].innerHTML
    );
    amex[1] = Number(
      findNodeByInnerHTML(rows, "AMEXTotal").children[1].innerHTML
    );

    mc[0] = Number(findNodeByInnerHTML(rows, "MCCount").children[2].innerHTML);
    mc[1] = Number(findNodeByInnerHTML(rows, "MCTotal").children[1].innerHTML);

    discover[0] = Number(
      findNodeByInnerHTML(rows, "DiscoverCount").children[2].innerHTML
    );
    discover[1] = Number(
      findNodeByInnerHTML(rows, "DiscoverTotal").children[1].innerHTML
    );

    visa[0] = Number(
      findNodeByInnerHTML(rows, "VISACount").children[2].innerHTML
    );
    visa[1] = Number(
      findNodeByInnerHTML(rows, "VISATotal").children[1].innerHTML
    );

    cashCount = Number(
      findNodeByInnerHTML(rows, "CashCount").children[2].innerHTML
    );
    cashTotal = Number(
      findNodeByInnerHTML(rows, "CashTotal").children[1].innerHTML
    );

    ccTotalCount = amex[0] + mc[0] + discover[0] + visa[0];
    ccTotalAmount = amex[1] + mc[1] + discover[1] + visa[1];

    eftpos[0] = Number(
        findNodeByInnerHTML(rows, "EftposCount").children[2].innerHTML
      );
    
    eftpos[1] = Number(
        findNodeByInnerHTML(rows, "EftposTotal").children[1].innerHTML
      );

    noFeeCount = Number(
        findNodeByInnerHTML(rows, "NoFeeCount").children[2].innerHTML
      );

    comps[0] = Number(
        findNodeByInnerHTML(rows, "CompCount").children[2].innerHTML
      );
    
    comps[1] = Number(
        findNodeByInnerHTML(rows, "CompTotal").children[1].innerHTML
      );
    totals[0] = cashCount + ccTotalCount + eftpos[0] + noFeeCount
    totals[1] = cashTotal + ccTotalAmount + eftpos[1] 
    totWComps[0] = totals[0] + comps[0]
    totWComps[1] = totals[1] + comps[1]

  }

  return (
    <div className="report">
      <p className="report">Payment Types</p>
      <Table striped bordered className="table-sm table-font schemehorn report">
        <thead>
          <tr className="table-warning">
            <th>Type</th>
            <th>Count</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Cash</th>
            <td>{cashCount}</td>
            <td>${cashTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <th>Credit Card</th>
            <td>{ccTotalCount}</td>
            <td>${ccTotalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <td>AMEX</td>
            <td>{amex[0]}</td>
            <td>${amex[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <td>Discover</td>
            <td>{discover[0]}</td>
            <td>${discover[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <td>Master Card</td>
            <td>{mc[0]}</td>
            <td>${mc[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <td>Visa</td>
            <td>{visa[0]}</td>
            <td>{visa[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <th>EFTPOS</th>
            <td>{eftpos[0]}</td>
            <td>${eftpos[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <th>No Fee Due</th>
            <td>{noFeeCount}</td>
            <td>$0.00</td>
          </tr>
          <tr>
            <th>Totals:</th>
            <td>{totals[0]}</td>
            <td>${totals[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <th>Comps:</th>
            <td>{comps[0]}</td>
            <td>${comps[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>
          <tr>
            <th>Totals w/ Comps:</th>
            <td>{totWComps[0]}</td>
            <td>${totWComps[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</td>
          </tr>

        </tbody>
      </Table>
    </div>
  );
}
