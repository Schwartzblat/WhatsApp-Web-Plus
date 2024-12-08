const storage = (() => {
    if (typeof browser !== "undefined" && browser.storage)
        return browser.storage;
    return chrome.storage;
})();

const settings_toggles = {
    'view_once_media': 'View once bypass',
    'keep_revoked_messages': 'Keep revoked messages',
    'keep_edited_messages': 'Keep edited messages',
    'indicate_sender_os': 'Indicate sender OS',
    'special_tags': 'Special tags',
    'blue_ticks': 'Send blue ticks',
    'fullscreen': 'Fullscreen'
};

let active_settings = Object.fromEntries(Object.keys(settings_toggles).map(key => [key, true]));

const on_toggle = async (event) => {
    active_settings[event.target.id] = event.target.checked;
    storage.sync.set({settings: active_settings}); // chrome.storage.sync.set
};

const add_setting_toggle = (setting_key, title) => {
    const item = document.createElement('div');
    item.setAttribute('class', 'setting-item');

    const label = document.createElement('label');
    label.setAttribute('for', setting_key);
    label.textContent = title;
    item.appendChild(label);

    const toggle_switch = document.createElement('div');
    toggle_switch.setAttribute('class', 'toggle-switch');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', setting_key);
    input.addEventListener('change', on_toggle);
    input.checked = active_settings[setting_key];
    toggle_switch.appendChild(input);

    const toggle_label = document.createElement('label');
    toggle_label.setAttribute('for', setting_key);
    toggle_label.setAttribute('class', 'switch-label');
    toggle_switch.appendChild(toggle_label);

    item.appendChild(toggle_switch);
    return item;
};


const settings_section = document.getElementById('settings_section');

storage.sync.get('settings').then(data => { // chrome.storage.sync.get
    active_settings = data.settings;
    for (const [setting_key, title] of Object.entries(settings_toggles)) {
        const item = add_setting_toggle(setting_key, title);
        settings_section.appendChild(item);
    }
});
