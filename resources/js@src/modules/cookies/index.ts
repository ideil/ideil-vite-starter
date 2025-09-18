(() => {
    if (window.App?.shouldHideCookiesModal) {
        return;
    }

    const cookiesEl = document.querySelector("[data-cookies]");
    const cookiesSubmitEl = document.querySelector("[data-cookies-submit]");

    if (!cookiesEl || !cookiesSubmitEl) {
        return;
    }

    const isConfirmed = localStorage.getItem("isCookiesConfirmed");

    if (!isConfirmed) {
        setTimeout(() => {
            document.documentElement.classList.add("is-cookies-visible");
        }, 1000);

        cookiesSubmitEl.addEventListener("click", (e) => {
            e.preventDefault();

            document.documentElement.classList.remove("is-cookies-visible");
            localStorage.setItem("isCookiesConfirmed", "true");
        });
    }
})();
