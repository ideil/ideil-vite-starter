const collapse = el => {
    const target = document.querySelector(el.dataset.collapseTarget);
    const content = target.querySelector('[data-collapse-content]');
    let isOpen = isOpenCollapse();

    el.addEventListener('click', () => {
        isOpen = isOpenCollapse();

        if (!isOpen) {
            target.style.height = content.offsetHeight + 'px';
        }

        target.classList.add('is-collapsing');
        target.classList.remove('c-collapse', 'is-shown');

        if (isOpen) {
            target.style.height = content.offsetHeight + 'px';
            el.classList.add('is-open');
        } else {
            el.classList.remove('is-open');
            setTimeout(() => {
                target.style.height = '';
            });
        }

        setTimeout(transitionEnd, 350);
    });

    function transitionEnd() {
        target.classList.remove('is-collapsing');
        target.classList.add('c-collapse');

        if (isOpen) {
            target.classList.add('is-shown');
        }
    }

    function isOpenCollapse() {
        return target.classList.contains('c-collapse') && !target.classList.contains('is-shown');
    }
};

export default collapse;
