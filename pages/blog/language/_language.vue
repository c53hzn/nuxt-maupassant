<template>
  <div class="blog-wrap">
    <main class="blog-main">
      <h1>
        语言: {{langName}}
      </h1>
      <p>
        <span class="blog-lang">
          <nuxt-link to="/blog/language">
            <i class="fa fa-language"></i>
            语言列表
          </nuxt-link>
        </span>
        <span 
        class="blog-tag">
          <nuxt-link to="/blog">
            <i class="fa fa-list" style="color:inherit;"></i>
            文章列表
          </nuxt-link>
        </span>
      </p>
      <div v-for="(blogs,blog_arr_i) in blog_by_year" :key="blog_arr_i">
        <h2 style="margin-bottom: 0px;"
        :id="blogs[0].date.substring(0,4)+'('+blogs.length+')'">
          {{blogs[0].date.substring(0,4)}}({{blogs.length}})
        </h2>
        <p v-for="(blog, index) in blogs" :key="index">
          <span class="blog-date">{{blog.date.substring(0,10)}}&nbsp;</span>
          <nuxt-link :to="'/blog/' + blog.slug" class="blog-link"
          :title="blog.description">
           {{blog.title}}
          </nuxt-link>
        </p> 
      </div>
      <p>&nbsp;</p>
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


<script type="text/javascript">
import getCategories from "~/utils/getCategories";
import getLatest5 from "~/utils/getLatest5";

export default {
  layout: "page",
  async asyncData(context) {
    var langName = decodeURI(context.params.language);
    const blogs = await context.$content('blog')
    .where({'language': langName})
    .sortBy("date", "desc")
    .only(['title','slug','date','language','description'])
    .fetch();
    var tempObj = {};
    var blog_by_year = [];
    for (let m = 0; m < blogs.length; m++) {
      let year = blogs[m].date.substring(0,4);
      if (!tempObj[year]) {
        tempObj[year] = [];
      }
      tempObj[year].push(blogs[m]);
    }
    var key_arr = Object.keys(tempObj);
    for (let n = 0; n < key_arr.length; n++) {
      blog_by_year.push(tempObj[key_arr[key_arr.length - 1 - n]]);
    }

    var latestBlog = await getLatest5(context.$content);
    var categories = await getCategories(context.$content);

    return {
      blog_by_year,
      langName,
      latestBlog: latestBlog.latestBlog,
      categories: categories.categories 
    };
  },
  head () {
    return {
      title: this.langName,
      meta: [
        { hid: 'description', name: 'description', content: this.langName + "文章列表"}
      ],
    }
  }
}
</script>

