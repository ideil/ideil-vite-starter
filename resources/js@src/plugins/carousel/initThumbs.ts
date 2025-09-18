import EmblaCarousel, { EmblaCarouselType } from "embla-carousel";

import { SLIDE_SELECTED_CLASS, THUMBS_CLASS, TRACK_CLASS } from "./constants";

export const initThumbs = (
    emblaApi: EmblaCarouselType,
    containerEl: Element,
) => {
    const thumbsEl = containerEl.querySelector(
        `.${THUMBS_CLASS}`,
    ) as HTMLElement;

    if (!thumbsEl) {
        return;
    }

    const thumbsTrackEl = thumbsEl.querySelector(
        `.${TRACK_CLASS}`,
    ) as HTMLElement;

    const thumbsApi = EmblaCarousel(thumbsTrackEl, {
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const thumbEls = thumbsApi.slideNodes();
    const scrollToIndex = thumbEls.map(
        (_, index) => () => emblaApi.scrollTo(index),
    );

    const toggleThumbBtnsState = () => {
        thumbsApi.scrollTo(emblaApi.selectedScrollSnap());
        const previous = emblaApi.previousScrollSnap();
        const selected = emblaApi.selectedScrollSnap();
        thumbEls[previous].classList.remove(SLIDE_SELECTED_CLASS);
        thumbEls[selected].classList.add(SLIDE_SELECTED_CLASS);
    };

    const destroyThumbs = () => {
        const selected = emblaApi.selectedScrollSnap();

        thumbEls.forEach((slideNode, index) => {
            slideNode.removeEventListener("click", scrollToIndex[index], false);
        });
        thumbEls[selected].classList.remove(SLIDE_SELECTED_CLASS);
    };

    thumbEls.forEach((slideNode, index) => {
        slideNode.addEventListener("click", scrollToIndex[index], false);
    });

    toggleThumbBtnsState();

    emblaApi.on("select", toggleThumbBtnsState).on("destroy", destroyThumbs);
    thumbsApi.on("destroy", destroyThumbs);
};
