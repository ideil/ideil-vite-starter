import EventEmitter from 'eventemitter3';
import getElement from '@src/helpers/getElement';
import { clearSpaces, setSpaces } from '@src/helpers/measure';
import anime from 'animejs';
import getCSSTransition from '@src/helpers/getCSSTransition';

class Modal {
    element: HTMLElement;
    #dismissEls: NodeListOf<HTMLElement>;
    #mouseDownElement: HTMLElement | null = null;
    #animationDuration: number;
    #animationEasing: string;
    #eventEmitter: EventEmitter;

    #showHandle = () => {
        this.#eventEmitter.emit('shown');

        this.element.removeEventListener('transitionend', this.#showHandle);
    };
    #hideHandle = () => {
        this.element.style.display = 'none';
        this.element.setAttribute('aria-hidden', '');
        this.element.removeAttribute('aria-modal');
        this.element.removeAttribute('role');
        document.documentElement.classList.remove('is-modal-open');

        this.#eventEmitter.emit('hidden');

        clearSpaces();

        this.element.removeEventListener('transitionend', this.#hideHandle);
        this.element.removeEventListener('mousedown', this.#modalMouseDown);
        this.element.removeEventListener('click', this.#modalClick);
        document.removeEventListener('keyup', this.#escClick);
        this.#dismissEls.forEach(el => {
            el.removeEventListener('click', this.#dismissHandle);
        });
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
        if (e.key === 'Escape') {
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
            throw new Error(`Modal element ${ element } doesn't exist.`);
        }

        const { duration, easing } = getCSSTransition(this.element);
        this.#eventEmitter = new EventEmitter();

        Modal.instances.set(this.element, this);

        this.#dismissEls = this.element.querySelectorAll(
            '[data-modal-dismiss]'
        );
        this.#animationDuration = duration * 1000 || 300;
        this.#animationEasing = easing || 'ease';
    }

    show() {
        this.#eventEmitter.emit('show');

        setSpaces();
        anime({
            value: [ 0, 1 ],
            duration: this.#animationDuration,
            easing: this.#animationEasing,
            update: v => {
                this.element.style.setProperty('--modal-transition-progress', (v.progress / 100).toString());
            }
        });

        document.documentElement.classList.add('is-modal-open');

        this.element.style.display = 'block';
        this.element.removeAttribute('aria-hidden');
        this.element.setAttribute('aria-modal', '');
        this.element.setAttribute('role', 'dialog');
        this.element.scrollTop = 0;
        this.element.classList.add('is-shown');

        this.#dismissEls.forEach(el => {
            el.addEventListener('click', this.#dismissHandle, false);
        });
        this.element.addEventListener('mousedown', this.#modalMouseDown, false);
        this.element.addEventListener('click', this.#modalClick, false);
        document.addEventListener('keyup', this.#escClick, false);
        this.element.addEventListener('transitionend', this.#showHandle, false);
    }

    hide() {
        this.#eventEmitter.emit('hide');

        anime({
            value: [ 0, 1 ],
            duration: this.#animationDuration,
            easing: this.#animationEasing,
            update: v => {
                this.element.style.setProperty('--modal-transition-progress', ((100 - v.progress) / 100).toString());
            }
        });

        this.element.classList.remove('is-shown');
        this.element.addEventListener('transitionend', this.#hideHandle, false);
    }

    onShow(callback: () => void) {
        this.#eventEmitter.on('show', callback);
        return () => this.#eventEmitter.off('show', callback);
    }

    onHide(callback: () => void) {
        this.#eventEmitter.on('hide', callback);
        return () => this.#eventEmitter.off('hide', callback);
    }

    onShown(callback: () => void) {
        this.#eventEmitter.on('shown', callback);
        return () => this.#eventEmitter.off('shown', callback);
    }

    onHidden(callback: () => void) {
        this.#eventEmitter.on('hidden', callback);
        return () => this.#eventEmitter.off('hidden', callback);
    }
}

export default Modal;
