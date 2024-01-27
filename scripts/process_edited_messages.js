const handle_edited_message = (message) => false;

const initialize_edit_message_hook = () => {
    const originalProcessor = window.mR.modules[WA_MODULES.PROCESS_EDIT_MESSAGE].processEditProtocolMsg;
    window.mR.modules[WA_MODULES.PROCESS_EDIT_MESSAGE].processEditProtocolMsg = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            return !handle_edited_message(message);
        });
        return originalProcessor(...arguments);
    };
};
