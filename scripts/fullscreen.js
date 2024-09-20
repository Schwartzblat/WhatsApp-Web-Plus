const initialize_fullscreen = () => {
    const css = `
        div[id="app"] > div > div[tabindex="-1"] {
            width: 100%;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
};