<template>
  <div class="blog-wrap">
    <main class="blog-main">
      自我介绍
    </main>
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
    </aside> 
  </div>
</template>

<script>
import getCategories from "~/utils/getCategories";
import getLatest5 from "~/utils/getLatest5";

export default {
  layout: "page",
  async asyncData(context) {
    var that = this;
    // "desc" is "by descending order"
    var latestBlog = await getLatest5(context.$content);
    var categories = await getCategories(context.$content);

    return {
      latestBlog: latestBlog.latestBlog,
      categories: categories.categories,
    }
  },
  head () {
    return {
      title: "历史",
      meta: [
        { 
          hid: 'description',
          name: 'description',
          content: "A minimalist blog theme designed for Nuxt.js"
        }
      ]
    }
  }
}
</script>