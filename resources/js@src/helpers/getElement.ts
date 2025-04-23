import isElement from "@src/helpers/isElement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (obj: any) => {
    if (isElement(obj)) {
        return obj;
    }

    if (typeof obj === "string" && obj.length > 0) {
        return document.querySelector(obj);
    }

    return null;
};
