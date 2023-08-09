const headerEl = document.querySelector<HTMLElement>('[data-header]') ||
    document.querySelector<HTMLElement>('.c-header');

const getScrollBarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
};

export const scrollbarSpace = getScrollBarWidth();

export const setSpace = (el: HTMLElement) => {
    el.style.paddingRight = `${ scrollbarSpace }px`;
};

export const clearSpace = (el: HTMLElement) => {
    el.style.paddingRight = '';
};

export const setBodySpace = () => {
    setSpace(document.body);
};

export const clearBodySpace = () => {
    clearSpace(document.body);
};

export const setHeaderSpace = () => {
    if (!headerEl) {
        return;
    }

    setSpace(headerEl);
};

export const clearHeaderSpace = () => {
    if (!headerEl) {
        return;
    }

    clearSpace(headerEl);
};

export const setSpaces = () => {
    setBodySpace();
    setHeaderSpace();
};

export const clearSpaces = () => {
    clearBodySpace();
    clearHeaderSpace();
};
