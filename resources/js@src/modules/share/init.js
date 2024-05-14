import Modal from '@src/plugins/modal';

export const init = shareEl => {
    const modalEl = document.querySelector('#shareModal');

    shareEl.addEventListener('click', async e => {
        e.preventDefault();

        const shareUrl = shareEl.getAttribute('data-share');

        try {
            await navigator.share({
                url: shareUrl
            });
        } catch (err) {
            const modal = Modal.getInstance(modalEl) || new Modal(modalEl);

            modal?.show();
        }
    });
};
