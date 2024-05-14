export default (initPromise: () => Promise<any>) => {
    let init: ((el: Element) => void) | null = null;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(async entry => {
            if (entry.isIntersecting) {
                if (!init) {
                    [
                        { init }
                    ] = await Promise.all([
                        initPromise()
                    ]);
                }

                if (init) {
                    init(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px 25% 0px'
    });

    return observer;
};
