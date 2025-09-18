import { EmblaCarouselType, EmblaEventType } from "embla-carousel";

import { PARALLAX_CLASS } from "./constants";

const TWEEN_FACTOR_BASE = 0.2;
let tweenFactor = 0;
let tweenNodes: HTMLElement[] = [];

const setTweenNodes = (emblaApi: EmblaCarouselType): void => {
    tweenNodes = emblaApi.slideNodes().map((slideNode) => {
        return slideNode.querySelector(`.${PARALLAX_CLASS}`) as HTMLElement;
    });
};

const setTweenFactor = (emblaApi: EmblaCarouselType): void => {
    tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
};

const tweenParallax = (
    emblaApi: EmblaCarouselType,
    eventName?: EmblaEventType,
): void => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
            if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

            if (engine.options.loop) {
                engine.slideLooper.loopPoints.forEach((loopItem) => {
                    const target = loopItem.target();

                    if (slideIndex === loopItem.index && target !== 0) {
                        const sign = Math.sign(target);

                        if (sign === -1) {
                            diffToTarget = scrollSnap - (1 + scrollProgress);
                        }
                        if (sign === 1) {
                            diffToTarget = scrollSnap + (1 - scrollProgress);
                        }
                    }
                });
            }

            const translate = diffToTarget * (-1 * tweenFactor) * 100;
            const tweenNode = tweenNodes[slideIndex];
            tweenNode.style.transform = `translateX(${translate}%)`;
        });
    });
};

export const destroyParallax = (): void => {
    tweenNodes.forEach((slide) => slide.removeAttribute("style"));
};

export const initParallax = (emblaApi: EmblaCarouselType) => {
    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
        .on("reInit", setTweenNodes)
        .on("reInit", setTweenFactor)
        .on("reInit", tweenParallax)
        .on("scroll", tweenParallax)
        .on("slideFocus", tweenParallax)
        .on("destroy", destroyParallax);
};
