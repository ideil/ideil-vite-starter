import PhotoSwipe from "photoswipe";
import PhotoSwipeLightbox from "photoswipe/lightbox";

export default (el) => {
    const linkEls = el.querySelectorAll("[data-gallery-link]");

    const gallery = new PhotoSwipeLightbox({
        gallery: el,
        children: linkEls,

        showHideAnimationType: "fade",
        wheelToZoom: true,

        // closeSVG: closeIcon,
        // arrowPrevSVG: arrowIcon,
        // arrowNextSVG: arrowIcon,
        // zoomSVG: zoomIcon,

        pswpModule: PhotoSwipe,
    });

    gallery.init();
};
