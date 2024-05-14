import initObserver from '@src/helpers/initObserver';

(() => {
    const toggleEls = [
        ...document.querySelectorAll('[data-tooltip-target]'),
        ...document.querySelectorAll('[data-tooltip]')
    ];

    if (!toggleEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    toggleEls.forEach(galleryEl => observer.observe(galleryEl));
})();
