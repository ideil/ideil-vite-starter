import initIntersectionObserver from "@src/helpers/initIntersectionObserver";

initIntersectionObserver(
    document.querySelectorAll("[data-collapse-target]"),
    () => import("./init"),
);
