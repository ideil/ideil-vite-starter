import initIntersectionObserver from '@src/helpers/initIntersectionObserver';

initIntersectionObserver(document.querySelectorAll('[data-tabs]'), () => import('./init'));
