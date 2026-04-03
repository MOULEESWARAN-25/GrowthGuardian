const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[BROWSER_CONSOLE_${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });
  
  page.on('pageerror', err => {
    console.log(`[REACT_CRITICAL_EXCEPTION] ${err.message}\n${err.stack}`);
  });
  
  try {
    const res = await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log(`[HTTP_STATUS] ${res.status()}`);
    
    // Wait slightly for React to mount before parsing DOM
    await page.waitForTimeout(2000);
    
    const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 500) || "ROOT_NOT_FOUND");
    console.log(`[REACT_ROOT_DOM] ${rootHtml}`);
    
  } catch (e) {
    console.log(`[PUPPETEER_NAV_ERROR] ${e.message}`);
  }
  
  await browser.close();
})();
