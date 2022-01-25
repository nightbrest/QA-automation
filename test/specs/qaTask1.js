'use strict'
describe("Should proceed to yahoo mail page from yahoo.com/open mail credentials page/ fill login and password form/ proceed to user's personal mail page:   ", ()=> {
    it('Step 1 - Should proceed to yahoo mail page from yahoo.com/ verify that it is mail page', async function() {
        await browser.url('https://www.yahoo.com');
        await $('//a[@id="ybarMailLink"]').click();
        expect ($('//div[@id="going-places"]')).toHaveTextContaining("Yahoo Mail");
    })
       
    it('Step 2 - Open mail credentials page/ verify that it is correct page', async function() {
        const signInButton = await browser.findElement('xpath','//a[@alt="Sign in"]');
        const existButton = await $(signInButton);
        await existButton.click();
        expect ($('//div[@id="going-places"]')).toHaveAttrContaining('id="login-username-form"');
    });

    it("Step 3 - Fill login and password form; proceed to user's personal mail page / verify that it is correct page", async function() {
        await $('//input[@id="login-username"]').addValue('qaautomation07@yahoo.com');
        await $('//input[@id="login-signin"]').click();
        await $('//input[@id="login-passwd"]').addValue('suHGals126');
        await $('//button[@id="login-signin"]').click();
        expect(await browser.getTitle()).toHaveText("qaautomation07@yahoo.com — Yahoo Почта");
    });    
});

describe('Should create new email by filiing receiver, subject and message fields', ()=> {
    it('Step 4 - should create new email/should verify that all fields are filled correct ', async function() {
        await $('//a[@data-test-id="compose-button"]').click();
        await $('//input[@id="message-to-field"]').addValue('Ihar_Vaskaboinikau@epam.com');
        await $('//input[@data-test-id="compose-subject"]').addValue('Test subject');
        await $('//div[@data-test-id="rte"]').addValue('Hello, world! Hello, world! Hello, world!');
        expect('//div[@data-test-id="pill-text"]').toHaveTextContaining('Ihar_Vaskaboinikau@epam.com');
        expect('//input[@data-test-id="compose-subject"]').toHaveTextContaining('Test subject') &&
        expect('//div[@data-test-id="rte"]').toHaveTextContaining('Hello, world! Hello, world! Hello, world!');
        });
});
    
describe('Should save created email in Drafs folder/ open this email in Drafts folder/ send email from Drafts', ()=> {
    it('Step 5 - Should save created email in Drafs folder', async function() {
        await $('//span[@data-test-folder-name="Draft"]').click();        
    });
    
    it('Step 6 - should open last email in drafts/ should verify that body of draft email is correct', async function() {
        const draftEmailRef = await browser.findElement('xpath', '//span[@title="ihar_vaskaboinikau@epam.com"][1]');
        const correctEmail = await $(draftEmailRef);
        await correctEmail.click();
       
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
    
    it('Step 7 - should send email from drafs/ should verify that send email dissapeared from drafts folder', async function() {
        await $('//button[@data-test-id="compose-send-button"]').click();
        await $('//span[@data-test-folder-name="Draft"]').click();

        const sendEmail = await $('//span[@title="ihar_vaskaboinikau@epam.com"][1]');
        const isDisplayed = await sendEmail.isDisplayed();
        expect(isDisplayed).toHaveValue(false)
    });   
});

describe('Should open "Send" folder/ should verify that send email is in "Send" folder/ should log off ', ()=> {
    it('Step 8 - Should open "Send" folder/should verify that send email is in "Send" folder', async function() {
        await $('//span[@data-test-folder-name="Sent"]').click();

        const sendEmail = await $('//span[@title="ihar_vaskaboinikau@epam.com"]');
        const isDisplayed = await sendEmail.isDisplayed();
        expect(isDisplayed).toHaveValue(true);
    });

    it('Step 9 - Should log off/ should verify of being log out', async function() {
        await $('//input[@id="ybarAccountMenu"]').moveTo();
        
        const logOffButton = await $('//a[@id="profile-signout-link"]');
        await logOffButton.waitForDisplayed({ timeout: 3000 });
        await logOffButton.click();

        const sighInButton = await $('//div[@role="toolbar"]');
        const sighInButtonisDisplayed = await sighInButton.isDisplayed();
        expect(sighInButtonisDisplayed).toHaveValue(true);
        
    });  
})
