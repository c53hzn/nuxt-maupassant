---
date: 2021-11-20
slug: log-in-2-github-account-on-one-pc
language: 中文
title: 如何在同一台电脑上同时登入两个GitHub账号
description: Git切换账号之后很难换回去，网上找到教程都失效了。于是我尝试Git终端登录一个，下载GitHub桌面版登录第二个，这次可以了。
categories: [技术]
tags: [GitHub]
keywords: [git,GitHub desktop]
comments: true
---

## 切换第二个GitHub账号

最近由于一些个人的需求，我要用第二个GitHub账号在Git终端进行代码提交，在网上找了很多教程，终于找到了登出第一个GitHub账号的办法。

最快的登出方式是这样的：

1. 快捷键 `win+R` 唤出 `运行` 窗口，输入 `control` 并确定，打开控制面板。
2. 在控制面板的搜索框输入 `credentials` ，并在面板提示的几个功能中找到 `凭据管理器`，然后在凭据管理器的窗口中找到GitHub的凭据并删除。

然后就到登入了。话说以前要在Git登入GitHub账号是这样的：

Git终端会弹出一个登入窗口让你输入账号和密码，这个窗口其实没什么用，可以用 `Esc` 关掉它，或者你填了也行，对结果不产生影响。

Git终端仍然会让你在终端输入账号和密码，但是不会明文显示，然后就登入成功了。

但是从2021年8月13日以后，这种登入方式也已经无效了。根据[这篇文章](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)所说，现在不能使用账号密码，而必须使用GitHub后台生成的 `Authentication token` ，也就是认证凭据，才可以在Git终端登入GitHub账号了。

我们应该做什么呢？

1. 升级Git终端，去官网下载个最新版，安装即可。
2. 在浏览器里登入你的第二个GitHub账号，进入 `Settings > Developer Settings > Personal access tokens` ，然后点击 `Generate new token`，复制那一长串的token编码。
3. 回到Git终端，尝试commit然后push，终端会弹出窗口，把token粘贴进去即可。

## 换回第一个GitHub账号

然后问题来了，我那些用第一个GitHub账号开发的repo无法操作了。

如果用前面的方式再切换一下也不是不行，只是我以后可能两个账号的项目都需要更新，那换来换去就很麻烦了。

有没有在同一台电脑上同时登入两个GitHub的办法呢？

找了一圈没找到，于是我想到，能不能下载GitHub桌面版，登入第一个GitHub账号试试呢？

于是下载、安装、登入、关联项目，竟然成功了！

当我修改完第一个GitHub账号的项目之后，用GitHub桌面版进行提交，而改完第二个GitHub账号的项目之后，可以用Git终端进行提交，两边各不妨碍，非常完美。

以上就是如何在同一台电脑上同时登入两个GitHub账号的办法，希望对大家有用。

全文完。