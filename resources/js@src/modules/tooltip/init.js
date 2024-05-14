import Tooltip from '@src/plugins/tooltip';

export const init = toggleEl => {
    const tooltipTarget = toggleEl.dataset.tooltipTarget;
    let targetEl = undefined;

    if (tooltipTarget) {
        targetEl = document.querySelector(tooltipTarget);
    }

    const placement = toggleEl.dataset.tooltipPlacement;
    const type = toggleEl.dataset.tooltipType;
    const content = toggleEl.dataset.tooltip;

    new Tooltip({
        toggleEl,
        targetEl,
        content,
        placement,
        type
    });
};
