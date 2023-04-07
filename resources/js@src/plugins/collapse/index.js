const collapse = toggleEl => {
    const targetEl = document.querySelector(toggleEl.dataset.collapseTarget);
    const contentEl = targetEl.querySelector('[data-collapse-content]');
    const itemEl = targetEl.closest('[data-collapse-item]');
    const parentEl = targetEl.closest('[data-collapse-parent]');
    let isOpen = isOpenCollapse();

    toggleEl.addEventListener('click', () => {
        isOpen = isOpenCollapse();

        if (!isOpen) {
            targetEl.style.height = contentEl.offsetHeight + 'px';
        }

        targetEl.classList.add('is-collapsing');
        targetEl.classList.remove('c-collapse', 'is-shown');

        if (isOpen) {
            targetEl.style.height = contentEl.offsetHeight + 'px';

            toggleEl.classList.add('is-open');
            itemEl.classList.add('is-open');
        } else {
            toggleEl.classList.remove('is-open');
            itemEl.classList.remove('is-open');

            setTimeout(() => {
                targetEl.style.height = '';
            });
        }

        setTimeout(transitionEnd, 350);
    });

    function transitionEnd() {
        targetEl.classList.remove('is-collapsing');
        targetEl.classList.add('c-collapse');

        if (isOpen) {
            targetEl.classList.add('is-shown');
        }
    }

    function isOpenCollapse() {
        return targetEl.classList.contains('c-collapse') && !targetEl.classList.contains('is-shown');
    }
};

export default collapse;
