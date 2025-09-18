import { type EmblaCarouselType } from "embla-carousel";

export const initPages = (
    emblaApi: EmblaCarouselType,
    pagesEl: HTMLElement,
): void => {
    const makePadding = (num: number): string => `0${num}`.slice(-2);

    const updatePages = (emblaApi: EmblaCarouselType) => {
        const selectedSnap = emblaApi.selectedScrollSnap();
        const snapCount = emblaApi.scrollSnapList().length;
        const currentEl = pagesEl.querySelector(".current") as HTMLElement;
        const totalEl = pagesEl.querySelector(".total") as HTMLElement;

        currentEl.textContent = makePadding(selectedSnap + 1);
        totalEl.textContent = makePadding(snapCount);
    };

    emblaApi.on("select", updatePages).on("reInit", updatePages);

    updatePages(emblaApi);
};
