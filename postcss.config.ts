import { type Config } from "postcss-load-config";

export default {
    plugins: {
        "postcss-advanced-variables": {
            unresolved: "ignore",
        },
        "@tailwindcss/nesting": {},
        "@tailwindcss/postcss": {},
    },
} as Config;
