
import initObserver from '@src/helpers/initObserver';

(() => {
    const collapseEls = document.querySelectorAll('[data-collapse-target]');

    if (!collapseEls.length) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    collapseEls.forEach(el => observer.observe(el));
})();
