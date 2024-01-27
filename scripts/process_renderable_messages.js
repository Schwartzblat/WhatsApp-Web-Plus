const view_once_handler = (message) => {
    if (!message?.isViewOnce) {
        return false;
    }
    message.isViewOnce = false;
}

const REVOKE_SUBTYPES = ['sender_revoke', 'admin_revoke']
const revoke_handler = (message) => {
    return REVOKE_SUBTYPES.includes(message?.subtype);
}


const handle_message = (message) => {
    let should_ignore = false;
    should_ignore |= view_once_handler(message);
    should_ignore |= revoke_handler(message);
    return should_ignore;
}


const initialize_message_hook = () => {
    const original_processor = window.mR.modules[992321].processRenderableMessages
    window.mR.modules[992321].processRenderableMessages = function () {
        for (const [index, message] of Object.entries(arguments[0])) {
            console.log(message);
            const should_ignore = handle_message(message);
            if (should_ignore) {
                arguments[0].splice(index, 1);
            }
        }
        return original_processor(...arguments);
    };
};
