import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

const galleryEls = document.querySelectorAll('[data-gallery]');

galleryEls.forEach(galleryEl => {
    const childrenEls = galleryEl.querySelectorAll('[data-gallery-link]');

    const lightbox = new PhotoSwipeLightbox({
        gallery: galleryEl,
        children: childrenEls,
        showHideAnimationType: 'fade',
        pswpModule: PhotoSwipe,
    });
    lightbox.init();
});
