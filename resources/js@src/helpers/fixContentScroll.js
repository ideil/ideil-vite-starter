export default scrollEl => {
    const contentObj = {
        allowUp: false,
        allowDown: false,
        lastY: 0,
    };

    scrollEl.addEventListener('touchstart', event => {
        contentObj.allowUp = scrollEl.scrollTop > 0;
        contentObj.allowDown = scrollEl.scrollTop < (scrollEl.scrollHeight - scrollEl.offsetHeight);
        contentObj.lastY = event.touches[0].pageY;
    }, {
        passive: false,
    });
    scrollEl.addEventListener('touchmove', function(event) {
        const up = event.touches[0].pageY > contentObj.lastY;
        const down = !up;

        if ((up && contentObj.allowUp) || (down && contentObj.allowDown)) {
            event.stopPropagation();
        } else {
            event.preventDefault();
        }
    });
};
