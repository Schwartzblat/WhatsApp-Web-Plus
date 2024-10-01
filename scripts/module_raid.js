const initialize_modules = () => {
    if (window?.webpackChunkwhatsapp_web_client) {
        window.mR = (() => {
            const mObj = {};
            window.webpackChunkwhatsapp_web_client.push([
                ["moduleRaid"],
                {},
                (e) => Object.keys(e.m).forEach((mod) => mObj[mod] = e(mod))
            ]);

            const get = (id) => mObj[id];
            return {modules: mObj, get};
        })();
        MODULES = {
            PROCESS_EDIT_MESSAGE: window.mR.modules[WA_MODULES.PROCESS_EDIT_MESSAGE],
            PROCESS_RENDERABLE_MESSAGES: window.mR.modules[WA_MODULES.PROCESS_RENDERABLE_MESSAGES],
            MESSAGES_RENDERER: window.mR.modules[WA_MODULES.MESSAGES_RENDERER],
        };
    } else {
        MODULES = {
            PROCESS_EDIT_MESSAGE: require(NEW_WA_MODULES.PROCESS_EDIT_MESSAGE),
            PROCESS_RENDERABLE_MESSAGES: require(NEW_WA_MODULES.PROCESS_RENDERABLE_MESSAGES),
            MESSAGES_RENDERER: require(NEW_WA_MODULES.MESSAGES_RENDERER),
            PROTOBUF_HOOK: require(NEW_WA_MODULES.PROTOBUF_HOOK),
            QUERY_GROUP: require(NEW_WA_MODULES.QUERY_GROUP),
            SEND_MESSAGE: require(NEW_WA_MODULES.SEND_MESSAGE),
            OPEN_CHAT: require(NEW_WA_MODULES.OPEN_CHAT),
            HANDLE_RECEIPT: require(NEW_WA_MODULES.HANDLE_RECEIPT),
            RECEIPT_BATCHER: require(NEW_WA_MODULES.RECEIPT_BATCHER),
            WEB_ACK: require(NEW_WA_MODULES.WEB_ACK),
            WID_FACTORY: require(NEW_WA_MODULES.WID_FACTORY),
            SERVER_PROPS: require(NEW_WA_MODULES.SERVER_PROPS),
        };
    }

    console.log('Modules have been loaded successfully!');
};
