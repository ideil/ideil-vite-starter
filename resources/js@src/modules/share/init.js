import Modal from '@src/plugins/modal';

export default el => {
    const modalEl = document.querySelector('#shareModal');

    el.addEventListener('click', async e => {
        e.preventDefault();

        const shareUrl = el.getAttribute('data-share');

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
