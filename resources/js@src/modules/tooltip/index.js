(async () => {
    const toggleEls = [
        ...document.querySelectorAll('[data-tooltip-target]'),
        ...document.querySelectorAll('[data-tooltip]'),
    ];

    if (!toggleEls.length) {
        return;
    }

    const { default: Tooltip } = await import('@src/plugins/tooltip');

    toggleEls.forEach(el => {
        const tooltipTarget = el.dataset.tooltipTarget;
        const tooltipEl = document.querySelector(tooltipTarget);
        const placement = el.dataset.tooltipPlacement;
        const type = el.dataset.tooltipType;
        const content = el.dataset.tooltip;

        new Tooltip({
            targetEl: el,
            tooltipEl,
            content,
            placement,
            type,
        });
    });
})();
