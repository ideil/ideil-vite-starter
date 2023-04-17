module.exports = {
    plugins: [
        // require('postcss-each'),
        require('postcss-import'),
        require('postcss-mixins')({
            mixins: {
                'background-gradient': {
                    backgroundImage: 'var(--granimate-bg)',
                },
            },
        }),

        require('tailwindcss/nesting'),
        require('tailwindcss'),

        require('postcss-color-function'),

        require('autoprefixer'),
    ],
};
