const tabs = tabEl => {
    const target = tabEl.dataset.tabsTarget ? tabEl.dataset.tabsTarget : tabEl.getAttribute('href');

    if (!target) {
        return;
    }

    const paneEl = document.querySelector(`[data-tabs-pane]${ target }`);
    const parentEl = paneEl.closest('[data-tabs-parent]');
    const tabEls = parentEl.querySelectorAll('[data-tabs-target]');
    const paneEls = parentEl.querySelectorAll('[data-tabs-pane]');

    if (window.location.hash === target) {
        openTab();
    }

    function openTab() {
        paneEls.forEach(el => {
            if (paneEl !== el) {
                el.classList.remove('is-shown');
            }
        });
        tabEls.forEach(el => {
            if (tabEl !== el) {
                el.classList.remove('is-active');
            }
        });

        tabEl.classList.add('is-active');
        paneEl.classList.add('is-shown');
    }

    tabEl.addEventListener('click', e => {
        e.preventDefault();

        history.replaceState(undefined, undefined, target);

        openTab();
    });
};

export default tabs;
