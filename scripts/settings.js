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
