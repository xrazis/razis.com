if (fp) {
    const bookNowCTA = document.getElementById('bookNowForm');

    if (fp.selectedDates === null) {
        bookNowCTA.classList.remove('disabled');
    } else {
        bookNowCTA.classList.add('disabled');
    }

    bookNowCTA.addEventListener('click', () => {
        const dates = [...fp.selectedDates];
        const checkInDate = flatpickr.formatDate(dates[0], 'Y-m-d');
        const diffTime = Math.abs(dates[1] - dates[0]);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const rooms = document.getElementById('choices-rooms').value;
        const adults = document.getElementById('choices-adults').value;
        const children = document.getElementById('choices-children').value;
        const infants = document.getElementById('choices-infants').value;

        const bookingEngineURL = `https://razis.reserve-online.net/?checkin=${checkInDate}&rooms=${rooms}&nights=${diffDays}&adults=${adults}&children=${children}&infants=${infants}`;
        window.open(bookingEngineURL, 'Razis Apartments, Zakynthos Greece | Book Online');
    });
}
