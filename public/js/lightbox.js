if (document.getElementById('lightbox-landing')) {
    lightGallery(document.getElementById('lightbox-landing'), {
        thumbnail: true,
        download: false,
        selector: '.lb',
        plugins: [lgThumbnail],
    });
}

if (document.getElementsByClassName('lightbox-room')) {
    const lightboxes = document.querySelectorAll('.lightbox-room').length;

    for (let index = 0; index < lightboxes; index++) {
        let lightbox = document.getElementById(`lightbox-room-${index}`);

        lightGallery(lightbox, {
            thumbnail: true,
            download: false,
            selector: '.lb',
            plugins: [lgThumbnail],
        });
    }
}
