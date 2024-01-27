const main = () => {
const initialize_modules = () => {
    window.mR = (() => {
        const mObj = {};
        window.webpackChunkwhatsapp_web_client.push([
            ["moduleRaid"],
            {},
            (e) => {
                Object.keys(e.m).forEach((mod) => {
                    mObj[mod] = e(mod);
                });
            }
        ]);
        const get = (id) => {
            return mObj[id];
        };
        const findModule = (query) => {
            const results = [];
            const modules = Object.keys(mObj);
            modules.forEach((mKey) => {
                const mod = mObj[mKey];
                if (typeof query !== "function" && typeof query !== "string") {
                    return;
                }
                if (typeof query === "function" && query(mod)) {
                    results.push(mod);
                    return;
                }
                for (const key in (mod === null || mod === void 0 ?
                    void 0 :
                    mod.default) || mod) {
                    if (key === query) {
                        results.push(mod);
                    }
                }
            });
            return results;
        };
        return {
            modules: mObj,
            findModule: findModule,
            get: get
        };
    })();
    console.log('Modules have been loaded successfully!');
};


const view_once_handler = (message) => {
    if (!message?.isViewOnce) {
        return;
    }
    message.isViewOnce = false;
}


const handle_message = (message) => {
    view_once_handler(message);
}


const initialize_message_hook = () => {
    const original_processor = window.mR.modules[992321].processRenderableMessages
    window.mR.modules[992321].processRenderableMessages = function () {
        for (const message of arguments[0]) {
            handle_message(message);
        }
        return original_processor(...arguments);
    };
};


const start = async () => {
    initialize_modules();
    initialize_message_hook();
};

console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);

};
main();