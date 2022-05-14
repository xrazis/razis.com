import PhotoSwipeLightbox from '../libs/PhotoSwipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from '../libs/PhotoSwipe/dist/photoswipe.esm.js';

if (document.getElementsByClassName('lightbox')) {

    let lightbox = new PhotoSwipeLightbox({
        gallery: '.lightbox',
        children: '.lb',
        pswpModule: PhotoSwipe,
    });

    lightbox.init();
}
