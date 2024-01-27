const main = () => {
    const mR = (() => {
        const mObj = {};
        window.webpackChunkwhatsapp_web_client.push([
            ["moduleRaid"],
            {},
            (e) => Object.keys(e.m).forEach((mod) => mObj[mod] = e(mod))
        ]);

        const get = (id) => mObj[id];
        const findModule = (query) => Object.keys(mObj).filter(mKey => {
            const mod = mObj[mKey];
            return typeof query === "function" ? query(mod) : (mod?.default || mod)[query] !== undefined;
        });

        return {
            modules: mObj,
            findModule,
            get
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

    console.log('WAPower loaded successfully!');
    setTimeout(start, 5000);
};

main();