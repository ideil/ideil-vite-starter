import initObserver from '@src/helpers/initObserver';

(() => {
    const copyEls = document.querySelectorAll('[data-copy]');

    if (!copyEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    copyEls.forEach(galleryEl => observer.observe(galleryEl));
})();
