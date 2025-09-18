export default (el: HTMLElement) => {
    let timeout: NodeJS.Timeout | null = null;

    el.addEventListener("click", (e) => {
        e.preventDefault();

        const copyText = el.getAttribute("data-copy") || "";

        navigator.clipboard.writeText(copyText).then(() => {
            el.classList.add("is-copied");

            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                el.classList.remove("is-copied");
            }, 2000);
        });
    });
};
