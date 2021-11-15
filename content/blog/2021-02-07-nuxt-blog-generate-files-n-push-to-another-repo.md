---
date: 2021-02-07
slug: nuxt-blog-generate-files-n-push-to-another-repo
language: 中文
title: 使用Github Actions把Nuxt静态网站push到其他repository
description: 试了一下用GitHub Actions生成Nuxt静态博客，推送并发布到其他代码仓库，还是挺有意思的。
categories: [技术]
tags: [GitHub,Nuxt.js,Nuxt Content]
keywords: [Github Actions]
comments: true
---

## 发现GitHub Actions

之前研究过 `Travis CI` 之类的持续集成服务，但是我自己的小工程实在用不上，而且我写的东西怕是也不配套。

后来看到了 GitHub 的 `Actions` 服务，貌似可以写个自动化流程，然后只要 push 到 repo 就能触发更新。

这里有个 [教学](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 。

我兴冲冲地研究了下，想给我的 Nuxt 博客弄个自动部署更新啥的，但是有两个问题

1. 我的博客用了本机自建的 api，自动部署时无法自动开启
2. 很多教程都是要发布到 `gh-pages` 里面，而我的 Nuxt 博客工程文件在一个私有的 Repo 里，不公开就不能用 `gh-pages` 这个分支。

如果找不到办法把生成的静态文件 push 到博客网站所在的 repo ，那我就不能做这个自动部署了。

## 发现推送到其他repo的方法

我最近给 Nuxt 升了级，还用了 Nuxt 的新模块 `content` 来解析博客内容，这个比我自己写的 api 好用多了。

在停用本机自建 api 之后，我想起之前看过的将 Nuxt 生成的静态文件目录 `dist/` 部署到 `Github pages` 的 [教程](https://nuxtjs.org/docs/2.x/deployment/github-pages)，我现在满足使用这个方法的前提了，再找找有没有办法把静态文件推送到其他 repo 的办法，也许我就能实现自动部署了呢！

然后我果然很幸运地找到了这个 [教程](https://github.com/marketplace/actions/push-directory-to-another-repository)，这就是我要实现的效果。

好了，是时候展示我制造缝合怪的功力了！

## 详细步骤和代码

在要使用的项目分支下新建 `.github` 文件夹，里面再新建 `workflows` 文件夹，然后在里面新建 `cd.yml`，输入以下代码：

```yml
name: cd

on: [push, pull_request]

jobs:
  cd:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest]
        node: [14]

# checkout@ 这里写你的分支名称
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: Setup node env
        uses: actions/setup-node@v2.1.2
        with:
          node-version: ${{ matrix.node }}

      - name: Install dependencies
        run: npm install

      - name: Generate
        run: npm run generate

      - name: Publish
        uses: cpina/github-action-push-to-another-repository@v1.3
        env:
          API_TOKEN_GITHUB: ${{ secrets.API_TOKEN_GITHUB }}
        with:
          source-directory: 'dist'
          destination-github-username: 'username'
          destination-repository-name: 'username.github.io'
          user-email: email@email.com
```

代码中使用的 `API_TOKEN_GITHUB` 可以到 [这个页面](https://github.com/settings/tokens) 来生成，生成好之后切换到用来生成文件的项目的 repo 那里，在 `Settings` 里面的 `Secrets` 里面添加刚才生成的 `token` ，如果你取的名字不是 `API_TOKEN_GITHUB` ，那么在前面的代码里记得把相关引用改成自己取的名字。

然后把项目工程文件和新创建的工作流程 push 到 GitHub 上，就能触发自动部署更新了。

完~

## 2021-04-28更新

原来的Action路径

```yml
uses: cpina/github-action-push-to-another-repository@master
```

Action 的作者把自己的 repo 分支名从 `master` 改成 `main` 了，所以如果有人 push 了之后发现网站没更新，而 GitHub 的 Action 执行结果报错，显示内容如下

>fatal: Remote branch master not found in upstream origin

这个意思是说找不到 `master` 这个分支，那么你改成 `main` 就可以了。

## 2021-10-31更新

Action 的作者又更新了，现在会报错

>fatal: Remote branch main not found in upstream origin

最新版要改成这样

```yml
uses: cpina/github-action-push-to-another-repository@v1.3
```