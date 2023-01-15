const { app, BrowserWindow } = require('electron');
const path = require('path');
const {Builder, By, Key, until, Browser, Options, WebDriver} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

window.addEventListener('click',(e)=>{
    var elementId = e.target.id;
    if(elementId) {
        var chromeOptions = new chrome.Options();
        var loadExtension = '--load-extension=';
        var globalRoot = require('path').resolve('./');
        var myExtension = 'my_extension';
        let result = loadExtension.concat(globalRoot, "\\", myExtension);

        chromeOptions.addArguments(result);
        let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
        example(driver);
    }
})

async function example(driver) {
    try {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver');
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        
    } finally {
        // await driver.quit();
    }
}