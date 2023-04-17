module.exports = {
    plugins: [
        // require('postcss-each'),
        require('postcss-import'),
        require('postcss-mixins')({
            mixins: {
                'border-gradient': {
                    backgroundImage: 'var(--granimate-bg)',
                    backgroundSize: '150vw 150vh',
                    animation: '15s infinite granimate',
                },
            },
        }),

        require('tailwindcss/nesting'),
        require('tailwindcss'),

        require('postcss-color-function'),

        require('autoprefixer'),
    ],
};
