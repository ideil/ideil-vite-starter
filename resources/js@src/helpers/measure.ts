const getScrollBarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
};

export const scrollbarSpace = getScrollBarWidth();

export const setSpaces = () => {
    document.body.style.setProperty('--body-scroll-width', `${ scrollbarSpace }px`);
};

export const clearSpaces = () => {
    document.body.style.setProperty('--body-scroll-width', '');
};
