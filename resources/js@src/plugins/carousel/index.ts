import Splide from '@splidejs/splide';

const carousel = (el: HTMLElement) => {
    const arrowsEl = el.querySelector('.splide__arrows') as HTMLElement;
    const paginationEl = el.querySelector('.splide__pagination') as HTMLElement;
    const trackEl = el.querySelector('.splide__track') as HTMLElement;
    const pagesEl = el.querySelector('.splide__pages') as HTMLElement;
    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    let oldTimestamp = 0;

    const carousel = new Splide(el, {
        autoWidth: true,
        arrows: !!arrowsEl,
        updateOnMove: true,
        omitEnd: true,
        focus: 0,
        pagination: !!paginationEl,

        flickPower: 200
    });

    const wheelListener = (event: Event) => {
        const e = event as WheelEvent;
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
        carousel.on('pagination:mounted', e => {
            const activeIndex = e.items.findIndex(item => item.button.classList.contains('is-active'));
            pagesEl.innerHTML = `${ activeIndex + 1 } / ${ e.items.length }`;
        });

        carousel.on('pagination:updated', e => {
            const activeIndex = e.items.findIndex(item => item.button.classList.contains('is-active'));
            pagesEl.innerHTML = `${ activeIndex + 1 } / ${ e.items.length }`;
        });
    }

    trackEl.addEventListener(wheelEvent, wheelListener);

    return carousel;
};

export default carousel;
