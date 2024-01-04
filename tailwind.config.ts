import defaultColors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

import screens from './resources/data/config/screens.json';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/js@src/**/*.{js,ts,tsx,vue}',
        './resources/js@pub/**/*.{js,ts,tsx,vue}',
        './resources/views/**/*.blade.php',
        './resources/layouts/**/*.twig'
    ],
    prefix: '',
    important: false,
    theme: {
        fontFamily: {
            sans: [ 'RobotoI', ...defaultTheme.fontFamily.sans ]
        },
        transitionTimingFunction: {
            base: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
        },
        transitionDuration: {
            base: '.3s'
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
            '13': '3.25rem', // 52px
            '14': '3.5rem', // 56px
            '15': '3.75rem', // 60px
            '16': '4rem', // 64px
            '30': '7.5rem', // 120px
            '35': '8.75rem', // 140px
            '50': '12.5rem' // 200px
        },
        extend: {
            colors: {
                gray: {
                    ...defaultColors.stone,

                    DEFAULT: defaultColors.stone[ 400 ],

                    light: defaultColors.stone[ 300 ],
                    dark: defaultColors.stone[ 500 ]
                },

                primary: {
                    DEFAULT: '#E74C3C',
                    hover: '#ff7668'
                },

                error: defaultColors.red[ '500' ],

                body: defaultColors.white,
                text: defaultColors.black
            },
            maxWidth: {
                'xs': screens.xs.min,
                'sm': screens.sm.min,
                'md': screens.md.min,
                'lg': screens.lg.min,
                'xl': screens.xl.min,
                '2xl': screens[ '2xl' ].min,
                '3xl': screens[ '3xl' ].min,

                'hd': '1920px'
            },
            lineHeight: {
                normal: '1.4',
                tight: '1.2'
            },
            spacing: {
                '13': '3.25rem', // 52px
                '15': '3.75rem', // 60px
                '17': '4.25rem', // 68px
                '18': '4.5rem', // 72px
                '22': '5.5rem', // 88px
                '50': '12.5rem', // 200px

                '1/2': '50%',
                '1/3': '33.333333%',
                '1/4': '25%',
                '1/5': '20%',
                '2/3': '66.666667%',
                'full': '100%',
                'screen': '100vh',

                'boxSpace': 'var(--box-space)',
                'pageSpace': 'var(--page-space)',

                'headerHeight': 'var(--header-height)',

                'inputHeight': 'var(--input-height)',

                'colGap': 'var(--col-gap)',

                'containerOffset': 'calc((min(var(--wrapper-width), 100vw) - var(--container-width) + (var(--box-space) * 2)) / 2)'
            },
            zIndex: {
                1: 1,
                header: 100,
                dropdown: 200,
                modal: 300,
                tooltip: 400
            }
        }
    },
    plugins: [
        require('@tailwindcss/aspect-ratio')
    ]
};
