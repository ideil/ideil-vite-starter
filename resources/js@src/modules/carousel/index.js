(async () => {
    const carouselEls = document.querySelectorAll('.js-carousel');

    if (!carouselEls.length) {
        return;
    }

    const { default: Splide } = await import('@splidejs/splide');

    const initCarousel = el => {
        const arrowsEl = el.querySelector('.splide__arrows');
        const paginationEl = el.querySelector('.splide__pagination');

        new Splide(el, {
            autoWidth: true,
            arrows: arrowsEl,
            pagination: paginationEl,
        }).mount();
    };

    carouselEls.forEach(el => {
        initCarousel(el);
    });
})();
