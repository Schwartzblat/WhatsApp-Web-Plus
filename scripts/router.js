const start = async () => {
    initialize_modules();
    init_special_settings();
    initialize_renderer_hook();
    initialize_message_hook();
    initialize_edit_message_hook();
    initialize_protobuf_hook();
    init_send_message_hook();
    initialize_receipts_hook();
};

console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);
