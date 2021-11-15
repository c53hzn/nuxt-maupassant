<template>
  <div class="blog-wrap">
    <main class="blog-main">
      <h1>
        标签列表
      </h1>
      <p>
        <span class="blog-tag">
          <nuxt-link to="/blog">
            <i class="fa fa-list" style="color:inherit;"></i>
            所有文章
          </nuxt-link>
        </span>
      </p>
      <p>
        <span class="blog-tag"
         v-for="(tag, index) in tags" :key="index"><!--
       --><nuxt-link :to="'/blog/tag/' + tag.name"><!--
        --><i class="fa fa-tag" style="color:inherit;"></i><!--
         -->{{tag.name}}: {{tag.len}}<!--
       --></nuxt-link><!--
     --></span>
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
    .only(['date','tags','slug'])
    .fetch();
    //get list of all available tags and num of blogs inside each tag
    var tagObj = {};

    for (let i = 0; i < arr.length; i++) {
      if (i == 0) {
        tagExpand(arr[i].tags);
      } else {   
        if (arr[i].slug != arr[i-1].slug) {
          if (!arr[i].tags) {
            console.log(arr[i])
          }
          tagExpand(arr[i].tags);
        }
      }
    }

    function tagExpand(tags) {
      for (let j = 0; j < tags.length; j++) {
        if (tagObj[tags[j]]) {
          tagObj[tags[j]]++;
        } else {
          tagObj[tags[j]] = 1;
        }
      }
    }

    var tagNames = Object.keys(tagObj);
    var tags = [];
    for (let i = 0; i < tagNames.length; i++) {
      tags[i] = {
        name: tagNames[i],
        len: tagObj[tagNames[i]]
      };
    }

    var latestBlog = await getLatest5(context.$content);
    var categories = await getCategories(context.$content);

    return { 
      tags,
      latestBlog: latestBlog.latestBlog,
      categories: categories.categories
    };
  },
  head () {
    return {
      title: "标签列表",
      meta: [
        { hid: 'description', name: 'description', content: "文章标签" }
      ]
    }
  }
}
</script>
