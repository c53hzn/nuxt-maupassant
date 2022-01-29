---
date: 2022-01-02
slug: async-data-in-component
language: 中文
title: 如何在Nuxt组件里使用async data
description: Nuxt组件里不能直接用async data，但是有办法可以达到相同效果。
categories: [技术]
tags: [Nuxt.js,Vue.js,Nuxt Content]
keywords: [Vue组件,数据加载]
comments: true
---

## 新年好

大家新年好~

本来想着写点什么2021总结之类的，但是还没想好写啥，那就先来一篇技术类的吧。

## 组件内不能用async data

最近按照一个Hexo的网站主题Maupassant仿写了一个Nuxt的网站主题，原主题在这[https://github.com/tufu9441/maupassant-hexo](https://github.com/tufu9441/maupassant-hexo)，我写的主题在这[https://github.com/c53hzn/nuxt-maupassant](https://github.com/c53hzn/nuxt-maupassant)，页面范例 [Nuxt-Maupassant | Jenny的小站](https://www.houzhenni.com/nuxt-maupassant/)。

原主题的侧边栏分成了三个部分，文章分类、最近文章和友情链接，那么最理想的写法应该是写成 `components` ，然后放在 `layouts` 里，这样 `pages` 文件里也不需要重复引用了。

此时有一个麻烦的地方是，Nuxt组件里面不能直接用 `async data` 方法加载数据，那么只能先在 `data` 里面留出位置，然后等 `mounted` 之后再往里面填数据，就跟我之前写的面包屑组件一样，参考我之前写的文章 [如何制作中英双语的面包屑导航](/blog/nuxt-breadcrumbs-bilingual) 。

那么问题来了， `mounted` 里面不能用 `async await` ，那就只能回归 `promise` ，但是由于需要加载两个以上的数据，要么写成嵌套，要么写成链式，但是两个我都不喜欢，最好能有个迂回的方式，还是用 `async await` 最好。

找了一圈之后还真的找到了，`github` 上有人提了个不能在组件内使用 `async data` 的 `issue` ，于是有好心人指路官方教程里的一篇 [Data Fetching](https://nuxtjs.org/docs/features/data-fetching/) ，只要是 `Nuxt 2.12+` 以上的版本就能用。

这个也很重要，于是我赶紧看了一下 `package.json` ，我用的是 `Nuxt 2.12.2` ，那真是太好了，不用升级，也不用做什么特殊设定，那就开始整吧。

## 添加async fetch方法并在mounted之后调用

代码如下：

```js
export default {
	name: 'Aside',
	data() {
		return {
			latestBlog: [],
			categories: [],
			friendSites: [
				{
				  href: "https://www.baidu.com",
				  text: "百度"
				},
				{
				  href: "https://www.google.com",
				  text: "谷歌"
				},
				{
				  href: "https://www.bing.com",
				  text: "必应"
				},
				{
				  href: "https://www.qq.com",
				  text: "腾讯"
				},
			]
		};
	},
	async fetch() {
		var that = this;
		//getLatest5和getCategories是两个utils方法，这个不重要
		var latestBlog = await getLatest5(that.$nuxt.context.$content);
		var categories = await getCategories(that.$nuxt.context.$content);
		//把获取到的数据填入data的两个空位里
		that.latestBlog = latestBlog;
		that.categories = categories;
	},
	methods: {
		getAside() {
			this.$fetch();
		}
	},
	mounted: function() {
		var that = this;
		that.$nextTick(() => {
			that.getAside();
		});
	}
}
```

差不多就是这样了。

然后我想看看能不能在面包屑导航里也这么用，后来发现不行。因为没有能够直接获取动态页面标题的方法，之前的写法挺好的，别动它了。

全文完。