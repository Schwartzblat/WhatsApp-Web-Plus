const WA_MODULES = {
    PROCESS_EDIT_MESSAGE: 'WAWebDBProcessEditProtocolMsgs',
    PROCESS_RENDERABLE_MESSAGES: 'WAWebMessageProcessRenderable',
    MESSAGES_RENDERER: 'WAWebMessageMeta.react',
    PROTOBUF_HOOK: 'decodeProtobuf',
    SEND_MESSAGE: 'WAWebSendMsgRecordAction',
    QUERY_GROUP: 'WAWebGroupMsgSendUtils',
    OPEN_CHAT: 'useWAWebSetModelValue',
    HANDLE_RECEIPT: 'WAWebHandleDirectChatReceipt',
    RECEIPT_BATCHER: 'WAWebMessageReceiptBatcher',
    WEB_ACK: 'WAWebAck',
    WID_FACTORY: 'WAWebWidFactory',
    SERVER_PROPS: 'WAWebServerPropConstants',
};

let MODULES = {
    PROCESS_EDIT_MESSAGE: undefined,
    PROCESS_RENDERABLE_MESSAGES: undefined,
    MESSAGES_RENDERER: undefined,
    PROTOBUF_HOOK: undefined,
    SEND_MESSAGE: undefined,
    QUERY_GROUP: undefined,
    OPEN_CHAT: undefined,
    HANDLE_RECEIPT: undefined,
    RECEIPT_BATCHER: undefined,
    WEB_ACK: undefined,
    WID_FACTORY: undefined,
    SERVER_PROPS: undefined,
};
