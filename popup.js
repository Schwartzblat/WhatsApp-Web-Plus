const extpay = ExtPay('whatsapp-web-plus');

const STORAGE_KEYS = {
    'extension_user': 'extensionpay_user'
};

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
    chrome.storage.sync.set({settings: active_settings});
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


const activate_button = document.getElementById('paymentButton');
activate_button.addEventListener('click', extpay.openPaymentPage);

chrome.storage.sync.get(STORAGE_KEYS.extension_user).then(user => {
    if (user.extensionpay_user.subscriptionStatus === 'active') {
        activate_button.innerText = 'Activated! 🎉';
    } else {
        activate_button.innerText = 'Activate';
    }
});

extpay.getUser().then(user => {
    if (user.paid) {
        activate_button.innerText = 'Activated! 🎉';
    } else {
        activate_button.innerText = 'Activate';
    }
}).catch(err => {
    console.log(err);
});

const settings_section = document.getElementById('settings_section');

chrome.storage.sync.get('settings').then(data => {
    active_settings = data.settings;
    for (const [setting_key, title] of Object.entries(settings_toggles)) {
        const item = add_setting_toggle(setting_key, title);
        settings_section.appendChild(item);
    }
});
