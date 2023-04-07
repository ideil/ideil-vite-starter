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
        const pagesEl = el.querySelector('.splide__pages');
        const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
        let oldTimestamp = 0;

        const carousel = new Splide(el, {
            // type: 'loop',
            autoWidth: true,
            arrows: arrowsEl,
            updateOnMove: true,
            omitEnd: true,
            focus: 0,
            pagination: paginationEl,

            flickPower: 200,
        });

        const wheelListener = e => {
            const deltaX = e.deltaX;
            const deltaY = e.deltaY;

            if (!deltaX) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            if (deltaY || e.timeStamp - oldTimestamp < 300) {
                return;
            }

            oldTimestamp = e.timeStamp;

            carousel.go(deltaX > 0 ? '>' : '<');
        };

        if (pagesEl) {
            carousel.on('move', newIndex => {
                pagesEl.innerHTML = `${ newIndex + 1 }/${ carousel.length }`;
            });
        }

        trackEl.addEventListener(wheelEvent, wheelListener);

        return carousel;
    };

    const playAutoplay = carousel => {
        const { Autoplay } = carousel.Components;
        if (!Autoplay) return;
        Autoplay.play();
    };

    const pauseAutoplay = carousel => {
        const { Autoplay } = carousel.Components;
        if (!Autoplay) return;
        Autoplay.pause();
    };

    const setHeroCarousel = carousel => {
        const contentEls = [
            // ...carousel.root.querySelectorAll('.c-title'),
            ...carousel.root.querySelectorAll('.f-btn'),
        ];
        let oldProgress = 0;

        carousel.options.__proto__.autoplay = 'pause';
        carousel.options.__proto__.type = 'loop';
        carousel.options.__proto__.rewind = true;
        carousel.options.__proto__.resetProgress = false;
        carousel.options.__proto__.pauseOnHover = false;
        carousel.options.__proto__.pauseOnFocus = false;
        // carousel.options.__proto__.interval = 1000;

        carousel.on('autoplay:playing', e => {
            let progress = e * 100;
            progress = progress + (progress - oldProgress) * 0.01;
            carousel.root.style.setProperty('--progress', `${ progress }%`);
            oldProgress = progress;
        });

        carousel.on('intersection:in', () => playAutoplay(carousel));
        carousel.on('intersection:out', () => pauseAutoplay(carousel));

        contentEls.forEach(el => {
            el.addEventListener('mouseover', () => pauseAutoplay(carousel));
            el.addEventListener('mouseout', () => playAutoplay(carousel));
        });
    };

    carouselEls.forEach(el => {
        const carousel = initCarousel(el);

        if (el.dataset.hero !== undefined) {
            setHeroCarousel(carousel);
            carousel.mount({ Intersection: Intersection });
        } else {
            carousel.mount();
        }
    });
})();
