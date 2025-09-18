import "../vite";

const modules = import.meta.glob("./modules/**/index.[jt]s", { eager: true });

Object.keys(modules).forEach((key) => {
    const module = modules[key];

    if (typeof module === "function") {
        module();
    }
});
