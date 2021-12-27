<template>
  <aside class="blog-side">
    <div class="side-unit">
      <p><i class="fa fa-folder-open"></i>&nbsp;分类</p>
      <hr>
      <p>
        <span class="blog-cat"
         v-for="(cat, index) in categories" :key="index">
           <nuxt-link :to="'/blog/category/' + cat.name">
             <i class="fa fa-folder-open"></i>
             {{cat.name}}: {{cat.len}}
           </nuxt-link>
       </span>
      </p>
    </div>
    <div class="side-unit">
      <p><i class="fa fa-file-o"></i>&nbsp;最新文章</p>
      <hr>
      <p v-for="(blog, index) in latestBlog" :key="index">
        <nuxt-link class="blog-link" :to="'/blog/' + blog.slug">
         {{blog.title}}
        </nuxt-link>
      </p>
    </div>
    <div class="side-unit">
      <p><i class="fa fa-external-link"></i>&nbsp;友情链接</p>
      <hr>
      <p v-for="(link, index) in friendSites" :key="index">
        <a class="blog-link" :href="link.href" target="_blank">{{link.text}}</a>
      </p>
    </div>
  </aside>
</template>

<script type="text/javascript">
import getCategories from "~/utils/getCategories";
import getLatest5 from "~/utils/getLatest5";

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
  	var latestBlog = await getLatest5(that.$nuxt.context.$content);
  	var categories = await getCategories(that.$nuxt.context.$content);
  	that.latestBlog = latestBlog.latestBlog;
  	that.categories = categories.categories;
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
</script>
