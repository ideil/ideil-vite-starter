export default {
    base: './',
    server: {
        open: '/html/',
        host: true,
    },
    rootDir: 'resources',
    publicDir: 'static',
    buildDir: 'static/build',

    twigDir: 'resources/layouts',
    htmlDir: 'resources/html',
    viewsDir: 'resources/views',
    imagesDir: 'resources/img',
    styleDir: 'resources/css',
    fontsDir: 'resources/fonts',
    dataDir: 'resources/data',
    iconsDir: 'resources/icons',

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
