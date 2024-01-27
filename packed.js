const main = () => {
const initialize_modules = () => {
    window.mR = (() => {
        const mObj = {};
        window.webpackChunkwhatsapp_web_client.push([
            ["moduleRaid"],
            {},
            (e) => Object.keys(e.m).forEach((mod) => mObj[mod] = e(mod))
        ]);

        const get = (id) => mObj[id];
        
        const findModule = (query) => {
            const results = [];
            Object.keys(mObj).forEach((mKey) => {
                const mod = mObj[mKey];
                if ((typeof query === "function" && query(mod)) || (typeof query === "string" && mod[query] !== undefined)) {
                    results.push(mod);
                }
            });
            return results;
        };

        return { modules: mObj, findModule, get };
    })();
    
    console.log('Modules have been loaded successfully!');
};


const WA_MODULES = {
    PROCESS_EDIT_MESSAGE: 189865,
    PROCESS_RENDERABLE_MESSAGES: 992321,
};


const view_once_handler = (message) => {
    if (!message?.isViewOnce) {
        return false;
    }
    message.isViewOnce = false;
};


const REVOKE_SUBTYPES = ['sender_revoke', 'admin_revoke'];
const revoke_handler = (message) => {
    if (!REVOKE_SUBTYPES.includes(message?.subtype)) {
        return false;
    }
    message.type = "chat";
    message.body = "🚫 This message was deleted!";
    message.quotedStanzaID = message.protocolMessageKey.id;
    message.quotedParticipant = message.protocolMessageKey.participant;
    message.quotedMsg = {
        "type": "chat",
    };
    delete message.protocolMessageKey;
    delete message.subtype;
    return false;
};


const handle_message = (message) => {
    let should_ignore = false;
    should_ignore |= view_once_handler(message);
    should_ignore |= revoke_handler(message);
    return should_ignore;
};


const initialize_message_hook = () => {
    const original_processor = window.mR.modules[WA_MODULES.PROCESS_RENDERABLE_MESSAGES].processRenderableMessages;
    window.mR.modules[WA_MODULES.PROCESS_RENDERABLE_MESSAGES].processRenderableMessages = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            return !handle_message(message);
        });
        return original_processor(...arguments);
    };
};


const handle_edited_message = (message) => false;

const initialize_edit_message_hook = () => {
    const originalProcessor = window.mR.modules[WA_MODULES.PROCESS_EDIT_MESSAGE].processEditProtocolMsg;
    window.mR.modules[WA_MODULES.PROCESS_EDIT_MESSAGE].processEditProtocolMsg = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            return !handle_edited_message(message);
        });
        return originalProcessor(...arguments);
    };
};


const start = async () => {
    initialize_modules();
    initialize_message_hook();
    initialize_edit_message_hook();
};

console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);

};
main();