const handle_edited_message = function () {
    const message = arguments[0];
    message.type = "chat";
    message.body = `✏️ This message was edited to: ${message.body}`;
    message.quotedStanzaID = message.protocolMessageKey.id;
    message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
    message.quotedMsg = {
        "type": "chat",
    };
    delete message.latestEditMsgKey;
    delete message.protocolMessageKey;
    delete message.subtype;
    delete message.editMsgType;
    delete message.latestEditSenderTimestampMs;
    window.mR.modules[WA_MODULES.PROCESS_RENDERABLE_MESSAGES].processRenderableMessages(
        [message],
        arguments[1],
        null,
        null,
        null,
        0,
        arguments[2]
    );
    return true;
};

const initialize_edit_message_hook = () => {
    const originalProcessor = window.mR.modules[WA_MODULES.PROCESS_EDIT_MESSAGE].processEditProtocolMsg;
    window.mR.modules[WA_MODULES.PROCESS_EDIT_MESSAGE].processEditProtocolMsg = function () {
        if (handle_edited_message(...arguments)) {
            return;
        }
        return originalProcessor(...arguments);
    };
};
