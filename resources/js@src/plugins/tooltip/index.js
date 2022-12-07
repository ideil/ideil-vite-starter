import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

import getElement from '@src/helpers/getElement';

export default class Tooltip {
    init() {
        const showEvents = [ 'mouseenter', 'focus' ];
        const hideEvents = [ 'mouseleave', 'blur' ];

        this.spacer = 10;

        showEvents.forEach(event => {
            this.targetEl.addEventListener(event, () => {
                this.show();
            });
        });
        hideEvents.forEach(event => {
            this.targetEl.addEventListener(event, () => {
                this.hide();
            });
        });
        this.updatePosition();
    }

    constructor({ targetEl, tooltipEl, placement }) {
        this.targetEl = getElement(targetEl);
        this.tooltipEl = getElement(tooltipEl);
        this.placement = placement;

        if (!this.targetEl) {
            throw new Error(`Tooltip target element ${ targetEl } doesn't exist.`);
        }

        if (!this.tooltipEl) {
            throw new Error(`Tooltip element ${ tooltipEl } doesn't exist.`);
        }

        this.arrowEl = this.tooltipEl.querySelector('.c-tooltip__arrow');

        this.init();
    }

    updatePosition() {
        const middleware = [
            offset(this.spacer),
            flip(),
            shift({
                padding: this.spacer,
            }),
        ];

        if (this.arrowEl) {
            middleware.push(arrow({ element: this.arrowEl }));
        }

        computePosition(this.targetEl, this.tooltipEl, {
            placement: this.placement ?? 'top',
            strategy: 'fixed',
            middleware,
        }).then(({ x: tooltipX, y: tooltipY, placement, middlewareData }) => {
            Object.assign(this.tooltipEl.style, {
                left: `${ tooltipX }px`,
                top: `${ tooltipY }px`,
            });

            if (this.arrowEl) {
                const {
                    x: arrowX,
                    y: arrowY,
                } = middlewareData.arrow;
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]];

                Object.assign(this.arrowEl.style, {
                    left: arrowX ? `${ arrowX }px` : '',
                    top: arrowY ? `${ arrowY }px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: `${ this.arrowEl.offsetHeight / -2 }px`,
                });
            }
        });
    }

    show() {
        this.tooltipEl.setAttribute('data-show', '');
        this.updatePosition();
    }

    hide() {
        this.tooltipEl.removeAttribute('data-show');
    }
}
