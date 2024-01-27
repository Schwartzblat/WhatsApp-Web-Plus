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

    console.log('The modules have been loaded successfully!');

    const viewOnceHandler = (message) => message?.isViewOnce && (message.isViewOnce = false);

    const handleMessage = (message) => viewOnceHandler(message);

    const initializeMessageHook = () => {
        const originalProcessor = mR.modules[992321].processRenderableMessages;
        mR.modules[992321].processRenderableMessages = (...args) => {
            args[0].forEach((message) => handleMessage(message));
            return originalProcessor(...args);
        };
    };

    const start = async () => {
        initializeMessageHook();
    };

console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);

};
main();