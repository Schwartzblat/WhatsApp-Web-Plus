class SettingsHook extends Hook {
    constructor() {
        super();
        this.original_multicats = null;
    }

    register() {
        if (this.is_registered) {
            return;
        }
        super.register();
        this.original_multicats = MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL;
        MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL = Infinity;
    }

    unregister() {
        if (!this.is_registered) {
            return;
        }
        MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL = this.original_multicats;
    }

}
