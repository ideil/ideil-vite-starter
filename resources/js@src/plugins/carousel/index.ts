import {
    default as EmblaCarousel,
    type EmblaOptionsType,
    type EmblaPluginType,
} from "embla-carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { initArrows } from "./initArrows";
import { initPages } from "./initPages";
import { initPagination } from "./initPagination";

export default (el: HTMLElement) => {
    const prevArrowEl = el.querySelector(
        ".embla__arrow.embla__arrow--prev",
    ) as HTMLButtonElement;
    const nextArrowEl = el.querySelector(
        ".embla__arrow.embla__arrow--next",
    ) as HTMLButtonElement;
    const trackEl = el.querySelector(".embla__track") as HTMLElement;
    const paginationEl = el.querySelector(".embla__pagination") as HTMLElement;
    const pagesEl = el.querySelector<HTMLElement>(".embla__pages");

    let removeArrowsHandlers: () => void = () => {};
    let removePaginationHandlers: () => void = () => {};

    const options: EmblaOptionsType = {
        loop: false,
        align: "start",
    };
    const plugins: EmblaPluginType[] = [WheelGesturesPlugin()];

    const emblaApi = EmblaCarousel(trackEl, options, plugins);

    if (prevArrowEl && nextArrowEl) {
        ({ removeArrowsHandlers } = initArrows(
            emblaApi,
            prevArrowEl,
            nextArrowEl,
        ));
    }

    if (pagesEl) {
        initPages(emblaApi, pagesEl);
    } else if (paginationEl) {
        ({ removePaginationHandlers } = initPagination(emblaApi, paginationEl));
    }

    emblaApi.on("destroy", removeArrowsHandlers);
    emblaApi.on("destroy", removePaginationHandlers);

    return emblaApi;
};
