const { automatedDailyHeaderTable } = require('./AutomatedDailyReportPage/automatedDailyHeader');
const { transactionTable } = require('./AutomatedDailyReportPage/transactionTable');
const data = require('./fetchData');


const createPdf = async (req, res) => {
  console.log("hi");

  data.setDate({inDate: '2022-11-10', outDate: '2022-11-10'});
  data.dbConfiguration('Waverly');

  let fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

  let PdfPrinter = require('pdfmake');
  let fs = require('fs');

  const automatedDailyHeaderTablesObj = await automatedDailyHeaderTable();
   const transactionTableObj = await transactionTable();
  // console.log('transactionTableq: ',  transactionTableq);

  let docDefinition = {
    content: [
      automatedDailyHeaderTablesObj.firstTable,
      automatedDailyHeaderTablesObj.secondTable,
      transactionTableObj,
    ]
  }

  // docDefinition.content.push(automatedDailyHeaderTables.firstTable);
  // docDefinition.content.push(automatedDailyHeaderTables.secondTable);
  // docDefinition.content.push(transactionTableq);

  let docDefinition2 = {
    content:[
      "hello"
    ]
  }
  let options = {
    // ...
  }

  // let pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  // pdfDoc.pipe(fs.createWriteStream('document.pdf'));
  // pdfDoc.end();

   //...
   let printer = new PdfPrinter(fonts);
   let doc = printer.createPdfKitDocument(docDefinition)
   let chunks = [];
   let result;

   doc.on('data', function (chunk) {
      chunks.push(chunk);
   });
   doc.on('end', function () {
     result = Buffer.concat(chunks);
    //  Buffer.
     res.contentType('application/pdf');
     res.send(result);
    });
    doc.end();    
   //...

}


// createPdf();
module.exports = {createPdf}
