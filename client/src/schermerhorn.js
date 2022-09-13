const axios = require("axios");

// const OPEN_API_URL = `https://ssl.garagenet.com/api/N2UwNjFi/woc/reports/allClosedInventoryData?from=1662436800&to=1662565135`
//     axios
//       .get(OPEN_API_URL, {
//         auth: {
//           username: "wocreports",
//           password: "wqEsCg0LticrMNtG",
//         },
//       })
//       .then((response) => console.log(response.data))
//       .catch((err) => {
//         res.send(err);
//       });

const parseString = require("xml2js").parseString;
// exports.handler =
// function(context, event, callback) {
var xmlBodyStr = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
<s:Body>
    <ExecuteReport xmlns="http://tempuri.org/">
        <request xmlns:a="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts.Reports" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <AuthenticationToken xmlns="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts">BPY+CQQ1TetUsvtXizp4VKCJya8=</AuthenticationToken>
            <a:PropertyId>1000175</a:PropertyId>
            <a:ReportDefinition>
                <a:Id>2</a:Id>
                <a:Name>CashierSummaryReport</a:Name>
                <a:Parameters>
                    <a:ReportParameterContract>
                        <a:Id>1</a:Id>
                        <a:Name>StartDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>09/01/2022</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>2</a:Id>
                        <a:Name>StartTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>12:00 AM</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>3</a:Id>
                        <a:Name>EndDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>09/01/2022</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>4</a:Id>
                        <a:Name>EndTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>11:59:59 PM</a:Value>
                    </a:ReportParameterContract>
                 <a:ReportParameterContract>
                        <a:Id>5</a:Id>
                        <a:Name>Location</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>0</a:Value>
                    </a:ReportParameterContract>
                     <a:ReportParameterContract>
                        <a:Id>6</a:Id>
                        <a:Name>GuestTypeID</a:Name>
                        <a:ParameterType>Integer</a:ParameterType>
                        <a:Value>0</a:Value>
                    </a:ReportParameterContract>
                     <a:ReportParameterContract>
                        <a:Id>7</a:Id>
                        <a:Name>EmployeeID</a:Name>
                        <a:ParameterType>Integer</a:ParameterType>
                        <a:Value>0</a:Value>
                    </a:ReportParameterContract>
                     <a:ReportParameterContract>
                        <a:Id>8</a:Id>
                        <a:Name>RateIDs</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>5,8,2,6,11,3,10,7,4,9</a:Value>
                    </a:ReportParameterContract>
                     <a:ReportParameterContract>
                        <a:Id>9</a:Id>
                        <a:Name>PropertyID</a:Name>
                        <a:ParameterType>Integer</a:ParameterType>
                        <a:Value>1</a:Value>
                    </a:ReportParameterContract>
                </a:Parameters>
<a:SourceName>rpt.spCashierSummaryReport_LocationsGuestType</a:SourceName>
<a:ReportType>CvpsReport</a:ReportType>
</a:ReportDefinition>
            <a:ServiceCallerId>1000</a:ServiceCallerId>
        </request>
    </ExecuteReport>
</s:Body>
</s:Envelope>`;
var config = {
  headers: {
    "Content-Type": "text/xml",
    SOAPAction: "http://tempuri.org/IReportService/ExecuteReport",
  },
};
axios
  .post(
    "http://v3.cvpsapi.com/Reports/ReportService.svc/basic",
    xmlBodyStr,
    config
  )
  .then((res) => {
    
    console.log(JSON.stringify(res.data))

  })
