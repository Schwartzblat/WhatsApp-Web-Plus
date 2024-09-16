const init_send_message_hook = () => {
    const filters = {
        '@everyone': () => 1,
        '@admins': (participant) => participant.isAdmin || participant.isSuperAdmin,
    };

    const handle_tag_all_message = async (message, filter) => {
        if (message.id.remote.server !== 'g.us') {
            return message;
        }
        const group_metadata = await MODULES.QUERY_GROUP.queryGroupJob(message.id.remote);
        for (const participant of group_metadata.participants) {
            if (filter(participant)) {
                message.mentionedJidList.push(participant.id);
            }
        }
        return message;
    };

    const original_send_message = MODULES.SEND_MESSAGE.sendMsgRecord;
    MODULES.SEND_MESSAGE.sendMsgRecord = async function (message) {
        for (const [tag, filter] of Object.entries(filters)) {
            if (message.body.includes(tag)) {
                message = await handle_tag_all_message(message, filter);
            }
        }
        return original_send_message(message)
    }
}
