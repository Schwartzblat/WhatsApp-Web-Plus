injectScript('packed.js');

function injectScript(scriptName)
{
    return new Promise(function() {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL(scriptName);
        (document.head||document.documentElement).appendChild(s);
    });
}
