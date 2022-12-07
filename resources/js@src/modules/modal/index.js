import BModal from 'badger-modal';

import { setSpaces, clearSpaces } from '@src/helpers/measure';

(() => {
    const modalEls = document.querySelectorAll('.m-modal');
    const toggleEls = document.querySelectorAll('[data-modal-target]');

    let openedModal = undefined;

    modalEls.forEach(modalEl => {
        const modal = BModal.getInstance(modalEl) || new BModal(modalEl);

        modal.onShow(() => {
            setSpaces();
            openedModal = modal;
        });

        modal.onHidden(() => {
            if (openedModal !== modal) {
                document.documentElement.classList.add('is-modal-open');
            } else {
                openedModal = undefined;
                clearSpaces();
            }
        });
    });

    toggleEls.forEach(el => {
        const modalTarget = el.dataset.modalTarget;

        if (!modalTarget) {
            return;
        }

        const modalEl = document.querySelector(modalTarget);

        if (!modalEl) {
            return;
        }

        const modal = BModal.getInstance(modalEl);

        if (!modal) {
            return;
        }

        modal.onHidden(() => {
            el.classList.remove('is-open');
        });

        el.addEventListener('click', e => {
            e.preventDefault();

            if (openedModal) {
                openedModal.hide();
            }

            el.classList.toggle('is-open');

            if (el.classList.contains('is-open')) {
                modal.show();
            }
        });
    });
})();
