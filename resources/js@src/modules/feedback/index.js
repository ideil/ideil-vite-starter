import initIntersectionObserver from '@src/helpers/initIntersectionObserver';

initIntersectionObserver(document.querySelectorAll('.vue-feedback-form'), () => import('./init'));
