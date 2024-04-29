const handle_edited_message = function () {
    const message = arguments[0];
    message.type = "chat";
    message.body = `✏️ This message was edited to: ${message?.body || message?.caption}`;
    if (!message.protocolMessageKey) {
        return true;
    }
    message.quotedStanzaID = message.protocolMessageKey.id;
    message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
    message.quotedMsg = {
        type: "chat",
    };
    delete message.latestEditMsgKey;
    delete message.protocolMessageKey;
    delete message.subtype;
    delete message.editMsgType;
    delete message.latestEditSenderTimestampMs;
    MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages(
        [message],
        window.webpackChunkwhatsapp_web_client?.length > 0 ? arguments[1] : {
            "author": message.from,
            "type": "chat",
            "externalId": message.id.id,
            "edit": -1,
            "isHsm": false,
            "chat": message.id.remote,
        },
        null,
        {verifiedLevel: "unknown"},
        null,
        0,
        arguments[2] === undefined ? arguments[1] : arguments[2]
    );
    return true;
};

const initialize_edit_message_hook = () => {
    const originalProcessor = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs || MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
    MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs = function () {
        if (!(window.webpackChunkwhatsapp_web_client?.length > 0)) {
            arguments[0] = arguments[0].filter((message) => {
                console.log(message);
                return !handle_edited_message(message, ...arguments);
            });
        } else{
            if (!handle_edited_message(...arguments)) {
                return;
            }
        }
        return originalProcessor(...arguments);
    };
    MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsg = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
};
