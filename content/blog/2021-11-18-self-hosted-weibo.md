---
date: 2021-11-18
slug: self-hosted-weibo
language: 中文
title: 用Nuxt自建一个微博
description: 用了11年的微博账号突然没了，于是我用GitHub自建了一个微博。
categories: [技术]
tags: [微博,自建网站,GitHub,Nuxt.js]
keywords: [新浪,自建微博]
comments: true
---

## 微博炸号

用了11年的微博账号突然异常了，连着申诉了好几天都只收到回复说我“发布了敏感违规信息”，无法恢复账号。

好吧，那我还有个小号，用小号关注了一些原来关注的人，第二天小号也炸了。

这应该是一天之内关注了太多人，触发了什么机制，理论上说只要有手机号，验证一下就可以了。

但我没有能用的手机号，于是小号也没了。

难过沮丧都没有用，不如想想如何自己搭建一个微博app吧！

## 功能需求

我是一个非专业选手，代码语言只会写JavaScript，JS框架用的最熟的是jQuery和Vue，JS服务框架只会一个Nuxt，那就只能从这里面下手了。

话说之前看到特朗普自建了一个短博客网站，觉得新奇，于是仿写了一个，加到我自己的Nuxt博客网站里，链接在这里: [碎碎念](/desk)。

现在短博客组件是现成的，作为 CMS 的 `Nuxt Content` 也是现成的，我可以把这个功能独立出来，再写个主页信息流，做好分页，添加详情页及外部评论功能，就可以了。

## 外部参考

分页功能参考了这篇文章[Adding Pagination With Nuxt Content](https://redfern.dev/articles/adding-pagination-nuxt-content-blog/)，作者非常贴心地把 `utils` 里的方法和需要用到的页码组件全都写出来了，照抄即可。

不过我在使用中发现有两个问题，第一个是当尾页显示的条数等于每页显示的条数时，尾页无法正确加载。第二个是尾页的跳页功能，“下一页”本来应该变灰的，可是竟然是有效的，还指向了倒数第二页。

经过检查发现，第一个问题是utils里面的方法没有处理这个情况，第二个问题是页码组件里本应向上取整的一个参数却是向下取整的。改了一下代码，问题就修复了。

## 搭建微博

第一步，我在 Godaddy 上买了个域名，然后绑定到我的Github小号上。

Godaddy 的界面设计也是非常不科学，添加服务器记录的按钮非常难找。

进入“我的网域”，找到新买的域名，点开详情页，然后找到“DNS管理”。

- 添加一个类型为“CNAME”的记录，名称写 www ，值写  \<username\>.github.io
- 添加一个类型为“域名服务器”（NS）的记录，名称写alias，值写  \<username\>.github.io

第二步，在Github上绑定这个域名。

由于我想使用Github Actions自动部署，所以代码仓库需要有两个分支， main 和 gh-pages 。

创建代码仓库的时候，默认创建了一个 master 分支出来，但由于我在别处找的 Actions 代码是把 main 分支生成的静态网站部署到 `gh-pages` 分支上，我又不想改 Actions 的代码，所以需要手动把分支名改成 main 。

然后在代码仓库 \<username\>.github.io 的设置里为 `gh-pages` 分支开启 `pages` 服务，域名填写新买的域名即可。

如果GitHub没有在pages的设置里提示你部署在gh-pages这个分支上，那你可能需要手动创建这个分支，然后再回到这里选择它。

直接在GitHub网站上创建新分支有两种办法。

方法一，进入代码仓库，点击当前分支，在弹出的下拉窗口的搜索框里输入一个新分支名，点击创建新分支。

![image](https://user-images.githubusercontent.com/30020736/142415708-f231515f-eeba-4e62-b7e0-155cf28450b1.png)

方法二，进入当前分支的任意一个文件，点击编辑，改改文字，页面拉到底，在保存选项里选择新建分支和提交拉取请求。提交完之后记得要接受。

![image](https://user-images.githubusercontent.com/30020736/142416149-5005e95e-4117-41e0-821e-b563ebcee175.png)

有了 `gh-pages` 这个分支，我们就可以在代码仓库的设置里面把它作为 `pages` 的来源分支了，然后添加域名并验证。

第三步，把本地的工程文件上传到 GitHub 上，等待它自动部署，通常只要 2 分钟，然后就可以用域名访问了。

自建微博地址: [desk-weibo](https://www.houzhenni.com/desk-weibo)
