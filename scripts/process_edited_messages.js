const handle_edited_message = (message) => false;

const initialize_edit_message_hook = () => {
    const originalProcessor = window.mR.modules[189865].processEditProtocolMsg;
    window.mR.modules[189865].processEditProtocolMsg = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            !handle_edited_message(message)
        });
        return originalProcessor(...arguments);
    };
};
