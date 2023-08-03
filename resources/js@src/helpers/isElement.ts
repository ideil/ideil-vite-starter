export default (obj: any) => {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return typeof obj.nodeType !== 'undefined';
};
