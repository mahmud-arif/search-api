const genericPool = require('generic-pool');
const puppeteer = require('puppeteer');

const factory = {
  create: async function() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 420 });
    return page;
  },
  destroy: function(puppeteer) {
    puppeteer.close();
  },
};

const browserPagePool = genericPool.createPool(factory, {
  max: 5,
  min: 0,
  maxWaitingClients: 5,
  
});

module.exports = browserPagePool;