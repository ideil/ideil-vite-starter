export default {
    base: './',
    server: {
        open: '/layouts/index.html',
        host: true,
    },
    rootDir: 'resources',
    publicDir: 'static',
    buildDir: 'static/build',

    layoutsDir: 'layouts',
    dataDir: 'data',
    iconsDir: 'icons',

    imagemin: {
        webp: false,
        optipng: {
            optimizationLevel: 7,
        },
        mozjpeg: {
            quality: 75,
        },
        pngquant: {
            quality: [ 0.8, 0.9 ],
            speed: 1,
            floyd: 1,
        },
        svgo: {
            plugins: [
                {
                    name: 'removeViewBox',
                    active: false,
                },
                {
                    name: 'removeEmptyAttrs',
                    active: false,
                },
            ],
        },
    },
};
