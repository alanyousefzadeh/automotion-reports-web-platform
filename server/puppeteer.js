const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setExtraHTTPHeaders({
        'Token':    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNobXVlbHdAYXV0b21vdGlvbnBhcmtpbmcuY29tIiwiaWF0IjoxNjY4NzA2MDU0LCJleHAiOjE2Njg3OTI0NTR9.gb-3Nt3s9iVhLdoFzdTcIy8xPjBRagZ3XlUH5EEIxuU`    });
    
    const fullUrl = 'http://localhost:3000/reportSelect/Baxter/filtered/dates?inDate=2022-11-01&outDate=2022-11-05'
    
    await page.goto(fullUrl, {
        //waitUntil: 'networkidle0',
      });

      await page.waitForSelector('.filtered-report-tables', {
        visible: true,
      });
    await page.waitForNavigation({
       // waitUntil: 'networkidle0',
    });
    // Navigates to the project README file
    // await page.goto(fullUrl);
    // Generates a PDF from the page content
    await page.pdf({ path: 'overview.pdf' });
    await browser.close();
})();