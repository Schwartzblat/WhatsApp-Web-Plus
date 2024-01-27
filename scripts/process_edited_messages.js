const handle_edited_message = (message) => {
    let should_ignore = false;
    should_ignore |= true;
    return should_ignore;
}


const initialize_edit_message_hook = () => {
    const original_processor = window.mR.modules[189865].processEditProtocolMsg
    window.mR.modules[189865].processEditProtocolMsg = function () {
        for (const [index, message] of Object.entries(arguments[0])) {
            console.log(message);
            const should_ignore = handle_edited_message(message);
            if (should_ignore) {
                arguments[0].splice(index, 1);
            }
        }
        return original_processor(...arguments);
    };
};
