const WA_MODULES = {
    PROCESS_EDIT_MESSAGE: 189865,
    PROCESS_RENDERABLE_MESSAGES: 992321,
    MESSAGES_RENDERER: 809958,
};

const NEW_WA_MODULES = {
    PROCESS_EDIT_MESSAGE: 'WAWebDBProcessEditProtocolMsgs',
    PROCESS_RENDERABLE_MESSAGES: 'WAWebMessageProcessRenderable',
    MESSAGES_RENDERER: 'WAWebMessageMeta.react',
    PROTOBUF_HOOK: 'decodeProtobuf',
    SEND_MESSAGE: 'WAWebSendMsgRecordAction',
    QUERY_GROUP: 'WAWebGroupQueryGroupJob',
    OPEN_CHAT: 'useWAWebSetModelValue',
};

window.MODULES = {
    PROCESS_EDIT_MESSAGE: undefined,
    PROCESS_RENDERABLE_MESSAGES: undefined,
    MESSAGES_RENDERER: undefined,
    PROTOBUF_HOOK: undefined,
    SEND_MESSAGE: undefined,
    QUERY_GROUP: undefined,
    OPEN_CHAT: undefined,
};

let current_chat_metadata_promise = [null, null];
