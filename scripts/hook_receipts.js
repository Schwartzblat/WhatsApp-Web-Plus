class HookReceipts extends Hook {
    constructor() {
        super();
        this.original_function = null;
    }

    register() {
        if (this.is_registered) {
            return;
        }
        super.register();
        this.original_function = MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt;
        const original_function = this.original_function;
        MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt = function (receipt) {
            if (receipt?.from?.server === 'c.us' && receipt?.ack === MODULES.WEB_ACK.ACK.READ) {
                const msg_keys = [];
                for (const msg of receipt.externalIds) {
                    msg_keys.push(`true_${receipt.from._serialized}_${msg}`);
                }
                MODULES.RECEIPT_BATCHER.receiptBatcher.acceptOtherReceipt({
                    ack: MODULES.WEB_ACK.ACK.READ,
                    ts: receipt.ts,
                    receiverId: receipt.from,
                    msgKeys: msg_keys,
                    isSender: false
                });
            }
            return original_function(...arguments);
        };
    }

    unregister() {
        if (!this.is_registered) {
            return;
        }
        super.unregister();
        MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt = this.original_function;
    }
}
