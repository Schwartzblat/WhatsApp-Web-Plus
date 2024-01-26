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
