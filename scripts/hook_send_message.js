const init_send_message_hook = () => {
    const filters = {
        '@everyone': 'participants',
        '@admins': 'admins',
    };

    const handle_tag_all_message = async (message, filter) => {
        if (message.id.remote.server !== 'g.us') {
            return message;
        }
        const group_metadata = await MODULES.QUERY_GROUP.getParticipantRecord(message.id.remote.toString());
        for (const participant of group_metadata[filter]) {
            message.mentionedJidList.push(MODULES.WID_FACTORY.createWid(participant));
        }
        return message;
    };

    const original_send_message = MODULES.SEND_MESSAGE.sendMsgRecord;
    MODULES.SEND_MESSAGE.sendMsgRecord = async function (message) {
        if (typeof message?.body === 'string') {
            for (const [tag, filter] of Object.entries(filters)) {
                if (message.body.includes(tag)) {
                    message = await handle_tag_all_message(message, filter);
                }
            }
        }
        return original_send_message(message)
    }
}
