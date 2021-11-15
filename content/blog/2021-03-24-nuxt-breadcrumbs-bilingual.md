---
date: 2021-03-24
slug: nuxt-breadcrumbs-bilingual
language: 中文
title: 如何制作中英双语的面包屑导航
description: 终于弄好了双语的面包屑导航，还学到了Vue的同级组件通信的知识，我还是很开心的。
categories: [技术]
tags: [Nuxt.js,面包屑导航]
keywords: [breadcrumbs,navigation]
comments: true
---

## 契机

之前我司的应用新增了面包屑导航，我不知道这是啥，研究了下，觉得我的网站也应该有，于是开始整了。

一开始只做了英文版，而且只能按照路径的 `slug` 生成和路径名称完全一样的导航，前不久看了篇文章，突然有了思路，于是就把面包屑改成了中英文版本都有。

## HTML模板

HTML 的部分非常简单，长这样

```html
<div class="breadcrumbs"> 
  <span v-for="(path, pathIndex) in paths" :key="pathIndex"> 
    <a v-if="pathIndex < paths.length-1" :href="path.href"> 
      {{path.text}} 
    </a> 
    <span v-else> 
      {{path.isMapped?path.text:thisPage}}
    </span> 
    <span v-if="pathIndex < paths.length-1">/</span> 
  </span> 
</div>
```

## JavaScript的部分

接下来就是重头戏，获取页面路径和渲染到面包屑导航组件上。

最最重要的就是先根据网站结构，事先写好各个路径的链接和中英文名称的对应关系，然后根据 `Vuex store` 里面当前的语言状态来切换面包屑导航的语言。

本来我想把对应关系和其他一些页面 UI 的文本用一个 `yml` 文件存在 `content` 里面，这样可以使用 `content` 模块的读取功能加载文本到页面，还可以集中管理 UI 文本，不用再为某个组件、布局、页面的文本变动而非得进入这个组件、布局、页面里修改。

但是后来发现组件不能使用 `asyncData` ，要等 `Vue` 实例 `created` 之后才能去加载 `content` 内容，这样的话，面包屑导航会落后页面主体内容大概半秒钟的时间，观感不是很好。

没办法，只好把文本 hardcode 写进组件里，这样下次要增加新的路径的文本对应关系，就必须还回到这个组件里面修改。

结果如下：

```js
export default {
  name:'breadcrumbs',
  data(){
    var that = this;
    var map_en = {
      "/": "Home",
      "/resume": "Resume",
      "/portfolio": "Portfolio",
      "/blog": "Blog",
      "/blog/tag": "Tag",
      "/blog/language": "Language",
      "/store": "Store"
    };
    var map_zh = {
      "/": "首页",
      "/resume": "简历",
      "/portfolio": "作品集",
      "/blog": "博客",
      "/blog/tag": "标签",
      "/blog/language": "语言",
      "/store": "网店"
    }
    var paths = that.$route.path.split("/");
    var paths_en = [];
    var paths_zh = [];
    var tempPath = "";
    for (let i = 0; i < paths.length; i++) {
      if (i == 0) {
        tempPath = "/";
      } else if (i == 1) {
        tempPath = "/" + paths[i];
      } else {
        tempPath += "/" + paths[i];
      }
      let obj_en = {
        href: tempPath,
        text: map_en[tempPath]?map_en[tempPath]:decodeURI(paths[i]),
        isMapped: !!map_en[tempPath]
      };
      let obj_zh = {
        href: tempPath,
        text: map_zh[tempPath]?map_zh[tempPath]:decodeURI(paths[i]),
        isMapped: !!map_zh[tempPath]
      };
      paths_en.push(obj_en);
      paths_zh.push(obj_zh);
    }
    return{
      paths_en,
      paths_zh
    }
  },
  computed: {
    thisPage() {
      return this.$store.state.lang.val=="Chi"?"本页":"This page";
    },
    paths() {
      return this.$store.state.lang.val=="Chi"?this.paths_zh:this.paths_en;
    }
  }
}
```

这样 hardcode 写进去之后，面包屑导航加载就没有延迟了，我自己觉得还行。不过这样还是无法正确显示最后一层动态生成的网页的标题，因为我总不能把所有动态生成的标题都加到匹配规则里。

## 兄弟组件通信(获取动态生成的网页标题)

如果要获取动态生成的网页标题，那就需要获取同级别的组件传来的数据，我查了半天才找到适合 Nuxt 使用的方法，那就是使用事件总线 `EventBus`。

### 插件中注册事件总线

在 `plugins/` 文件夹中新建事件总线插件 `bus.js` 

```js
import Vue from 'vue';

export default (ctx, inject) => {
  const bus = new Vue;
  inject('bus', bus);
};
```

在 `nuxt.config.js` 里面写明使用该插件

```js
plugins: [
  '~/plugins/bus'
]
```

这才是 Nuxt 里面注册事件总线的正确方法，出处 [https://github.com/nuxt/nuxt.js/issues/1139#issuecomment-430080727](https://github.com/nuxt/nuxt.js/issues/1139#issuecomment-430080727)。

### 动态页面组件传递数据

例如 `blog/_slug.vue`

```js
created: function() {
  this.$bus.$emit('pushTitle',this.blog.title);
}
```

### 面包屑组件接收数据

然后同在一个 `layout` 文件下的面包屑组件需要稍微修改一下，新增一个 `data` 项目，修改 `computed` 下的 `thisPage` ，新增 `created` 之后对前面相关名称的事件的处理

```js
data() {
  return {
    title: ""
  }
},
computed: {
  thisPage() {
    return this.title?this.title
    :this.$store.state.lang.val=="Chi"?"本页"
    :"This page";
  }
},
created: function() {
  var that = this;
  this.$bus.$on('pushTitle', (title) => {
    if (title.length>80) {
      that.title = title.substring(0,80)+"...";
    } else {
      that.title = title;
    }
  })
}
```

然后面包屑组件就可以成功获取到动态页面的标题了，不过可能有零点几秒的延迟，可以忽略不计。

## 总结

之所以这么迟才学会这些，还是因为以前没有遇到相关需求，像这样想到哪写到哪，也不知道啥时候才能走上专业道路。

最近学到的其他 Vue 知识已收录进另一篇文章 [Vue开发的注意事项](/blog/points-to-notice-for-vue-development)。 

全文完。