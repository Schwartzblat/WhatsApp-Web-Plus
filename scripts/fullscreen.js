const initialize_fullscreen = () => {
    const css = `
        div[id="app"]>div>div[tabindex="-1"] {
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            position: absolute;
            top: 0 !important;
            left: 0 !important;
        }
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
};