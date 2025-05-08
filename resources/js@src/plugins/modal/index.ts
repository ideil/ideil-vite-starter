import getCSSTransition from "@src/helpers/getCSSTransition";
import getElement from "@src/helpers/getElement";
import { clearSpaces, setSpaces } from "@src/helpers/measure";
import { animate } from "animejs";
import EventEmitter from "eventemitter3";
import { type FocusTrap, createFocusTrap } from "focus-trap";
import { type FocusableElement, tabbable } from "tabbable";

class Modal {
    element: HTMLElement;
    #dismissEls: NodeListOf<HTMLElement>;
    #toggleEls: NodeListOf<HTMLElement>;
    #mouseDownElement: HTMLElement | null = null;
    #animationDuration: number;
    #animationEasing: string;
    #eventEmitter: EventEmitter;
    isOpen = false;

    #focusTrap: FocusTrap | undefined;
    #tabbableEls: FocusableElement[] = [];

    #showHandle = () => {
        this.isOpen = true;
        this.#eventEmitter.emit("shown");
    };
    #hideHandle = () => {
        this.isOpen = false;
        this.element.removeAttribute("aria-modal");
        this.element.removeAttribute("role");
        document.documentElement.classList.remove("is-modal-open");

        this.#eventEmitter.emit("hidden");

        clearSpaces();

        this.element.removeEventListener("mousedown", this.#modalMouseDown);
        this.element.removeEventListener("click", this.#modalClick);
        this.#dismissEls.forEach((el) => {
            el.removeEventListener("click", this.#dismissHandle);
        });
        document.removeEventListener("keyup", this.#escClick);
    };
    #dismissHandle = (e: Event) => {
        e.preventDefault();
        this.hide();
    };
    #modalClick = (e: Event) => {
        if (
            e.target === this.element &&
            this.#mouseDownElement === this.element
        ) {
            this.hide();
        }
    };
    #modalMouseDown = (e: MouseEvent) => {
        this.#mouseDownElement = e.target as HTMLElement;
    };
    #escClick = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            this.hide();
        }
    };

    static instances: Map<HTMLElement, Modal> = new Map();

    static getInstance(element: HTMLElement) {
        return Modal.instances.get(element);
    }

    constructor(element: HTMLElement | string) {
        this.element = getElement(element)!;

        if (!this.element) {
            throw new Error(`Modal element ${element} doesn't exist.`);
        }

        this.#toggleEls = document.documentElement.querySelectorAll(
            `[data-modal-target="#${this.element.id}"]`,
        );

        const { duration, easing } = getCSSTransition(this.element);
        this.#animationDuration = duration;
        this.#animationEasing = easing;
        this.#eventEmitter = new EventEmitter();

        Modal.instances.set(this.element, this);

        this.#dismissEls = this.element.querySelectorAll(
            "[data-modal-dismiss]",
        );

        this.#tabbableEls = tabbable(this.element, {
            displayCheck: "none",
        });

        if (this.#tabbableEls.length > 0) {
            this.#focusTrap = createFocusTrap(this.element, {
                allowOutsideClick: true,
                tabbableOptions: {
                    displayCheck: "none",
                },
            });
        }
    }

    show() {
        if (this.isOpen) {
            return;
        }

        if (this.#toggleEls.length > 0) {
            this.#toggleEls.forEach((el) => {
                el.setAttribute("aria-expanded", "true");
            });
        }

        this.#eventEmitter.emit("show");
        this.#focusTrap?.activate();

        setSpaces();
        animate(this.element, {
            "--modal-transition-progress": [0, 1],
            duration: this.#animationDuration,
            easing: this.#animationEasing,
            onBegin: () => {
                this.element.style.display = "block";
                this.#showHandle();
            },
        });

        document.documentElement.classList.add("is-modal-open");

        this.element.setAttribute("aria-modal", "");
        this.element.setAttribute("role", "dialog");
        this.element.scrollTop = 0;

        this.#dismissEls.forEach((el) => {
            el.addEventListener("click", this.#dismissHandle, false);
        });
        this.element.addEventListener("mousedown", this.#modalMouseDown, false);
        this.element.addEventListener("click", this.#modalClick, false);
        document.addEventListener("keyup", this.#escClick, false);
    }

    hide() {
        if (!this.isOpen) {
            return;
        }

        if (this.#toggleEls.length > 0) {
            this.#toggleEls.forEach((el) => {
                el.setAttribute("aria-expanded", "false");
            });
        }

        this.#eventEmitter.emit("hide");

        animate(this.element, {
            duration: this.#animationDuration,
            easing: this.#animationEasing,
            "--modal-transition-progress": [1, 0],
            onComplete: () => {
                this.element.style.display = "none";
                this.#hideHandle();
                this.#focusTrap?.deactivate();
            },
        });
    }

    onShow(callback: () => void) {
        this.#eventEmitter.on("show", callback);
        return () => this.#eventEmitter.off("show", callback);
    }

    onHide(callback: () => void) {
        this.#eventEmitter.on("hide", callback);
        return () => this.#eventEmitter.off("hide", callback);
    }

    onShown(callback: () => void) {
        this.#eventEmitter.on("shown", callback);
        return () => this.#eventEmitter.off("shown", callback);
    }

    onHidden(callback: () => void) {
        this.#eventEmitter.on("hidden", callback);
        return () => this.#eventEmitter.off("hidden", callback);
    }
}

export default Modal;
