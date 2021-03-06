if (document.getElementById('typed')) {
    const typed = new Typed('#typed', {
        stringsElement: '#typed-strings', typeSpeed: 90, backSpeed: 90, backDelay: 200, startDelay: 500, loop: true
    });
}

if (document.getElementsByClassName('page-header')) {
    window.addEventListener('scroll', () => {
        const pageHeaders = document.querySelectorAll('.page-header');

        pageHeaders.forEach((bgParallax) => {
            const scrollPosition = window.pageYOffset;
            const limit = bgParallax.offsetTop + bgParallax.offsetHeight;
            let bottomStandardPosition = '50%';
            let bgParallaxOffset = bgParallax.offsetTop;

            if (scrollPosition > bgParallaxOffset && scrollPosition <= limit) {
                bgParallax.style.backgroundPositionY = (50 - 10 * scrollPosition / limit * 3) + '%';
            } else {
                bgParallax.style.backgroundPositionY = bottomStandardPosition;
            }

        });
    });
}

if (document.querySelectorAll('[id^=choices]')) {
    const choices = document.querySelectorAll('[id^=choices]');

    choices.forEach((choice) => {
        const choices = new Choices(choice, {
            searchEnabled: false
        });
    });
}

let fp = null;

if (document.querySelector('.datepicker')) {
    const year = new Date().getFullYear();

    fp = flatpickr('.datepicker', {
        mode: 'range',
        enable: [
            {
                from: `${year}-05`,
                to: `${year}-10-15`
            },
            {
                from: `${year + 1}-05`,
                to: `${year + 1}-10-15`
            }
        ],
        onChange: function () {
            const bookNowCTA = document.getElementById('bookNowForm');
            bookNowCTA.classList.remove('disabled');
        },
    });
}
