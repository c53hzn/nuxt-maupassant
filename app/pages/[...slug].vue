<template>
  <main class="blog-main">
    <ContentRenderer :value="page"/>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug;

const {data} = await useAsyncData(
  `landingpage-${slug[0]}`,
  async () => {
    return await queryCollection('landingpage').where('slug', '=', slug[0]).first()
  },
)
const page = data.value;

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// 所有匹配到的路径都不存在，直接抛出 404
// throw createError({ statusCode: 404, message: '页面未找到' })


const { data: settings } = await useAsyncData('my-settings', () => {
  return queryCollection('settings').first()
})
const author_name = settings.value.author_name;

definePageMeta( {
  layout: "page",
});
useSeoMeta({
  title: () => author_name+"|"+page.title,
  description: () => author_name+"|"+page.description,
})
</script>