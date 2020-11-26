
const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

const iohook = require('iohook')

const user = require('./config.json');
console.log(user);

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to Url
        await driver.get('https://open.spotify.com/');

        // Enter text "cheese" and perform keyboard action "Enter"
        const login = await driver.wait(until.elementLocated(By.className('_3f37264be67c8f40fa9f76449afdb4bd-scss _1f2f8feb807c94d2a0a7737b433e19a8-scss')), 5000);

        login.click()

        const email = await driver.wait(until.elementLocated(By.id('login-username')), 5000);
        const pass = await driver.wait(until.elementLocated(By.id('login-password')), 1000);

        email.sendKeys(user.email);
        pass.sendKeys(user.password);
        
        const button =await driver.wait(until.elementLocated(By.id('login-button')), 1000);

        button.click();
        console.log("done")
    }
    finally{
        play = driver.findElement(By.className('control-button spoticon-play-16 control-button--circled'))
        play.click();
        var state = "paused"
        iohook.on("keypress",async event => {
            if(event.keychar == 112){
                if (state == "paused"){
                play = driver.findElement(By.className('control-button spoticon-pause-16 control-button--circled'))
                state = "playing"
                } else {
                play = driver.findElement(By.className('control-button spoticon-play-16 control-button--circled'))
                state = "paused"
                }
                play.click();
            }
            if(event.keychar == 93){
                const next = driver.findElement(By.className('control-button spoticon-skip-forward-16'))             
                next.click(); 
            }
            if(event.keychar == 91){
                const prev = driver.findElement(By.className('bc13c597ccee51a09ec60253c3c51c75-scss'))
                prev.click();
            }
        });
        iohook.start();
    }
})();