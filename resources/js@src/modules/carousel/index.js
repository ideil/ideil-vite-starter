import { debounce } from 'debounce';

(async () => {
    const carouselEls = document.querySelectorAll('[data-carousel]');

    if (!carouselEls.length) {
        return;
    }

    const [
        { default: Splide },
        { Intersection },
    ] = await Promise.all([
        await import('@splidejs/splide'),
        await import('@splidejs/splide-extension-intersection'),
    ]);

    const initCarousel = el => {
        const arrowsEl = el.querySelector('.splide__arrows');
        const paginationEl = el.querySelector('.splide__pagination');
        const trackEl = el.querySelector('.splide__track');
        const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
        let scrollStopped = false;

        const carousel = new Splide(el, {
            type: 'loop',
            autoWidth: true,
            arrows: arrowsEl,
            updateOnMove: true,
            omitEnd: true,
            focus: 0,
            pagination: paginationEl,

            flickPower: 200,

            // wheel: true,
            // wheelSleep: 400,
            // direction: 'ltr',
        });

        const stopScroll = debounce(() => {
            scrollStopped = false;
        }, 40);

        trackEl.addEventListener(wheelEvent, e => {
            const deltaX = e.deltaX;
            const deltaY = e.deltaY;

            if (!deltaX) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            stopScroll();

            if (deltaY || scrollStopped) {
                return;
            }

            scrollStopped = true;

            carousel.go(deltaX > 0 ? '>' : '<');
        });

        return carousel;
    };

    carouselEls.forEach(el => {
        const carousel = initCarousel(el);

        carousel.mount();
    });
})();
