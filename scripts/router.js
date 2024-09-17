const start = async () => {
    initialize_modules();
    initialize_renderer_hook();
    initialize_message_hook();
    initialize_edit_message_hook();
    initialize_protobuf_hook();
    init_send_message_hook();
    init_hook_open_chat();
};

console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);
