const handleEditedMessage = (message) => false;

const initializeEditMessageHook = () => {
    const originalProcessor = window.mR.modules[189865].processEditProtocolMsg;
    window.mR.modules[189865].processEditProtocolMsg = function () {
        arguments[0] = arguments[0].filter((message) => !handleEditedMessage(message));
        console.log(message);
        return originalProcessor(...arguments);
    };
};
