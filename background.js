if ('function' === typeof importScripts) {

    importScripts('ExtPay.js')

    const extpay = ExtPay('whatsapp-web-plus');
    extpay.startBackground();
}
