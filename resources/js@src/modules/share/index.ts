import initIntersectionObserver from "@src/helpers/initIntersectionObserver";

initIntersectionObserver(
    document.querySelectorAll("[data-share]"),
    () => import("./init"),
);
