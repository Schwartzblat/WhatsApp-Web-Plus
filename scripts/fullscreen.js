class FullscreenHook extends Hook {
    CSSselector = 'div[id="app"]>div>div>div[tabindex="-1"]';
    FULLSCREEN_CSS = `
        ${this.CSSselector} {
            min-width: 100% !important;
            height: 100% !important;
            top: 0 !important;
        }
    `;

    constructor() {
        super();
        this.style = null;
        this.observer = null;
    }

    register() {
        if (this.is_registered) {
            return;
        }
        super.register();

        this.apply_fullscreen();
        this.setup_observer();
    }

    unregister() {
        if (!this.is_registered) {
            return;
        }
        super.unregister();

        if (this.style && this.style.parentNode) {
            this.style.parentNode.removeChild(this.style);
        }

        if (this.observer) {
            this.observer.disconnect();
        }

        this.style = null;
        this.observer = null;
    }

    apply_fullscreen() {
        const targetElement = document.querySelector(this.CSSselector);
        if (targetElement) {
            if (!this.style) {
                this.style = document.createElement('style');
                document.head.appendChild(this.style);
            }
            this.style.textContent = this.FULLSCREEN_CSS;
        }
    }

    setup_observer() {
        this.observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    this.apply_fullscreen();
                }
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}
