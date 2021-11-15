<template>
  <div class="blog-wrap">
    <main class="blog-main">
      <h1>
        语言列表
      </h1>
      <p>
        <span class="blog-tag">
          <nuxt-link to="/blog">
            <i class="fa fa-list" style="color:inherit;"></i>
            文章列表
          </nuxt-link>
        </span>
      </p>
      <p>
        <span v-for="(language, index) in languages" :key="index"
        class="blog-lang"><!--
       --><nuxt-link :to="'/blog/language/' + language.name"><!--
         --><i class="fa fa-language"></i><!--
         -->{{language.name}}: {{language.len}}<!--
       --></nuxt-link>
        </span>
      </p>
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
    const arr = await context.$content('blog')
    .sortBy("date", "desc")
    .only(['date','language','title','slug'])
    .fetch();
    //get list of all available languages and num of blogs inside each language
    var languageObj = {};

    for (let i = 0; i < arr.length; i++) {
      if (!languageObj[arr[i].language]) {
        languageObj[arr[i].language] = 1;
      } else {   
        languageObj[arr[i].language]++;
      }
    }

    var langNames = Object.keys(languageObj);
    var languages = [];
    for (let i = 0; i < langNames.length; i++) {
      languages[i] = {
        name: langNames[i],
        len: languageObj[langNames[i]]
      };
    }

    var latestBlog = await getLatest5(context.$content);
    var categories = await getCategories(context.$content);

    return { 
      languages,
      baseURL: context.app.router.options.base,
      latestBlog: latestBlog.latestBlog,
      categories: categories.categories
    };
  },
  head () {
    return {
      title: "语言列表",
      meta: [
        { hid: 'description', name: 'description', content: '文章语言列表' }
      ]
    }
  }
}
</script>

<style type="text/css">
.blog-lang {
  margin-right: 5px;
}
</style>