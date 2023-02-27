const defaultTheme = require('tailwindcss/defaultTheme');

const config = require('./resources/data/config.json');

module.exports = {
    content: [
        './resources/js/**/*.{js,ts,tsx,vue}',
        './resources/views/**/*.blade.php',
        './resources/layouts/**/*.twig',
    ],
    prefix: '',
    important: false,
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
                gray: {
                    DEFAULT: '#E3E3E3',
                    // 50: '#F1F1F1',
                    // 100: '#EDEFF4',
                    // 200: '#E3E3E3',
                    // 300: ,
                    // 400: '#A1A1A1',
                    // 500: '#787878',
                    // 600: ,
                    // 700: '#28272E',
                    // 800: '#222222',
                    // 900: '#19191B',
                },

                primary: {
                    DEFAULT: '#E74C3C',
                    hover: '#D64535',
                },

                body: '#ffffff',
                text: '#000000',
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
            spacing: {
                13: '3.25rem', // 52px
                15: '3.75rem', // 60px
                17: '4.25rem', // 68px
                18: '4.5rem', // 72px
                22: '5.5rem', // 88px

                78: '19.5em', // 312px

                boxSpace: 'var(--box-space)',
                pageSpace: 'var(--page-space)',

                headerHeight: 'var(--header-height)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
};
