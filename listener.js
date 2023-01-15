const { app, BrowserWindow } = require('electron');
const path = require('path');
const {Builder, By, Key, until, Browser, Options, WebDriver} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// const chromeDriverPath = ".\\drivers\\chromedriver.exe"; // or wherever you've your driver path is.
// const serviceBuilder = new chrome(chromeDriverPath);
const ids = [];

window.addEventListener('input',(e)=>{
    var input=e.target
    console.log(input.id)
    // console.log(e)
    // console.log(e.target)
    // console.log(e.data)
})

window.addEventListener('click',(e)=>{
    var elementId = e.target.id;
    if(elementId) {
        console.log(elementId);
        var chromeOptions = new chrome.Options();
        chromeOptions.addArguments(`--load-extension=C:\\Manohar\\ExtensionClick`);
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