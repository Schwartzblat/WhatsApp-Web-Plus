const storage = (() => {
    if (typeof browser !== "undefined" && browser.storage)
        return browser.storage;
    return chrome.storage;
})();

function inject_script(scriptName) {
    return new Promise(function () {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL(scriptName);
        (document.head || document.documentElement).appendChild(s);
    });
}

function handle_settings_update(settings) {
    window.postMessage({'settings': settings});
}


inject_script('packed.js');


storage.sync.onChanged.addListener(function (changes) { // chrome.storage.sync.onChanged
    if (changes?.settings !== undefined) {
        handle_settings_update(changes.settings.newValue);
    }
});

setTimeout(function () {
    storage.sync.get('settings').then((data) => { // chrome.storage.sync.get
        window.postMessage({'settings': data.settings});
    });
}, 2000);
