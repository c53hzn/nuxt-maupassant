---
date: 2021-02-08
slug: nuxt-2021-limitations
language: 中文
title: 2021年Nuxt新版本的一些限制
description: 升级Nuxt到2.14.12之后，遇到了3个问题，这个新版本用起来有点不太顺手。
categories: [技术]
tags: [Nuxt.js, Nuxt Content]
keywords: [Github,bug report,issue report]
comments: true
---

## 升级Nuxt和使用content

为了试用 Nuxt 的新模块 `content` ，我升级了 Nuxt 到最新版本 `2.14.12` ，不过其实不用升级也能用这个模块，这是后话了。

`content` 的官方页面在 [这里](https://content.nuxtjs.org)。

我把那些原本使用本机自建 api 获取内容的 `pages/` 的模板文件全都改成使用 `content` 了，也终于把那些因为改起来太麻烦而保留的嵌套 3 层的回调改成了更一目了然的简洁写法。

`content` 不光可以解析 `.md` 的文件，还可以解析 `.txt` 、 `.csv` 和 `.yml` 等格式的文本文件，可以实现比我的 api 要更丰富的功能。

对于 `content` 我是非常满意的。

## Nuxt新版本的问题

虽然 `content` 十分给力，但是新版本的 Nuxt 不是很给力，我发现有 3 个问题：

1. 新版本会为静态页面的各个路径都生成 `payload`，用来为页面提供内容，但是 Nuxt 会对保存的路径进行 url 编码，此时如果路径含有非英语字符，那么最后的页面将无法正确访问 `payload` 资源，因为访问路径需要再次进行 url 编码。 我在 GitHub 上提了 issue ，貌似被接受了，但是得等下次 release 才能用到了。而且不知道为什么，这个问题会影响手机版的导航栏，只要是路径含有非英语字符的页面，手机导航栏就打不开，我尝试自己在 `node_modules` 里面找到了和生成静态网站时的 url 编码有关的代码，手动改成了不编码。这样很有效，在本机生成静态文件时，路径就正常了，但是如果想用 `GitHub Actions` 自动部署的话，那就又不行了。
2. 文章 `slug` 或 `tag` 如果是以 `.js` 结尾的，那么 Nuxt 就无法正常渲染，这个我也提了 issue ，Nuxt 团队人员说有对这个做 fallback，让我改 `nuxt.config.js` 的设置，然后关闭了我的 issue。（这个其实不关新版本的事，我后来发现了）
3. 新版本内建了爬虫，这样就不需要在 `nuxt.config.js` 里面为 `generate` 列出所有动态生成的路径了。但是问题来了，爬虫没有爬取 `.js` 结尾的路径，导致有的页面无法生成，还需要我手动在 `nuxt.config.js` 里面列出相关路径才行。还有就是如果我在一些页面里引用了不存在的路径，这个爬虫不会验证路径有效性，还是会尝试生成这个不存在的页面。结果就是明明需要生成的，没有生成；明明不需要生成的，却去尝试生成了。

## 感想

网络应用框架的开发和迭代不可能一蹴而就，这个我明白，但是旧版本里没有的问题，新版本却反而出现了，这不得不让人感到有点失望。

希望 Nuxt 以后能再发展壮大，让我这个非专业程序媛也能继续受益吧！

## 2021-03-13更新

最新的 Nuxt 版本 v2.15.2 解决了有非英语字符的路径的 payload 保存路径的问题，但是不知道为什么这些页面还是无法读取正确的 payload，导致 data 都是空的。

## 2021-03-29更新

已回滚到 Nuxt v2.12.2，不过仍然在用 `Nuxt content` ,然后在 nuxt.config.js 里面的 generate 部分列明了所有要生成的 routes，不用它的 crawler ，网站至少能正常用了。

以后不敢随便升级了。