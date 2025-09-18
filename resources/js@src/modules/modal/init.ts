import Modal from "@src/plugins/modal";

export default (el: HTMLElement) => {
    const modalTarget = el.dataset.modalTarget;

    if (!modalTarget) {
        return;
    }

    const modalEl = document.querySelector<HTMLElement>(modalTarget);

    if (!modalEl) {
        return;
    }

    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);

    if (!modal) {
        return;
    }

    el.addEventListener("click", (e) => {
        e.preventDefault();

        if (modal.isOpen) {
            modal.hide();
        } else {
            modal.show();
        }
    });
};
