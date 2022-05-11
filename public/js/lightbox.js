if (document.getElementById('lightbox-landing')) {
    lightGallery(document.getElementById('lightbox-landing'), {
        thumbnail: true,
        download: false,
        selector: '.lb',
        plugins: [lgThumbnail],
    });
}

