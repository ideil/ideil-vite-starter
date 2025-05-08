import { arrow, computePosition, flip, offset, shift } from "@floating-ui/dom";
import type { Placement } from "@floating-ui/dom";
import getElement from "@src/helpers/getElement";
import { animate } from "animejs";
import { type FocusTrap, createFocusTrap } from "focus-trap";
import { type FocusableElement, tabbable } from "tabbable";

import getCSSTransition from "@/js@src/helpers/getCSSTransition";

type Options = {
    toggleEl: HTMLElement | string;
    targetEl?: HTMLElement | string;
    content?: string;
    placement?: string;
    type?: string;
};

export default class Tooltip {
    #toggleEl: HTMLElement;
    #targetEl: HTMLElement;
    #dismissEls: NodeListOf<HTMLElement>;
    #arrowEl: HTMLElement | undefined;

    #animationDuration: number;
    #animationEasing: string;
    #placement: Placement | undefined;
    #type: string;
    #content: string | undefined;

    #focusTrap: FocusTrap | undefined;
    #tabbableEls: FocusableElement[] = [];

    #isOpened = false;
    #isClicked = false;

    #spacer = 8;

    constructor({
        toggleEl,
        targetEl,
        content,
        placement = "top",
        type = "hover focus",
    }: Options) {
        this.#toggleEl = getElement(toggleEl);
        this.#targetEl = getElement(targetEl);
        this.#placement = placement as Placement;
        this.#type = type;
        this.#content = content;

        if (!this.#toggleEl) {
            throw new Error("Tooltip toggle element doesn't exist.");
        }

        if (!this.#targetEl && this.#content) {
            this.#targetEl = this.#create();
        }

        if (!this.#targetEl) {
            throw new Error(
                "Tooltip target element (" + targetEl + ") doesn't exist.",
            );
        }

        const { duration, easing } = getCSSTransition(this.#targetEl);
        this.#animationDuration = duration;
        this.#animationEasing = easing;

        this.#dismissEls = this.#targetEl.querySelectorAll(
            "[data-tooltip-dismiss]",
        );
        this.#arrowEl =
            this.#targetEl.querySelector<HTMLElement>(".c-tooltip__arrow") ||
            undefined;

        // Focus trap
        if (this.#type.includes("clickable")) {
            this.#tabbableEls = tabbable(this.#targetEl, {
                displayCheck: "none",
            });

