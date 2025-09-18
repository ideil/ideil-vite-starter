import initIntersectionObserver from "@src/helpers/initIntersectionObserver";

initIntersectionObserver(
    document.querySelectorAll("[data-gallery]"),
    () => import("./init"),
);
