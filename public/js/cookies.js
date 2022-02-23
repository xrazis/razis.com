if (document.getElementById('cookies-alert')) {
    const alert = document.getElementById('cookies-alert');
    const accepted = localStorage.getItem('cookiesAccepted');

    if (!accepted) alert.classList.add('show')

    alert.addEventListener('closed.bs.alert', () => localStorage.setItem('cookiesAccepted', 'true'));
}
