const start = async () => {
    initialize_modules();
    initialize_renderer_hook();
    initialize_message_hook();
    initialize_edit_message_hook();
};

console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);
