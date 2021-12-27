<template>
  <main class="blog-main">
    <BlogGallery :blogList="blogList"></BlogGallery>
    <Pagination :total="page_total" :perPage="10"></Pagination>
  </main>
</template>

<script>
import BlogGallery from "~/components/Blog-Gallery";
import Pagination from "~/components/Pagination";
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
    const blogList = await getContentByPage(context.$content, {page:1});

    return {
      blogList: blogList.paginatedArticles,
      page_total: blogList.allArticles.length
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