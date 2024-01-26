const start = async () => {
    initialize_modules();
    initialize_message_hook();
};

console.log('Loaded');
setTimeout(start, 5000);
