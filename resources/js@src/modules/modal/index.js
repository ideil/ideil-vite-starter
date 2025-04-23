import initIntersectionObserver from "@src/helpers/initIntersectionObserver";

initIntersectionObserver(
    document.querySelectorAll("[data-modal-target]"),
    () => import("./init"),
);
