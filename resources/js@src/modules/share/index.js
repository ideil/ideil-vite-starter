import initObserver from '@src/helpers/initObserver';

(() => {
    const shareEls = document.querySelectorAll('[data-share]');

    if (!shareEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    shareEls.forEach(galleryEl => observer.observe(galleryEl));
})();
