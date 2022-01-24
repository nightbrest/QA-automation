'use strict'
// login to yahoo mail box and verifying the correct credentials
describe('yahoo mail page', ()=> {
    it('should login to yahoo mail box', async function() {
        await browser.url('https://www.yahoo.com');
        const mailButton = await $('//a[@id="ybarMailLink"]');
        await mailButton.click();
        
        const signInButton = await browser.findElement('xpath','//a[@alt="Sign in"]');
        const existButton = await $(signInButton);
        await existButton.click();
        
        let inputLogin = $('//input[@id="login-username"]');
        await inputLogin.addValue('qaautomation07@yahoo.com');
        
        const forwarLogindButton = await $('//input[@id="login-signin"]');
        await forwarLogindButton.click();
        
        let inputPass = $('//input[@id="login-passwd"]');
        await inputPass.addValue('suHGals126');
        
        const forwarPassButton = $('//button[@id="login-signin"]');
        await forwarPassButton.click();
    });
});

describe('yahoo mail user page', ()=> {
    it('verify of correct login', async function() {
       expect(await browser.getTitle()).toHaveText("qaautomation07@yahoo.com — Yahoo Почта");
    });
})

// create new mail
describe('working with mail', ()=> {
    it('should create new email', async function() {
        const createButton = await $('//a[@data-test-id="compose-button"]');
        await createButton.click();

        const inputReceiver = $('//input[@id="message-to-field"]');
        await inputReceiver.addValue('Ihar_Vaskaboinikau@epam.com');

        const inputSubject = $('//input[@data-test-id="compose-subject"]');
        await inputSubject.addValue('Test subject');

        const inputMessage = $('//div[@data-test-id="rte"]');
        await inputMessage.addValue('Hello, world! Hello, world! Hello, world!');
        // await browser.pause(3000)
    });
});
    // / verifying that created email is in drafts folder with correct body
describe('working with created email', ()=> {
    it('should verify that created email is in draft folder', async function() {
        const draftsButton = await $('//span[@data-test-folder-name="Draft"]');
        await draftsButton.click();
        await browser.pause(3000);
    });
    
    it('should open last email in drafts', async function() {
        const draftEmailRef = await browser.findElement('xpath', '//span[@title="ihar_vaskaboinikau@epam.com"][1]');
        const correctEmail = await $(draftEmailRef);
        await correctEmail.click();
        // await browser.pause(5000);
    });
    it('should verify that body of draft email is correct', async function() {
        
        const receiverValue = await $('//div[@data-test-id="pill"]');
        const receiverValueAttr = await receiverValue.getAttribute('title');
        expect(receiverValueAttr).toEqual('Ihar_Vaskaboinikau@epam.com <ihar_vaskaboinikau@epam.com>');

        const subjectValue = await $('//input[@data-test-id="compose-subject"]');
        const  subjectValueAttr = await subjectValue.getAttribute('value');
        expect(subjectValueAttr).toEqual('Test subject');
        
        const messageValueRef = await browser.findElement('xpath', '//div[@data-test-id="rte"]');
        const correctmessageValue = await $(messageValueRef);
        expect(correctmessageValue).toHaveText('Hello, world! Hello, world! Hello, world!');
    }); 
    
    it('should send email from drafs', async function() {
        const sendButton = await $('//button[@data-test-id="compose-send-button"]');
        await sendButton.click();
    });   
});

describe('working with page after the email was send', ()=> {
    it('should verify that send email dissapeared from drafts folder', async function() {
        const draftsButton = await $('//span[@data-test-folder-name="Draft"]');
        await draftsButton.click();

        const sendEmail = await $('//span[@title="ihar_vaskaboinikau@epam.com"][1]');
        const isDisplayed = await sendEmail.isDisplayed();
        expect(isDisplayed).toHaveValue(false);
    });

    it('should verify that send email is in "Send" folder', async function() {
        const sendButton = await $('//span[@data-test-folder-name="Sent"]');
        await sendButton.click();

        const sendEmail = await $('//span[@title="ihar_vaskaboinikau@epam.com"]');
        const isDisplayed = await sendEmail.isDisplayed();
        expect(isDisplayed).toHaveValue(true);
    });

    it('should log off', async function() {
        await $('//input[@id="ybarAccountMenu"]').moveTo();
        
        const logOffButton = await $('//a[@id="profile-signout-link"]');
        await logOffButton.waitForDisplayed({ timeout: 3000 });
        await logOffButton.click();
        
    });  
})