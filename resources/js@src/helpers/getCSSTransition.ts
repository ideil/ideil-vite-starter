export default function getCSSTransition(element: HTMLElement) {
    return {
        duration: parseFloat(
            window.getComputedStyle(element).transitionDuration,
        ),
        easing: window.getComputedStyle(element).transitionTimingFunction,
    };
}
