import Modal from "@/js@src/plugins/modal";

(() => {
    const menuEl = document.querySelector<HTMLElement>("#menuModal");
    let menuModal = null;

    if (menuEl) {
        menuModal = Modal.getInstance(menuEl) || new Modal(menuEl);

        if (menuModal) {
            menuModal.onShow(() => {
                document.documentElement.classList.add("is-menu-open");
            });

            menuModal.onHide(() => {
                document.documentElement.classList.remove("is-menu-open");
            });
        }
    }

    const checkScroll = () => {
        if (document.documentElement.scrollTop > 0) {
            document.documentElement.classList.add("is-scrolled");
        } else {
            document.documentElement.classList.remove("is-scrolled");
        }
    };

    checkScroll();

    document.addEventListener("scroll", () => {
        checkScroll();
    });
})();
