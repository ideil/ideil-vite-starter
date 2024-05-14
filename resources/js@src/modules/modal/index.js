import initObserver from '@src/helpers/initObserver';

(() => {
    const toggleEls = document.querySelectorAll('[data-modal-target]');

    if (!toggleEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    toggleEls.forEach(galleryEl => observer.observe(galleryEl));
})();
