import initIntersectionObserver from '@src/helpers/initIntersectionObserver';

initIntersectionObserver(document.querySelectorAll('[data-copy]'), () => import('./init'));
