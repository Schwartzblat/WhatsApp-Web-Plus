const init_hook_open_chat = () => {

    const handle_open_chat = async function () {
        if (current_chat_metadata_promise[0] !== null && current_chat_metadata_promise[0] === arguments[0].id._serialized) {
            return;
        }
        current_chat_metadata_promise = [arguments[0].id._serialized, MODULES.QUERY_GROUP.queryGroupJob(arguments[0].id)];
    }


    const original_open_chat = MODULES.OPEN_CHAT.useSetModelValue;
    MODULES.OPEN_CHAT.useSetModelValue = function () {
        if (arguments[1] === 'active' && arguments[0].id.server === 'g.us') {
            handle_open_chat(...arguments);
        }
        return original_open_chat(...arguments);
    };

}
