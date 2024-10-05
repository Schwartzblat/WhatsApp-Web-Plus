const extpay = ExtPay('whatsapp-web-plus');

extpay.getUser().then(user => {
    if (user.paid) {
        console.log('User paid!');
        injectScript('packed.js');
    } else {
        extpay.openPaymentPage()
        console.log('Paged opened!');
    }
});


function injectScript(scriptName) {
    return new Promise(function () {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL(scriptName);
        (document.head || document.documentElement).appendChild(s);
    });
}
