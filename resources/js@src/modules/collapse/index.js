(async () => {
    const collapseEls = document.querySelectorAll('[data-collapse-target]');

    if (!collapseEls.length) {
        return;
    }

    const { default: collapse } = await import('@src/plugins/collapse');

    collapseEls.forEach(el => collapse(el));
})();
