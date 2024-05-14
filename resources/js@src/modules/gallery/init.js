import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

export const init = galleryEl => {
    const linkEls = galleryEl.querySelectorAll('[data-gallery-link]');

    const gallery = new PhotoSwipeLightbox({
        gallery: galleryEl,
        children: linkEls,

        showHideAnimationType: 'fade',
        wheelToZoom: true,

        // closeSVG: closeIcon,
        // arrowPrevSVG: arrowIcon,
        // arrowNextSVG: arrowIcon,
        // zoomSVG: zoomIcon,

        pswpModule: PhotoSwipe
    });

    gallery.init();
};
