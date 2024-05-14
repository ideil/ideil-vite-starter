import initObserver from '@src/helpers/initObserver';

(() => {
    const tabsEls = document.querySelectorAll('[data-tabs-target]');

    if (!tabsEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    tabsEls.forEach(galleryEl => observer.observe(galleryEl));
})();
