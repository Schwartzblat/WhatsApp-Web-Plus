const view_once_handler = (message) => {
    if (!message?.isViewOnce) {
        return;
    }
    message.isViewOnce = false;
}


const handle_message = (message) => {
    view_once_handler(message);
}


const initialize_message_hook = () => {
    const original_processor = window.mR.modules[992321].processRenderableMessages
    window.mR.modules[992321].processRenderableMessages = function () {
        for (const message of arguments[0]) {
            handle_message(message);
        }
        return original_processor(...arguments);
    };
};
