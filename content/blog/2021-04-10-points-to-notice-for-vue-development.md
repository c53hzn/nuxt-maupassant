---
date: 2021-04-10
slug: points-to-notice-for-vue-development
language: 中文
title: Vue开发的注意事项
description: 父组件无法给子组件内嵌Vue表达式？无法绑定点击事件？无法传递布尔值？子组件不能改prop的值？原来这些应该这样写
categories: [技术]
tags: [Nuxt.js,Vue.js,组件]
keywords: [Component,v-bind,click event]
comments: true
---

## 前言

今天给我的网站的博客相关页面新增了侧边菜单，用来显示年份索引和 TOC(Table of Contents, 文章小标题目录)。

博客列表的年份索引在桌面版时显示在右侧，手机版时隐藏，文章详情页的 TOC 在桌面和手机都隐藏，侧边菜单可使用固定在页面右下角的列表按钮进行开关。

就这么个功能做了一整天。不过做的时候遇到一些问题，又学到了一些关于 `Vue.js` 开发的小知识，主要涉及到的是 Vue 父子组件的通信，包括传值和触发调用方法。

（并没有，其实只是没看文档就瞎写的后遗症而已）

## 父组件给子组件内嵌Vue表达式

要在组件里内嵌 Vue 表达式或者 HTML 的话，需要在原组件中把内嵌的位置写上 `<slot></slot>` ，这就是在应用组件时插入表达式或 HTML 的插槽。

要注意的是，插槽不可以是根元素标签，必须写在内嵌位置的里面。

子组件：

```html
<div class="side-nav">
  <slot></slot>
</div>
```

父组件：

```html
<div>
  <h2>Year list</h2>
  <SideNav class="side-unit">
    <ul class="year-list">
      <li v-for="(year,i) in years" :key="i">
        {{year}}
      </li>
    </ul>
  </SideNav>
</div>
```

最终渲染的结果如下：

```html
<div>
  <h2>Year list</h2>
  <div class="side-nav side-unit">
    <ul class="year-list">
      <li>
        2021(18)
      </li>
      <li>
        2020(10)
      </li>
    </ul>
  </div>
</div>
```

## 父组件给子组件绑定点击事件

本来如果要在 HTML 标签上绑定点击事件的时候只需要 `v-on:click="xxx"` 或者 `@click="xxx"` 就可以了，但是如果是组件的话就需要加个 `native`

完整的是这样：

```html
<ListButton @click.native="toggleSideNav"></ListButton>
```

## 父组件给子组件传递布尔值

本来如果要传递固定内容的字符串给组件的 `props` 时是不需要用 `v-bind:` 或者 `:` 符号的，但是如果要传递的是布尔值，就需要了。

```html
<ListButton :isDesk="true"></ListButton>
```

## 父子组件同时控制一个值

如果一个 `prop` 是依赖父组件传值，但是又希望在子组件内部可以更改的，那就不要用 `prop` 传值，而是改成子组件内的 `data`，把更改 `data` 的方法在 `methods` 里面写好，这样子组件内部可以调用，然后再在父组件内触发调用子组件的方法。

子组件：

```html
<div class="side-nav" :class="{'show': isShow}">
  <slot></slot>
  <div @click="toggle">
    <i class="fa fa-window-close-o"></i>
  </div>
</div>
```

```js
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggle() {
      this.isShow = this.isShow?false:true;
    }
  }
}
````

然后到父组件，这里的 `ref` 是触发调用的关键。

```html
<SideNav class="side-unit" ref="mySideNav"></SideNav>
<ListButton @click.native="toggleSideNav"></ListButton>
```

```js
methods: {
  toggleSideNav: function() {
    this.$refs.mySideNav.toggle();
  }
}
````

## 总结及其他

关于 Vue 开发中的兄弟组件通信的问题，另有一篇写 Nuxt 面包屑导航的文章 [如何制作中英双语的面包屑导航](/blog/nuxt-breadcrumbs-bilingual)。

另外，以上四个问题的答案出自这四个页面

[Passing html into Vue component](https://stackoverflow.com/questions/44923775/passing-html-into-vue-component)

[Vue v-on:click does not work on component](https://stackoverflow.com/questions/41475447/vue-v-onclick-does-not-work-on-component)

[Passing boolean Vue prop value in HTML](https://stackoverflow.com/questions/49225002/passing-boolean-vue-prop-value-in-html)

[vue.js 父组件如何触发子组件中的方法](https://www.cnblogs.com/mophy/p/8590291.html)

Stackoverflow 和 cnblogs 真是人民的大救星！