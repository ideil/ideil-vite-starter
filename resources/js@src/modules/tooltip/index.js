(async () => {
    const toggleEls = document.querySelectorAll('[data-tooltip-target]');

    if (!toggleEls.length) {
        return;
    }

    const { default: Tooltip } = await import('@src/plugins/tooltip');

    toggleEls.forEach(el => {
        const tooltipTarget = el.dataset.tooltipTarget;
        const placement = el.dataset.tooltipPlacement;

        if (!tooltipTarget) {
            return;
        }

        const tooltipEl = document.querySelector(tooltipTarget);

        if (!tooltipEl) {
            return;
        }

        new Tooltip({
            targetEl: el,
            tooltipEl,
            placement,
        });
    });
})();
