class Hook {
    constructor() {
        this.is_registered = false;
    }

    register() {
        this.is_registered = true;
    }

    unregister() {
        this.is_registered = false;
    }
}
