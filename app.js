
const {Builder, By, Key, until, EventEmitter} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

const iohook = require('iohook')

const user = require('./config.json');

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
        var enabled = true;
        iohook.on("keypress",async event => {
            if(event.shiftKey && event.keychar == 88){
                if (enabled){
                    enabled = false;
                } else {
                    enabled = true;
                }
            }
            if (enabled){
                if(event.keychar == user.playpause){
                    play = driver.findElement(By.className('_82ba3fb528bb730b297a91f46acd37a3-scss'))
                    play.click();
                }
                if(event.keychar == user.next){
                    const next = driver.findElement(By.className('control-button spoticon-skip-forward-16'))             
                    next.click(); 
                }
                if(event.keychar == user.previous){
                    const prev = driver.findElement(By.className('bc13c597ccee51a09ec60253c3c51c75-scss'))
                    prev.click();
                }
            }
        });
        iohook.start();
    }
})();