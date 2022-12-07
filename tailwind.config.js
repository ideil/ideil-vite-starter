const defaultTheme = require('tailwindcss/defaultTheme');

const config = require('./resources/data/config.json');

module.exports = {
    content: [
        './resources/js/**/*.{js,ts,tsx,vue}',
        './resources/views/**/*.blade.php',
        './resources/layouts/**/*.twig',
    ],
    prefix: '',
    theme: {
        fontFamily: {
            sans: [ 'RobotoI', ...defaultTheme.fontFamily.sans ],
        },
        transitionTimingFunction: {
            base: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        },
        transitionDuration: {
            base: '.3s',
        },
        screens: config.screens,
        fontSize: {
            'DEFAULT': '1rem', // 16px
            '2xs': '.75rem', // 12px
            'xs': '.875rem', // 14px
            'sm': '1rem', // 16px
            'base': '1rem', // 16px
            'md': '1.125rem', // 18px
            'lg': '1.75rem', // 28px

            'xl': '2rem', // 32px
            '2xl': '2.25rem', // 36px
            '3xl': '2.5rem', // 40px
            '4xl': '2.75rem', // 44px
            '5xl': '3rem', // 48px
            '6xl': '3.25rem', // 52px
            '7xl': '3.5rem', // 56px
            '8xl': '4rem', // 64px
            '9xl': '5rem', // 80px
            '10xl': '6.25rem', // 100px
            '11xl': '7.5rem', // 120px
        },
        extend: {
            colors: {
                'black': '#000000',
                'white': '#ffffff',

                'gray': '#E3E3E3',
                'gray-light': '#F1F1F1',

                'blue': '#4477FA',
                'green': '#4D874D',
                'red': '#FD5846',

                'primary': '#e4ff3c',

                'body': '#000000',
                'text': '#ffffff',
            },
            maxWidth: {
                'xs': '480px',
                'sm': '576px',
                'md': '768px',
                'lg': '992px',
                'xl': '1260px',
                '2xl': '1440px',
            },
            lineHeight: {
                normal: '1.4',
                tight: '1.2',
            },
        },
    },
    important: false,
};
