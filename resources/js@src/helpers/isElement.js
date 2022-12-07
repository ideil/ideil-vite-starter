export default obj => {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return typeof obj.nodeType !== 'undefined';
};
