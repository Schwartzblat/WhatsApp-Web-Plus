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


chrome.storage.sync.onChanged.addListener(function (changes) {
    if (changes?.settings !== undefined) {
        handle_settings_update(changes.settings.newValue);
    }
});

setTimeout(function () {
    chrome.storage.sync.get('settings').then((data) => {
        window.postMessage({'settings': data.settings});
    });
}, 2000);
