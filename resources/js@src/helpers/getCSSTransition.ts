export default function getCSSTransition(element: HTMLElement) {
    const duration =
        parseFloat(window.getComputedStyle(element).transitionDuration) *
            1000 || 300;
    const easing =
        window.getComputedStyle(element).transitionTimingFunction || "ease";

    return {
        duration,
        easing,
    };
}
