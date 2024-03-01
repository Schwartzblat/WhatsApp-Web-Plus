const REVOKE_SUBTYPES = ['sender_revoke', 'admin_revoke'];
const revoke_handler = (message) => {
    if (!REVOKE_SUBTYPES.includes(message?.subtype)) {
        return false;
    }
    message.type = "chat";
    message.body = "🚫 This message was deleted!";
    message.quotedStanzaID = message.protocolMessageKey.id;
    message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
    message.quotedMsg = {
        "type": "chat",
    };
    delete message.protocolMessageKey;
    delete message.subtype;
    return false;
};


const initialize_message_hook = () => {
    const handle_message = (message) => {
        let should_ignore = false;
        should_ignore |= revoke_handler(message);
        return should_ignore;
    };

    const original_processor = MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages;
    MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages = function () {
        arguments[0] = arguments[0].filter((message) => {
            console.log(message);
            return !handle_message(message);
        });
        return original_processor(...arguments);
    };
};
