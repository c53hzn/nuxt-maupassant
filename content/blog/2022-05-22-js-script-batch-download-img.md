---
date: 2022-05-22
slug: js-script-batch-download-img
language: 中文
title: 批量下载图片的浏览器JavaScript脚本
description: 为了下载别人上传到WordPress.com的漫画，我写了一个浏览器脚本
categories: [技术]
tags: [浏览器脚本,油猴,Tampermonkey]
keywords: [批量下载]
comments: true
---

## 前言

最近看了一些别人分享的漫画，我想下载到电脑上做收藏，一张一张下载好像太蠢了，那不如写个浏览器脚本吧！

本文适合只会JavaScript的朋友，浏览器上安装一个执行浏览器脚本的插件就可以用了。

如果你要下载的是WordPress.com的图片，可以直接照抄，如果是其他网站，改一改就能用。

## 原理和要求

用a标签的下载功能，也就是包含 `href="<image url>"` 和 `download="<download file name>"` 两个属性的a标签，就可以做到用点击事件触发下载。

我们只要预先设置好电脑的默认下载文件夹，以及关闭“询问保存路径”，然后一直不断用JS脚本触发点击事件，就可以一直不断下载了。

要下载的图片链接必须属于同源，如果域名不一样，则不能使用此脚本。

`WordPress.com` 的个人网站域名是 `<website name>.wordpress.com` ，而用户上载的图片等资源的域名是 `<website name>.file.wordpress.com` 。

大家仔细看，这两个不是同一个域名，所以跨域啦，`CORS`啦，a标签的下载功能不起作用啦！

因此必须要分两步，先从文章页拿到图片链接，再进入图片资源所属的域名页面内才能成功下载。

## 获取文章页面所有图片链接

安装这个浏览器脚本之后，就可以文章页获得所有的图片链接。

如果页面没有图片，则不显示文本框和按钮。

```js
// ==UserScript==
// @name         Get image url from wordpress.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jenny
// @match        https://*.wordpress.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wordpress.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
if (!document.querySelector("figure img")) {return;}
if (document.querySelector("#imgUrlOutput")) {return;}
var txtArea = document.createElement("textArea");
txtArea.id = "imgUrlInput";
txtArea.style = "position:fixed;top:30px;right:0px;width:300px;height:470px;";
var loadBtn = document.createElement("button");
loadBtn.style = "position:fixed;top:510px;right:0px;";
loadBtn.innerHTML = "Load";
loadBtn.addEventListener("click", function() {
    var imgUrlStr = "";
    for (let i = 0; i < imgDOMs.length; i++) {
        imgUrlStr += imgDOMs[i].getAttribute("data-orig-file") + "\n";
    }
    txtArea.value = imgUrlStr;
});

document.body.appendChild(txtArea);
document.body.appendChild(loadBtn);
    // Your code here...
})();
```

点击 `Load` 按钮，文本框内就会输出该页所有的图片链接，一行一个，你需要全选，然后复制。

## 下载所有图片

安装下载图片用的脚本，该脚本必须在打开图片页的时候才会加载。

```js
// ==UserScript==
// @name         Download wordpress.com images
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jenny
// @match        https://*.files.wordpress.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wordpress.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
if (document.querySelector("#imgUrlInput")) {return;}
var txtArea = document.createElement("textArea");
txtArea.id = "imgUrlOutput";
txtArea.style = "position:fixed;top:0px;right:0px;width:300px;height:500px;";
var loadBtn = document.createElement("button");
loadBtn.style = "position:fixed;top:510px;right:0px;";
loadBtn.innerHTML = "Load";
var numInput = document.createElement("input");
numInput.type = "number";
numInput.value = 1;
numInput.style = "position:fixed;top:535px;right:40px;width:30px;";
var startBtn = document.createElement("button");
startBtn.style = "position:fixed;top:535px;right:0px;";
startBtn.innerHTML = "Start";
var imgArr = [];
var imgNum = 1;
loadBtn.addEventListener("click", function() {
    imgArr = txtArea.value.split("\n");
    imgNum = numInput.value;
    if (txtArea.value=="") {
        alert("No image url is found!")
    } else if (imgNum>imgArr.length) {
        alert("Please input a reasonable number!")
    } else {
        document.body.innerHTML = "";
        let html = "";
        for (let i = 0; i < imgArr.length; i++) {
            html += "<p><img src='" + imgArr[i] + "'></p>";
        }
        document.body.innerHTML = html;
        document.body.appendChild(txtArea);
        document.body.appendChild(loadBtn);
        document.body.appendChild(numInput);
        document.body.appendChild(startBtn);
    }
});
startBtn.addEventListener("click", function(){
    downImg(imgNum, imgArr[imgNum-1]);
});

document.body.appendChild(txtArea);
document.body.appendChild(loadBtn);
document.body.appendChild(numInput);
document.body.appendChild(startBtn);

var downBtn = document.createElement("a");
downBtn.target = "_blank";
//downBtn.style="position:fixed;bottom:0px;left:0px;width:100px;height:50px;background:blue;";
document.body.appendChild(downBtn);

function downImg(num, url) {
	var urlArr = url.split(".");
	var fileName = "";
	var extention = urlArr[urlArr.length-1];
	//下载后的图片名称为数字加扩展名的格式，数字不够3位的会在前面补足0
	//这里默认图片最多是999张，如果要下载更多图片，请自行修改脚本
	//如果想用别的名称作为下载后的文件名，请自行改写脚本
	if (String(num).length==1){
		fileName = "00"+String(num) + "." + extention;
	} else if (String(num).length==2) {
		fileName = "0" + String(num) + "." + extention;
	} else {
		fileName = String(num) + "." + extention;
	}
	downBtn.href = url;
	downBtn.download = fileName;
	downBtn.click();
	num++;
	if (imgArr[num-1]) {
		setTimeout(function() {
			downImg(num, imgArr[num-1]);
		},1000);
	} 
}
})();
```

## 更改电脑下载设置

在电脑上新建一个文件夹，然后把浏览器的默认下载路径改成这个文件夹。

然后关闭“每次下载时都询问下载路径”，不然浏览器会在每次下载时弹出窗口问你下载到哪，那就谈不上自动了。

## 下载图片

打开文章页，右击图片，选择“在新窗口打开图片”。或者你复制图片链接，自己打开新窗口，然后粘贴进去访问也行。

脚本加载完毕后，页面右边会出现一个大的文本框，可以把刚才复制的所有图片链接粘贴进去，点击 `Load` 加载图片。

文本框下面是一个小输入框，你可以设置从第几张开始下载，点 `Start` 开始下载，然后打开下载路径查看图片有没有下载成功。

下载完之后记得修改浏览器的下载设置，不然下次要下载别的东西的时候就会直接下载到当前这个文件夹了。

## 结语

以前一直想写一个可以批量输入图片链接然后下载的功能，今天终于写了。

其实还写了一个自动尝试输入密码的脚本，可以用来在加密的WordPress文章页内自动尝试不同的密码组合，这个就不分享了。

全文完。
