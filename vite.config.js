import vuePlugin from '@vitejs/plugin-vue';
import { sync as globSync } from 'fast-glob';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// import imageminPlugin from 'vite-plugin-imagemin';

import config from './vite-config/config.js';
import twigHtmlPlugin from './vite-config/twig-html.js';

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
                    let folders = '';
                    const extType = assetInfo.name.split('.').at(1);

                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        folders = 'img/';
                    }

                    if (/woff2?|ttf/i.test(extType)) {
                        folders = 'fonts/';
                    }

                    if (/json/i.test(extType)) {
                        folders = 'json/';
                    }

                    if (/css/i.test(extType)) {
                        folders = 'css/';
                    }

                    return `${ folders }[name].[hash].[ext]`;
                },
                chunkFileNames: 'js/chunks/[name].[hash].js',
                entryFileNames: 'js/[name].[hash].js',
            },
            input: [
                ...globSync(path.resolve(`${ config.rootDir }/css/*.css`)),
                `${ config.rootDir }/js@src/app.js`,
                `${ config.rootDir }/js@pub/app.js`,
            ],
        },
    },
    resolve: {
        alias: {
            '@src': path.resolve(`${ config.rootDir }/js@src`),
            '@pub': path.resolve(`${ config.rootDir }/js@pub`),
            '@data': path.resolve(`${ config.rootDir }/data`),
            '@img': path.resolve(`${ config.rootDir }/img`),
        },
    },
    plugins: [
        laravel({
            input: '',
            publicDirectory: 'static',
        }),
        {
            name: 'laravel-fix',
            enforce: 'post',
            config(userConfig) {
                userConfig.base = config.base;
                userConfig.server.origin = undefined;
            },
        },
        twigHtmlPlugin(),
        createSvgIconsPlugin({
            iconDirs: [ path.resolve(`${ config.rootDir }/${ config.iconsDir }`) ],
        }),
        vuePlugin({
            template: {
                transformAssetUrls: true,
            },
        }),
        // imageminPlugin(config.imagemin),
    ],
});
