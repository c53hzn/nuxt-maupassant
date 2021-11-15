---
date: 2020-04-05
slug: nuxt-blog-static-website-en
language: English
title: How to build up a static blog website with Nuxt
description: I built up my website with Nuxt. First I created an API to parse Markdown articles and return JSON contents, and then used Nuxt+Axios to call this API to retrieve blog article and generate static pages based on this structure. Here you can see some details.
categories: [Tech]
tags: [JavaScript,Node.js,Nuxt.js,Static Blog]
comments: true
---

## Preface

This is a translation of my original article [如何使用Nuxt建立个人博客](/blog/nuxt-blog-static-website)

I used Jekyll for my website between March 17 2018 to May 5 2019, the original theme was Hydejack. From May 6 2019, I redesigned my website with Nuxt, this article will talk about the process of making this website and some points to notice.

## About Nuxt

[Here](https://nuxtjs.org/guide/) is the official website of Nuxt for your reference.

>Nuxt is a progressive framework based on Vue.js to create modern web applications. It is based on Vue.js official libraries (vue, vue-router and vuex) and powerful development tools (webpack, Babel and PostCSS).

So if you have a Node server, you can use Nuxt to build up a dynamic website.

Or you can use Nuxt to generate static pages and upload webpage files to static web hosting service like *Github pages*, then your website will be up and running, just like mine.

## What functions do I need for my website？

After researching on other static website generators like `Jekyll`, `Hexo` and `Hugo`, I want to have the functions that they have for my website.

As a personal website, being able to show personal blogs is the basic one, then it should have pages like these:
- Blog article list page
- Blog article detail page (article contents, previous page button, next page button, related articles)
- Tag list page
- Blog article list page under certain tag

Then maybe some individual pages like my resume and contact page, and I want my homepage to recommend latest blog articles, and this block should have article title, date, tags and short descriptions.

## What skills do I need? Are there some good learning materials online?

The "must have" prerequisites are `Node`, `Vue` and `NPM`, please make sure you know these before getting on with Nuxt. While designing website UI is much more personal and serves only my taste. I used external CSS to render Markdown article, but everything else was designed by myself.

This article will not talk about basic knowledge on Vue templates, including rendering data and page-viewer interaction.

Then let's go to the learning materials for Nuxt.

### Youtube videos

Although I found a lot of tutorial videos on [Youtube](https://www.youtube.com), there are only a few videos that I watched in full length and considered useful.

#### 1. Nuxt.js - Static Site Generator     

<iframe class="youtube" src="https://www.youtube.com/embed/pI2qHPI0ZpU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   
This video talked about making all of your pages with `.vue` files and generate a static website with these files. This is suitable for those websites that don't need much revision, like company websites. But since we are making a blog website, it does not seem smart to write every blog article with `.vue` file, and you might still need some revision in near future, so it's better if we do not make our website directly based on this video.

#### 2. Nuxt.js & [Storyblok](https://www.storyblok.com/) - Building a Complete Blog  

<iframe class="youtube" src="https://www.youtube.com/embed/Dc_5BpIB4X4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="youtube" src="https://www.youtube.com/embed/UIh4P5rNjac" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="youtube" src="https://www.youtube.com/embed/Yq6Ddu_QAiY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="youtube" src="https://www.youtube.com/embed/JHCKab2oS4s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This series of video talked about using Nuxt to build up blog homepage(blog list page), individual pages, set up page navigation routes, then use `Axios` to retrieve article contents from an API and generate static blog site.    
The author used a CMS called [storyblok](https://www.storyblok.com/) to host his blog articles here, the blog files are not directly saved on his computer, and neither is the content written in Markdown. Aside from [storyblok](https://www.storyblok.com/), there are other CMS with APIs like [contentful](https://www.contentful.com/) and [sanity](https://www.sanity.io) that can do the same.    
For someone like me, I was used to Jekyll style, and still want to write articles in Markdown. But the concept of "using an API from a CMS" is interesting enough to me, what if I do not use an external CMS, but rather build up a similar service on my computer? If only I have an API that provides article contents, I can generate static website just as the video author.

#### 3. Why You Should Learn Server Middleware with Nuxt.js! A step-by-step tutorial!   

<iframe class="youtube" src="https://www.youtube.com/embed/j-3RwvWZoaU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  
This video teaches how to build up an API with `serverMiddleware` in Nuxt when you are serving Nuxt dynamically, the author has shown detailed API codes in the video. If I am going to make a dynamic website, I can use this API to parse Markdown files and return article contents, then my website is ready to go online.    
Since I want to build a static website, I will not need a serverMiddleware here, but the server side API codes are very useful to me. Let's put aside the serverMiddleware, and use the API alone to parse Markdown files and return JSON contents, then I will have my own CMS now.

### Article tutorials online(Japanese and English)

There are article tutorials in Chinese, but I might learn more from English and Japanese articles. (I studied Japanese at university.)

#### 1. [Website with blog and portfolio using Vue.js + Nuxt + Markdown(English)](https://marinaaisa.com/blog/blog-using-vue-nuxt-markdown)    

   The author of this article successfully parsed Markdown and generate files with Nuxt alone, and you will need to **manually** create a JS file and input article titles and links in there, and update this file **each time** you add a new article. But I want my website to **automatically** recognize newly added articles, so her methods might not be suitable for me.

   She is generous enough to post her entire source code of the website on Github, you can view the repository [here](https://github.com/marinaaisa/nuxt-markdown-blog-starter).

   Her design and layout is very much like a western website, neat, large spacing between elements, easy to know what the author wants to display. But the website does not have a tag system, it might be seen as a small shortcoming. 

#### 2. [Replacing tech blog with Nuxt(Japanese)](https://blog.nakamu.life/posts/replace-tech-blog)

   This is a useful article about building up websites using Nuxt in Japanese. His words are easy to understand, and the building process and technical points are explained very clearly. The author used a CMS service called [contentful](https://www.contentful.com/), similar to the previous Youtube video, and his UI design is well-organized, I like this too.

   He built up his tech blog with Nuxt, the link is [here](https://blog.nakamu.life), and he also has a life blog built with Gatsby(a React framework), the link is [here](https://enjoyhk.nakamu.life/), the designs are also very good, but author hasn't updated any new articles in months.

## The structure of my website

```
myblog
├─ api/    ☆Please create this folder manually☆
│   ├─ blog/   Folder contains Markdown files to be parsed
│   │   ├─ 2020-04-05-set-up-static-blog-using-nuxt-en.md
│   │   ├─ 2017-05-28-hao123-issue.md
│   │   └─ ...
│   ├─ config.js configuration of API
│   ├─ app.html Backend UI entry point
│   └─ app.js The entry point to API, default path is http://127.0.0.1:4000
├─ components/
│   ├─ Footer.vue
│   └─ Navigation.vue
├─ dist/        ☆Static files generated by Nuxt, to be uploaded to Github☆
├─ layouts/
│   ├─ default.vue
│   ├─ error.vue If dynamic, 404 page will be this, if static, 404 page will be Github 404 page
│   ├─ home.vue Layout for homepage
│   └─ page.vue Layout for other pages
├─ pages/
│   ├─ blog/
│   │   ├─ tag/
│   │   │   ├─ _tag.vue  to render article list under certain tag dynamically
│   │   │   │            eg => /blog/tag/aaa.html
│   │   │   └─ index.vue to render tag list dynamically => /blog/tag.html
│   │   ├─ _slug.vue to render article detail page dynamically
│   │   │                 eg => /blog/nuxt-blog-static-website-en.html
│   │   └─ index.vue to render article list dynamically => /blog.html
│   ├─ resume.vue
│   └─ index.vue     entry point of website => /index.html
├─ static/
│   ├─ img/  refer to file as this: /img/home/bg.jpg
│   │   └─ home
│   │       └─ bg.jpg
│   ├─ js/  refer to file as this: /js/jquery.js
│   │   └─ jquery.js
│   ├─ favicon.ico  website icon => /favicon.ico
│   └─ styles.css   universal css => /styles.css
├─ nuxt.config.js  nuxt website settings
└─ ...
```

## API that serves as CMS

I have released this CMS in a new repo, please see [https://github.com/c53hzn/april-cms](https://github.com/c53hzn/april-cms) for full codes.

Below are some other points to notice.

### New way to write Markdown file

Basically it's the same as the way you write Markdown files for Jekyll, but I added an attribute called `related_blog` to show "related blogs" for certain blog articles, you can write the file name without extension.

```
---
layout: post
title: How to build up a static blog website with Nuxt
description: I built up my website with Nuxt. Basically I just created an API to parse Markdown articles and return JSON contents, and used Nuxt+Axios to call this API to retrieve blog article and generate static pages based on this structure.
tags: [English,Nuxt,Static Blog]
comments: true
related_blog: [nuxt-blog-static-website-en]
---
## Header 1

asdf

## Header 2

asdf
```

### To read according to parameters and return data when the API is called

With this API, I transformed Markdown contents into HTML, this will reduce the size of the static website generated.

For the core codes of API, you can refer to [Write a control panel for my API-based CMS for Nuxt](/blog/editor-for-my-cms-of-my-nuxt-blog-en).

## Retrieve data from API and render it to webpage

We can first go to the `api` folder, then open `cmd` console under this folder, run command `node app.js` to open the API, then go to upper folder, open a second `cmd` console, run command `npm run dev`, then your Nuxt server is running in `dev` mode on your computer.

In this mode, all changes in Nuxt files will be reflected to local server instantly, it is very convenient for constructing websites.

Because pages like blog article need to be served dynamically, we have to use files starting with underscore like `_slug.vue` to achieve this. For real page viewing, you can use `/blog/nuxt-blog-static-website-en` to view contents of this page, and `/blog/nuxt-blog-static-website-en` is the dynamic parameter `slug`, you can use this parameter in `Axios` requests, with format as `context.params.slug`. Similar methods apply to tag list and tag detail pages.

To render data, you need to use `asyncData` method, here is how to render blog list in `/blog/index.vue` page.

Remember to `import axios from 'axios'` first, then

```javascript
export default {
  layout: "default",
  asyncData(context) {
    return axios.get('http://127.0.0.1:4000/blogs').then(res => {
      return { 
        blogs: res.data.blogs,
        baseURL: context.app.router.options.base
      };
    })
  }
```

And you will use `asyncData` method to render blog article detail in `/blog/_slug.vue` too

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

Similar methods apply to tag list and tag detail pages.

## Generate static website

The command for generating static pages is `npm run generate`, and please remember to leave the API open for the entire generation process, or Nuxt will not be able to retrieve data.

But Nuxt will only generate static files for those `.vue` files not starting with underscore under `pages` folder. It is to say that Nuxt will not generate static files for dynamic pages like `_slug.vue` and `_tag.vue`. If you wish to generate static pages for them, please set the right `routes` in file `nuxt.config.js`.

Also Nuxt will generate folder for each `.vue` file, and generate `index.html` under this folder by default, so this article will be able to be viewed with `/blog/nuxt-blog-static-website-en/` and also `/blog/nuxt-blog-static-website-en/index.html`, but think of the amount of folders, let's just set it to `false`.

Here is my setting for `generate` in file `nuxt.config.js`.

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

## Some other points to notice

### Routes and links

The internal links within website like navigation links should be using `<nuxt-link/>` tag, it's favorable to access speed because of Nuxt's routing system.

But when served on static server, the page will still send HTTP request to `127.0.0.1:4000` and return "Network error" when request failed, because the API is closed now.

It seems difficult to solve this issue if I am to keep those `<nuxt-link/>` tags and have the pages render right contents for static mode, so I changed all `<nuxt-link/>` tags to `<a></a>` tags, then the static website is functioning well now.

### Root path

If your website is not in the root path of your server, but is rather like `xxx.github.io/myproject`, and if you are using relative links in your website, those links might be pointing to wrong paths. You might need to set your base folder name in `nuxt.config.js` like this

```javascript
router: {
  base: /myproject/
}
```

Then the links should be right links no matter your website is dynamic or static.

## Experience from this

I spent about 2 weeks to give my blog site a new look, and discovered amazing contents on Youtube during this process. You really can find any tutorial video on Youtube.

And the auto-generated subtitles by Youtube are very useful and also pretty accurate. Youtube can recognize all kinds of accent from all over the world, although the subtitles and speakers' words are not 100% match, I can still understand most part of the videos.

Recently(2020-04-05) I have been making tutorial videos for my company and upload them to Youtube, and Youtube subtitles can recognize around 99% of my narration, I'm really impressed. 

Youtube deserves a thumb up here!
