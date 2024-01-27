const start = async () => {
    initialize_modules();
    initialize_message_hook();
};

console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);
