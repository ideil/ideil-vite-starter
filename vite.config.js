const vuePlugin = require('@vitejs/plugin-vue');
const { sync: globSync } = require('fast-glob');
const { default: laravel } = require('laravel-vite-plugin');
const path = require('node:path');
const { default: ViteSvgSpriteWrapper } = require('vite-svg-sprite-wrapper');

const { default: config } = require('./vite-config/config');
const { default: twigHtmlPlugin } = require('./vite-config/twig-html');

module.exports = {
    server: {
        ...config.server
    },
    root: path.resolve(config.rootDir),
    publicDir: path.resolve(config.publicDir),
    css: {
        devSourcemap: true
    },
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
                entryFileNames: 'js/[name].[hash].js'
            },
            input: [
                ...globSync(path.resolve(`${ config.rootDir }/css/*.css`)),
                `${ config.rootDir }/js@src/app.js`,
                `${ config.rootDir }/js@pub/app.js`
            ]
        }
    },
    resolve: {
        alias: {
            '@src': '/js@src',
            '@pub': '/js@pub',
            '@img': '/img'
        }
    },
    plugins: [
        laravel({
            input: '',
            publicDirectory: 'static'
        }),
        {
            name: 'laravel-fix',
            enforce: 'post',
            config(userConfig) {
                userConfig.base = config.base;
                userConfig.server.origin = undefined;
            }
        },
        twigHtmlPlugin(),
        ViteSvgSpriteWrapper({
            icons: path.resolve(`${ config.rootDir }/${ config.iconsDir }/**/*.svg`),
            outputDir: path.resolve(`${ config.rootDir }/${ config.imageDir }`)
        }),
        vuePlugin({
            template: {
                transformAssetUrls: true
            }
        })
    ]
};
