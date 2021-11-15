---
date: 2021-03-07
slug: kittens-game
language: 中文
title: 游戏猫国建设者的外挂脚本
description: 最近从Chrome改用Edge，从Chrome导入了自己写的浏览器脚本外挂来玩游戏，然后这个按钮好像变得不太对劲？
categories: [技术]
tags: [浏览器脚本]
keywords: [猫国建设者,kittens game,游戏,外挂]
comments: true
---

## 游戏“猫国建设者”

偶然在网上找到一个网页版的文字式经营类放置游戏 [猫国建设者](https://likexia.gitee.io/cat-zh/) ，类似于之前大火的 [生命线(lifeline)](https://baike.baidu.com/item/Lifeline/18643428) ，游戏界面只有文字说明和各种按钮，玩家通过点击游戏提供的选项与游戏进行互动。打开页面，鼠标点一点，放着不动，随着时间的流逝，游戏里的各项数字会自己涨起来（或者跌下去—）。

`猫国建设者` 的经营目标是让这个小猫社区有更多的猫，并且一路进步成更高级的社会形态。

维持 `猫口` （对应 `人口` ）的关键在于供应足够的猫薄荷，每次点击 `采集猫薄荷` 按钮，猫薄荷就会加一。

有了 `猫口` ，我们就有了 `猫力` （对应 `人力` ），就可以从事生产活动了。 `猫口` 可以使用富余的猫薄荷做生产资料，合成别的材料，然后再用合成出的材料做别的工具，从工具再到设备，从设备到生产环境，然后到社会环境，再然后社会形态就升级啦。

## 浏览器脚本外挂

游戏发展高度依赖手动点击按钮采集猫薄荷，我看到一个游戏评论说他为此用坏了一个鼠标，哈哈。

可是我不想这么折腾鼠标，于是按 `F12` 打开控制台，看看有什么能做的。

但是又不想直接修改游戏数据，那不如就来个最基础的，加个“自动点击收集猫薄荷”功能吧！

之前在 Chrome 里面玩的时候，我用的是 [Tampermonkey](https://www.douban.com/note/307238197/) 这个浏览器扩展程序来加载我自己写的脚本，写好之后保存在了我的 `GitHub` 上，地址在 [这里](https://github.com/c53hzn/mylib/blob/master/monkey.kittensgame.js) 。

点击 `自动采集猫薄荷` 之后，没一会就获得了 `不道德的巅峰` 这个成就，因为游戏是有时间记录的，这么短的时间内获得这么多猫薄荷，肯定是开挂了。

但是我总不能看着小猫都饿死吧，那就只好勉为其难接受这个成就了。

## 从Chrome导入脚本到Edge

最近从 `Chrome` 转而使用了 `Edge` 浏览器，保存的密码、收藏夹、扩展应用程序什么的也都迁移了过来。

我在 `Edge` 上打开 `猫国建设者` ，再点击启用 `Tampermonkey` 里面的外挂脚本，这时候发现有点问题。

我在脚本里用的按钮文字语言是中文，现在变成了乱码，这一看就是编码问题。

![001](/img/blog/2021-03-07/001.jpg)

于是我在 `Edge` 里面打开 `Tampermonkey` 的脚本编辑页面，发现脚本内的原有中文字符都变成了乱码。

![002](/img/blog/2021-03-07/002.jpg)

这应该是从 `Chrome` 导入进来的时候编码出了问题，我尝试用切换文字编码的浏览器扩展程序来切换成 `UTF-8` ，但是切换之后乱码也仍然没有变化。

看来不是显示的问题，是迁移过来的时候就已经不是 `UTF-8` 了。

## 新版本的外挂

没啥好说的，既然无法再储存成正确的编码，就不再花心思改这个版本了。

于是写了个新的，这回不是触发点击收集按钮，而是直接给资源加数字了。

直接在输入框里输入数字，想要多少猫薄荷和木材就有多少猫薄荷和木材了。

```js
// ==UserScript==
// @name         catnip
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       c53hzn
// @match        https://likexia.gitee.io/cat-zh/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("body").append(`
    <div style="position:fixed;left:10px;bottom:10px;user-select:none;">
        <span id="add_catnip" style="border: 1px solid green; color: green; background: white; border-radius: 4px;cursor:pointer;">
                猫薄荷+
        </span>
        <input type="number" style="width:80px;" id="add_catnip_num" value="10000"/>
        <span id="add_wood" style="border: 1px solid green; color: green; background: white; border-radius: 4px;cursor:pointer;">
                木材+
        </span>
        <input type="number" style="width:80px;" id="add_wood_num" value="10000" />
    </div>
    `);

    $("#add_catnip_num").on("input",function() {
        if ($(this).val() == "") {
            $(this).val(10000);
        }
    });
    $("#add_wood_num").on("input",function() {
        if ($(this).val() == "") {
            $(this).val(10000);
        }
    });

    $("#add_catnip").click(function() {
        gamePage.resPool.resourceMap.catnip.value += Number($("#add_catnip_num").val());
    });

    $("#add_wood").click(function() {
        gamePage.resPool.resourceMap.wood.value += Number($("#add_wood_num").val());
    });
})();
```

可以复制到 `Tampermonkey` 里面用，也可以直接 `F12` 打开控制台粘贴进去用。

不过有个小问题，游戏本身没有任何地方需要输入数字，所以作者把数字按键变成游戏的主体部分的标签切换快捷键了，在输入框里输入数字时会触发切换标签。

但是不碍事，你全输入 `1` 就可以保持在 `营火` 选项卡了。

完~