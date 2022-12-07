import { sync as globSync } from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import pretty from 'pretty';

import config from './config.js';

const getData = () => {
    const data = {};

    globSync(path.resolve(`${ config.dataDir }/**/*.json`)).forEach(filePath => {
        data[path.parse(filePath).name] = JSON.parse(fs.readFileSync(filePath).toString());
    });

    return data;
};

const createFiles = () => {
    fs.emptyDirSync(path.resolve(config.htmlDir));

    globSync(path.resolve(`${ config.twigDir }/*.twig`)).forEach(twigPath => {
        const twigName = path.parse(twigPath).name;

        fs.writeFile(
            path.resolve(`${ config.htmlDir }/${ twigName }.html`),
            `<script type="application/json" data-template="${ path.relative(config.twigDir, twigPath) }">{}</script>`,
            err => {
                if (err) throw err;
            },
        );
    });
};


const twigHtmlPlugin = () => {
    createFiles();

    return {
        name: 'twig-html',
        transformIndexHtml: {
            enforce: 'pre',
            async transform(content) {
                if (!content.startsWith('<script type="application/json" data-template')) {
                    return content;
                }

                return content.replace('{}', JSON.stringify(getData()));
            },
        },
        handleHotUpdate({ file, server }) {
            if (/.(json)$/.test(file)) {
                server.ws.send({ type: 'full-reload' });
            }
        },
    };
};

const prettifyHtmlPlugin = () => {
    return {
        name: 'prettify-html',
        transformIndexHtml: {
            enforce: 'post',
            async transform(content) {
                return pretty(content);
            },
        },
    };
};

export {
    twigHtmlPlugin,
    prettifyHtmlPlugin,
};
