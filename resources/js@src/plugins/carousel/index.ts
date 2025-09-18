import {
    default as EmblaCarousel,
    type EmblaOptionsType,
    type EmblaPluginType,
} from "embla-carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
    ARROW_CLASS,
    ARROW_NEXT_CLASS,
    ARROW_PREV_CLASS,
    PAGES_CLASS,
    PAGINATION_CLASS,
    PARALLAX_CLASS,
    THUMBS_CLASS,
    TRACK_CLASS,
} from "./constants";

export default async (el: Element, initOptions?: EmblaOptionsType) => {
    const prevArrowEl = el.querySelector(
        `.${ARROW_CLASS}.${ARROW_PREV_CLASS}`,
    ) as HTMLButtonElement;
    const nextArrowEl = el.querySelector(
        `.${ARROW_CLASS}.${ARROW_NEXT_CLASS}`,
    ) as HTMLButtonElement;
    const trackEl = el.querySelector(`.${TRACK_CLASS}`) as HTMLElement;
    const paginationEl = el.querySelector(
        `.${PAGINATION_CLASS}`,
    ) as HTMLElement;
    const pagesEl = el.querySelector<HTMLElement>(`.${PAGES_CLASS}`);
    const thumbsEl = el.querySelector<HTMLElement>(`.${THUMBS_CLASS}`);
    const parallaxEl = el.querySelector<HTMLElement>(`.${PARALLAX_CLASS}`);

    const options: EmblaOptionsType = {
        loop: false,
        align: "start",

        ...initOptions,
    };
    const plugins: EmblaPluginType[] = [WheelGesturesPlugin()];

    const emblaApi = EmblaCarousel(trackEl, options, plugins);

    if (prevArrowEl && nextArrowEl) {
        const { initArrows } = await import("./initArrows");

        initArrows(emblaApi, prevArrowEl, nextArrowEl);
    }

    if (pagesEl) {
        const { initPages } = await import("./initPages");

        initPages(emblaApi, pagesEl);
    } else if (paginationEl) {
        const { initPagination } = await import("./initPagination");

        initPagination(emblaApi, paginationEl);
    }

    if (thumbsEl) {
        const { initThumbs } = await import("./initThumbs");

        initThumbs(emblaApi, el);
    }

    if (parallaxEl) {
        const { initParallax } = await import("./initParallax");

        initParallax(emblaApi);
    }

    return emblaApi;
};
