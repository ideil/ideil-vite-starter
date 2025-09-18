export default (
    els: NodeListOf<Element> | Element[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initPromise: () => Promise<any>,
) => {
    let init: ((el: Element) => void) | null = null;

    if (!els.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    if (!init) {
                        [{ default: init }] = await Promise.all([
                            initPromise(),
                        ]);
                    }

                    if (init) {
                        init(entry.target);
                        observer.unobserve(entry.target);
                    }
                }
            });
        },
        {
            rootMargin: "0px 0px 25% 0px",
        },
    );

    els.forEach((el) => observer.observe(el));

    return observer;
};
