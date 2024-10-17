class FullscreenHook extends Hook {
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
        
        this.applyFullscreen();
        this.setupObserver();
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

    applyFullscreen() {
        const targetElement = document.querySelector('div[id="app"]>div>div[tabindex="-1"]');
        if (targetElement) {
            const css = `
                div[id="app"]>div>div[tabindex="-1"] {
                    min-width: 100% !important;
                    height: 100% !important;
                    top: 0 !important;
                }
            `;
            if (!this.style) {
                this.style = document.createElement('style');
                document.head.appendChild(this.style);
            }
            this.style.textContent = css;
        }
    }

    setupObserver() {
        this.observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    this.applyFullscreen();
                }
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}