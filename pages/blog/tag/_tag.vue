<template>
  <main class="blog-main">
    <h1>
      标签: {{tagName}}
    </h1>
    <p>
      <span class="blog-tag">
        <nuxt-link to="/blog/tag">
          <i class="fa fa-tag" style="color:inherit;"></i>
          标签列表
        </nuxt-link>
      </span>
      <span class="blog-tag">
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
        <span class="blog-date">
          {{blog.date.substring(0,10)}}
        </span>
        <nuxt-link :to="'/blog/language/' + blog.language">
          <span class="blog-lang">
            <i class="fa fa-language"></i>
            {{blog.language}}
          </span>
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
export default {
  layout: "page",
  async asyncData(context) {
    var myTag = decodeURI(context.params.tag);
    const blogs = await context.$content('blog')
    .where({'tags':{$contains: myTag}})
    .sortBy("date", "desc")
    .only(['title','slug','date','tags','language','description'])
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

    return {
      blog_by_year,
      tagName: myTag,
    };

  },
  head () {
    return {
      title: this.tagName,
      meta: [
        { hid: 'description', name: 'description', content: "包含" + this.tagName + "的文章"}
      ],
    }
  }
}
</script>
