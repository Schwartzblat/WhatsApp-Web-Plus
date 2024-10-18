const REVOKE_SUBTYPES = ['sender_revoke', 'admin_revoke'];

class RenderableMessageHook extends Hook {
    constructor() {
        super();
        this.original_function = null;
    }

    register() {
        if (this.is_registered) {
            return;
        }
        super.register();
        this.original_function = MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages;
        const original_function = this.original_function;
        MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages = function () {
            arguments[0] = arguments[0].filter((message) => {
                console.log(message);
                return !RenderableMessageHook.handle_message(message);
            });
            return original_function(...arguments);
        };
    }

    unregister() {
        if (!this.is_registered) {
            return;
        }
        super.unregister();
        MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages = this.original_function;
    }

    static handle_message(message) {
        let should_ignore = false;
        should_ignore |= RenderableMessageHook.revoke_handler(message);
        return should_ignore;
    }

    static revoke_handler(message) {
        if (!REVOKE_SUBTYPES.includes(message?.subtype)) {
            return false;
        }
        message.type = 'chat';
        message.body = '🚫 This message was deleted!';
        message.quotedStanzaID = message.protocolMessageKey.id;
        message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
        message.quotedMsg = {
            'type': 'chat',
        };
        delete message.protocolMessageKey;
        delete message.subtype;
        return false;
    }
}
