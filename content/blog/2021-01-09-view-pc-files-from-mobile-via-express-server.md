---
date: 2021-01-09
slug: view-pc-files-from-mobile-via-express-server
language: 中文
title: 如何用手机查看局域网内Express主机上的文件
description: 用电脑搭建Express服务器，然后手机直接看电脑上的文件和视频，好像挺有意思的？
categories: [技术]
tags: [Node.js,Express.js]
comments: true
---

## 契机

我电脑上有些TXT小说文件和视频文件，虽然开着电脑的时候查看也不麻烦，但是大冬天的还是想裹着被子刷手机，如果能有办法手机直接在线访问电脑上的文件，而不需要进行繁复的文件转移过程，那该多好啊！

然后我想到可以在电脑上搭建Express服务器，然后允许访问静态文件，再用手机在线访问，不就可以了嘛！

平时搭建服务的时候都是直接电脑上访问，而即使连了同一个路由器，手机也无法直接访问localhost，于是搜了一下，发现需要在服务器上配置内网IP，好像也不难。

下一个问题来了，搭建Express服务器是简单，但是怎么才能直接显示文件夹内的文件目录呢？于是搜了下NPM，果然有这样的package！

我想到的问题前人都想到了，那就直接拿来用吧！

## 查看本机内网IP

使用快捷键 `Windows + R`，打开【运行】，输入 `cmd` 并确定

![运行工具](img/blog/2021-01-09/001.jpg)

然后在打开的命令行工具里输入 `ipconfig`

![命令行](img/blog/2021-01-09/002.jpg)

回车之后就可以看到 `IPv4地址`，这个就是我们自己电脑的内网IP地址了

![ipconfig](img/blog/2021-01-09/003.jpg)

## Node脚本

为了搭建这样的服务器，我们需要安装两个 NPM package： `express` 和 `serve-index`

全局安装 `express`

```js
npm install -g express
```

全局安装 `serve-index`

```js
npm install -g serve-index
```

然后就可以写服务器脚本啦！

```js
var express = require("express");
var serveIndex = require('serve-index');

var app = express();
var localIp = "1xx.1xx.1.1xx";// 这里输入你的内网IP

app.use(express.static(__dirname));
app.use('/', serveIndex(__dirname + '/'));
app.listen(4000,localIp, () => {
  console.log("express server running at " + localIp + ":4000")
});//你要是不想用4000这个端口，也可以用别的数字
```

我们可以把这个脚本文件保存为 `app.js`，然后放在我们想要访问的文件夹下。

然后在这个文件夹地址栏输入 `cmd` 直接打开命令行，然后输入

```js
node app
```

然后这个文件夹就可以在内网访问了

## 手机访问电脑文件

打开手机浏览器，输入内网IP加端口

```
http://1xx.1xx.1.1xx:4000
```

然后你要访问的文件夹目录就出现了

![手机浏览器访问](img/blog/2021-01-09/004.jpg)

文件夹可以点进去，文件也可以直接访问。

经过测试，`.txt`、 `.md`、 `.js`、 `.doc`、 `.pdf`、 `.mp4`、 `.html` 这些扩展名的文件可以直接在浏览器内打开，但是 `.flv`、 `.epub` 等扩展名的文件则不行，这只能说是我自己手机的限制吧。

## 总结

每次突发奇想之后总是会发现原来这个想法别人早就实现过了，不得不赞叹“英雄所见略同”啊！