class EditMessageHook extends Hook {
    constructor() {
        super();
        this.original_function = null;
    }

    register() {
        if (this.is_registered) {
            return;
        }
        super.register();
        this.original_function = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
        const original_function = this.original_function;
        MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs = function () {
            arguments[0] = arguments[0].filter((message) => {
                console.log(message);
                return !EditMessageHook.handle_edited_message(message, ...arguments);
            });

            return original_function(...arguments);
        };
        MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsg = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
    }

    unregister() {
        if (!this.is_registered) {
            return;
        }
        super.unregister();
        MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs = this.original_function;
        MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsg = this.original_function;
    }

    static handle_edited_message() {
        const message = arguments[0];
        message.type = 'chat';
        message.body = `✏️ This message was edited to: ${message?.body || message?.caption}`;
        if (!message.protocolMessageKey) {
            return true;
        }
        message.quotedStanzaID = message.protocolMessageKey.id;
        message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
        message.quotedMsg = {
            type: 'chat',
        };
        delete message.latestEditMsgKey;
        delete message.protocolMessageKey;
        delete message.subtype;
        delete message.editMsgType;
        delete message.latestEditSenderTimestampMs;
        MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages(
            [message],
            window.webpackChunkwhatsapp_web_client?.length > 0 ? arguments[1] : {
                'author': message.from,
                'type': 'chat',
                'externalId': message.id.id,
                'edit': -1,
                'isHsm': false,
                'chat': message.id.remote,
            },
            null,
            {verifiedLevel: 'unknown'},
            null,
            0,
            arguments[2] === undefined ? arguments[1] : arguments[2]
        );
        return true;
    }
}
