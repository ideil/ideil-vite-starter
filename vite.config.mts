import { PluginOption, defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import fastGlob from 'fast-glob';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import viteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';
import config from './vite-config/config';
import twigHtmlPlugin from './vite-config/twig-html';

const { globSync } = fastGlob;

export default defineConfig({
    server: {
        ...config.server
    },
    root: path.resolve(config.rootDir),
    publicDir: path.resolve(config.publicDir),
    css: {
        devSourcemap: true
    },
    // assetsInclude: [
    //     'resources/gltf/**'
    // ],
    build: {
        outDir: path.resolve(config.buildDir),
        emptyOutDir: true,
        copyPublicDir: false,
        modulePreload: false,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo: any) => {
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
            '@': '/',
            '@src': '/js@src',
            '@pub': '/js@pub',
            '@img': '/img'
        }
    },
    plugins: [
        laravel({
            input: '',
            publicDirectory: 'static',
            refresh: [ {
                paths: [ 'resources/views/**' ],
                config: { delay: 300 }
            } ]
        }),
        {
            name: 'laravel-fix',
            enforce: 'post',
            config(userConfig) {
                userConfig.base = config.base;

                if (userConfig.server) {
                    userConfig.server.origin = undefined;
                }
            }
        } as PluginOption,
        twigHtmlPlugin(),
        viteSvgSpriteWrapper({
            icons: path.resolve(`${ config.rootDir }/${ config.iconsDir }/**/*.svg`),
            outputDir: path.resolve(`${ config.rootDir }/${ config.imageDir }`)
        }),
        vuePlugin({
            template: {
                transformAssetUrls: true
            }
        })
    ]
});
