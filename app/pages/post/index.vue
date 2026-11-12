<template>
  <main class="blog-main">
    <p>
      <span class="blog-tag"
       v-for="(tag, index) in tags" :key="index">
         <nuxt-link :to="'/post/tag/' + encodeURIComponent(tag.name)">
           <i class="fa fa-tag"></i>
           {{tag.name}}: {{tag.len}}
         </nuxt-link>
     </span>
    </p>
    <div v-for="(blogs,blog_arr_i) in blog_by_year" :key="blog_arr_i">
      <h2 style="margin-bottom: 0px;"
      :id="blogs[0].meta.date.substring(0,4)+'('+blogs.length+')'">
        {{blogs[0].meta.date.substring(0,4)}}({{blogs.length}})
      </h2>
      <hr>
      <p v-for="(blog, index) in blogs" :key="index">
        <span class="blog-date">
          {{blog.meta.date}}
        </span>
        <nuxt-link :to="'/post/' + blog.slug" class="blog-link"
        :title="blog.description">
          &nbsp;{{blog.title}}
        </nuxt-link>
      </p> 
    </div>
  </main> 
</template>

<script setup>
const { data } = await useAsyncData(
  'blog-all-posts', // 缓存键，可自定义
  async () => {
    return await getBlogByYear(queryCollection)
  }
)
const blog_by_year = data.value.blog_by_year;
const data2 = await useAsyncData(
  'above-all-blogs-tags',
  async () => {
    return await getTags(queryCollection)
  }
)
const tags = data2.data.value.tags;

definePageMeta( {
  layout: "post",
});

const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const author_name = settings.value.author_name;

useSeoMeta({
  title: () => author_name+"|所有文章",
  description: () => author_name+"的博客文章",
})
</script>
