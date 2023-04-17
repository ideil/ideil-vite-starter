const collapse = toggleEl => {
    const target = toggleEl.dataset.collapseTarget;

    if (!target) {
        return;
    }

    const paneEl = document.querySelector(`[data-collapse-pane]${ target }`);
    const contentEl = paneEl.querySelector('[data-collapse-content]');
    const itemEl = paneEl.closest('[data-collapse-item]');
    let isOpen = false;
    let isCollapsing = false;
    let transitionFunction = null;

    toggleEl.addEventListener('click', () => {
        isOpen = isCollapseOpen();

        if (isOpen) {
            close();
        } else {
            open();
        }
    });

    function open() {
        if (isCollapsing) {
            return;
        }

        if (transitionFunction) {
            paneEl.removeEventListener('transitionend', transitionFunction);
        }

        transitionFunction = () => {
            paneEl.classList.remove('is-collapsing');
            isCollapsing = false;
            paneEl.removeEventListener('transitionend', transitionFunction);
        };

        isCollapsing = true;
        paneEl.classList.add('is-collapsing');
        paneEl.classList.add('is-shown');
        toggleEl.classList.add('is-open');
        itemEl.classList.add('is-open');
        paneEl.style.height = contentEl.offsetHeight + 'px';

        paneEl.addEventListener('transitionend', transitionFunction);
    }

    function close() {
        if (isCollapsing) {
            return;
        }

        if (transitionFunction) {
            paneEl.removeEventListener('transitionend', transitionFunction);
        }

        transitionFunction = () => {
            paneEl.classList.remove('is-shown');
            paneEl.classList.remove('is-collapsing');
            isCollapsing = false;
            paneEl.removeEventListener('transitionend', transitionFunction);
        };

        isCollapsing = true;
        paneEl.style.height = contentEl.offsetHeight + 'px';

        setTimeout(() => {
            paneEl.classList.add('is-collapsing');
            paneEl.style.height = '';
            toggleEl.classList.remove('is-open');
            itemEl.classList.remove('is-open');

            paneEl.addEventListener('transitionend', transitionFunction);
        });
    }

    function isCollapseOpen() {
        return toggleEl.classList.contains('is-open');
    }
};

export default collapse;
