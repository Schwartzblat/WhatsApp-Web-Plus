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
