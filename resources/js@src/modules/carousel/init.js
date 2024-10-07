import initCarousel from '@src/plugins/carousel';

export default el => {
    const carousel = initCarousel(el);

    carousel.mount();
};
