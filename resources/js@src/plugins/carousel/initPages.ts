import { type EmblaCarouselType } from "embla-carousel";

export const initPages = (
    emblaApi: EmblaCarouselType,
    pagesEl: HTMLElement,
): void => {
    const makePadding = (num: number): string => `0${num}`.slice(-2);

    const updatePages = (emblaApi: EmblaCarouselType) => {
        const selectedSnap = emblaApi.selectedScrollSnap();
        const snapCount = emblaApi.scrollSnapList().length;
        const currentEl = pagesEl.querySelector<HTMLElement>(".current");
        const totalEl = pagesEl.querySelector<HTMLElement>(".total");

        if (!currentEl || !totalEl) {
            return;
        }

        currentEl.textContent = makePadding(selectedSnap + 1);
        totalEl.textContent = makePadding(snapCount);
    };

    emblaApi.on("select", updatePages).on("reInit", updatePages);

    updatePages(emblaApi);
};
