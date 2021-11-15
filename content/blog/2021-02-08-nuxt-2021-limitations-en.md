---
date: 2021-02-08
slug: nuxt-2021-limitations-en
language: English
title: Limitations of latest version Nuxt in 2021
description: After updating to Nuxt 2.14.12, I encountered 3 problems, making the developing process a little difficult for me.
categories: [Tech]
tags: [Nuxt.js, Nuxt Content]
keywords: [Github,bug report,issue report]
comments: true
---

## Update Nuxt and use of content module

In order to try out Nuxt module `content`, I updated Nuxt to latest version `2.14.12`, but later I found out later that I could have used `content` without updating Nuxt.

[Here](https://content.nuxtjs.org) is the official introduction of `content` module.

I changed all template files inside `pages/` folder from my self-built api to using `content` module, optimized some nested callbacks to more clean and simplified formats.

Now the `content` module can parse not only `.md` files, but also `.txt`, `.csv` and `.yml` files, way more powerful than my own api.

With `content` module, I'm more than content with it.

## Issues with Nuxt new version

Although `content` module is very powerful, the latest Nuxt became less powerful than it was before. Here are 3 problems that I found:

1. The new version Nuxt will generate `payload` for static pages, but it also did `url encoding` with the paths for storing `payload`, if the path contains non-English characters, the generated static webpage will not be able to access the `payload` generated specifically for this page, for they `payload` path needs to be `url encoded` again before it can be accessed.
2. Nuxt cannot render page `slug` or `tag` ending with `.js`, one of the Nuxt team member said that they did fallback for this, the only thing I need to do is to set it right in `nuxt.config.js`. After the setting, the pages can be rendered in `Dev mode`, but when static files are generated, these paths are nowhere to be found.(Later I found that this is not related to new version)
3. The latest version of Nuxt has a built-in crawler that can crawl dynamic routes so that I don't have to list out every dynamic routes for `generate`. Here comes the problem, the crawler somehow ignores paths ending with `.js`, this leads to the absence of certain pages, I have to specify these routes in `nuxt.config.js` so that they can be generated. Also if I referenced a non-existent internal path in some pages, this crawler will not verify its validity, Nuxt will still try to generate this page, resulting in an error. In a word, pages that need to be generated got ignored, while pages that do not need to be generated are being generated.

## Experience from this

Web application frameworks cannot be done within one night, I understand this. But the problems that did not exist in old version appear in the new one, I cannot say that I don't feel a little frustrated.

I really hope Nuxt can be more and more powerful, empowering amateur programmers like me along the way.

## 2021-03-13 update

Lates Nuxt version v2.15.2 has used right paths to store payloads for paths that contains non-English characters, but somehow those pages still cannot read payload properly, the `data` in those pages are empty.

## 2021-03-29 update

I have rolled back my website to use Nuxt v2.12.2 but kept the `Nuxt content` module, and specified all dynamic routes in `generate` again, the crawler feature in new version is no use to me. Now my website is back to normal.

I really cannot upgrade Nuxt from now on.