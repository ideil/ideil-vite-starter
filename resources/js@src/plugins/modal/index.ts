import { animate } from "animejs";
import EventEmitter from "eventemitter3";
import { type FocusTrap, createFocusTrap } from "focus-trap";
import { type FocusableElement, tabbable } from "tabbable";

import getCSSTransition from "@src/helpers/getCSSTransition";
import getElement from "@src/helpers/getElement";
import { clearSpaces, setSpaces } from "@src/helpers/measure";

class Modal {
    element: HTMLElement;
    #dismissEls: NodeListOf<HTMLElement>;
    #toggleEls: NodeListOf<HTMLElement>;
    #animationDuration: number;
    #eventEmitter: EventEmitter;
    isOpen = false;

    #focusTrap: FocusTrap | undefined;
    #tabbableEls: FocusableElement[] = [];

    #handleModalShow = () => {
        this.isOpen = true;
        this.element.style.display = "block";
        document.documentElement.classList.add("is-modal-open");

        // Accessibility
        if (this.#toggleEls.length > 0) {
            this.#toggleEls.forEach((el) => {
                el.setAttribute("aria-expanded", "true");
            });
        }
        this.element.setAttribute("aria-modal", "");
        this.element.setAttribute("role", "dialog");

        // Focus
        this.#focusTrap?.activate();
        this.element.scrollTop = 0;

        // Events
        this.#addEventListeners();

        // Animation
        setSpaces();
    };
    #handleModalShown = () => {};
    #handleModalHide = () => {
        this.isOpen = false;

        // Accessibility
        if (this.#toggleEls.length > 0) {
            this.#toggleEls.forEach((el) => {
                el.setAttribute("aria-expanded", "false");
            });
        }
        this.element.removeAttribute("aria-modal");
        this.element.removeAttribute("role");

        // Focus
        this.#focusTrap?.deactivate();

        // Events
        this.#removeEventListeners();
    };
    #handleModalHidden = () => {
        this.element.style.display = "none";
        document.documentElement.classList.remove("is-modal-open");
        this.#handleModalHide();

        // Animation
        clearSpaces();
    };

    // Event handlers
    #handleDismissClick = (e: Event) => {
        e.preventDefault();
        this.hide();
    };
    #handleModalClick = (e: Event) => {
        if (e.target === this.element) {
            this.hide();
        }
    };
    #handleDocumentKeyup = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            this.hide();
        }
    };

    // Listeners
    #removeEventListeners = () => {
        this.element.removeEventListener("click", this.#handleModalClick);
        this.#dismissEls.forEach((el) => {
            el.removeEventListener("click", this.#handleDismissClick);
        });
        document.removeEventListener("keyup", this.#handleDocumentKeyup);
    };
    #addEventListeners = () => {
        this.element.addEventListener("click", this.#handleModalClick);
        this.#dismissEls.forEach((el) => {
            el.addEventListener("click", this.#handleDismissClick);
        });
        document.addEventListener("keyup", this.#handleDocumentKeyup);
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

        // Instance
        Modal.instances.set(this.element, this);

        // Elements
        this.#toggleEls = document.documentElement.querySelectorAll(
            `[data-modal-target="#${this.element.id}"]`,
        );
        this.#dismissEls = this.element.querySelectorAll(
            "[data-modal-dismiss]",
        );

        // Animation
        const { duration } = getCSSTransition(this.element);
        this.#animationDuration = duration;

        // Event emitter
        this.#eventEmitter = new EventEmitter();

        // Focus trap
        this.#tabbableEls = tabbable(this.element, {
            displayCheck: "none",
        });
        if (this.#tabbableEls.length > 0) {
            this.#focusTrap = createFocusTrap(this.element, {
                allowOutsideClick: true,
                initialFocus: false,
                tabbableOptions: {
                    displayCheck: "none",
                },
            });
        }

        // Events
        this.onShow(this.#handleModalShow);
        this.onShown(this.#handleModalShown);
        this.onHide(this.#handleModalHide);
        this.onHidden(this.#handleModalHidden);
    }

    show() {
        if (this.isOpen) {
            return;
        }

        animate(this.element, {
            "--modal-transition-progress": 1,
            duration: this.#animationDuration,
            onBegin: () => {
                this.#eventEmitter.emit("show");
            },
            onComplete: () => {
                this.#eventEmitter.emit("shown");
            },
        });
    }

    hide() {
        if (!this.isOpen) {
            return;
        }

        animate(this.element, {
            "--modal-transition-progress": 0,
            duration: this.#animationDuration,
            onBegin: () => {
                this.#eventEmitter.emit("hide");
            },
            onComplete: () => {
                this.#eventEmitter.emit("hidden");
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
