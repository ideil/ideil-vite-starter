// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (obj: any) => {
    if (!obj || typeof obj !== "object") {
        return false;
    }

    return typeof obj.nodeType !== "undefined";
};
