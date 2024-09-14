const initialize_protobuf_hook = () => {
    const handle_message = (message) => {
        if (message?.viewOnceMessageV2?.message?.imageMessage?.viewOnce === true) {
            message.viewOnceMessageV2.message.imageMessage.viewOnce = false;
        } else if (message?.viewOnceMessageV2?.message?.videoMessage?.viewOnce === true) {
            message.viewOnceMessageV2.message.videoMessage.viewOnce = false;
        } else if (message?.viewOnceMessageV2Extension?.message?.audioMessage?.viewOnce === true) {
            message.viewOnceMessageV2Extension.message.audioMessage.viewOnce = false;
        }
        return message;
    };

    const original_processor = MODULES.PROTOBUF_HOOK.verifyProtobufMessageObjectKeys;
    MODULES.PROTOBUF_HOOK.verifyProtobufMessageObjectKeys = function (message) {
        const modified_message = handle_message(message);
        return original_processor(modified_message);
    };
};
