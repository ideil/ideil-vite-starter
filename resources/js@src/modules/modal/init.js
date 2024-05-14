import Modal from '@src/plugins/modal';

export const init = toggleEl => {
    const modalTarget = toggleEl.dataset.modalTarget;

    if (!modalTarget) {
        return;
    }

    const modalEl = document.querySelector(modalTarget);

    if (!modalEl) {
        return;
    }

    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);

    if (!modal) {
        return;
    }

    toggleEl.addEventListener('click', e => {
        e.preventDefault();

        modal.show();
    });
};
