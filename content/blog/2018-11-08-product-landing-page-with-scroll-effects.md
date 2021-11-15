---
date: 2018-11-08
slug: product-landing-page-with-scroll-effects
language: 中文
title: 添加元素平移效果的产品页面
description: 之前做了不添加任何效果的产品页，这两天看苹果ipad pro的产品页，惊艳到不行，所以自己仿照做一个鼠标滚轮事件触发页面元素平移的版本，不过比较粗糙。
categories: [技术]
tags: [scroll delay]
keywords: [FreeCodeCamp,FCC,Responsive Webpage Design]
comments: true
---

之前为了拿到FreeCodeCamp的“Responsive Webpage Design Certification”（响应式网页设计证书），我做了一个单页的产品介绍页面，链接如下：    
[https://codepen.io/c53hzn/pen/vaevqP](https://codepen.io/c53hzn/pen/vaevqP)

页面上没啥好说，布局是从上到下分段式，导航栏固定在视图窗口顶部，点击导航栏链接跳转到页面内部相应模块，整个页面没有用到任何动作。

产品是我自己想出来的订制T恤衫，6张产品图全是我自己用Photoshop做的，还打上了我的网站logo水印，算是整个页面上最有技术含量的。

不过可能是个人审美能力所限，我想不到有什么酷炫的页面效果，于是三个月过去了，这个页面上还是没有用上JavaScript。

然后就到了Apple出新的iPad Pro了，人家的页面果然做得很酷炫，当鼠标滚轮向下滚动时，页面中间的产品元素会向左平移，但是滚动条却会向下走。

这么酷炫的效果确实让人感到惊艳，仔细研究了下之后发现，这是用了translateX和translateY来控制横向和纵向的位移，感觉可以抄一抄。

于是就有了这个第二版    
[https://codepen.io/c53hzn/pen/gBNjMR](https://codepen.io/c53hzn/pen/gBNjMR)

效果图如下    
![product_page.gif](https://www.houzhenni.com/myassets/product_page.gif)

虽然不如人家的效果酷炫，但是感觉比之前的页面活泼了一点。

就这样啦。