import PhotoSwipeLightbox from '../libs/PhotoSwipe/dist/photoswipe-lightbox.esm.js';

if (document.getElementsByClassName('lightbox')) {
    let lightbox

    lightbox = new PhotoSwipeLightbox({
        gallery: '.lightbox',
        children: '.lb',
        pswpModule: () => import('../libs/PhotoSwipe/dist/photoswipe.esm.js')
    });

    lightbox.init();
}
