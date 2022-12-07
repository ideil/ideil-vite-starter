# ideil-vite-starter

Frontend boilerplate made with Vite, Twig, Laravel, PostCSS, Tailwind, and the ES6 modules.

## Contains

* SVG-Sprite functionality
* Image optimization features
* Creating HTML files to match your TWIG files, and prettify after build
* TWIG data from `.json` files
* Laravel Vite plugin for `blade` files hot reload
* `.gitlab-ci.yml` file for building on branch `pages`
* Tailwind CSS framework
* PostCSS with nesting, imports and color functions
* Eslint for js code analyze

## Requirements

* `node` : `>=18`
* `yarn` (or equivalent)

## Installation

```sh
$ yarn install
```

## Usage

### Development

Start a local development server with hot reload:

```sh
$ yarn dev
```

All development files are located under `resources/`

### Production

Build all assets for production :

```sh
$ yarn build
```

All build files are located under `static/build/`

## Configuration

Edit the [`vite-config/config.js`](vite-config/config.js) or [`vite.config.js`](vite.config.js) according to your needs

### Vite

For more information you can refer to [`vitejs/vite`](https://github.com/vitejs/vite)

### Images

For more information you can refer to [`vite-plugin-imagemin`](https://github.com/vbenjs/vite-plugin-imagemin)

### SVG Sprites

For more information you can refer to [`vite-plugin-svg-icons`](https://github.com/vbenjs/vite-plugin-svg-icons)

### TWIG

For more information you can refer to [`vite-plugin-twig`](https://github.com/fiadone/vite-plugin-twig)

### Laravel

For more information you can refer to [`laravel-vite-plugin`](https://github.com/laravel/vite-plugin)

### Tailwindcss

For more information you can refer to [`tailwindcss`](https://github.com/tailwindlabs/tailwindcss)

### PostCSS

For more PostCSS plugins or configurations you can refer to [`PostCSS parts`](https://www.postcss.parts/)
