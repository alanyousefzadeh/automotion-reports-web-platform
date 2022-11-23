const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setExtraHTTPHeaders({
        'Token':`eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4MDljZmYxMTZlNWJhNzQwNzQ1YmZlZGE1OGUxNmU4MmYzZmQ4MDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0b21vdGlvbi13ZWItcGxhdGZvcm0iLCJhdWQiOiJhdXRvbW90aW9uLXdlYi1wbGF0Zm9ybSIsImF1dGhfdGltZSI6MTY2OTA1MjIzNywidXNlcl9pZCI6IjFTcnREMHh2Y1pOZmpwc1AzbEc4ZDZGUndDRzIiLCJzdWIiOiIxU3J0RDB4dmNaTmZqcHNQM2xHOGQ2RlJ3Q0cyIiwiaWF0IjoxNjY5MDUyMjM3LCJleHAiOjE2NjkwNTU4MzcsImVtYWlsIjoiYWxhbnlAYWRnb3JnLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbGFueUBhZGdvcmcuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Vgb7t0kYfKXLEbf_vCMoe8CGgCdxx7X4Z7fY8KSu48koXmnGjdzudJJROSUixH8fRAoeFg2xWIyS0vkWkLTMWWiUKtlmJGWcpIDA_L3MQOsXWe_c6J2cjQEgcBuoVYbw6IABeskZ7Vp-rN6HWt_rFfuyzK06ZhI1cE0cplatd4KtJRnEeIjDWKl0hDOL-wfrSAsWYnNAPCATq-XR_DouwQWotsR4_RDICCkL9cLGjBVnOBnfqsLpy442UyqYaCorufzJYFkwgv3F2nRKPq_ZZQ9Ibs3-x4t4s0SpQAkQViYoa_w-8n7LHMR4cDludv346rkJrx50MIy8e4IU9dQ5Gg`});
    
    const fullUrl = 'http://localhost:3000/login'
    
    await page.goto(fullUrl, {
        // waitUntil: 'networkidle0',
      });

    await  page.type('#formBasicEmail','alany@adgorg.com')
    await  page.type('#formBasicPassword','Today294!')
    await  page.click('.btn')
    await  page.waitForNavigation({waitUntil: 'networkidle0'})
    //
    //   await page.waitForSelector('.filtered-report-tables', {
    //     visible: true,
    //   });
    // await page.waitForNavigation({
    //    // waitUntil: 'networkidle0',
    // });
    // Navigates to the project README file
    // await page.goto(fullUrl);
    // Generates a PDF from the page content
    await page.pdf({ path: 'overview.pdf' });
    await browser.close();
})();