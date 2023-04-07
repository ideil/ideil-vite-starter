import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

import getElement from '@src/helpers/getElement';

export default class Tooltip {
    init() {
        const showEvents = [ 'mouseenter', 'focus' ];
        const hideEvents = [ 'mouseleave', 'blur' ];

        this.spacer = 10;

        if (this.type === 'clickable') {
            this.targetEl.addEventListener('click', () => {
                if (this.isOpened) {
                    this.hide();
                } else {
                    this.show();
                }
            }, false);
            this.dismissEls.forEach(dismissEl => {
                dismissEl.addEventListener('click', () => {
                    this.hide();
                }, false);
            });
            this.tooltipEl.addEventListener('click', e => e.stopPropagation(), false);
        } else {
            showEvents.forEach(event => {
                this.targetEl.addEventListener(event, () => {
                    this.show();
                }, false);
            });
            hideEvents.forEach(event => {
                this.targetEl.addEventListener(event, () => {
                    this.hide();
                }, false);
            });
        }
    }

    create() {
        const tooltipEl = document.createElement('div');
        const tooltipInnerEl = document.createElement('div');
        tooltipEl.classList.add('c-tooltip');
        tooltipInnerEl.classList.add('c-tooltip__inner');

        tooltipEl.innerHTML = this.content;

        tooltipEl.appendChild(tooltipInnerEl);
        document.body.appendChild(tooltipEl);

        return tooltipEl;
    }

    constructor({ targetEl, tooltipEl, content, placement, type }) {
        this.targetEl = getElement(targetEl);
        this.tooltipEl = getElement(tooltipEl);
        this.placement = placement;
        this.type = type;
        this.content = content;

        if (!this.targetEl) {
            throw new Error('Tooltip target doesn\'t exist.');
        }

        if (!this.tooltipEl && this.content) {
            this.tooltipEl = this.create();
        }

        if (!this.tooltipEl) {
            throw new Error('Tooltip element doesn\'t exist.');
        }

        this.onDocumentClick = e => {
            this.hide();
        };

        this.onWindowScroll = e => {
            this.updatePosition();
        };

        this.onWindowResize = e => {
            this.updatePosition();
        };

        this.dismissEls = this.tooltipEl.querySelectorAll('[data-tooltip-dismiss]');
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
        if (this.type === 'clickable') {
            setTimeout(() => {
                document.addEventListener('click', this.onDocumentClick, false);
            });
        }
        window.addEventListener('scroll', this.onWindowScroll, false);
        window.addEventListener('resize', this.onWindowResize, false);
        this.isOpened = true;
        this.tooltipEl.setAttribute('data-show', '');
        this.updatePosition();
    }

    hide() {
        this.tooltipEl.removeAttribute('data-show');
        this.isOpened = false;

        document.removeEventListener('click', this.onDocumentClick);
        window.removeEventListener('scroll', this.onWindowScroll);
        window.removeEventListener('resize', this.onWindowResize);
    }
}
