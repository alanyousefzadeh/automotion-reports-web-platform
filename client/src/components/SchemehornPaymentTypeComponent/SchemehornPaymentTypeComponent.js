import React from "react";
import Table from "react-bootstrap/Table";

export default function PaymentTypes(props) {
  const { paymentTypes } = props;

  function findNodeByInnerHTML(nodelist, text, childIndex) {
    for (let i = 0; i < nodelist.length; i++) {
      if (nodelist[i].children[4].innerHTML === text){
        return nodelist[i].children[childIndex].innerHTML;
      }
    }
    return 0
  }
  //[count, total]
  let amex = [0, 0];
  let mc = [0, 0];
  let discover = [0, 0];
  let visa = [0, 0];

  let mobilePayment = [0, 0];

  let cash = [0,0];

  let ccTotalCount = 0;
  let ccTotalAmount = 0;

  let totals = [0, 0];

  let eftpos = [0, 0];

  let noFee = [0, 0];

  let comps = [0, 0];

  let totWComps = [0, 0];

  let rows = null;
  let xmlContent = paymentTypes;
  let parser = new DOMParser();
  let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
  //console.log(xmlDOM);
  
  if (paymentTypes !== null) {
    rows = xmlDOM.querySelectorAll("ResultingValueField");

    amex[0] = Number(
      findNodeByInnerHTML(rows, "AMEXCount",2)
    );
    amex[1] = Number(
      findNodeByInnerHTML(rows, "AMEXTotal", 1)
    );

    mobilePayment[0] = Number(
      findNodeByInnerHTML(rows, "MobilePaymentCount", 2)
    );
    mobilePayment[1] = Number(
      findNodeByInnerHTML(rows, "MobilePaymentTotal", 1)
    );

    mc[0] = Number(findNodeByInnerHTML(rows, "MCCount", 2));
    mc[1] = Number(findNodeByInnerHTML(rows, "MCTotal", 1));

    discover[0] = Number(
      findNodeByInnerHTML(rows, "DiscoverCount", 2)
    );
    discover[1] = Number(
      findNodeByInnerHTML(rows, "DiscoverTotal", 1)
    );

    visa[0] = Number(
      findNodeByInnerHTML(rows, "VISACount", 2)
    );
    visa[1] = Number(
      findNodeByInnerHTML(rows, "VISATotal", 1)
    );

    cash[0] = Number(
      findNodeByInnerHTML(rows, "CashCount", 2)
    );
    cash[1] = Number(
      findNodeByInnerHTML(rows, "CashTotal", 1)
    );

    ccTotalCount = amex[0] + mc[0] + discover[0] + visa[0];
    ccTotalAmount = amex[1] + mc[1] + discover[1] + visa[1];

    eftpos[0] = Number(
      findNodeByInnerHTML(rows, "EftposCount", 2)
    );

    eftpos[1] = Number(
      findNodeByInnerHTML(rows, "EftposTotal", 1)
    );

    noFee[0] = Number(
      findNodeByInnerHTML(rows, "NoFeeCount", 2)
    );

    comps[0] = Number(
      findNodeByInnerHTML(rows, "CompCount", 2)
    );

    comps[1] = Number(
      findNodeByInnerHTML(rows, "CompTotal", 1)
    );
    totals[0] =
      cash[0] + ccTotalCount + eftpos[0] + noFee[0] + mobilePayment[0];
    totals[1] = cash[1] + ccTotalAmount + eftpos[1] + mobilePayment[1];
    totWComps[0] = totals[0] + comps[0];
    totWComps[1] = totals[1] + comps[1];
  }

  return (
    paymentTypes &&
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
            <th>{cash[0]}</th>
            <th>
              $
              {cash[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
          <tr>
            <th>Credit Card</th>
            <th>{ccTotalCount}</th>
            <th>
              $
              {ccTotalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
          <tr>
            <td>AMEX</td>
            <td>{amex[0]}</td>
            <td>
              $
              {amex[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
          <tr>
            <td>Discover</td>
            <td>{discover[0]}</td>
            <td>
              $
              {discover[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
          <tr>
            <td>Master Card</td>
            <td>{mc[0]}</td>
            <td>
              $
              {mc[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
          <tr>
            <td>Visa</td>
            <td>{visa[0]}</td>
            <td>
              {visa[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
          <tr>
            <th>Mobile Payments</th>
            <th>{mobilePayment[0]}</th>
            <th>
              $
              {mobilePayment[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
          <tr>
            <th>EFTPOS</th>
            <th>{eftpos[0]}</th>
            <th>
              $
              {eftpos[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
          <tr>
            <th>No Fee Due</th>
            <th>{noFee[0]}</th>
            <th>$0.00</th>
          </tr>
          <tr>
            <th>Totals:</th>
            <th>{totals[0]}</th>
            <th>
              $
              {totals[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
          <tr>
            <th>Comps:</th>
            <th>{comps[0]}</th>
            <th>
              $
              {comps[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
          <tr>
            <th>Totals w/ Comps:</th>
            <th>{totWComps[0]}</th>
            <th>
              $
              {totWComps[1].toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
