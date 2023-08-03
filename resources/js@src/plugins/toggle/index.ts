const toggle = (toggleEl: HTMLElement) => {
    let isOpen = false;
    const target = toggleEl.dataset.toggleTarget;

    if (!target) {
        return;
    }

    const targetEl = document.querySelector(target) as HTMLElement;

    if (!targetEl) {
        return;
    }

    function windowClickHandler() {
        if (isOpen) {
            close();
        }
    }

    function open() {
        isOpen = true;
        toggleEl.classList.add('is-active');
        targetEl.classList.add('is-active');

        setTimeout(() => {
            window.addEventListener('click', windowClickHandler);
        });
    }

    function close() {
        isOpen = false;
        toggleEl.classList.remove('is-active');
        targetEl.classList.remove('is-active');

        window.removeEventListener('click', windowClickHandler);
    }

    toggleEl.addEventListener('click', e => {
        e.preventDefault();

        if (isOpen) {
            close();
        } else {
            open();
        }
    });
    targetEl.addEventListener('click', e => {
        e.stopPropagation();
    });
};

export default toggle;
