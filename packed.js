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


const view_once_handler = (message) => {
    if (!message?.isViewOnce) {
        return false;
    }
    message.isViewOnce = false;
}

const REVOKE_SUBTYPES = ['sender_revoke', 'admin_revoke']
const revoke_handler = (message) => {
    return REVOKE_SUBTYPES.includes(message?.subtype);
}


const handle_message = (message) => {
    let should_ignore = false;
    should_ignore |= view_once_handler(message);
    should_ignore |= revoke_handler(message);
    return should_ignore;
}


const initialize_message_hook = () => {
    const original_processor = window.mR.modules[992321].processRenderableMessages
    window.mR.modules[992321].processRenderableMessages = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            return !handle_message(message);
        });
        return original_processor(...arguments);
    };
};


const handle_edited_message = (message) => false;

const initialize_edit_message_hook = () => {
    const originalProcessor = window.mR.modules[189865].processEditProtocolMsg;
    window.mR.modules[189865].processEditProtocolMsg = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            !handle_edited_message(message)
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