import PhotoSwipe from "photoswipe";
import PhotoSwipeLightbox from "photoswipe/lightbox";

export default (el: HTMLElement) => {
    const linkEls = el.querySelectorAll<HTMLElement>("[data-gallery-link]");

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
