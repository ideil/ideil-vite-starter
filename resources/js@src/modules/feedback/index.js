import initObserver from '@src/helpers/initObserver';

(() => {
    const feedbackEl = document.querySelector('.vue-feedback-form');

    if (!feedbackEl) {
        return;
    }

    const observer = initObserver(() => import('./init'));

    observer.observe(feedbackEl);
})();