            if (this.#tabbableEls.length > 0) {
                this.#focusTrap = createFocusTrap(this.#targetEl, {
                    allowOutsideClick: true,
                    tabbableOptions: {
                        displayCheck: "none",
                    },
                });
            }
        }

        // Events
        this.#toggleEl.addEventListener(
            "mouseenter",
            this.#onToggleMouseEnter,
            false,
        );
        this.#toggleEl.addEventListener(
            "mouseleave",
            this.#onToggleMouseLeave,
            false,
        );
        this.#toggleEl.addEventListener("focus", this.#onToggleFocus, false);
        this.#toggleEl.addEventListener("blur", this.#onToggleBlur, false);
        this.#toggleEl.addEventListener("click", this.#onToggleClick, false);
        this.#targetEl.addEventListener("click", this.#onTargetClick, false);
    }

    #create = () => {
        const targetEl = document.createElement("div");
        const tooltipInnerEl = document.createElement("div");
        const tooltipArrowEl = document.createElement("div");
        targetEl.classList.add("c-tooltip");
        tooltipInnerEl.classList.add("c-tooltip__inner");
        tooltipArrowEl.classList.add("c-tooltip__arrow");

        if (this.#content) {
            targetEl.innerHTML = this.#content;
        }

        targetEl.appendChild(tooltipInnerEl);
        targetEl.appendChild(tooltipArrowEl);
        document.body.appendChild(targetEl);

        return targetEl;
    };

    #updatePosition() {
        const middleware = [
            offset(this.#spacer),
            flip(),
            shift({
                padding: this.#spacer,
            }),
        ];

        if (this.#arrowEl) {
            middleware.push(arrow({ element: this.#arrowEl }));
        }

        computePosition(this.#toggleEl, this.#targetEl, {
            placement: this.#placement,
            strategy: "fixed",
            middleware,
        }).then(({ x: tooltipX, y: tooltipY, placement, middlewareData }) => {
            Object.assign(this.#targetEl.style, {
                left: `${tooltipX}px`,
                top: `${tooltipY}px`,
            });

            if (this.#arrowEl) {
                const { x: arrowX, y: arrowY } = middlewareData.arrow!;
                const staticSide = {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right",
                }[placement.split("-")[0]]!;
                const rotations = {
                    top: 45,
                    bottom: -135,
                    left: -45,
                    right: 135,
                } as Record<string, number>;

                Object.assign(this.#arrowEl.style, {
                    bottom: "",
                    right: "",
                    left: arrowX ? `${arrowX}px` : "",
                    top: arrowY ? `${arrowY}px` : "",
                    transform: `rotate(${rotations[staticSide]}deg)`,
                    [staticSide]: `${this.#arrowEl.offsetHeight / -2 - 1}px`,
                });
            }
        });
    }

    #onDismissClick = () => {
        if (this.#isOpened) {
            this.hide();
        }
        this.#isClicked = false;
    };

    #onDocumentClick = () => {
        if (this.#isOpened) {
            this.hide();
        }
        this.#isClicked = false;
    };

    #onWindowScroll = () => {
        this.#updatePosition();
    };
    #onWindowResize = () => {
        this.#updatePosition();
    };

    #onToggleClick = () => {
        if (this.#type.includes("clickable")) {
            if (this.#isClicked) {
                this.#isClicked = false;

                if (this.#isOpened) {
                    this.hide();
                }
            } else {
                this.#isClicked = true;
                this.show();
            }
        }
    };
    #onToggleMouseEnter = () => {
        if (this.#type.includes("hover") && !this.#isOpened) {
            this.show();
        }
    };
    #onToggleMouseLeave = () => {
        if (
            this.#type.includes("hover") &&
            !this.#isClicked &&
            this.#isOpened
        ) {
            this.hide();
        }
    };
    #onToggleFocus = () => {
        if (this.#type.includes("focus") && !this.#isOpened) {
            this.show();
        }
    };
    #onToggleBlur = () => {
        if (this.#type.includes("focus") && this.#isOpened) {
            this.hide();
        }
    };

    #onTargetClick = (e: MouseEvent) => e.stopPropagation();

    #onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Escape" && this.#isOpened) {
            this.#isClicked = false;
            this.hide();
        }
    };

    show() {
        this.#isOpened = true;

        if (this.#type.includes("clickable") && this.#isClicked) {
            setTimeout(() => {
                document.addEventListener(
                    "click",
                    this.#onDocumentClick,
                    false,
                );
            });

            this.#toggleEl.setAttribute("aria-expanded", "true");
            this.#focusTrap?.activate();
        }

        animate(this.#targetEl, {
            duration: this.#animationDuration,
            easing: this.#animationEasing,
            "--tooltip-transition-progress": 1,
            onBegin: () => {
                this.#targetEl.style.display = "block";
                this.#updatePosition();
            },
        });

        window.addEventListener("scroll", this.#onWindowScroll, false);
        window.addEventListener("resize", this.#onWindowResize, false);
        window.addEventListener("keyup", this.#onKeyUp, false);
        this.#dismissEls.forEach((dismissEl) => {
            dismissEl.addEventListener("click", this.#onDismissClick, false);
        });
    }

    hide() {
        this.#isOpened = false;

        if (this.#type.includes("clickable")) {
            this.#toggleEl.setAttribute("aria-expanded", "false");
        }

        animate(this.#targetEl, {
            duration: this.#animationDuration,
            easing: this.#animationEasing,
            "--tooltip-transition-progress": 0,
            onComplete: () => {
                this.#targetEl.style.display = "none";

                this.#focusTrap?.deactivate();
            },
        });

        document.removeEventListener("click", this.#onDocumentClick);
        window.removeEventListener("scroll", this.#onWindowScroll);
        window.removeEventListener("resize", this.#onWindowResize);
        window.removeEventListener("keyup", this.#onKeyUp);
        this.#dismissEls.forEach((dismissEl) => {
            dismissEl.removeEventListener("click", this.#onDismissClick);
        });
    }
}
