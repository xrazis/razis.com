const setCookie = (cookieName, cookieValue) => {
    let date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + expires + '; path=/';
};

const getCookie = cookieName => {
    const name = cookieName + '=';
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;

    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })

    return res;
};

const deleteCookie = cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

if (document.getElementById('cookies-alert')) {
    const alert = document.getElementById('cookies-alert');
    const accepted = getCookie('cookieConsent');

    if (accepted === undefined) alert.classList.remove('d-none');

    document.getElementById('cookiesAccept').addEventListener('click', () => {
        setCookie('cookieConsent', true);
        gtag('consent', 'update', {'analytics_storage': 'granted'});
    });

    document.getElementById('cookiesBasic').addEventListener('click', () => {
        setCookie('cookieConsent', false);
    });
}

if (document.getElementById('cookiesOptOut')) {
    document.getElementById('cookiesOptOut').addEventListener('click', () => {
        gtag('consent', 'update', {'analytics_storage': 'denied'});
        window['ga-disable-G-2YX2E0E7S6'] = true;

        deleteCookie('cookieConsent');
        deleteCookie('_ga');
        deleteCookie('_ga_2YX2E0E7S6');

        window.location.href = 'https://razis.com';
    });
}
