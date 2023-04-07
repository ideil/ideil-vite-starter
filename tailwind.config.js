const defaultTheme = require('tailwindcss/defaultTheme');

const screens = require('./resources/data/config/screens.json');

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
        screens: screens,
        fontSize: {
            'DEFAULT': '1rem', // 16px
            '2xs': '.75rem', // 12px
            'xs': '.875rem', // 14px
            'sm': '1rem', // 16px
            'base': '1rem', // 16px
            'md': '1.125rem', // 18px
            'lg': '1.25rem', // 20px
            '2lg': '1.375rem', // 22px

            'xl': '1.5rem', // 24px
            '2xl': '1.75rem', // 28px

            '4': '1rem', // 16px
            '4.5': '1.125rem', // 18px
            '5': '1.25rem', // 20px
            '5.5': '1.375rem', // 22px
            '6': '1.5rem', // 24px
            '7': '1.75rem', // 28px
            '8': '2rem', // 32px
            '9': '2.25rem', // 36px
            '10': '2.5rem', // 40px
            '11': '2.75rem', // 44px
            '12': '3rem', // 48px
            '14': '3.5rem', // 56px
            '15': '3.75rem', // 60px
            '35': '8.75rem', // 140px
            '50': '12.5rem', // 200px

            '14px': '14px', // 14px
            '16px': '16px', // 16px
            '18px': '18px', // 18px
            '22px': '22px', // 22px
            '24px': '24px', // 24px
            '28px': '28px', // 28px
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
                'xs': screens.xs.min,
                'sm': screens.sm.min,
                'md': screens.md.min,
                'lg': screens.lg.min,
                'xl': screens.xl.min,
                '2xl': screens['2xl'].min,
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

                50: '12.5', // 220px

                78: '19.5em', // 312px

                screen: '100vh',

                boxSpace: 'var(--box-space)',
                pageSpace: 'var(--page-space)',

                headerHeight: 'var(--header-height)',

                inputHeight: 'var(--input-height)',

                colGap: 'var(--col-gap)',

                containerOffset: 'var(--container-offset)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
};
