const { automatedDailyHeaderTable } = require('./automatedDailyHeader');
const { transactionTable } = require('./TransactionTable');

async function createPdf() {

  let fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

  let PdfPrinter = require('pdfmake');
  let printer = new PdfPrinter(fonts);
  let fs = require('fs');

  const automatedDailyHeaderTables = await automatedDailyHeaderTable();
  const transactionTableq = await transactionTable();


  let docDefinition = {
    content: []
  }
  docDefinition.content.push(automatedDailyHeaderTables.firstTable);
  docDefinition.content.push(automatedDailyHeaderTables.secondTable);
  docDefinition.content.push(transactionTableq);

  let options = {
    // ...
  }

  let pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream('document.pdf'));
  pdfDoc.end();

}


createPdf();