import Modal from "@src/plugins/modal";

export default (el: HTMLElement) => {
    const modalEl = document.querySelector<HTMLElement>("#shareModal");

    el.addEventListener("click", async (e) => {
        e.preventDefault();

        const shareUrl = el.getAttribute("data-share") || window.location.href;

        try {
            await navigator.share({
                url: shareUrl,
            });
        } catch (err) {
            console.error("Error sharing URL:", err);

            if (!modalEl) {
                return;
            }

            const modal = Modal.getInstance(modalEl) || new Modal(modalEl);

            modal?.show();
        }
    });
};
