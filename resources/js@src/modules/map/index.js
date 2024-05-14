import initObserver from '@src/helpers/initObserver';

(() => {
    const mapEls = document.querySelectorAll('[data-map]');

    if (!mapEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    mapEls.forEach(el => observer.observe(el));
})();
