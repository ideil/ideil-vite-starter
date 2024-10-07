
/** @type {import('postcss-load-config').Config} */
module.exports = {
    plugins: [
        require('postcss-advanced-variables')({
            unresolved: 'ignore'
        }),

        require('tailwindcss/nesting'),
        require('tailwindcss'),

        require('autoprefixer')({
            remove: false
        })
    ]
};
