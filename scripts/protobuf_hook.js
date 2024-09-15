const initialize_protobuf_hook = () => {
    const original_processor = MODULES.PROTOBUF_HOOK.decodeProtobuf;
    MODULES.PROTOBUF_HOOK.decodeProtobuf = function () {
        let message = original_processor(...arguments);
        return set_key_json_recursive(message, 'viewOnce', false);
    };
};
