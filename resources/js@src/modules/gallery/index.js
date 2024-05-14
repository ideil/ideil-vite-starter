import initObserver from '@src/helpers/initObserver';

(() => {
    const galleryEls = document.querySelectorAll('[data-gallery]');

    if (!galleryEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    galleryEls.forEach(galleryEl => observer.observe(galleryEl));
})();
