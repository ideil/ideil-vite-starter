import { type EmblaCarouselType } from "embla-carousel";

import { DOT_CLASS, DOT_SELECTED_CLASS } from "./constants";

export const initPagination = (
    emblaApi: EmblaCarouselType,
    paginationEl: HTMLElement,
) => {
    let dotEls: HTMLElement[] = [];

    const scrollTo = (index: number): void => {
        emblaApi.scrollTo(index);
    };

    const addDots = (): void => {
        paginationEl.innerHTML = emblaApi
            .scrollSnapList()
            .map(() => `<button class="${DOT_CLASS}" type="button"></button>`)
            .join("");

        dotEls = Array.from(paginationEl.querySelectorAll(`.${DOT_CLASS}`));
        dotEls.forEach((dotNode, index) => {
            dotNode.addEventListener("click", () => scrollTo(index), false);
        });
    };

    const toggleDotsActive = (): void => {
        const previous = emblaApi.previousScrollSnap();
        const selected = emblaApi.selectedScrollSnap();

        dotEls[previous].classList.remove(DOT_SELECTED_CLASS);
        dotEls[selected].classList.add(DOT_SELECTED_CLASS);
    };

    const destroyPagination = () => {
        paginationEl.innerHTML = "";
    };

    addDots();
    toggleDotsActive();

    emblaApi
        .on("reInit", addDots)
        .on("reInit", toggleDotsActive)
        .on("select", toggleDotsActive)
        .on("destroy", destroyPagination);
};
