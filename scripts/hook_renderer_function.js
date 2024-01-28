const view_once_handler = (message) => {
    if (!message?.isViewOnce) {
        return false;
    }
    message.isViewOnce = false;
};

const initialize_renderer_hook = () => {
    const handle_message = (message) => {
        if (message?.isViewOnce !== true) {
            return;
        }
        console.log(message);
        message.isViewOnce = false;
    };
    const original_function = mR.modules[WA_MODULES.MESSAGES_RENDERER].default;
    mR.modules[WA_MODULES.MESSAGES_RENDERER].default = function () {
        handle_message(arguments[0]?.msg);
        return original_function(...arguments);
    }
};
