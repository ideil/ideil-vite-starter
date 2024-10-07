import initIntersectionObserver from '@src/helpers/initIntersectionObserver';

initIntersectionObserver([
    ...document.querySelectorAll('[data-tooltip-target]'),
    ...document.querySelectorAll('[data-tooltip]')
], () => import('./init'));
