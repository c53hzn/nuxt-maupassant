<template>
  <div class="blog-wrap">
    <main class="blog-main">
      <BlogGallery :blogList="blogList_zh"></BlogGallery>
      <Pagination :total="page_total" :perPage="10"></Pagination>
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
import BlogGallery from "~/components/Blog-Gallery";
import Pagination from "~/components/Pagination";
import getCategories from "~/utils/getCategories";
import getLatest5 from "~/utils/getLatest5";
import getContentByPage from "~/utils/getContentByPage";

export default {
  layout: "page",
  components: {
    BlogGallery,
    Pagination
  },
  async asyncData(context) {
    var that = this;
    // "desc" is "by descending order"
    const blogList_zh = await getContentByPage(context.$content, {page:1});
    var latestBlog = await getLatest5(context.$content);
    var categories = await getCategories(context.$content);

    return {
      blogList_zh: blogList_zh.paginatedArticles,
      latestBlog: latestBlog.latestBlog,
      categories: categories.categories,
      page_total: blogList_zh.allArticles.length
    }
  },
  head () {
    return {
      title: "Nuxt-Maupassant",
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