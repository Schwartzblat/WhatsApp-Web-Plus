class HookSendMessage extends Hook {
    constructor() {
        super();
        this.original_function = null;
    }

    register() {
        if (this.is_registered) {
            return;
        }
        super.register();
        const filters = {
            '@everyone': 'participants',
            '@admins': 'admins',
        };

        this.original_function = MODULES.SEND_MESSAGE.sendMsgRecord;
        const original_function = this.original_function;
        MODULES.SEND_MESSAGE.sendMsgRecord = async function (message) {
            if (typeof message?.body === 'string') {
                for (const [tag, filter] of Object.entries(filters)) {
                    if (message.body.includes(tag)) {
                        message = await HookSendMessage.handle_tag_all_message(message, filter);
                    }
                }
            }
            return original_function(message);
        };
    }

    unregister() {
        if (!this.is_registered) {
            return;
        }
        super.unregister();
        MODULES.SEND_MESSAGE.sendMsgRecord = this.original_function;
    }

    static async handle_tag_all_message (message, filter) {
        if (message.id.remote.server !== 'g.us') {
            return message;
        }
        const group_metadata = await MODULES.QUERY_GROUP.getParticipantRecord(message.id.remote.toString());
        for (const participant of group_metadata[filter]) {
            message.mentionedJidList.push(MODULES.WID_FACTORY.createWid(participant));
        }
        return message;
    }
}
