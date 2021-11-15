---
date: 2019-05-05
slug: nuxt-blog-static-website
language: 中文
title: 如何使用Nuxt建立个人博客
description: 重构了一下博客，从Jekyll迁移到了Nuxt。方法是先用Node API 来解析 Markdown 文件，然后 Nuxt+Axios 获取 API 返回的文章内容并生成静态页面。
categories: [技术]
tags: [我的项目,Node.js,Nuxt.js,静态博客]
keywords: [JavaScript]
comments: true
---

## 前言

更新日期：2020-03-18

之前写的版本有点乱，想到哪写到哪，如果是路人从 Google 点进来，也许看不明白我写了些啥，所以我把文章重构了一下。

我的网站从2018年3月17日至2019年5月5日期间用的是 Jekyll，主题叫 Hydejack，由 Github 自带的 Ruby 后台驱动。从2019年5月6日开始转为使用 Nuxt 生成的纯静态页面，主题是我自己设计的，没名字，本篇文章会讲述使用 Nuxt 设计博客网站的过程和要点。

更新日期：2020-04-05

新增 [英文翻译](/blog/nuxt-blog-static-website-en)，大家随便看看就可以了。

## 关于 Nuxt

官网在 [这里](https://zh.nuxtjs.org/guide/)。

>Nuxt.js 是一个基于Vue.js 的轻量级应用框架，可用来创建服务端渲染( SSR ) 应用，也可充当静态站点引擎生成静态站点应用，具有优雅的代码结构分层和热加载等优势。

也就是说，如果你想做一个有后台的动态网站，可以用 Nuxt 直接部署到 Node 服务器上。

如果你只是想做一个静态网站，则可以用 Nuxt 生成静态页面，然后把静态页面上传到 Github 或者任何支持静态页面托管服务的网站，本站就是这样做的。

## 我的个人网站需要实现什么功能？

我参考了 `Jekyll`、`Hexo`、`Hugo` 等静态网站生成工具，它们能够做到的，我希望我的网站也能做到。

作为个人网站来说，能够写日志是最基本的，那么它就需要有以下的功能：
- 文章列表页
- 文章详情页（要能显示文章详情，有上一篇、下一篇按钮，并推荐相关文章）
- 标签列表页
- 标签下文章列表页

然后再来几个独立页面，最好能有简历页、联络页，首页最好能推送最新文章，推送内容需包括文章标题、日期、标签、内容简介。

## 我需要学会哪些技能？有什么好的教学资源？

`Node`、`Vue` 和 `NPM` 是最基本的，而设计网站 UI 就比较随缘了，除了渲染 Markdown 用的 CSS 是从外部导入的之外，其他的主要设计都是我自己完成的。本篇文章不会讲任何 Vue 模板的基础知识，包括渲染数据和页面交互等。而 Nuxt 方面的教学，我主要参考了以下的一些资源。

### Youtube 教学视频

我在 Youtube 上搜了很多，最后完整地看了的，并且觉得有用的大概是以下这些

#### 1. 使用 Nuxt 生成静态网站     

<iframe class="youtube" src="https://www.youtube.com/embed/pI2qHPI0ZpU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

这一个视频的主要内容是不使用外部资源，所有页面都用 `.vue` 的文件书写，最后生成静态网站。这样比较适合那种做好之后不会做什么大变动的网站，比如企业官网之类的。但博客文章不可能都用 `.vue` 文件来写，网站也不可能长久不更新，所以很显然不能直接用这个办法来做。

#### 2. 使用 Nuxt (框架)和 [storyblok](https://www.storyblok.com/) (基于 api 提供内容的 CMS )建立个人博客

<iframe class="youtube" src="https://www.youtube.com/embed/Dc_5BpIB4X4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="youtube" src="https://www.youtube.com/embed/UIh4P5rNjac" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="youtube" src="https://www.youtube.com/embed/Yq6Ddu_QAiY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="youtube" src="https://www.youtube.com/embed/JHCKab2oS4s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

这个系列的视频主要内容是使用 Nuxt 建立博客首页（文章列表页）、附属页面，建立页面导航路由，然后在博客详情页用 `Axios` 加载 api 传来的文章内容，最后生成静态网站。

这里有一点很重要的是，up 主的博客内容是托管在 [storyblok](https://www.storyblok.com/) 这个 CMS 上，不在电脑本地，也不是用 Markdown 来书写。除了 [storyblok](https://www.storyblok.com/) 之外还有 [contentful](https://www.contentful.com/) 等提供内容管理的网站，也能达到相同的效果。

但是对于像我这样从 Jekyll 转过来的人来说，还是想找找能继续用 Markdown 写文章的办法。这里的“使用 CMS 的 api 来提供博客内容”的思路值得我参考。如果不使用外部商业 CMS 服务，我自己能不能在本地搭建一个类似的服务呢？只要有提供内容的 api，我就可以跟 up 主一样成功生成静态网站了。

#### 3. 手把手教你在 Nuxt 项目中使用 serverMiddleware

<iframe class="youtube" src="https://www.youtube.com/embed/j-3RwvWZoaU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

这个视频教了一下作为服务端渲染的 Nuxt 里面配置 `serverMiddleware` 的 api 的简单过程，以及 api 的服务端代码怎么写。如果我是做动态网站，那么使用这个 api 来解析我的 Markdown 文件来提供文章内容，网站就可以直接上线了。

由于我是要做纯静态网站，所以用不到 serverMiddleware，但是它这里配置后台 api 的代码对我来说很有用，我们可以不用 serverMiddleware，而是单独开一个 api 的服务出来，解析 Markdown 文件，返回 json，这样就等于有了一个自己的 CMS 啦！

### 网络文章教程（日、英）

中文世界里的文字教程也是有的，但是英文和日文的更能学到东西。

#### 1. [使用Nuxt+Markdown创建个人博客(英文)](https://marinaaisa.com/blog/blog-using-vue-nuxt-markdown)    
作者成功实现了在 Nuxt 单一服务下解析 Markdown 文件的效果，但是她的做法竟然需要事先准备好一个 js 文件作为文章列表，每新增一个 Markdown 文件，就在 js 文件里面 **手动** 添加一篇文章的标题和链接，这样才能做到更新。而我这边希望网站可以 **自动** 识别新增的文章，所以她的这个办法可能不适合我。    
作者也很大方地把网站源码发出来了，她的 repo 在 [这里](https://github.com/marinaaisa/nuxt-markdown-blog-starter)。    
作者的页面设计和排版很符合国外网站的审美，简洁、大气、好看，不过博客文章没有标签系统，算是一个小的缺憾吧。

#### 2. [使用Nuxt重构网站(日文)](https://blog.nakamu.me/posts/replace-tech-blog)    
找教程居然找到日文的，我也是很佩服我自己。作者的文字不难懂，搭建流程和技术要点解释得也很清楚。作者是用 [contentful](https://www.contentful.com/) 来提供内容的，这样就和前面的 Youtube 教程重复了。但是他的 UI 设计得很好，完全不像一般日本人的风格，非常值得参考。    
作者自己的技术博客用的是 Nuxt 搭建的，链接在 [这里](https://blog.nakamu.me) 。此外还有一个用 Gatsby(React) 设计的生活博客，链接在 [这里](https://enjoyhk.nakamu.me/) ，页面设计得也很好看，不过最近几个月没有更新过文章了。


## 我的网站项目结构

```
myblog
├─ api/    ☆手动建立这个文件夹☆
│   ├─ blog/    需要api解析的Markdown文件夹
│   │   ├─ 2019-05-05-set-up-static-blog-using-nuxt.md
│   │   ├─ 2017-05-28-hao123-issue.md
│   │   └─ ...
│   ├─ config.js 配置文件
│   ├─ app.html 管理后台UI界面的入口
│   └─ app.js api的入口，默认路径http://127.0.0.1:4000
├─ components/
│   ├─ Footer.vue
│   └─ Navigation.vue
├─ dist/        ☆最后生成的静态文件在这里，上传到 GitHub 就行啦☆
├─ layouts/
│   ├─ default.vue
│   ├─ error.vue 动态部署网站时如果页面出错会显示这个，但静态网站找不到时会去服务器（GitHub）的404页
│   ├─ home.vue 首页排版布局
│   └─ page.vue 其他页面排版布局
├─ pages/
│   ├─ blog/
│   │   ├─ tag/
│   │   │   ├─ _tag.vue  动态渲染标签下的文章列表
│   │   │   │            eg => /blog/tag/aaa.html
│   │   │   └─ index.vue 文章标签列表页 => /blog/tag.html
│   │   ├─ _slug.vue 动态渲染文章详情页
│   │   │                 eg => /blog/nuxt-blog-static-website.html
│   │   └─ index.vue 文章列表页 => /blog.html
│   ├─ resume.vue
│   └─ index.vue     网站入口 => /index.html
├─ static/
│   ├─ img/  引用路径 /img/home/bg.jpg
│   │   └─ home
│   │       └─ bg.jpg
│   ├─ js/  引用路径 /js/jquery.js
│   │   └─ jquery.js
│   ├─ favicon.ico  网站图标 => /favicon.ico
│   └─ styles.css   公用css => /styles.css
├─ nuxt.config.js  nuxt网站整体设置
└─ ...
```

## 作为 CMS 作用的 API

完整代码参见 [https://github.com/c53hzn/april-cms](https://github.com/c53hzn/april-cms)。

### Markdown文件的写法

基本上跟原先 Jekyll 里用的 Markdown 文件写法一样，但是为了能添加“相关文章”功能，我在 Markdown 里新增了一个属性 `related_blog`，里面填写关联的文章的不包含扩展名的文件名即可。

```yml
---
layout: post
title: 如何使用Nuxt建立个人博客
description: 重构了一下博客，从Jekyll迁移到了Nuxt。方法是先用Node API 来解析 Markdown 文件，然后 Nuxt+Axios 获取 API 返回的文章内容并生成静态页面。
tags: [涨知识,JavaScript,Nuxt,静态博客]
comments: true
related_blog: [jekyll-blog-static-website]
---
## 标题一

asdf

## 标题二

asdf
```

### 根据参数读取并返回数据

这个 api 可以把读取的 Markdown 内容转化成了 HTML，这样可以减轻最后生成的网站文件大小，原因可见 [如何减轻Nuxt打包生成的代码量](/blog/lighten-nuxt-website)。

`API` 的重点写法可以参考 [给Nuxt使用的基于API的CMS——还有管理后台呢](/blog/editor-for-my-cms-of-my-nuxt-blog)。

## 从 API 读取数据并渲染到页面

我们可以先进入 `api` 文件夹，在该文件夹下打开 `cmd` 终端，然后用命令 `node app.js` 开启 API，然后回到上一级文件夹，在该文件夹下打开第二个 `cmd` 终端，然后用命令 `npm run dev` 开启 `Nuxt` 开发模式。

在该模式下，所有对 Nuxt 文件的修改都会实时反映到本地服务器上，我们可以立刻看到变化，因此构建起来十分方便。

由于文章详情页等页面需要根据实际情况动态加载，此时就要使用 `_slug.vue` 这样以下划线开头的动态生成网页的 `.vue` 文件，建立好之后，当访问 `/blogs/2019-05-05-set-up-static-blog-using-nuxt` 的时候，`2019-05-05-set-up-static-blog-using-nuxt` 这个部分就是 `slug`，可以用在 `Axios` 的请求里面作为参数，可以用 `context.params.slug` 这个变量来拿到 `slug` 的值。标签页等页面也是类似的操作。

在 `/blogs/index.vue` 页面用 `asyncData` 方法来加载数据

记得要先 `import axios from 'axios'`，然后

```javascript
export default {
  layout: "default",
  asyncData(context) {
    return axios.get('http://127.0.0.1:4000/blog').then(res => {
      return { 
        blogs: res.data.blogs,
        baseURL: context.app.router.options.base
      };
    })
  }
```

在 `/blogs/_slug.vue` 页面同样用 `asyncData` 方法来加载数据

```javascript
asyncData(context) {
  const mySlug = context.params.slug;
  const isDev = context.isDev;
  var config = {"isSlugUseDate":true};
  var result = {
    relatedBlog: [],
    baseURL: context.app.router.options.base,
  };
  return axios.get('http://127.0.0.1:4000/config').then(res=>{
    config = res.data;
    return axios.get('http://127.0.0.1:4000/blog?slug='+mySlug+"&isdev="+isDev);
  }).then(res=>{
    result.blog = res.data;
    result.tags = res.data.tags || ["none"];
    result.date = res.data.date;
    var related = res.data.related_blog;
    var requests = [];
    for (let i = 0; i < related.length; i++) {
      if (related[i]) {
        if (!config.isSlugUseDate) {
          related[i] = related[i].substring(11,related[i].length);
          let req = axios.get('http://127.0.0.1:4000/blog?slug='+related[i])
          .then((res) => {// res.data is json
            let temp = res.data;
            if (temp) {
              delete res.data.content;
              return res.data;
            } else {
              return {};
            }
          });
          requests.push(req);
        }
      }
    }
    return Promise.all(requests);
  }).then(res=>{
    for (let i = 0; i < res.length; i++) {
      if (JSON.stringify(res[i])!="{}") {
        result.relatedBlog.push(res[i]);
      }
    }
    return result;
  });
}
```

标签页等等就不赘述了。

## 生成静态页面

生成静态页面的命令是 `npm run generate`，记得要在生成过程中一直保持 API 处于开启状态，否则 Nuxt 这边会获取不到数据。

如果不做特殊设置的话，系统只会为 `pages` 文件夹及子文件夹里所有不是以下划线开头的 `.vue` 文件生成页面，也就是说，那些用 `_slug.vue` 和 `_tag.vue` 来动态获取的页面不会生成相应的静态页面，而如果想生成的话，就需要在 `nuxt.config.js` 这个文件里面设置要动态生成的 `routes`。

并且 Nuxt 默认是为每个页面生成各自的文件夹，在文件夹里生成 `index.html` 文件来访问，也就是说，本篇文章可以用 `/blog/nuxt-blog-static-website/` 来访问，也可以用 `/blog/nuxt-blog-static-website/index.html` 来访问。但是想象一下这个文件夹的数量，还是取消吧！

以下是 `nuxt.config.js` 文件当中 `generate` 部分的配置：

```javascript
generate: {
  subFolders: false, //if true, each page or post will have their own folder
  routes: function () {
    let blogs = axios.get('http://127.0.0.1:4000')
    .then((res) => {// res.data is array
      return res.data.blogs.map((blog) => {
        return {
          route: '/blog/' + blog.slug,
          payload: blog
        }
      })
    })
    let tags = axios.get('http://127.0.0.1:4000?tag=all_tags')
    .then((res) => {// res.data is object
      let tags = Object.keys(res.data.tags);
      return tags.map((tag) => {
        return {
          route: '/blog/tag/' + tag,
          payload: tag
        };
      });
    })
    return Promise.all([blogs, tags]).then(values => {
      return [...values[0], ...values[1]]
    })
  },
  ...
}
```

## 小插曲

### 路由和内部链接

本来页面导航栏和各种链接应该要使用 `<nuxt-link/>` 标签的，这样就可以用Nuxt的路由机制，加快访问速度。

但是它有一个问题是，在最终生成的静态网站上使用路由访问的时候，页面仍然会去请求 `127.0.0.1:4000` 上的内容，可是这时候 api 已经关闭了，请求失败之后页面就会来个“Network error”，可是如果使用URL去访问，又是可以加载出内容的。

所以我不得不忍痛割爱，把所有 `<nuxt-link/>` 的链接都换成了普通的 `<a></a>` 标签的链接，这样静态网站就可以正常使用了。

### 根目录

如果你的网站不在服务器的根目录里，而是像 `xxx.github.io/myproject` 这样的路径的话，如果你在网站里使用了相对链接，有时候最后出来的效果可能不太对。这个时候需要在 `nuxt.config.js` 里面设置

```javascript
router: {
  base: /myproject/
}
```

然后不管是动态还是静态的网站应该都是正确的链接了。

## 心得体会

前前后后花了两个多星期，我的博客终于有了新面貌，然而在这个过程中最惊喜的还是 Youtube，想找什么样的教学视频都有。

而且它自动生成的字幕非常有用，各个国家千奇百怪的口音竟然都能识别出来，即使不是100%匹配，也能让我这个非英语母语的人跟上视频博主的思路。

在这里给 Youtube 点个赞！
