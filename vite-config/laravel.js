import laravel from 'laravel-vite-plugin';

import config from './config.js';

export default function laravelFix(laravelConfig) {
    return [
        ...laravel(laravelConfig),
        {
            name: 'laravel-fix',
            enforce: 'post',
            config(userConfig) {
                userConfig.base = config.base;
                userConfig.server.origin = undefined;
            },
        },
    ];
}
