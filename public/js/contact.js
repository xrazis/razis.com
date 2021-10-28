if (document.getElementById('terms-switch')) {
    const termsSwitch = document.getElementById('terms-switch');
    const sendEmail = document.getElementById('send-email');

    termsSwitch.addEventListener('change', function () {
        if (this.checked) {
            sendEmail.classList.remove('disabled');
        } else {
            sendEmail.classList.add('disabled');
        }
    });
}