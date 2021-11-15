---
date: 2020-04-26
slug: editor-for-my-cms-of-my-nuxt-blog-en
language: English
title: Write a control panel for my API-based CMS for Nuxt
description: April CMS, a CMS that operates text files and serves with both interface and API, built for serving blog contents, come and check it out~
categories: [Tech]
tags: [JavaScript,Node.js,jQuery,My Project]
comments: true
---

## A true CMS

This is a translation of my original article [给Nuxt使用的基于API的CMS——还有管理后台呢](/blog/editor-for-my-cms-of-my-nuxt-blog).

Github repo: [https://github.com/c53hzn/april-cms](https://github.com/c53hzn/april-cms)

Last year when I started to learn `Nuxt`, I read a lot about `Headless CMS`, it can be called a `CMS without front-end page design` according to my understanding. I studied some of these projects and methods to use them, and tried to use one myself, but did not make it to the end. I still wanted to build up my website without relying on these external services. Although for comment system and visitor counter I might still be using external services as long as I'm building static website.

Then I managed to write an `API` to serve as a `CMS`, you can refer to [this article](blog/nuxt-blog-static-website-en).

This `API` allows me to update my `Markdown` articles and use `Nuxt` to generate static page files, then I can push them to Github and update my website. 

Usually I use `Sublime Text` to write codes, this editor can show working documents on the left, and it is easy to switch between files.

>But humans tend to go on a hard way.
>
>by Me

I want a `CMS` with an interface, and I can create/ modify/ read/ save/ delete in that interface. Also I  don't want a database, I just want to work on the `Markdown` files.

I think I can do it.

## What I need for backend

I wrote my `API` with `express` framework under `Node` environment, and I still want to achieve more with the same structure, so there are a few methods that I need to master, like:

1. Make the `API` to read static HTML page and return a `CMS` UI on the browser.
2. When the `API` is started, the browser will automatically be opened and go to the `CMS` control panel.
3. Make the `API` to receive data sent from browser(clients) and save on local computer.
4. Make the `API` to receive data sent from browser and delete related file.

## What I need for front-end

I had a [CodePen](https://www.codepen.io) project [Markdown Previewer](https://codepen.io/c53hzn/full/YzzRzxR) that only has fewer than 5 visits in the last half year. It would be a shame to leave it there, and it might be better if I can use it here.

The CodePen project was rendered with `marked`, while my API was rendered with `markdown-it`. In order to consolidate my codes, I decided to change the renderer to `markdown-it`.

The project was written with `jQuery`, I decided to continue using `jQuery` for the front-end page interaction after some comparison.

Here are some issues that we need to solve:

1. To read article list from `API` and render it in article list ares.
2. To read article contents from `API` and fill in title/ tags/ description/ related blogs/ main contents to relevant input box or textarea, and then the preview area
3. Every time there is a change in the `Markdown` editor, the preview area should be updated simultaneously, it also should have code highlight and normal HTML styles.
4. When `Save post` is clicked, the page should confirm is all input boxed are filled, if `No` then page will `alert` that user should fill in all blanks. If `Yes` then check if article already exists, if `Yes` then `confirm` if need to update post, if `No` then `confirm` if need to create new post.
5. When `Delete post` is clicked, the page should crosscheck if `slug` exists in post list, if `No` then `alert` that there is nothing to delete, if `Yes` then `confirm` if really need to delete.。
6. When `Ctrl+enter` is pressed on keyboard, `save` action should be triggered.
7. When creating or updating, the browser will use `post` method in `jQuery` to submit contents to server and receive result and reflect it to browser.
8. When deleting, the browser will use use `post` method in `jQuery` to submit the `slug` of the post to server, then receive result of deletion and reflect it to browser.

All actions should be completed in the same page.

## Actual codes for backend

### Dependencies for API

First `require` all the dependencies and other required modules.

```javascript
var express = require("express");
var fs = require("fs");
var fm = require('front-matter');
var hljs = require('highlight.js');
var yaml = require("yaml");
var markdownIt = require('markdown-it');
var markdownItToc = require('markdown-it-toc');
var open = require("open");
var config = require(__dirname+"\\config.js");

var app = express();
var md = markdownIt({
  html:         false,        // 在源码中启用 HTML 标签
  xhtmlOut:     false,        // 使用 '/' 来闭合单标签 （比如 <br />）。
  breaks:       false,        // 转换段落里的 '\n' 到 <br>。
  langPrefix:   'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify:      false,        // 将类似 URL 的文本自动转换为链接。
  typographer:  false,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // 使用额外的默认转义
  }
});
md.use(markdownItToc);
```
The `config` here is an extra configuration file that I added, the contents inside it is simple:

```javascript
var config = {
	isSlugUseDate: false,
	blogPath: __dirname + '\\blog',
	imgPath: __dirname + '\\img\\blog'
};
module.exports = config;
```

This `config` is to control the `Markdown` file path and image file path, and also whether to use date when it comes to `slug`. If `slug` uses date, then it will be a long `slug`, like `2020-04-26-editor-for-my-cms-of-my-nuxt-blog-en`. If `slug` does not use date, then it will be a short `slug`, like `editor-for-my-cms-of-my-nuxt-blog-en`, and the real blog `URL` will also be changed with it.

### To return unrendered Markdown when called

First do some settings in the `API` entry point file `app.js`, this is to control whether to return `Markdown` or rendered `HTML` contents, and `API` will also return contents according to `slug` in request based on configuration.

```javascript
var slugToFileName = function(slug,isSlugUseDate) {
  var result = "";
  if (isSlugUseDate) {
    result = slug+".md";
  } else {
    var files = fs.readdirSync(config.blogPath);
    for (let i = 0; i < files.length; i++) {
      let tempSlug = files[i].substring(11,files[i].length);
      if (tempSlug == slug+".md") {
        result = files[i];
        break;
      }
    }
  }
  return result;
}
var fileNameToSlug = function(filename,isSlugUseDate) {
  if (isSlugUseDate) {
    return filename.substring(0,filename.length-3);
  } else {
    return filename.substring(11,filename.length-3);
  }
}
var singleBlog = function(fullPath,slug,isContentRequired,isMD,isDev) {
  var blog = {};
  var content = fm(fs.readFileSync(fullPath, "utf8"));
  blog = content.attributes;
  blog.slug = slug;
  var fullFilename = fullPath.replace(config.blogPath+"\\","");
  blog.date = fullFilename.substring(0,10);
  if (isContentRequired && !isMD) {
    let html = md.render('@[toc]( )\n' + content.body);
    //if isDev then use absolute path for images
    if (isDev) {
      html = html.replace(/src=\"(\/)?img/g,"src=\"http://127.0.0.1:4000/img");
    }
    // add class "hljs" for dark theme rendering
    blog.content = html.replace(/\<pre/g,"<pre class='hljs'");
  } else if (isContentRequired && isMD) {
    blog.content = content.body;
  }
  return blog;
}
//return blog related contents
app.get("/blog", function(req, res) {
  // allow cross orign access
  res.header('Access-Control-Allow-Origin', '*');
  var blogPath = config.blogPath;
  var imgPath = config.imgPath;
  var files = fs.readdirSync(blogPath);
  var json = {};// result to be returned
  var qSlug = req.query.slug || "";
  var qTag = req.query.tag || "";
  var qImg = req.query.img || "";
  var qIsMD = req.query.ismd == "true";
  var qIsDev = req.query.isdev == "true";
  var isSlugUseDate = (req.query.iseditor == "true")?true:config.isSlugUseDate;
  if (qSlug) {// with blog slug query
    json = singleBlog(`${blogPath}\\${slugToFileName(qSlug,isSlugUseDate)}`,qSlug,true,qIsMD,qIsDev);
    for (let k = 0; k < files.length; k++) {// add prev and next blog
      if (qSlug == fileNameToSlug(files[k],isSlugUseDate)) {
        if (k === 0) {
          json.next = fileNameToSlug(files[k+1],isSlugUseDate);
        } else if (k === files.length-1) {
          json.prev = fileNameToSlug(files[k-1],isSlugUseDate);
        } else {
          json.prev = fileNameToSlug(files[k-1],isSlugUseDate);
          json.next = fileNameToSlug(files[k+1],isSlugUseDate);
        }
      }
    }
  } else if (qTag) {// with tag query
    if (qTag == "all_tags") {// returns list of all available tags
      json.tags = {};
      for (let i = 0; i < files.length; i++) {
        let blogPost = singleBlog(blogPath+"\\"+files[i],fileNameToSlug(files[i],isSlugUseDate));
        let tags = blogPost.tags || ['none'];
        let entry = {
          title: blogPost.title,
          slug: blogPost.slug
        };
        for (let j = 0; j < tags.length; j++) {
          if (json.tags[tags[j]]) {
            json.tags[tags[j]]++;
          } else {
            json.tags[tags[j]] = 1;
          }
        }
      }
    } else {// returns blog list of specific tag
      json.blogs = [];
      for (let i = 0; i < files.length; i++) {
        let blogPost = singleBlog(blogPath+"\\"+files[i],fileNameToSlug(files[i],isSlugUseDate));
        let tags = blogPost.tags || ['none'];
        let entry = {
          title: blogPost.title,
          slug: blogPost.slug
        };
        for (let j = 0; j < tags.length; j++) {
          if (tags[j] == qTag) {
            json.blogs.unshift(blogPost);
          }
        }
      }
    }
  } else if (qImg) {// with img query
    if (qImg == "all_imgs") {
      json.imgs = {};
      var imgFolders = fs.readdirSync(imgPath);
      for (let i = 0; i < imgFolders.length; i++) {
        let imgs = fs.readdirSync(imgPath+"\\"+imgFolders[i]);
        json.imgs[imgFolders[i]] = imgs;
      }
    }
  } else {//without requirement, returns list of all blogs
    json.blogs = [];
    for (let i = 0; i < files.length; i++) {
      let blogPost = singleBlog(blogPath+"\\"+files[i],fileNameToSlug(files[i],isSlugUseDate));
      json.blogs.unshift(blogPost);
    }
  }
  res.send(json);
});
app.get("/config", function(req, res) {
  // allow cross orign access
  res.header('Access-Control-Allow-Origin', '*');
  res.send(config);
});
```

### Add Backend UI for API

The entry point for Backend UI is `app.html`, and in order to access the static page `app.html`, you need codes below:

```
//return blog content editor page
app.use(express.static(__dirname));
app.get("/", function(req, res) {
    // allow cross orign access
  res.header('Access-Control-Allow-Origin', '*');
  res.sendFile(__dirname+"\\app.html");
});
/* nuxt is using port 3000, so choose another one */
app.listen(4000, () => {
  console.log("express server running at http://127.0.0.1:4000")
});
```

Then the entry link for the `CMS` should be `http://127.0.0.1:4000/`.

In order to start `API` and open browser to access this page, you will need an `npm` called `open`. Just write one line of command.

```javascript
open("http:127.0.0.1:4000/",{app: "chrome.exe"});
```
This will open browser and go to `CMS` control panel. There is only one page for the control panel, so it's easy to manage.

### To save and delete file

Then there is the need for receiving data from browser and save it to local computer, or receiving data from browser and delete relevant file.

```javascript
//api to submit post
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Access the parse results as request.body
app.post('/savepost', function(req, res){
  var obj = req.body;
  var fileName = config.blogPath+"\\"+obj.slug+".md";
    fs.writeFileSync(fileName, obj.str);
    //Client will get status of failure w/o this
    //even if data is saved to server successfully
    res.send({"status": "success"});
});
// delete post
app.post('/deletepost', function(req, res){
  var obj = req.body;
  var fileName = config.blogPath+"\\"+obj.slug+".md";
  try {
    fs.unlinkSync(fileName);
    //file removed
  } catch(err) {
    console.error(err);
  }
    //Client will get status of failure w/o this
    //even if data is saved to server successfully
    res.send({"status": "success"});
});
```

##  Actual codes for front-end

### To call API and Markdown

There is not much to say about the full codes. To get post list, you can call `/blogs` with `jQuery`'s `getJSON` method, and to save post you can call `/savepost`, and to delete post you can call `/deletepost`, both with `post` method in `jQuery`.

You can get `Markdown` contents from the editor in UI and use `markdown-it` to render to the preview area, also don't forget the `highlight.js` and `markdown-it-toc` plugins, then import `github-markdown` 
and the `css` for `highlight.js` to render the converted `HTML`, it's almost done.

### Points to notice when rendering Markdown

Here you might want to take a look at the usage for those `Node` when applying them to browser.

When it was just `Node` script, first you `require` them.

```javascript
var markdownIt = require('markdown-it');
var hljs = require('highlight.js');
var markdownItToc = require('markdown-it-toc');
```

Then you configure them.
   
```javascript
var md = markdownIt({
  html:         false,
  xhtmlOut:     false,
  breaks:       false,
  langPrefix:   'language-',
  linkify:      false,
  typographer:  false,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  }
});
md.use(markdownItToc);
```
Now you can use it to render `Markdown`.

But when I used the same settings for browser, there is always error saying this or that object is not found.

Then I discovered that the variables exposed by original authors have different casing comparing to my settings.

I opened those `.js` files and check the variables one by one and found that `markdown-it` used `markdownit` as global variable, and `markdown-it-toc`, the plugin that I used for generating anchor links, used `markdownitTOC` as global variable. After changing my settings, the script is finally OK to run

This should not have been a problem, I'm really upset about it.

### Add smooth scrolling effect

I added anchor links for preview area, and I want those `#` links will not direct the page to those internal links, but rather have the page scroll to relevant position smoothly, here are the codes:

```javascript
function updatePreview(){
  var d = document;
  var source = $("#editor").val();
  var html = "\t" + md.render('[toc]\n' + source);
  html = html.replace(/\<a/g,"<a target='_blank'");
  $("#preview").html(html);
  //add scrollIntoView to anchor link
  var aTags = d.querySelectorAll("a[href]");
  for (let i = 0; i < aTags.length; i++) {
    if (aTags[i].href.indexOf("#") !== -1) {
      aTags[i].onclick = function(e) {
        var c = e || event;
        c.preventDefault();
        var href = aTags[i].href;
        var hashPos = href.indexOf("#");
        var id = href.substring(hashPos+1, href.length);
        d.querySelector("a[id='"+String(id)+"']").scrollIntoView({behavior: "smooth"});
      }
    }
  }
}
```

## Here is what it looks like

When you need to access this `API`, you can `cd` to that folder and

```
node index.js
```

Then browser will open itself and be directed to `http://127.0.0.1:4000/`, you will be able to see post list, and be able to create/delete/modify articles, see the capture below

![preview](/img/blog/2020-04-19/001.png)

## Experience from this

I finished what I started a year ago, and it only took me one day, I'm really happy about it.

If I am to give a name to this CMS, I think I will call it `April CMS`, because I finished it in April.

After finishing it, I did some study and think that, this `CMS` fits both descriptions of `API-based Headless CMS` and `Flat File CMS`, which is `a CMS that operates on text files rather than databases`. Seems good!

And the preview area and post list area will update themselves as you input and save or delete post, it will be really smooth when you write with it, maybe it can be used for writing documents or stories.

Don't know what more compliments can I say about it :)

On top of it, this `CMS` is a useful thing, and I hope I can create more useful stuff in the future.