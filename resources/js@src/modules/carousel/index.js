import initIntersectionObserver from "@/js@src/helpers/initIntersectionObserver";

initIntersectionObserver(
    document.querySelectorAll("[data-carousel]"),
    () => import("./init"),
);
