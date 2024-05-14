export const init = copyEl => {
    let timeout = null;

    copyEl.addEventListener('click', e => {
        e.preventDefault();

        const copyText = copyEl.getAttribute('data-copy');

        navigator.clipboard.writeText(copyText)
            .then(() => {
                copyEl.classList.add('is-copied');

                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => {
                    copyEl.classList.remove('is-copied');
                }, 2000);
            });
    });
};
