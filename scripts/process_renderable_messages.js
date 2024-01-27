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
    const original_processor = window.mR.modules[WA_MODULES.PROCESS_RENDERABLE_MESSAGES].processRenderableMessages;
    window.mR.modules[WA_MODULES.PROCESS_RENDERABLE_MESSAGES].processRenderableMessages = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            return !handle_message(message);
        });
        return original_processor(...arguments);
    };
};
