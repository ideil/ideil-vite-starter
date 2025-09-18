import vue from "@vitejs/plugin-vue";
import fastGlob from "fast-glob";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import svgToFont from "vite-svg-2-webfont";

import config from "./vite-config/config";
import laravel from "./vite-config/laravel";
import twig from "./vite-config/twig";

const { globSync } = fastGlob;

export default defineConfig({
    server: {
        ...config.server,
    },
    root: path.resolve(config.rootDir),
    publicDir: path.resolve(config.publicDir),
    css: {
        devSourcemap: true,
    },
    build: {
        outDir: path.resolve(config.buildDir),
        emptyOutDir: true,
        copyPublicDir: false,
        modulePreload: false,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    let folders = "";

                    if (assetInfo) {
                        const extType = assetInfo.names[0].split(".").at(1);

                        if (extType) {
                            if (
                                /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)
                            ) {
                                folders = "img/";
                            }

                            if (/woff2?|ttf/i.test(extType)) {
                                folders = "fonts/";
                            }

                            if (/json/i.test(extType)) {
                                folders = "json/";
                            }

                            if (/css/i.test(extType)) {
                                folders = "css/";
                            }
                        }
                    }

                    return `${folders}[name].[hash].[ext]`;
                },
                chunkFileNames: "js/chunks/[name].[hash].js",
                entryFileNames: "js/[name].[hash].js",
            },
            input: [
                ...globSync(path.resolve(`${config.rootDir}/css/*.css`)),
                `${config.rootDir}/js@src/app.js`,
                `${config.rootDir}/js@pub/app.js`,
            ],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(config.rootDir),
            "@src": path.resolve(`${config.rootDir}/js@src`),
            "@pub": path.resolve(`${config.rootDir}/js@pub`),
            "@img": path.resolve(`${config.rootDir}/img`),
            "@icons": path.resolve(`${config.rootDir}/icons`),
        },
    },
    plugins: [
        visualizer({
            template: "treemap",
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: "analyse.html",
        }),
        laravel({
            input: "",
            publicDirectory: "static",
            refresh: [
                {
                    paths: ["resources/views/**"],
                    config: { delay: 300 },
                },
            ],
        }),
        twig(),
        svgToFont({
            context: path.resolve(`${config.rootDir}/icons`),
            dest: path.resolve(`${config.rootDir}/fonts/icons`),
            cssTemplate: path.resolve(`./vite-config/icons-css.hbs`),
            cssFontsUrl: "/fonts/icons",
            fontName: "icons",
            classPrefix: "i-icon-",
            baseSelector: ".i-icon",
            files: ["**/*.svg"],
            types: "woff2",
            centerHorizontally: true,
            normalize: true,
            allowWriteFilesInBuild: true,
            generateFiles: true,
            // cssFontsUrl: '/fonts/icons',
        }),
        vue({
            template: {
                transformAssetUrls: true,
            },
        }),
    ],
});
