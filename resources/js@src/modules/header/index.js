import { setSpaces, clearSpaces } from '@src/helpers/measure';

(() => {
    const menuToggle = document.querySelector('[data-menu-toggle]');

    if (!menuToggle) {
        return;
    }

    menuToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('is-menu-open');

        if (document.documentElement.classList.contains('is-menu-open')) {
            setSpaces();
        } else {
            clearSpaces();
        }
    });

    const checkScroll = () => {
        if (document.documentElement.scrollTop >= 10) {
            document.documentElement.classList.add('is-header-sticky');
        } else {
            document.documentElement.classList.remove('is-header-sticky');
        }
    };

    checkScroll();

    document.addEventListener('scroll', () => {
        checkScroll();
    });
})();
