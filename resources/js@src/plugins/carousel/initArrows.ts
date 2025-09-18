import { type EmblaCarouselType } from "embla-carousel";

export const initArrows = (
    emblaApi: EmblaCarouselType,
    prevBtnEl: HTMLElement,
    nextBtnEl: HTMLElement,
) => {
    const scrollPrev = (): void => {
        emblaApi.scrollPrev();
    };
    const scrollNext = (): void => {
        emblaApi.scrollNext();
    };
    prevBtnEl.addEventListener("click", scrollPrev, false);
    nextBtnEl.addEventListener("click", scrollNext, false);

    const toggleArrowsState = (): void => {
        if (emblaApi.canScrollPrev()) prevBtnEl.removeAttribute("disabled");
        else prevBtnEl.setAttribute("disabled", "disabled");

        if (emblaApi.canScrollNext()) nextBtnEl.removeAttribute("disabled");
        else nextBtnEl.setAttribute("disabled", "disabled");
    };

    const destroyArrows = () => {
        prevBtnEl.removeAttribute("disabled");
        nextBtnEl.removeAttribute("disabled");
        prevBtnEl.removeEventListener("click", scrollPrev, false);
        nextBtnEl.removeEventListener("click", scrollNext, false);
    };

    toggleArrowsState();

    emblaApi
        .on("select", toggleArrowsState)
        .on("reInit", toggleArrowsState)
        .on("destroy", destroyArrows);
};
