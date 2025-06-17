import { animate } from "animejs";

import getCSSTransition from "@src/helpers/getCSSTransition";

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

    const { duration, easing } = getCSSTransition(toggleEl);
    let isOpen = toggleEl.ariaExpanded === "true";
    let isCollapsing = false;

    const open = () => {
        if (isCollapsing) {
            return;
        }

        isCollapsing = true;

        panelEl.style.height = "0px";
        panelEl.style.display = "block";
        toggleEl.ariaExpanded = "true";
        panelEl.ariaExpanded = "true";

        animate(panelEl, {
            duration,
            easing,
            height: panelEl.scrollHeight,
            onComplete: () => {
                isCollapsing = false;
                isOpen = true;
                panelEl.style.height = "";
            },
        });
    };

    const close = () => {
        if (isCollapsing) {
            return;
        }

        isCollapsing = true;

        panelEl.style.height = panelEl.scrollHeight + "px";
        toggleEl.ariaExpanded = "false";
        panelEl.ariaExpanded = "false";

        animate(panelEl, {
            duration,
            easing,
            height: 0,
            onComplete: () => {
                isCollapsing = false;
                panelEl.style.display = "none";
                isOpen = false;
            },
        });
    };

    toggleEl.addEventListener("click", () => {
        if (isOpen) {
            close();
        } else {
            open();
        }
    });
};

export default collapse;
