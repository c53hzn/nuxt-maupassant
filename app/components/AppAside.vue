<template>
  <aside class="blog-side">
    <div class="side-unit">
      <p><i class="fa fa-folder-open"></i>&nbsp;分类</p>
      <hr>
      <p>
        <span class="blog-cat"
         v-for="(cat, index) in categories" :key="index">
           <nuxt-link :to="'/post/category/' + cat.name">
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
        <nuxt-link class="blog-link" :to="'/post/' + blog.slug">
         {{blog.title}}
        </nuxt-link>
      </p>
    </div>
    <div class="side-unit">
      <p><i class="fa fa-external-link"></i>&nbsp;友情链接</p>
      <hr>
      <p v-for="(link, index) in friendSites" :key="index">
        <a class="blog-link" :href="link.href" target="_blank">{{link.text}}</a>
      </p>
    </div>
  </aside>
</template>

<script setup>
const data1 = await useAsyncData(
  'aside-categories',
  async () => {
    return await getCategories(queryCollection)
  }
)
const categories = data1.data.value.categories;
const data2 = await useAsyncData(
  'aside-latestBlog',
  async () => {
    return await getLatest5(queryCollection)
  }
)
const latestBlog = data2.data.value.latestBlog;

const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const friendSites = settings.value.friendSites;
</script>
