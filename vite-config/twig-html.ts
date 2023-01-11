import { sync as globSync } from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import pretty from 'pretty';
import type { ViteDevServer, UserConfig, HmrContext } from 'vite';
import twigPlugin from 'vite-plugin-twig';

import config from './config';

type Pages = { [entryAlias: string]: string };

function getData() {
    const data = {};

    globSync(path.resolve(`${ config.rootDir }/${ config.dataDir }/**/*.json`)).forEach(filePath => {
        (data as any)[path.parse(filePath).name] = JSON.parse(fs.readFileSync(filePath).toString());
    });

    return data;
}

function getTwigHtml(twigFilePath: string): string {
    return `<script type="application/json" data-template="${ twigFilePath }">{}</script>`;
}

function createPages(): Pages {
    const pages: Pages = {};

    // fs.mkdirSync(`${ config.rootDir }/${ VIRTUAL_HTML_FOLDER }`, { recursive: true });

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
    let resolvedConfig: UserConfig;

    return [
        {
            name: 'twig-html',
            configureServer(server: ViteDevServer) {
                return () => server.middlewares.use('/', async (req, res, next) => {
                    if (!req.originalUrl || !req.url) {
                        return next();
                    }

                    const pathProps = path.parse(req.originalUrl);

                    if (![ '.html' ].includes(pathProps.ext) || pathProps.dir !== `/${ config.layoutsDir }`) {
                        return next();
                    }

                    const indexTwigPath = path.resolve(`${ config.rootDir }/${ config.layoutsDir }/${ pathProps.name }.twig`);

                    if (fs.existsSync(indexTwigPath)) {
                        const transformedHtml = await server.transformIndexHtml(req.url, getTwigHtml(`${ pathProps.name }.twig`), req.originalUrl);

                        res.statusCode = 200;
                        res.write(transformedHtml);
                        res.end();
                    }

                    next();
                });
            },
            configResolved(config: UserConfig) {
                resolvedConfig = config;
            },
            transformIndexHtml: {
                enforce: 'pre',
                async transform(content: string) {
                    if (!content.startsWith('<script type="application/json" data-template')) {
                        return content;
                    }

                    console.log('transformIndexHtml', content);

                    return content.replace('{}', JSON.stringify(getData()));
                },
            },
            handleHotUpdate({ file, server }: HmrContext) {
                if (/.(json)$/.test(file)) {
                    server.ws.send({ type: 'full-reload' });
                }
            },
            async config(config: UserConfig, { command }: {command: string}) {
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

            async closeBundle() {
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
                    return pretty(content);
                },
            },
        },
    ];
}
