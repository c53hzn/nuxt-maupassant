<template>
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
</template>

<script type="text/javascript">
import getBlogByYear from "~/utils/getBlogByYear";

export default {
  layout: "post",
  async asyncData(context) {
    var blog_by_year = await getBlogByYear(context.$content);
    var total = 0;
    blog_by_year.blog_by_year.map(function(a) {
      total += a.length
    });

    return { 
      blog_by_year: blog_by_year.blog_by_year,
      total
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
