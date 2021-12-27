<template>
  <main class="blog-main">
    <h1>
      分类列表
    </h1>
    <p>
      <span class="blog-tag">
        <nuxt-link to="/blog">
          <i class="fa fa-list"></i>
          文章列表
        </nuxt-link>
      </span>
    </p>
    <p>
      <span class="blog-cat"
       v-for="(cat, index) in categories" :key="index">
         <nuxt-link :to="'/blog/category/' + cat.name">
           <i class="fa fa-folder-open"></i>
           {{cat.name}}: {{cat.len}}
         </nuxt-link>
     </span>
    </p>
  </main>
</template>


<script type="text/javascript">
import getCategories from "~/utils/getCategories";

export default {
  layout: "page",
  async asyncData(context) {
    var categories = await getCategories(context.$content);

    return {
      categories: categories.categories
    };

  },
  head () {
    return {
      title: "分类列表",
      meta: [
        { hid: 'description', name: 'description', content: "我的文章分类"}
      ],
    }
  }
}
</script>
