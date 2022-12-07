// import Swiper, { Navigation, Pagination, FreeMode, Mousewheel, Autoplay } from 'swiper';
// Swiper.use([Navigation, Pagination, FreeMode, Mousewheel, Autoplay]);

// const carouselEls = document.querySelectorAll('.js-carousel');

// const initCarousel = (el) => {
//     const swiperEl = el.querySelector('.swiper');
//     const prevEl = el.querySelector('.swiper-button-prev');
//     const nextEl = el.querySelector('.swiper-button-next');
//     const paginationEl = el.querySelector('.swiper-pagination');
//     const paginationType = el.dataset.pagination;
//     const freeMode = el.dataset.freeMode;
//     const loop = el.dataset.loop;
//     const autoplay = el.dataset.autoplay;
//     const spaceBetween = el.dataset.spaceBetween ? Number(el.dataset.spaceBetween) : 0;

//     return new Swiper(swiperEl, {
//         slidesPerView: 'auto',
//         spaceBetween: spaceBetween,
//         watchSlidesProgress: true,

//         loop: loop ? true : false,

//         // Navigation arrows
//         navigation: prevEl || nextEl ? {
//             prevEl: prevEl,
//             nextEl: nextEl,
//         } : false,

//         freeMode: {
//             enabled: !!freeMode,
//             sticky: true,
//             momentum: false,
//         },

//         mousewheel: {
//             forceToAxis: true,
//         },

//         autoplay: autoplay ? {
//             delay: Number(autoplay),
//             pauseOnMouseEnter: true,
//         } : false,

//         // Pagination
//         pagination: paginationEl ? {
//             el: paginationEl,
//             type: paginationType ? paginationType : 'bullets',
//             clickable: true,
//         } : false,
//     });
// };

// carouselEls.forEach(el => {
//     initCarousel(el);
// });
