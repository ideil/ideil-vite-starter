
const headerEl = document.querySelector('[data-header]') || document.querySelector('.c-header');

const getScrollBarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
};

const scrollbarSpace = getScrollBarWidth();

const setSpace = el => {
    el.style.paddingRight = `${ scrollbarSpace }px`;
};

const clearSpace = el => {
    el.style.paddingRight = '';
};

const setBodySpace = () => {
    setSpace(document.body);
};

const clearBodySpace = () => {
    clearSpace(document.body);
};

const setHeaderSpace = () => {
    setSpace(headerEl);
};

const clearHeaderSpace = () => {
    clearSpace(headerEl);
};

const setSpaces = () => {
    setBodySpace();
    setHeaderSpace();
};

const clearSpaces = () => {
    clearBodySpace();
    clearHeaderSpace();
};

export {
    scrollbarSpace,
    setBodySpace,
    clearBodySpace,
    setHeaderSpace,
    clearHeaderSpace,
    setSpaces,
    clearSpaces,
    setSpace,
    clearSpace,
};
