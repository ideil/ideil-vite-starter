import { sync as globSync } from 'fast-glob';
import fs from 'fs-extra';
import merge from 'merge';
import path from 'path';
import pretty from 'pretty';
import type { ViteDevServer, UserConfig, HmrContext } from 'vite';
import twigPlugin from 'vite-plugin-twig';

import config from './config';

type Pages = { [entryAlias: string]: string };

function getData(): any {
    let data = {};

    globSync(path.resolve(`${ config.rootDir }/${ config.dataDir }/**/*.json`)).forEach(filePath => {
        const pathParse = path.parse(filePath);
        const dataPath = path.resolve(`${ config.rootDir }/${ config.dataDir }`);
        const foldersPath = (pathParse.dir + `/${ pathParse.name }`).replace(dataPath, '').replace(/^\//, '');
        const folders = foldersPath.split('/');
        const newData = folders.reverse().reduce((prev, current) => (
            { [current]: { ...prev } }
        ), JSON.parse(fs.readFileSync(filePath).toString()));


        data = merge.recursive(data, newData);
    });

    return data;
}

function getTwigHtml(twigFilePath: string): string {
    return `<script type="application/json" data-template="${ twigFilePath }">{}</script>`;
}

function createPages(): Pages {
    const pages: Pages = {};

    globSync(path.resolve(`${ config.rootDir }/${ config.layoutsDir }/*.twig`)).forEach(filePath => {
        const fileProps = path.parse(filePath);
        const htmlPath = path.resolve(`${ config.rootDir }/${ config.layoutsDir }/${ fileProps.name }.html`);

        fs.writeFileSync(
            htmlPath,
            getTwigHtml(fileProps.base),
        );

        pages[fileProps.name] = htmlPath;
    });

    return pages;
}

export default function twigHtmlPlugin() {
    let pages: Pages;

    return [
        {
            name: 'twig-html',
            configureServer(server: ViteDevServer) {
                return () => server.middlewares.use('/', async (req, res, next) => {
                    if (!req.originalUrl || !req.url) {
                        return next();
                    }

                    const pathProps = path.parse(req.originalUrl);

                    if (
                        (pathProps.root === '/' && pathProps.name === config.layoutsDir) ||
                        (![ '.html' ].includes(pathProps.ext) && pathProps.dir.includes(config.layoutsDir))
                    ) {
                        res.writeHead(301, { Location: 'index.html' });
                        next();
                    }

                    const twigName = `${ pathProps.name }.twig`;
                    const indexTwigPath = path.resolve(`${ config.rootDir }/${ config.layoutsDir }/${ twigName }`);

                    if (fs.existsSync(indexTwigPath)) {
                        const transformedHtml = await server.transformIndexHtml(req.url, getTwigHtml(`${ twigName }`), req.originalUrl);

                        res.statusCode = 200;
                        res.write(transformedHtml);
                        res.end();
                    }

                    next();
                });
            },
            transformIndexHtml: {
                enforce: 'pre',
                async transform(content: string) {
                    if (!content.startsWith('<script type="application/json" data-template')) {
                        return content;
                    }

                    return content.replace('{}', JSON.stringify(getData()));
                },
            },
            handleHotUpdate({ file, server }: HmrContext) {
                if (/.(json)$/.test(file)) {
                    server.ws.send({ type: 'full-reload' });
                }
            },
            config(config: UserConfig, { command }: { command: string }) {
                if (command === 'build') {
                    pages = createPages();

                    config.build = {
                        ...config.build,
                        rollupOptions: {
                            ...config.build?.rollupOptions,
                            input: {
                                ...(config.build?.rollupOptions?.input as object),
                                ...pages,
                            },
                        },
                    };
                }

                return null;
            },
            closeBundle() {
                for (const [ name, filePath ] of Object.entries(pages)) {
                    if (fs.existsSync(filePath)) {
                        fs.rmSync(filePath, {
                            recursive: true,
                        });
                    }
                }
            },
        },
        twigPlugin({
            settings: {
                'views': `${ config.rootDir }/${ config.layoutsDir }`,
                'twig options': false,
            },
        }),
        {
            name: 'prettify-html',
            apply: 'build',
            transformIndexHtml: {
                enforce: 'post',
                async transform(content: string) {
                    return pretty(content, {
                        ocd: true,
                    });
                },
            },
        },
    ];
}
