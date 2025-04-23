const initTabs = (tabsEl: HTMLElement) => {
    const toggleEls =
        tabsEl.querySelectorAll<HTMLElement>("[data-tabs-target]");
    const panelEls = [] as HTMLElement[];

    if (!toggleEls.length) {
        return;
    }

    function open(toggleEl: HTMLElement, panelEl: HTMLElement) {
        toggleEls.forEach((el) => {
            el.classList.remove("is-active");
            el.setAttribute("aria-selected", "false");
        });
        panelEls.forEach((el) => {
            el.classList.remove("is-shown");
        });

        toggleEl.classList.add("is-active");
        toggleEl.setAttribute("aria-selected", "true");
        panelEl.classList.add("is-shown");
    }

    toggleEls.forEach((toggleEl: HTMLElement) => {
        const targetId = toggleEl.getAttribute("href");

        if (!targetId) {
            return;
        }

        const panelEl = document.querySelector<HTMLElement>(targetId);

        if (!panelEl) {
            return;
        }

        panelEls.push(panelEl);

        toggleEl.addEventListener("click", (e) => {
            e.preventDefault();
            open(toggleEl, panelEl);
        });
    });
};

export default initTabs;
