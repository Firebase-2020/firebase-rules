// export {}
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    try {
        const page = await browser.newPage();
        await page.goto('https://fir-rules-f324d.web.app');
        // Fill an input.
        await page.type('#name', 'fotia', {delay: 100});
        await page.type('#email', 'footia@gmail.com', {delay: 100});
        await page.type('#password', 'asdasd', {delay: 100});
        await page.click('#submit');

    } catch(err) {
        console.log(err);
        
    }
    
})();