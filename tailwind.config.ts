import aspectRatio from "@tailwindcss/aspect-ratio";
import { Config } from "tailwindcss";
import defaultColors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: [
        "./resources/js@src/**/*.{js,ts,tsx,vue}",
        "./resources/js@pub/**/*.{js,ts,tsx,vue}",
        "./resources/views/**/*.blade.php",
        "./resources/layouts/**/*.twig",
    ],
    prefix: "",
    important: false,
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "var(--spacing-box)",
            },
        },
        extend: {
            fontFamily: {
                sans: ["RobotoI", ...defaultTheme.fontFamily.sans],
            },
            transitionTimingFunction: {
                base: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            },
            transitionDuration: {
                base: ".3s",
            },
            screens: {
                xs: "480px",
                sm: "576px",
                md: "768px",
                lg: "992px",
                xl: "1260px",
                "2xl": "1440px",
                "3xl": "1600px",
            },
            colors: {
                gray: {
                    ...defaultColors.stone,

                    DEFAULT: defaultColors.stone[400],

                    light: defaultColors.stone[100],
                    dark: defaultColors.stone[500],
                },

                primary: {
                    DEFAULT: "#E74C3C",
                    hover: "#ff7668",
                },

                error: defaultColors.red["500"],

                placeholder: "var(--colors-placeholder)",
                field: "var(--colors-field)",

                body: "var(--colors-body)",
                text: "var(--colors-text)",
            },
            maxWidth: {
                hd: "1920px",
            },
            lineHeight: {
                "1.1": "1.1",
                "1.2": "1.2",
                "1.3": "1.3",
                "1.4": "1.4",
            },
            borderRadius: {
                xs: "calc(var(--radius) * 0.375)", // 6px
                sm: "calc(var(--radius) * 0.5)", // 8px
                md: "calc(var(--radius) * 0.75)", // 12px
                DEFAULT: "var(--radius)", // 16px
                lg: "calc(var(--radius) * 1.25)", // 20px
                xl: "calc(var(--radius) * 1.5)", // 24px
            },
            spacing: {
                "13": "3.25rem", // 52px
                "15": "3.75rem", // 60px
                "17": "4.25rem", // 68px
                "18": "4.5rem", // 72px
                "22": "5.5rem", // 88px
                "50": "12.5rem", // 200px

                page: "var(--spacing-page)",
                box: "var(--spacing-box)",

                header: "var(--spacing-header)",

                button: "var(--spacing-button)",
                field: "var(--spacing-field)",

                col: "var(--spacing-col)",

                containerOffset:
                    "calc((min(var(--wrapper-width), calc(100 * var(--vw))) - var(--container-width) + (var(--box-space) * 2)) / 2)",
            },
            zIndex: {
                1: "1",
                2: "2",
                menu: "99",
                header: "100",
                modal: "200",
                dropdown: "300",
                tooltip: "400",
            },
        },
    },
    plugins: [aspectRatio],
} satisfies Config;
