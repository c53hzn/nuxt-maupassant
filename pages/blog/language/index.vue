<template>
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
</template>

<script type="text/javascript">
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

    return { 
      languages,
      baseURL: context.app.router.options.base,
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