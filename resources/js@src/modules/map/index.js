import initIntersectionObserver from "@src/helpers/initIntersectionObserver";

initIntersectionObserver(
    document.querySelectorAll("[data-map]"),
    () => import("./init"),
);
