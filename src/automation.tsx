// export {}
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        // devtools: true
    });
    try {
        const page = await browser.newPage();
        await page.goto('https://fir-rules-f324d.web.app');
        await page.type('#name', 'foo', {delay: 100});
        await page.type('#email', 'foo@gmail.com', {delay: 100});
        await page.type('#password', 'asdasd', {delay: 100});
        await page.click('#submit', {delay: 100});
        await page.waitForTimeout(1000);
        await page.type('#changeName', 'foo-0', {delay: 100});
        await page.click('#button0', {delay: 2000});
        await page.waitForTimeout(1500);
        await page.type('#changeName', 'foo-1', {delay: 100});
        await page.click('#button1', {delay: 2000});
        await page.waitForTimeout(1500);
        await page.type('#changeName', 'foo-2', {delay: 100});
        await page.click('#button2', {delay: 2000});
        await page.waitForTimeout(1500);
        await page.click('#delete-user');
        await page.click('#delete-user');


    } catch(err) {
        console.log(err);
        
    }
    
})();