import { type EmblaCarouselType } from "embla-carousel";

export const initPagination = (
    emblaApi: EmblaCarouselType,
    paginationEl: HTMLElement,
) => {
    let dotEls: HTMLElement[] = [];

    const addDots = (): void => {
        paginationEl.innerHTML = emblaApi
            .scrollSnapList()
            .map(() => '<button class="embla__dot" type="button"></button>')
            .join("");

        const scrollTo = (index: number): void => {
            emblaApi.scrollTo(index);
        };

        dotEls = Array.from(paginationEl.querySelectorAll(".embla__dot"));
        dotEls.forEach((dotNode, index) => {
            dotNode.addEventListener("click", () => scrollTo(index), false);
        });
    };

    const toggleDotsActive = (): void => {
        const previous = emblaApi.previousScrollSnap();
        const selected = emblaApi.selectedScrollSnap();
        dotEls[previous].classList.remove("embla__dot--selected");
        dotEls[selected].classList.add("embla__dot--selected");
    };

    emblaApi
        .on("init", addDots)
        .on("reInit", addDots)
        .on("init", toggleDotsActive)
        .on("reInit", toggleDotsActive)
        .on("select", toggleDotsActive);

    return {
        removePaginationHandlers: () => {
            paginationEl.innerHTML = "";
        },
    };
};
