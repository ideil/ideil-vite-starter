import Tooltip from "@src/plugins/tooltip";

export default (el: HTMLElement) => {
    const tooltipTarget = el.dataset.tooltipTarget;
    let targetEl: HTMLElement | undefined = undefined;

    if (tooltipTarget) {
        targetEl =
            document.documentElement.querySelector<HTMLElement>(
                tooltipTarget,
            ) ?? undefined;
    }

    const placement = el.dataset.tooltipPlacement;
    const type = el.dataset.tooltipType;
    const content = el.dataset.tooltip;

    new Tooltip({
        toggleEl: el,
        targetEl,
        content,
        placement,
        type,
    });
};
