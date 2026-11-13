# nuxt-maupassant

> Nuxt.js project

A blog theme for Nuxt.js powered websites, based on original design of [pagecho](https://github.com/pagecho/maupassant/) and modification of [tufu9441](https://github.com/tufu9441/maupassant-hexo).

Last update: 2026-11-12 V2.0.0

V1.0.0: Nuxt2, Nuxt Content1, Vue2.

V2.0.0: Nuxt4, Nuxt Content3, Vue3.

## V2.0.0 New Feature: Photo Gallery

It scans all md file in `/content/blog` folder, find all image path in body and group by month, then group by year.
`/app/pages/gallery/index.vue` displays latest year photos, `/app/pages/gallery/[year].vue` displays certain year photos. 

## V2.0.0 changes: Vue files are used as is

Now you can set header, footer information and sidebar links in `/content/settings.yml`, no need to change `/app/components/AppNavigation.vue`, `/app/components/AppFooter.vue` or `/app/components/AppAside.vue`.

## Write blog articles

Go to `/content/blog` folder, file name format is `yyyy-mm-dd-your-article-title`, then start writing as you like!

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project, target folder: .output/public
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).