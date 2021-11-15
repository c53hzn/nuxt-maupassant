<template>
  <div class="blog-wrap">
    <main class="blog-main">
      <p>
        <span style="vertical-align: middle;">语言:</span>
        <nuxt-link to="/blog/language/English" class="blog-lang">
          <i class="fa fa-language"></i>
          English
        </nuxt-link>
        <nuxt-link to="/blog/language/中文" class="blog-lang">
          <i class="fa fa-language"></i>
          中文
        </nuxt-link>
        <nuxt-link to="/blog/language/日本語" class="blog-lang">
          <i class="fa fa-language"></i>
          日本語
        </nuxt-link>
      </p>
      <p>
        <span style="vertical-align: middle;">标签:</span>
        <span class="blog-tag" style="vertical-align: middle;">
          <nuxt-link to="/blog/tag">
            <i class="fa fa-tag" style="color:inherit"></i>
            标签列表
          </nuxt-link>
        </span>
      </p>
      <div v-for="(blogs,blog_arr_i) in blog_by_year" :key="blog_arr_i">
        <h2 style="margin-bottom: 0px;"
        :id="blogs[0].date.substring(0,4)+'('+blogs.length+')'">
          {{blogs[0].date.substring(0,4)}}({{blogs.length}})
        </h2>
        <hr>
        <p v-for="(blog, index) in blogs" :key="index">
          <span class="blog-date">
            {{blog.date.substring(0,10)}}
          </span>
          <nuxt-link :to="'/blog/language/' + blog.language"
           class="blog-lang">
            <i class="fa fa-language"></i>
            {{blog.language}}
          </nuxt-link>
          <nuxt-link :to="'/blog/' + blog.slug" class="blog-link"
          :title="blog.description">
            {{blog.title}}
          </nuxt-link>
        </p> 
      </div>
    </main>
    <aside class="blog-side">
      <div class="side-unit">
        <p><i class="fa fa-archive"></i>&nbsp;归档</p>
        <hr>
        <ul class="year-list">
          <li v-for="(blogs,blog_arr_i) in blog_by_year" 
          :key="'year'+blogs[0].date.substring(0,4)+blog_arr_i">
            <nuxt-link :to="'/blog#'+blogs[0].date.substring(0,4)+'('+blogs.length+')'">
              {{blogs[0].date.substring(0,4)}}({{blogs.length}})
            </nuxt-link>
          </li>
        </ul>
      </div>
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
    </aside> 
  </div>
</template>

<script type="text/javascript">
import getCategories from "~/utils/getCategories";
import getBlogByYear from "~/utils/getBlogByYear";

export default {
  layout: "post",
  async asyncData(context) {
    var blog_by_year = await getBlogByYear(context.$content);
    var categories = await getCategories(context.$content);

    return { 
      blog_by_year: blog_by_year.blog_by_year,
      categories: categories.categories
    };
  },
  head () {
    return {
      title: "博客",
      meta: [
        { hid: 'description', name: 'description', content: "我的文章" }
      ]
    }
  }
}
</script>
