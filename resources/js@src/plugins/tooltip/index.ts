import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';

import getElement from '@src/helpers/getElement';

type Options = {
    toggleEl: HTMLElement | string,
    targetEl?: HTMLElement | string,
    content?: string,
    placement?: string,
    type?: string
};

export default class Tooltip {
    #toggleEl: HTMLElement;
    #targetEl: HTMLElement;
    #dismissEls: NodeListOf<HTMLElement>;
    #arrowEl: HTMLElement | undefined;

    #placement: Placement | undefined;
    #type: string;
    #content: string | undefined;

    #isOpened = false;

    #spacer = 10;

    constructor({
        toggleEl,
        targetEl,
        content,
        placement = 'top',
        type = 'hover focus'
    }: Options) {
        this.#toggleEl = getElement(toggleEl);
        this.#targetEl = getElement(targetEl);
        this.#placement = placement as Placement;
        this.#type = type;
        this.#content = content;

        if (!this.#toggleEl) {
            throw new Error('Tooltip toggle element doesn\'t exist.');
        }

        if (!this.#targetEl && this.#content) {
            this.#targetEl = this.#create();
        }

        if (!this.#targetEl) {
            throw new Error('Tooltip target element (' + targetEl + ') doesn\'t exist.');
        }

        this.#dismissEls = this.#targetEl.querySelectorAll('[data-tooltip-dismiss]');
        this.#arrowEl = this.#targetEl.querySelector<HTMLElement>('.c-tooltip__arrow') || undefined;

        this.#init();
    }

    #init() {
        this.#dismissEls.forEach(dismissEl => {
            dismissEl.addEventListener('click', () => {
                this.hide();
            }, false);
        });

        if (this.#type.includes('hover')) {
            this.#toggleEl.addEventListener('mouseenter', () => {
                this.show();
            }, false);
            this.#toggleEl.addEventListener('mouseleave', () => {
                this.hide();
            }, false);
        }

        if (this.#type.includes('focus')) {
            this.#toggleEl.addEventListener('focus', () => {
                this.show();
            }, false);
            this.#toggleEl.addEventListener('blur', () => {
                this.hide();
            }, false);
        }

        if (this.#type.includes('clickable')) {
            this.#toggleEl.addEventListener('click', () => {
                if (this.#isOpened) {
                    this.hide();
                } else {
                    this.show();
                }
            }, false);
            this.#targetEl.addEventListener('click', e => e.stopPropagation(), false);
        }
    }

    #create = () => {
        const targetEl = document.createElement('div');
        const tooltipInnerEl = document.createElement('div');
        const tooltipArrowEl = document.createElement('div');
        targetEl.classList.add('c-tooltip');
        tooltipInnerEl.classList.add('c-tooltip__inner');
        tooltipArrowEl.classList.add('c-tooltip__arrow');

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
                padding: this.#spacer
            })
        ];

        if (this.#arrowEl) {
            middleware.push(arrow({ element: this.#arrowEl }));
        }

        computePosition(this.#toggleEl, this.#targetEl, {
            placement: this.#placement,
            strategy: 'fixed',
            middleware
        }).then(({ x: tooltipX, y: tooltipY, placement, middlewareData }) => {
            Object.assign(this.#targetEl.style, {
                left: `${ tooltipX }px`,
                top: `${ tooltipY }px`
            });

            if (this.#arrowEl) {
                const {
                    x: arrowX,
                    y: arrowY
                } = middlewareData.arrow!;
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                }[ placement.split('-')[ 0 ] ]!;

                Object.assign(this.#arrowEl.style, {
                    left: arrowX ? `${ arrowX }px` : '',
                    transform: `rotate(${ staticSide === 'top' ? 45 : -135 }deg)`,
                    [ staticSide ]: `${ this.#arrowEl.offsetHeight / -2 - 1 }px`
                });
            }
        });
    }

    #onDocumentClick = () => {
        this.hide();
    };

    #onWindowScroll = () => {
        this.#updatePosition();
    };

    #onWindowResize = () => {
        this.#updatePosition();
    };

    show() {
        if (this.#type === 'clickable') {
            setTimeout(() => {
                document.addEventListener('click', this.#onDocumentClick, false);
            });
        }
        window.addEventListener('scroll', this.#onWindowScroll, false);
        window.addEventListener('resize', this.#onWindowResize, false);
        this.#isOpened = true;
        this.#targetEl.setAttribute('data-show', '');
        this.#updatePosition();
    }

    hide() {
        this.#targetEl.removeAttribute('data-show');
        this.#isOpened = false;

        document.removeEventListener('click', this.#onDocumentClick);
        window.removeEventListener('scroll', this.#onWindowScroll);
        window.removeEventListener('resize', this.#onWindowResize);
    }
}
