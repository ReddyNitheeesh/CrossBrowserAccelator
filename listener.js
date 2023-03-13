const { app, BrowserWindow } = require('electron');
const path = require('path');
const {Builder, By, Key, until, Browser, Options, WebDriver} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const firefoxDriverPath = "C:\\Manohar\\CrossBowser\\CrossBrowserAccelator\\drivers\\geckodriver.exe";


let driver

async function getChromeDriver() {
    var chromeOptions = new chrome.Options();
        var loadExtension = '--load-extension=';
        var globalRoot = require('path').resolve('./');
        var myExtension = 'my_extension';
        let result = loadExtension.concat(globalRoot, "\\", myExtension);

        chromeOptions.addArguments(result);
         driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
        example(driver);
}

async function getFirefoxDriver() {
    var firefoxOptions = new firefox.Options();
        var loadExtension = '--load-extension=';
        var globalRoot = require('path').resolve('./');
        var myExtension = 'content.xpi';
        let result = loadExtension.concat(globalRoot, "\\", myExtension);

        firefoxOptions.addArguments(result);
        firefoxOptions.setBinary('C:\\Program Files\\Mozilla Firefox\\firefox.exe');
    const driver = new Webdriver.Builder()
    .forBrowser('firefox').setFirefoxOptions(firefoxOptions)
    .build();
    example(driver);
}

async function example(driver) {
    try {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver');
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        
    } finally {
        // await driver.quit();
    }
}

async function getStorage() {

    let val = await driver.executeScript("return document.querySelector('crossbrowsertesting').innerHTML");
    let obj = JSON.parse(val);
    console.log(obj);
    await quitDriver()
        
}

async function quitDriver()
{
    if(driver != null){
        await driver.quit()
    }
      

}