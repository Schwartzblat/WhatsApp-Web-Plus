const extpay = ExtPay('whatsapp-web-plus');

const activate_button = document.getElementById('paymentButton')
activate_button.addEventListener('click', extpay.openPaymentPage);

extpay.getUser().then(user => {
    if (user.paid) {
        activate_button.innerText = 'Activated! 🎉';
    }
}).catch(err => {
    console.log(err);
})
