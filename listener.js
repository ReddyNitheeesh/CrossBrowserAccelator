const { app, BrowserWindow } = require('electron');
const path = require('path');
const {Builder, By, Key, until, Browser, Options, WebDriver} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const firefoxDriverPath = "C:\\Manohar\\CrossBowser\\CrossBrowserAccelator\\drivers\\geckodriver.exe";

async function getChromeDriver() {
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

async function getFirefoxDriver() {
    const capabilities = {
            "moz:firefoxOptions": {
              "binary": "C:\\Users\\Manohar_Gadepally\\AppData\\Local\\Mozilla Firefox\\firefox.exe"
        }
    }

    var firefoxOptions = new firefox.Options();
    var loadExtension = '--install-extension=';
    var globalRoot = require('path').resolve('./');
    var myExtension = 'my_extension';
    let result = loadExtension.concat(globalRoot, "\\", myExtension);
    firefoxOptions.addArguments(result);
    let driver = new Builder()
        .withCapabilities(capabilities)
        .forBrowser('firefox')
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
