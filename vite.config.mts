import { PluginOption, defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import config from './vite-config/config';
import twigHtmlPlugin from './vite-config/twig-html';
import viteSvgToWebFont from 'vite-svg-2-webfont';
// import viteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';

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
            }
            // avoids files optimization and pages reload
            // input: [
            //     `${ config.rootDir }/js@src/app.js`,
            //     `${ config.rootDir }/js@pub/app.js`
            // ]
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(config.rootDir),
            '@src': path.resolve(`${ config.rootDir }/js@src`),
            '@pub': path.resolve(`${ config.rootDir }/js@pub`),
            '@img': path.resolve(`${ config.rootDir }/img`),
            '@icons': path.resolve(`${ config.rootDir }/icons`)
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
        viteSvgToWebFont({
            fontName: 'icons',
            context: path.resolve(`${ config.rootDir }/icons`),
            files: [ '**/*.svg' ],
            classPrefix: 'i-icon-',
            baseSelector: '.i-icon',
            dest: path.resolve(`${ config.rootDir }/fonts/icons`),
            cssDest: path.resolve(`${ config.rootDir }/fonts/icons`),
            types: 'woff2',
            centerHorizontally: true,
            normalize: true,
            allowWriteFilesInBuild: true,
            generateFiles: true
            // cssFontsUrl: '/fonts/icons',
        }),
        // or icons via svg sprite
        // viteSvgSpriteWrapper({
        //     icons: path.resolve(`${ config.rootDir }/${ config.iconsDir }/**/*.svg`),
        //     outputDir: path.resolve(`${ config.rootDir }/${ config.imageDir }`)
        // }),
        vuePlugin({
            template: {
                transformAssetUrls: true
            }
        })
    ]
});
