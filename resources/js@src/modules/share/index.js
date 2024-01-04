import Modal from '@src/plugins/modal';

const shareEls = document.querySelectorAll('[data-share]');
const modalEl = document.querySelector('#shareModal');

shareEls.forEach(shareEl => {

    shareEl.addEventListener('click', async e => {
        e.preventDefault();

        const shareUrl = shareEl.getAttribute('data-share');

        try {
            await navigator.share({
                url: shareUrl
            });
        } catch (err) {
            const modal = Modal.getInstance(modalEl);

            modal?.show();
        }
    });
});
