---
date: 2019-05-18
slug: lighten-nuxt-website
language: 中文
title: 如何减轻Nuxt打包生成的代码量
description: Nuxt默认会将所有vue文件使用的模块打包进最后的网站文件，所以最好不要在博客页渲染Markdown
categories: [技术]
tags: [我的项目,Nuxt.js]
keywords: [JavaScript]
comments: true
---

## 为什么要移除marked和highlight.js

本来我的博客页```/blog/_slug.vue```是这样渲染从API返回的Markdown内容的

先获取Markdown

```javascript
asyncData(context) {
  return axios.get('http://127.0.0.1:4000?slug='+context.params.slug).then(res => {
    let blog = res.data;
    let space = [];
    return {
      blog: blog,
      tags: blog.tags || ['none'],
      date: params.slug.substring(0,10),
      baseURL: context.app.router.options.base
    };
  })
}
```

然后用```computed```去处理Markdown内容

```javascript
import marked from 'marked';
import hljs from 'highlight.js';
computed: {
  compiledMarkdown: function () {
    var rendererMD = new marked.Renderer();
    var html = marked(this.blog.content, {
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    });
    ... //其他处理
    return html;
  }
}
```

可是这样的话，marked和highlight.js都会被打包进最后的代码里，造成网站臃肿。此外每次打开单个博客页还是会调用这些不需要的代码，造成页面加载缓慢，前两天写的文章[《如何使用Nuxt建立个人博客》](/blog/nuxt-blog-static-website)部署到服务器之后竟然需要一分多钟才能完全加载好，而在开发模式下也就几秒钟就加载好了。

看来优化网站刻不容缓了。

## 博客页移除marked和highlight.js

然后我试了下把marked和highlight.js从```/blog/_slug.vue```移除，```asyncData```从API获取内容的部分不变，只是在```computed```部分减掉了相关处理，然后再次生成静态网页，整个网站代码量立刻轻了很多，如图

**before**    
![before](/img/blog/2019-05-18/001.png "before")

**after**    
![after](/img/blog/2019-05-18/002.png "after")

## 在API内添加Markdown转HTML的处理

接下来是重头戏了，我们不在博客页渲染Markdown，而是直接在json里获取一个渲染后的HTML，那么这个HTML内容是怎么生成的呢？

我的```/api/index.js```现在是这样写的

```javascript
var express = require("express");
var fs = require("fs");
var fm = require('front-matter');
var app = express();
var marked = require('marked');
var hljs = require('highlight.js');

var rendererMD = new marked.Renderer();
var htmlResult = function(contentBody) {
  return marked(contentBody, {
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
};

var singleBlog = function(fullPath, slug, isContentRequired) {
  var blog = {};
  var content = fm(fs.readFileSync(fullPath, "utf8"));
  blog = content.attributes;
  blog.slug = slug;
  if (isContentRequired) {
    blog.content = htmlResult(content.body);//从Markdown生成HTML
  }
  return blog;
}

app.get("/", function(req, res) {
  // allow cross orign access
  res.header('Access-Control-Allow-Origin', '*');
  var path = __dirname + '\\blog';
  var files = fs.readdirSync(path);

  var json = {};// result to be returned

  var qSlug = req.query.slug || "";
  var qImg = req.query.img || "";
  var qTag = req.query.tag || "";
  if (qSlug) {// with blog slug query
    json = singleBlog(path+"\\"+qSlug+".md", qSlug, true);
  } else if (qImg) {// with img query
    ...
  } else if (qTag) {// with tag query
    ...
  } else {//without requirement, returns list of all blogs
    ...
  }
  res.send(json);
});

app.listen(4000, () => {
  console.log("express server running at http://127.0.0.1:4000")
});
```

这样API就会返回一个含有渲染后的HTML的json，我的网站就可以直接用啦。

当然别忘了在博客页引入```highlight.js```的css，否则好不容易渲染好了HTML，却没了样式，那就不好了。

API经过这样处理之后，反应时间会变慢，但是比起网站经过优化后而减少的反应时间，那是非常不值一提了。

以上~