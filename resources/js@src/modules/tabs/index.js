(async () => {
    const tabsEls = document.querySelectorAll('[data-tabs-target]');

    if (!tabsEls.length) {
        return;
    }

    const { default: tabs } = await import('@src/plugins/tabs');

    tabsEls.forEach(el => tabs(el));
})();
