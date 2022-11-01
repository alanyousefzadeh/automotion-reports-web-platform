const axios = require("axios");

exports.data = (req, res) => {
  let from = req.body.inDate;
  let to = req.body.outDate;
  let inTime = req.body.inTime;
  let outTime = req.body.outTime;

  console.log("body9", req.body.inDate);
  console.log("headers10", req.headers.authorization)
  console.log("from", from);
  console.log("to", to);

var xmlBodyStr = 
`<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
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
                        <a:Value>${from}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>2</a:Id>
                        <a:Name>StartTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${inTime}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>3</a:Id>
                        <a:Name>EndDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${to}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>4</a:Id>
                        <a:Name>EndTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${outTime}</a:Value>
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
  .then((response) => {
    
    //console.log(JSON.stringify(res.data))
    res.send(response.data)

  })
}

exports.discountData = (req, res) => {
  let from = req.body.inDate;
  let to = req.body.outDate;
  let inTime = req.body.inTime;
  let outTime = req.body.outTime;

  console.log(req.body);
  console.log("from", from);
  console.log("to", to);

var xmlBodyStr = 
`<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
<s:Body>
    <ExecuteReport xmlns="http://tempuri.org/">
        <request xmlns:a="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts.Reports" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <AuthenticationToken xmlns="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts">3tmx1wvx6UScgPi3dHs1DSyVGc4=</AuthenticationToken>
            <a:PropertyId>1000175</a:PropertyId>
            <a:ReportDefinition>
                <a:Id>2</a:Id>
                <a:Name>CashierSummaryReport</a:Name>
                <a:Parameters>
                    <a:ReportParameterContract>
                        <a:Id>1</a:Id>
                        <a:Name>StartDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${from}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>2</a:Id>
                        <a:Name>StartTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${inTime}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>3</a:Id>
                        <a:Name>EndDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${to}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>4</a:Id>
                        <a:Name>EndTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${outTime}</a:Value>
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
                        <a:Value></a:Value>
                    </a:ReportParameterContract>

                     <a:ReportParameterContract>
                        <a:Id>9</a:Id>
                        <a:Name>PropertyID</a:Name>
                        <a:ParameterType>Integer</a:ParameterType>
                        <a:Value>1</a:Value>
                    </a:ReportParameterContract>


                </a:Parameters>
                <a:ReportType>CvpsReport</a:ReportType>
                <a:SourceName>rpt.spCashierSummaryReport_Discounts</a:SourceName>
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
  .then((response) => {
    //console.log(JSON.stringify(res.data))
    res.send(response.data)

  })
}
//////////////////////////////
//////////////////////////////////
exports.tickets = (req, res) => {
  let from = req.body.inDate;
  let to = req.body.outDate;
  let inTime = req.body.inTime;
  let outTime = req.body.outTime;

  console.log(req.body);
  console.log("from", from);
  console.log("to", to);

var xmlBodyStr = 
`<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
<s:Body>
    <ExecuteReport xmlns="http://tempuri.org/">
        <request xmlns:a="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts.Reports" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <AuthenticationToken xmlns="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts">3tmx1wvx6UScgPi3dHs1DSyVGc4=</AuthenticationToken>
            <a:PropertyId>1000175</a:PropertyId>
            <a:ReportDefinition>
                <a:Id>2</a:Id>
                <a:Name>CashierSummaryReport</a:Name>
                <a:Parameters>
                    <a:ReportParameterContract>
                        <a:Id>1</a:Id>
                        <a:Name>StartDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${from}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>2</a:Id>
                        <a:Name>StartTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${inTime}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>3</a:Id>
                        <a:Name>EndDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${to}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>4</a:Id>
                        <a:Name>EndTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${outTime}</a:Value>
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
                        <a:Value></a:Value>
                    </a:ReportParameterContract>

                     <a:ReportParameterContract>
                        <a:Id>9</a:Id>
                        <a:Name>PropertyID</a:Name>
                        <a:ParameterType>Integer</a:ParameterType>
                        <a:Value>1</a:Value>
                    </a:ReportParameterContract>


                </a:Parameters>
                <a:ReportType>CvpsReport</a:ReportType>
                <a:SourceName>rpt.spCashierSummaryReport_TicketRanges</a:SourceName>
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
  .then((response) => {
    //console.log(JSON.stringify(res.data))
    res.send(response.data)

  })
}
/////////////////////////////////////////////////
////////////////////////////////////////
exports.payments = (req, res) => {
  let from = req.body.inDate;
  let to = req.body.outDate;
  let inTime = req.body.inTime;
  let outTime = req.body.outTime;

  console.log(req.body);
  console.log("from", from);
  console.log("to", to);

var xmlBodyStr = 
`<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
<s:Body>
    <ExecuteReport xmlns="http://tempuri.org/">
        <request xmlns:a="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts.Reports" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <AuthenticationToken xmlns="http://schemas.datacontract.org/2004/07/STS.Directory.Web.Services.Contracts">3tmx1wvx6UScgPi3dHs1DSyVGc4=</AuthenticationToken>
            <a:PropertyId>1000175</a:PropertyId>
            <a:ReportDefinition>
                <a:Id>2</a:Id>
                <a:Name>CashierSummaryReport</a:Name>
                <a:Parameters>
                    <a:ReportParameterContract>
                        <a:Id>1</a:Id>
                        <a:Name>StartDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${from}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>2</a:Id>
                        <a:Name>StartTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${inTime}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>3</a:Id>
                        <a:Name>EndDate</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${to}</a:Value>
                    </a:ReportParameterContract>
                    <a:ReportParameterContract>
                        <a:Id>4</a:Id>
                        <a:Name>EndTime</a:Name>
                        <a:ParameterType>String</a:ParameterType>
                        <a:Value>${outTime}</a:Value>
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
                        <a:Value></a:Value>
                    </a:ReportParameterContract>

                     <a:ReportParameterContract>
                        <a:Id>9</a:Id>
                        <a:Name>PropertyID</a:Name>
                        <a:ParameterType>Integer</a:ParameterType>
                        <a:Value>1</a:Value>
                    </a:ReportParameterContract>


                </a:Parameters>
                <a:ReportType>CvpsReport</a:ReportType>
                <a:SourceName>rpt.spCashierSummaryReport_CashCreditCharge</a:SourceName>
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
  .then((response) => {
    //console.log(JSON.stringify(res.data))
    res.send(response.data)

  })
}