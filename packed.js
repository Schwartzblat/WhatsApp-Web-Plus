/* global require */
window.plus_main = () => {
    class Hook {
        constructor() {
            this.is_registered = false;
        }
    
        register() {
            this.is_registered = true;
        }
    
        unregister() {
            this.is_registered = false;
        }
    }
    

    function set_key_json_recursive(obj, key, value) {
        for (let [current_key, current_value] of Object.entries(obj)) {
            if (current_key === key) {
                obj[current_key] = value;
            } else if (typeof current_value === 'object') {
                obj[current_key] = set_key_json_recursive(current_value, key, value);
            }
        }
        return obj;
    }
    

    const WA_MODULES = {
        PROCESS_EDIT_MESSAGE: 'WAWebDBProcessEditProtocolMsgs',
        PROCESS_RENDERABLE_MESSAGES: 'WAWebMessageProcessRenderable',
        MESSAGES_RENDERER: 'WAWebMessageMeta.react',
        PROTOBUF_HOOK: 'decodeProtobuf',
        SEND_MESSAGE: 'WAWebSendMsgRecordAction',
        QUERY_GROUP: 'WAWebGroupMsgSendUtils',
        OPEN_CHAT: 'useWAWebSetModelValue',
        HANDLE_RECEIPT: 'WAWebHandleDirectChatReceipt',
        RECEIPT_BATCHER: 'WAWebMessageReceiptBatcher',
        WEB_ACK: 'WAWebAck',
        WID_FACTORY: 'WAWebWidFactory',
        SERVER_PROPS: 'WAWebServerPropConstants',
        REVOKE_CONSTANTS: 'WAWebRevokeMsgConstants',
    };
    
    let MODULES = {
        PROCESS_EDIT_MESSAGE: undefined,
        PROCESS_RENDERABLE_MESSAGES: undefined,
        MESSAGES_RENDERER: undefined,
        PROTOBUF_HOOK: undefined,
        SEND_MESSAGE: undefined,
        QUERY_GROUP: undefined,
        OPEN_CHAT: undefined,
        HANDLE_RECEIPT: undefined,
        RECEIPT_BATCHER: undefined,
        WEB_ACK: undefined,
        WID_FACTORY: undefined,
        SERVER_PROPS: undefined,
        REVOKE_CONSTANTS: undefined,
    };
    

    const initialize_modules = () => {
        MODULES = {
            PROCESS_EDIT_MESSAGE: require(WA_MODULES.PROCESS_EDIT_MESSAGE),
            PROCESS_RENDERABLE_MESSAGES: require(WA_MODULES.PROCESS_RENDERABLE_MESSAGES),
            MESSAGES_RENDERER: require(WA_MODULES.MESSAGES_RENDERER),
            PROTOBUF_HOOK: require(WA_MODULES.PROTOBUF_HOOK),
            QUERY_GROUP: require(WA_MODULES.QUERY_GROUP),
            SEND_MESSAGE: require(WA_MODULES.SEND_MESSAGE),
            OPEN_CHAT: require(WA_MODULES.OPEN_CHAT),
            HANDLE_RECEIPT: require(WA_MODULES.HANDLE_RECEIPT),
            RECEIPT_BATCHER: require(WA_MODULES.RECEIPT_BATCHER),
            WEB_ACK: require(WA_MODULES.WEB_ACK),
            WID_FACTORY: require(WA_MODULES.WID_FACTORY),
            SERVER_PROPS: require(WA_MODULES.SERVER_PROPS),
            REVOKE_CONSTANTS: require(WA_MODULES.REVOKE_CONSTANTS),
        };
        console.log('Modules have been loaded successfully!');
    };
    

    class SettingsHook extends Hook {
        constructor() {
            super();
            this.original_multicats = null;
            this.original_revoke_window = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_multicats = MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL;
            MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL = Infinity;
            this.original_revoke_window = MODULES.REVOKE_CONSTANTS.REVOKE_WINDOW;
            MODULES.REVOKE_CONSTANTS.REVOKE_WINDOW = Infinity;
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL = this.original_multicats;
            MODULES.REVOKE_CONSTANTS.REVOKE_WINDOW = this.original_revoke_window;
        }
    
    }
    

    const APPLE_SVG = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg fill="#b3b3b3" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.773 22.773" xml:space="preserve" stroke="#b3b3b3"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"/> <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>';
    const ANDROID_SVG = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5915 3.88444C13.6002 3.32107 14.7626 3 16 3C17.2374 3 18.3998 3.32107 19.4085 3.88444L20.1464 3.14645C20.3417 2.95118 20.6583 2.95118 20.8536 3.14645C21.0488 3.34171 21.0488 3.65829 20.8536 3.85355L20.2612 4.44595C21.9266 5.72558 23 7.73743 23 10H9C9 7.73743 10.0734 5.72558 11.7388 4.44595L11.1464 3.85355C10.9512 3.65829 10.9512 3.34171 11.1464 3.14645C11.3417 2.95118 11.6583 2.95118 11.8536 3.14645L12.5915 3.88444ZM14 7C14 7.55228 13.5523 8 13 8C12.4477 8 12 7.55228 12 7C12 6.44772 12.4477 6 13 6C13.5523 6 14 6.44772 14 7ZM19 8C19.5523 8 20 7.55228 20 7C20 6.44772 19.5523 6 19 6C18.4477 6 18 6.44772 18 7C18 7.55228 18.4477 8 19 8Z" fill="#87C527"/> <path d="M5 12.5C5 11.6716 5.67157 11 6.5 11C7.32843 11 8 11.6716 8 12.5V18.5C8 19.3284 7.32843 20 6.5 20C5.67157 20 5 19.3284 5 18.5V12.5Z" fill="#87C527"/> <path d="M12 24V27.5C12 28.3284 12.6716 29 13.5 29C14.3284 29 15 28.3284 15 27.5V24H17V27.5C17 28.3284 17.6716 29 18.5 29C19.3284 29 20 28.3284 20 27.5V24H21C22.1046 24 23 23.1046 23 22V11H9V22C9 23.1046 9.89543 24 11 24H12Z" fill="#87C527"/> <path d="M24 12.5C24 11.6716 24.6716 11 25.5 11C26.3284 11 27 11.6716 27 12.5V18.5C27 19.3284 26.3284 20 25.5 20C24.6716 20 24 19.3284 24 18.5V12.5Z" fill="#87C527"/> </g></svg>';
    const DESKTOP_SVG = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="24px" height="24px" viewBox="0 0 32.00 32.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M12.8612 27.943C12.8281 28.4061 13.1949 28.8 13.6592 28.8H18.3408C18.8051 28.8 19.1719 28.4061 19.1388 27.943L18.4 17.6H13.6L12.8612 27.943Z" fill="url(#paint0_linear_103_1792)"/><path d="M28.8 0H3.2C1.43269 0 0 1.43269 0 3.2V19.2C0 20.9673 1.43269 22.4 3.2 22.4H28.8C30.5673 22.4 32 20.9673 32 19.2V3.2C32 1.43269 30.5673 0 28.8 0Z" fill="url(#paint1_radial_103_1792)"/><path d="M0 20.8C0 22.5673 1.43269 24 3.2 24H28.8C30.5674 24 32 22.5673 32 20.8V17.6H0V20.8Z" fill="#D8D8D8"/><path d="M17.6 20.8C17.6 19.9163 16.8837 19.2 16 19.2C15.1163 19.2 14.4 19.9163 14.4 20.8C14.4 21.6837 15.1163 22.4 16 22.4C16.8837 22.4 17.6 21.6837 17.6 20.8Z" fill="#2B2B2B"/><defs><linearGradient id="paint0_linear_103_1792" x1="16" y1="16.1707" x2="16" y2="28.8" gradientUnits="userSpaceOnUse"><stop stop-color="#B8B8B8"/><stop offset="1" stop-color="#C7C7C7"/></linearGradient><radialGradient id="paint1_radial_103_1792" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1.0941 28.8) rotate(137.02) scale(42.2447 63.3453)"><stop/><stop offset="1" stop-color="#757575"/></radialGradient></defs></g></svg>';
    const get_svg_by_id = (id) => {
        return id.length > 22 ? ANDROID_SVG : id.substring(0, 2) === '3A' ? APPLE_SVG : DESKTOP_SVG;
    };
    
    class HookRendered extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.MESSAGES_RENDERER.Meta;
            const original_function = this.original_function;
            MODULES.MESSAGES_RENDERER.Meta = function () {
                const ret = original_function(...arguments);
                HookRendered.device_handler(arguments[0]?.msg);
                return ret;
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.MESSAGES_RENDERER.Meta = this.original_function;
        }
    
        static device_handler(message) {
            const message_elements = document.querySelectorAll(`[data-id="${message.id._serialized}"]`);
            if (message_elements.length !== 1) {
                return;
            }
            const message_parts = Array.from(message_elements[0].childNodes[0].childNodes);
            const message_box = message_parts.find((element) => element.innerText.includes(':'));
            if (message_box?.childNodes?.length < 2) {
                return;
            }
            const insert_into = message_box.childNodes[message_box.childNodes.length - 1];
            if (Array.from(insert_into.childNodes).some((element) => element.tagName === 'SVG')) {
                return;
            }
            const div_svg = document.createElement('svg');
            div_svg.innerHTML = get_svg_by_id(message.id.id);
            insert_into.prepend(div_svg);
        }
    }
    

    const REVOKE_SUBTYPES = ['sender_revoke', 'admin_revoke'];
    
    class RenderableMessageHook extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages;
            const original_function = this.original_function;
            MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages = function () {
                arguments[0] = arguments[0].filter((message) => {
                    return !RenderableMessageHook.handle_message(message);
                });
                return original_function(...arguments);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages = this.original_function;
        }
    
        static handle_message(message) {
            let should_ignore = false;
            should_ignore |= RenderableMessageHook.revoke_handler(message);
            return should_ignore;
        }
    
        static revoke_handler(message) {
            if (!REVOKE_SUBTYPES.includes(message?.subtype)) {
                return false;
            }
            message.type = 'chat';
            message.body = '🚫 This message was deleted!';
            message.quotedStanzaID = message.protocolMessageKey.id;
            message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
            message.quotedMsg = {
                'type': 'chat',
            };
            delete message.protocolMessageKey;
            delete message.subtype;
            return false;
        }
    }
    

    class EditMessageHook extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
            const original_function = this.original_function;
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs = function () {
                arguments[0] = arguments[0].filter((message) => {
                    console.log(message);
                    return !EditMessageHook.handle_edited_message(message, ...arguments);
                });
    
                return original_function(...arguments);
            };
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsg = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs = this.original_function;
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsg = this.original_function;
        }
    
        static handle_edited_message() {
            const message = arguments[0];
            message.type = 'chat';
            message.body = `✏️ This message was edited to: ${message?.body || message?.caption}`;
            if (!message.protocolMessageKey) {
                return true;
            }
            message.quotedStanzaID = message.protocolMessageKey.id;
            message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
            message.quotedMsg = {
                type: 'chat',
            };
            delete message.latestEditMsgKey;
            delete message.protocolMessageKey;
            delete message.subtype;
            delete message.editMsgType;
            delete message.latestEditSenderTimestampMs;
            MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages(
                [message],
                window.webpackChunkwhatsapp_web_client?.length > 0 ? arguments[1] : {
                    'author': message.from,
                    'type': 'chat',
                    'externalId': message.id.id,
                    'edit': -1,
                    'isHsm': false,
                    'chat': message.id.remote,
                },
                null,
                {verifiedLevel: 'unknown'},
                null,
                0,
                arguments[2] === undefined ? arguments[1] : arguments[2]
            );
            return true;
        }
    }
    

    class ProtobufHook extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.PROTOBUF_HOOK.decodeProtobuf;
            const original_function = MODULES.PROTOBUF_HOOK.decodeProtobuf;
            MODULES.PROTOBUF_HOOK.decodeProtobuf = function () {
                let message = original_function(...arguments);
                return set_key_json_recursive(message, 'viewOnce', false);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.PROTOBUF_HOOK.decodeProtobuf = this.original_function;
        }
    }
    

    class HookSendMessage extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            const filters = {
                '@everyone': 'participants',
                '@admins': 'admins',
            };
    
            this.original_function = MODULES.SEND_MESSAGE.sendMsgRecord;
            const original_function = this.original_function;
            MODULES.SEND_MESSAGE.sendMsgRecord = async function (message) {
                if (typeof message?.body === 'string') {
                    for (const [tag, filter] of Object.entries(filters)) {
                        if (message.body.includes(tag)) {
                            message = await HookSendMessage.handle_tag_all_message(message, filter);
                        }
                    }
                }
                return original_function(message);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.SEND_MESSAGE.sendMsgRecord = this.original_function;
        }
    
        static async handle_tag_all_message (message, filter) {
            if (message.id.remote.server !== 'g.us') {
                return message;
            }
            const group_metadata = await MODULES.QUERY_GROUP.getParticipantRecord(message.id.remote.toString());
            for (const participant of group_metadata[filter]) {
                message.mentionedJidList.push(MODULES.WID_FACTORY.createWid(participant));
            }
            return message;
        }
    }
    

    class HookReceipts extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt;
            const original_function = this.original_function;
            MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt = function (receipt) {
                if (receipt?.from?.server === 'c.us' && receipt?.ack === MODULES.WEB_ACK.ACK.READ) {
                    const msg_keys = [];
                    for (const msg of receipt.externalIds) {
                        msg_keys.push(`true_${receipt.from._serialized}_${msg}`);
                    }
                    MODULES.RECEIPT_BATCHER.receiptBatcher.acceptOtherReceipt({
                        ack: MODULES.WEB_ACK.ACK.READ,
                        ts: receipt.ts,
                        receiverId: receipt.from,
                        msgKeys: msg_keys,
                        isSender: false
                    });
                }
                return original_function(...arguments);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt = this.original_function;
        }
    }
    

    class FullscreenHook extends Hook {
        CSSselector = 'div[id="app"]>div>div>div[tabindex="-1"]';
        FULLSCREEN_CSS = `
            ${this.CSSselector} {
                min-width: 100% !important;
                height: 100% !important;
                top: 0 !important;
            }
        `;
    
        constructor() {
            super();
            this.style = null;
            this.observer = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
    
            this.apply_fullscreen();
            this.setup_observer();
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
    
            if (this.style && this.style.parentNode) {
                this.style.parentNode.removeChild(this.style);
            }
    
            if (this.observer) {
                this.observer.disconnect();
            }
    
            this.style = null;
            this.observer = null;
        }
    
        apply_fullscreen() {
            const targetElement = document.querySelector(this.CSSselector);
            if (targetElement) {
                if (!this.style) {
                    this.style = document.createElement('style');
                    document.head.appendChild(this.style);
                }
                this.style.textContent = this.FULLSCREEN_CSS;
            }
        }
    
        setup_observer() {
            this.observer = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.type === 'childList') {
                        this.apply_fullscreen();
                    }
                }
            });
    
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    

    const hooks = {
        view_once_media: new ProtobufHook(),
        keep_revoked_messages: new RenderableMessageHook(),
        keep_edited_messages: new EditMessageHook(),
        indicate_sender_os: new HookRendered(),
        special_tags: new HookSendMessage(),
        blue_ticks: new HookReceipts(),
        fullscreen: new FullscreenHook(),
        settings_hook: new SettingsHook()
    };
    
    function handle_settings_update() {
        for (const [setting_name, hook] of Object.entries(hooks)) {
            if (active_settings[setting_name] === false) {
                hook.unregister();
            } else {
                hook.register();
            }
        }
    }
    
    let active_settings = {};
    
    
    window.addEventListener('message', function (event) {
        const message = event.data;
        if (message.settings !== undefined) {
            active_settings = message.settings;
            handle_settings_update();
        }
    });
    
    
    const start = () => {
        initialize_modules();
        for (const [setting_name, hook] of Object.entries(hooks)) {
            if (active_settings[setting_name] !== false) {
                hook.register();
            }
        }
    };
    
    
    console.log('WhatsApp-Plus loaded successfully!');
    // TODO: Solve it the right way. This is a temporary solution.
    const load_and_start = async () => {
        while (Object.values(WA_MODULES).find(m => require(m) === null) !== undefined) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        start();
    };
    setTimeout(load_and_start, 1000);
    
};
if (!window.is_plus_loaded) {
    window.is_plus_loaded = true;
    window.plus_main();
}