
const headerEl = document.querySelector('.js-header') || document.querySelector('.c-header');
const menuEl = document.querySelector('.js-menu') || document.querySelector('.c-menu');

const getScrollBarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
};

const scrollbarSpace = getScrollBarWidth();

const setBodySpace = () => {
    document.body.style.paddingRight = scrollbarSpace + 'px';
};

const clearBodySpace = () => {
    document.body.style.paddingRight = '';
};

const setHeaderSpace = () => {
    headerEl.style.paddingRight = scrollbarSpace + 'px';
};

const clearHeaderSpace = () => {
    headerEl.style.paddingRight = '';
};

const setMenuElSpace = () => {
    menuEl.style.paddingRight = scrollbarSpace + 'px';
};

const clearMenuElSpace = () => {
    menuEl.style.paddingRight = '';
};

const setSpaces = () => {
    setBodySpace();
    setHeaderSpace();
    // setMenuElSpace();
};

const clearSpaces = () => {
    clearBodySpace();
    clearHeaderSpace();
    // clearMenuElSpace();
};

export {
    scrollbarSpace,
    setBodySpace,
    setHeaderSpace,
    setMenuElSpace,
    setSpaces,
    clearBodySpace,
    clearHeaderSpace,
    clearMenuElSpace,
    clearSpaces,
};
