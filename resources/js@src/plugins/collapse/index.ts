const collapse = (toggleEl: HTMLElement) => {
    const target = toggleEl.dataset.collapseTarget;

    if (!target) {
        return;
    }

    const panelEl = document.querySelector(
        `[data-collapse-panel]${target}`,
    ) as HTMLElement;

    if (!panelEl) {
        return;
    }

    const contentEl = panelEl.querySelector(
        "[data-collapse-content]",
    ) as HTMLElement;
    let isOpen = false;
    let isCollapsing = false;
    let transitionFunction: null | (() => void) = null;

    toggleEl.addEventListener("click", () => {
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
            panelEl.removeEventListener("transitionend", transitionFunction);
        }

        transitionFunction = () => {
            panelEl.classList.remove("is-collapsing");
            isCollapsing = false;
            panelEl.style.height = "";
            panelEl.removeEventListener("transitionend", transitionFunction!);
        };

        isCollapsing = true;
        panelEl.classList.add("is-collapsing");
        panelEl.classList.add("is-shown");
        toggleEl.classList.add("is-active");
        panelEl.style.height = contentEl.offsetHeight + "px";

        panelEl.addEventListener("transitionend", transitionFunction);
    }

    function close() {
        if (isCollapsing) {
            return;
        }

        if (transitionFunction) {
            panelEl.removeEventListener("transitionend", transitionFunction);
        }

        transitionFunction = () => {
            panelEl.classList.remove("is-shown");
            panelEl.classList.remove("is-collapsing");
            isCollapsing = false;
            panelEl.removeEventListener("transitionend", transitionFunction!);
        };

        isCollapsing = true;
        panelEl.style.height = contentEl.offsetHeight + "px";

        setTimeout(() => {
            panelEl.classList.add("is-collapsing");
            panelEl.style.height = "";
            toggleEl.classList.remove("is-active");

            panelEl.addEventListener("transitionend", transitionFunction!);
        });
    }

    function isCollapseOpen() {
        return toggleEl.classList.contains("is-active");
    }
};

export default collapse;
