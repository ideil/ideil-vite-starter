module.exports = {
    plugins: [
        // require('postcss-each'),
        require('postcss-import'),

        require('tailwindcss/nesting'),
        require('tailwindcss'),

        require('postcss-color-function'),

        require('autoprefixer'),
    ],
};
