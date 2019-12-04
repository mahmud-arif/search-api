const browserPagePool = require('./services/browserPagePool');


const search = async term => {
  console.log('dkfjdk'); 
  const page = await browserPagePool.acquire();
  console.log(await browserPagePool.size);
  await page.goto('https://duckduckgo.com/?t=hk', { waitUntil: "networkidle0" });
  await page.waitForSelector('#search_form_input_homepage');
  await page.type('#search_form_input_homepage', term);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  const result = await page.evaluate(() => {
    const selector = [...document.querySelectorAll('.result__a')]; 
    return selector.map(a => a.textContent); 
  }); 
  await browserPagePool.release(page);
  console.log(browserPagePool.size); 
  return result; 
}


module.exports = search; 