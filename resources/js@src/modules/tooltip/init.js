import Tooltip from '@src/plugins/tooltip';

export default el => {
    const tooltipTarget = el.dataset.tooltipTarget;
    let targetEl = undefined;

    if (tooltipTarget) {
        targetEl = document.querySelector(tooltipTarget);
    }

    const placement = el.dataset.tooltipPlacement;
    const type = el.dataset.tooltipType;
    const content = el.dataset.tooltip;

    new Tooltip({
        toggleEl: el,
        targetEl,
        content,
        placement,
        type
    });
};
