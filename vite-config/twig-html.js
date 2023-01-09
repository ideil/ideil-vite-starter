import { sync as globSync } from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import pretty from 'pretty';
import twigPlugin from 'vite-plugin-twig';

import config from './config.js';

const getData = () => {
    const data = {};

    globSync(path.resolve(`${ config.dataDir }/**/*.json`)).forEach(filePath => {
        data[path.parse(filePath).name] = JSON.parse(fs.readFileSync(filePath).toString());
    });

    return data;
};

const getHtml = htmlFilePath => {
    const fileProps = path.parse(htmlFilePath);
    const htmlIndexPath = path.resolve(`${ config.htmlDir }/${ fileProps.name }.html`);
    const twigIndexPath = path.resolve(`${ config.twigDir }/${ fileProps.name }.twig`);

    console.log(fileProps);
};

const createHtml = twigFilePath => {
    const twigFileProps = path.parse(twigFilePath);
    const twigFileName = twigFileProps.name;
    const twigFileBase = twigFileProps.base;
    const htmlIndexPath = path.resolve(`${ config.htmlDir }/${ twigFileName }.html`);
    const twigIndexPath = path.resolve(`${ config.twigDir }/${ twigFileName }.twig`);

    if (
        fs.existsSync(htmlIndexPath) ||
        !fs.existsSync(twigIndexPath)
    ) {
        return;
    }

    fs.writeFile(
        htmlIndexPath,
        `<script type="application/json" data-template="${ twigFileBase }">{}</script>`,
        err => {
            if (err) throw err;
        },
    );
};

const createAllHTML = () => {
    fs.emptyDirSync(path.resolve(config.htmlDir));

    globSync(path.resolve(`${ config.twigDir }/*.twig`)).forEach(twigPath => {
        createHtml(twigPath);
    });
};

export default function twigHtmlPlugin() {
    let resolvedConfig;
    // createAllHTML();

    return [
        {
            name: 'twig-html',
            enforce: 'pre',
            configResolved(config) {
                resolvedConfig = config;
            },
            configureServer(server) {
                return () => {
                    server.middlewares.use((req, res, next) => {
                        try {
                            console.log(req.originalUrl);
                            const rawHtml = getHtml(req.originalUrl);
                            // const transformedHtml = await server.transformIndexHtml(
                            //     req.url, rawHtml, req.originalUrl
                            // );

                            console.log(rawHtml);

                            // res.set(server.config.server.headers);
                            // res.send(transformedHtml);
                            return next();
                        } catch (error) {
                            return next(error);
                        }
                    });
                };
            },
            transformIndexHtml: {
                enforce: 'pre',
                async transform(content) {
                    console.log('transformIndexHtml', content);
                    if (!content.startsWith('<script type="application/json" data-template')) {
                        return content;
                    }

                    return content.replace('{}', JSON.stringify(getData()));
                },
            },
            handleHotUpdate({ file, server }) {
                if (/.(twig)$/.test(file)) {
                    createHtml(file);
                }

                if (/.(json)$/.test(file)) {
                    server.ws.send({ type: 'full-reload' });
                }
            },
        },
        twigPlugin({
            settings: {
                views: config.twigDir,
            },
        }),
        {
            name: 'prettify-html',
            apply: 'build',
            transformIndexHtml: {
                enforce: 'post',
                async transform(content) {
                    return pretty(content);
                },
            },
        },
    ];
}
