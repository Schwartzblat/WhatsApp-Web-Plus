const initialize_receipts_hook = () => {
    const original_processor = MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt;
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
            })
        }
        return original_processor(...arguments);
    };
};
