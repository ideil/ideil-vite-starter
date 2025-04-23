import { type Config } from "postcss-load-config";

export default {
    plugins: {
        "postcss-advanced-variables": {
            unresolved: "ignore",
        },
        "tailwindcss/nesting": {},
        tailwindcss: {},
        autoprefixer: {
            remove: false,
        },
    },
} as Config;
