---
date: 2021-04-06
slug: nuxt-breadcrumbs-bilingual-en
language: English
title: Create Bilingual Breadcrumbs component for Nuxt
description: I made a Chinese/ English Breadcrumbs component for my Nuxt website, the key point is to use a preset mapping rule. Also I learned about the communication between sibling components, it's worth my time.
categories: [Tech]
tags: [Nuxt.js,breadcrumbs]
keywords: [breadcrumbs,navigation]
comments: true
---

## Preface

(This is a translation of my original article [如何制作中英双语的面包屑导航](/blog/nuxt-breadcrumbs-bilingual))

Some time ago I noticed that some websites have this "Breadcrumb Navigation", I searched for relevant data and decided that my website needs to have one too.

At first I only made an English version that splits page paths and generate breadcrumb elements that have the same name as their path. Then I read an article about how the author set up his breadcrumb navigation, he was using WordPress, but the idea is just as useful to me, so I started to create this biligual breadcrumb component.

## HTML Template

The HTML part is super simple, just like this:

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

## JavaScript Part

Then here comes the important part, to retrieve page paths and render to `Breadcrumbs` component.

And the key point is to set a rule that can map path links and their Chinese/English names based on website structure in advance, then use the language state stored in `Vuex store` to switch between the two languages.

At first I added a single `yml` file that contains all UI texts, including the Chinese/English mapping rules, in `content` folder, so that the website can retrieve texts using `content` module, and I can manage all UI texts in one place, without having to go to specific component/layout/page file to modify.

Then I found that you cannot load data using `asyncData` method in a component, you have to wait until `Vue` instance is `created` before you load data from `content` module. But in this way, the breadcrumbs navigation will appear about 0.5 second later than the main content. It really seems not good.

So I have to hardcode the mapping rule in the component, if I want to add more path names and links, I have to go to this `Breadcrumbs` component and modify directly in it.

The result is as follows:

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

With the hardcode mapping rule ready, the breadcumbs are now displayed instantly, I feel OK about it. However, it still cannot render page title for dynamic routes, and I don't think adding mapping rule for all dynamic routes is a good idea.

## Communication between sibling components(Retrieve page title dynamically)

If I'm going to retrieve page titles that are generated dynamically, I will need to retrieve data passed from same level components. I researched some time for solution and found a way for `Nuxt`: the `EventBus`.

### Register EventBus in plugins

First register an `EventBus` plugin called `bus.js` in `plugins/` folder.

The `bus.js`

```js
import Vue from 'vue';

export default (ctx, inject) => {
  const bus = new Vue;
  inject('bus', bus);
};
```

Use this plugin in `nuxt.config.js`

```js
plugins: [
  '~/plugins/bus'
]
```

This is the right way to register an EventBus in Nuxt, original reference is [https://github.com/nuxt/nuxt.js/issues/1139#issuecomment-430080727](https://github.com/nuxt/nuxt.js/issues/1139#issuecomment-430080727).

### Pass data from dynamic pages

eg: `blog/_slug.vue`

```js
created: function() {
  this.$bus.$emit('pushTitle',this.blog.title);
}
```

### Retrieve data in Breadcrumbs component

The page component is as same level as Breadcrumbs component under the same `layout` file, so they are able to communicate.

In component file `Breadcrumbs.vue`, add a new `data` item, modify `thisPage` under `computed`, then add event handling for relevant event name after Vue instance is `created`.

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

Then the Breadcrumbs component is able to retrieve page titles from dynamic pages, there might be a delay for less than a second, which does not affect performance very much.

## Conclusion

The reason that I learned about this so late is because I did not have such requirements for myself before.

I only code when I want to, so maybe it will take more time for me to go on a professional way.

That's all for this article.