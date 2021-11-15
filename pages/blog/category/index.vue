<template>
  <div class="blog-wrap">
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
    <aside class="blog-side">
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


<script type="text/javascript">
import getCategories from "~/utils/getCategories";
import getLatest5 from "~/utils/getLatest5";

export default {
  layout: "page",
  async asyncData(context) {
    var myCategory = decodeURI(context.params.category);
    const blogs = await context.$content('blog')
    .where({'categories':{$contains: myCategory}})
    .sortBy("date", "desc")
    .only(['title','slug','date','tags','categories','language','description'])
    .fetch();
    var tempObj = {};
    var blog_by_year_cat = [];
    for (let m = 0; m < blogs.length; m++) {
      let year = blogs[m].date.substring(0,4);
      if (!tempObj[year]) {
        tempObj[year] = [];
      }
      tempObj[year].push(blogs[m]);
    }
    var key_arr = Object.keys(tempObj);
    for (let n = 0; n < key_arr.length; n++) {
      blog_by_year_cat.push(tempObj[key_arr[key_arr.length - 1 - n]]);
    }

    var latestBlog = await getLatest5(context.$content);
    var categories = await getCategories(context.$content);

    return {
      blog_by_year_cat,
      categoryName: myCategory,
      latestBlog: latestBlog.latestBlog,
      categories: categories.categories
    };

  },
  head () {
    return {
      title: this.categoryName,
      meta: [
        { hid: 'description', name: 'description', content: "分类为 " + this.categoryName + " 的文章"}
      ],
    }
  }
}
</script>
