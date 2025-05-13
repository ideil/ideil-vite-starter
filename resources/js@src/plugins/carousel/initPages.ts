import { type EmblaCarouselType } from "embla-carousel";

export const initPages = (
    emblaApi: EmblaCarouselType,
    pagesEl: HTMLElement,
): void => {
    const updatePages = (emblaApi: EmblaCarouselType) => {
        const selectedSnap = emblaApi.selectedScrollSnap();
        const snapCount = emblaApi.scrollSnapList().length;
        pagesEl.innerHTML = `${selectedSnap + 1} / ${snapCount}`;
    };

    emblaApi.on("select", updatePages).on("reInit", updatePages);

    updatePages(emblaApi);
};
