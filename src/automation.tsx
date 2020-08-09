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
        // Create user 1
        await page.type('#name', 'foo-1', {delay: 100});
        await page.type('#email', 'foo1@gmail.com', {delay: 100});
        await page.type('#password', 'asdasd', {delay: 100});
        await page.click('#submit', {delay: 100});
        await page.waitForTimeout(2500);
        await page.click('#logout-button', {delay: 100});

        // Create user 2
        await page.waitForTimeout(2500);
        await page.type('#name', 'foo-2', {delay: 100});
        await page.type('#email', 'foo2@gmail.com', {delay: 100});
        await page.type('#password', 'asdasd', {delay: 100});
        await page.click('#submit', {delay: 100});
        await page.waitForTimeout(2500);

        // Change name
        await page.type('#changeName', 'baz-0', {delay: 100});
        await page.click('#button0', {delay: 2000});
        await page.waitForTimeout(2500);
        await page.type('#changeName', 'baz-1', {delay: 100});
        await page.click('#button1', {delay: 2000});
        await page.waitForTimeout(2500);
        await page.type('#changeName', 'baz-2', {delay: 100});
        await page.click('#button2', {delay: 2000});
        await page.waitForTimeout(2500);
        await page.click('#logout-button', {delay: 100});


        // Login as admin
        await page.waitForTimeout(2500);
        await page.click('#account-button', {delay: 1000});
        await page.waitForTimeout(1000);
        await page.type('#email', 'admin@gmail.com', {delay: 100});
        await page.type('#password', 'asdasd', {delay: 100});
        await page.click('#submit', {delay: 100});

         // Change name
        await page.waitForTimeout(2500);
        await page.type('#changeName', 'foo-0 (again)', {delay: 100});
        await page.click('#button0', {delay: 2000});
        await page.waitForTimeout(2500);
        await page.type('#changeName', 'foo-1 (again)', {delay: 100});
        await page.click('#button1', {delay: 2000});
        await page.waitForTimeout(2500);
        await page.type('#changeName', 'foo-2 (again)', {delay: 100});
        await page.click('#button2', {delay: 2000});
        await page.waitForTimeout(2500);
        await page.click('#logout-button', {delay: 100});

        // Delete user 1
        await page.waitForTimeout(2500);
        await page.click('#account-button', {delay: 1000});
        await page.waitForTimeout(1000);
        await page.type('#email', 'foo1@gmail.com', {delay: 100});
        await page.type('#password', 'asdasd', {delay: 100});
        await page.click('#submit', {delay: 100});
        await page.waitForTimeout(2500);
        await page.click('#delete-user-button');
        await page.click('#delete-user-button');
        await page.waitForTimeout(2500);
        
         // Delete user 2
        await page.click('#account-button', {delay: 1000});
        await page.waitForTimeout(1000);
        await page.type('#email', 'foo2@gmail.com', {delay: 100});
        await page.type('#password', 'asdasd', {delay: 100});
        await page.click('#submit', {delay: 100});
        await page.waitForTimeout(2500);
        await page.click('#delete-user-button');
        await page.click('#delete-user-button');


    } catch(err) {
        console.log(err);
        
    }
    
})();