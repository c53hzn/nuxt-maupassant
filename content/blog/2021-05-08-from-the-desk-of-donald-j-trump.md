---
date: 2021-05-08
slug: from-the-desk-of-donald-j-trump
language: 中文
title: 我用Vue仿了一个川普的个人版推特
description: 单机版推特，一个人的微博，美国前总统唐纳德·J·特朗普同款，你值得拥有。重点介绍九宫格图片的部分，学会了你也可以写一个微博APP。
categories: [技术]
tags: [Nuxt.js,Nuxt Content,Vite.js,Vue.js]
keywords: [US former president,Donald J. Trump,one-man twitter]
comments: true
---

## 前言

特朗普接连在好几个社交平台上被炸号，这滋味想必不好受。人家可是一国前总统，大家咋这么不给面子呢？

2021年5月4日，这位美国前总统发布了他的单人版推特： [特朗普的办公桌](https://www.donaldjtrump.com/desk)，特朗普会发布短文、图片、视频。访客可以分享，但不可以评论。

想及时获取更新的话，可以在该网站的联络表提交邮箱，当特朗普发新内容的时候你就会收到邮件通知，但仅限美国人。

这个既不是推特，也不是微博，只能相当于是个短博客网站。

这个排版很清爽，配色也给人一种正式、商务的感觉。我一直想给我自己做一个发布放碎片式文字的单页面来着，那就照着这个整吧！

成品在 [这里](https://www.houzhenni.com/desk)

![desk](/img/blog/2021-05-08/001.png)

## 功能设计及准备

我在建立这个博客网站之初，就想在基本的长博文之外再开一个这样的页面，其实也就是个单人微博，名字我都起好了，叫 `碎碎念` ，但是受技术限制，一直没有做成。

今年年初的时候转用了 `Nuxt Content` 作为网站读取博客内容的模块，而它可以直接读取 `yml` 文件为 `JSON` ，于是我决定善用这个模块来做这个页面。

网站本身是用 `Nuxt.js` 框架做的，所以用到的技术主要还是 `Vue.js`。

## 几个难点

### 多段文字、链接、图片怎么办？

如果我要发布的内容包含文字、链接、图片，那要不要在 `yml` 里面用 `markdown` 格式书写，然后在页面渲染 `markdown` 内容呢？

可是在 yml 里面写的时候，多段内容无法直接分段写，这样编辑内容的体验会很不好。

最终我决定，`yml` 文件里，单条 `碎碎念` 的原内容必须分开文字、链接、图片，在页面渲染时，每个不同类型的内容都分开渲染，这样就不用再导入一个模块来解析 `markdown` 了。

以下是两条 `碎碎念` 内容的范例

```yml
posts:
  - id: desk-2021-05-post001
    time: '2021-05-06 14:07'
    content: 
      - 好了，终于可以写点自己的东西了。总之这是一个仿美国前总统唐纳德·J·特朗普的个人网站的个人版推特“特朗普的办公桌”而建的应用。
    link:
      - href: https://www.donaldjtrump.com/desk
        text: 特朗普的办公桌
  - id: desk-2021-05-post002
    time: '2021-05-06 23:30'
    content:
      - 试试带图
    picture:
      - https://image.freepik.com/free-psd/top-view-sticker-collection-mock-up_23-2148884437.jpg
      - https://img.freepik.com/free-psd/cardboard-box-with-sticker-mock-up_23-2148897527.jpg?size=338&ext=jpg
      - https://image.freepik.com/free-psd/covid-19-social-media-post_23-2148923225.jpg
      - https://image.freepik.com/free-psd/coronavirus-poster-template_23-2148900209.jpg

```

这个数据结构很清楚了，然后写一个 `Vue` 组件来渲染就可以了。

不过不知道为什么，末尾一定要特意空一行，才能正确识别，总之加个空行就行了。

### Vue的九宫格图片怎么做？

我的设计是这样的：大容器用 flex 布局，小容器设置为正方形，里面的图片元素用 `object-fit: cover` 来达到全铺效果。我自己想做成微博那样，小图根据图片总数而有三种排版。

我想让小容器的宽高可以随大容器变化而变化，但是不预先设置宽高的话，这个正方形就有点难办，不过最终还是找到了解决办法。

小容器的 `height` 设置为 0 ，`width` 可以用百分比，然后 `padding-bottom` 设置为 `width` 一样的百分比，这样就是一个响应式的正方形了。

由于小容器高度为 0 ，里面的图片就无法自然显示了，但是给图片元素添加 `position: absolute` 就可以解决。

```css
/* 大容器开始 */
.desk-unit .picture {
  display: flex;
  flex-wrap: wrap;
}
/* 大容器结束 */
/* 小容器开始 */
.desk-unit .picture .img {
  height: 0px;
  position: relative;
  margin: 0px 10px 10px 0px;
}
.desk-unit .picture .col-1 {
  width: 60%;
  padding-bottom: 60%;
}
.desk-unit .picture .col-2 {
  width: 40%;
  padding-bottom: 40%;
}
.desk-unit .picture .col-3 {
  width: 30%;
  padding-bottom: 30%;
}
/* 小容器结束 */
/* 图片元素开始 */
.desk-unit .picture .img img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 图片元素结束 */
```

在 `Vue` 组件里面根据图片数量来渲染 css 的 class 名称，结果大概是这样的。

```html
<div class="desk-unit">
  <div class="picture" v-if="picture">
    <div class="img" 
    :class="imgClass"
    v-for="(pic,i) in picture" :key="'pic'+i">
      <img :src="pic">
    </div>
  </div>
</div>
```

```js
export default {
  data() {
    var imgClass = "";
    if (this.picture) {
      imgClass = this.picture.length==1?"col-1"
      :this.picture.length==2?"col-2"
      :this.picture.length==4?"col-2"
      :"col-3"
    }
    return {
      imgClass
    }
  },
  props: {
    picture: {
      type: Array,
    },
  }
}
```

## Vite版“办公桌”应用

在开发的时候，Nuxt 启动开发环境至少需要 3 分钟，而 Vite 竟然只要不到 1 秒，所以我先起了一个 Vite 项目，写得差不多了再移植到 Nuxt。

Github 上的 Vite 项目在这里： [https://github.com/c53hzn/desk-twitter](https://github.com/c53hzn/desk-twitter)

完~