const storage = (() => {
    if (typeof browser !== "undefined" && browser.storage)
        return browser.storage;
    return chrome.storage;
})();

storage.sync.get('settings').then((data) => { // chrome.storage.sync.get
    if (data?.settings === undefined) {
        storage.sync.set({ // chrome.storage.sync.set
            settings: {
                view_once_media: true,
                keep_revoked_messages: true,
                keep_edited_messages: true,
                indicate_sender_os: true,
                special_tags: true,
                blue_ticks: true,
                fullscreen: true
            }
        });
    }
});
