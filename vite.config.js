import vuePlugin from '@vitejs/plugin-vue';
import { sync as globSync } from 'fast-glob';
import path from 'path';
import { defineConfig } from 'vite';
import imageminPlugin from 'vite-plugin-imagemin';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import twigPlugin from 'vite-plugin-twig';

import config from './vite-config/config.js';
import laravelPlugin from './vite-config/laravel.js';
import {
    twigHtmlPlugin,
    prettifyHtmlPlugin,
} from './vite-config/twig-html.js';

export default defineConfig({
    server: {
        ...config.server,
    },
    root: path.resolve(config.rootDir),
    publicDir: path.resolve(config.publicDir),
    build: {
        outDir: path.resolve(config.buildDir),
        emptyOutDir: true,
        copyPublicDir: false,
        manifest: true,
        modulePreload: false,
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    let folders = assetInfo.name.split(`${ config.rootDir }/`).at(1);
                    if (!folders) {
                        folders = assetInfo.name;
                    }
                    folders = folders.split(path.basename(assetInfo.name)).at(0);
                    return `${ folders }[name].[hash][extname]`;
                },
                chunkFileNames: 'js/chunks/[name].[hash].js',
                entryFileNames: 'js/[name].[hash].js',
            },
        },
    },
    resolve: {
        alias: {
            '@src': path.resolve(`${ config.rootDir }/js@src`),
            '@pub': path.resolve(`${ config.rootDir }/js@pub`),
        },
    },
    plugins: [
        laravelPlugin({
            input: [
                ...globSync(path.resolve(`${ config.rootDir }/html/*.html`)),
                ...globSync(path.resolve(`${ config.rootDir }/css/*.css`)),
                `${ config.rootDir }/js@src/app.js`,
                `${ config.rootDir }/js@pub/app.js`,
            ],
            publicDirectory: 'static',
        }),
        twigHtmlPlugin(),
        twigPlugin({
            settings: {
                views: config.twigDir,
            },
        }),
        imageminPlugin(config.imagemin),
        createSvgIconsPlugin({
            iconDirs: [ path.resolve(`${ config.iconsDir }`) ],
        }),
        vuePlugin({
            template: {
                transformAssetUrls: true,
            },
        }),
        prettifyHtmlPlugin(),
    ],
});
