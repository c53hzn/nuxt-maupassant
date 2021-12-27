<template>
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
</template>

<script type="text/javascript">
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

    return { 
      tags
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
