const tabs = (tabEl: HTMLElement) => {
    const target = tabEl.dataset.tabsTarget ? tabEl.dataset.tabsTarget : tabEl.getAttribute('href');

    if (!target) {
        return;
    }

    const panelEl = document.querySelector(`[data-tabs-panel]${ target }`);

    if (!panelEl) {
        return;
    }

    const parentEl = panelEl.closest('[data-tabs-parent]');

    if (!parentEl) {
        return;
    }

    const tabEls = parentEl.querySelectorAll('[data-tabs-target]');
    const panelEls = parentEl.querySelectorAll('[data-tabs-panel]');

    function openTab() {
        panelEls.forEach(el => {
            if (panelEl !== el) {
                el.classList.remove('is-shown');
            }
        });
        tabEls.forEach(el => {
            if (tabEl !== el) {
                el.classList.remove('is-active');
            }
        });

        tabEl.classList.add('is-active');
        panelEl?.classList.add('is-shown');
    }

    tabEl.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();

        openTab();
    });
};

export default tabs;
