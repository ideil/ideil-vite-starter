
/** @type {import('postcss-load-config').Config} */
module.exports = {
    plugins: [
        require('postcss-advanced-variables'),

        require('tailwindcss/nesting'),
        require('tailwindcss'),

        require('autoprefixer')({
            remove: false
        })
    ]
};
