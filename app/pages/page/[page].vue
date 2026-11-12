<template>
  <main class="blog-main">
    <BlogGallery :blogList="blogList"></BlogGallery>
    <AppPagination :totalPages="totalPages" :currentPage="currentPage" :perPage="perPage"></AppPagination>
  </main>
</template>

<script setup>
const route = useRoute()
const currentPage = computed(() => parseInt(route.params.page) || 1);

const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const author_name = settings.value.author_name;
const perPage = settings.value.perPage;

const { data } = await useAsyncData(
  `page-${currentPage.value}`, // 缓存键，可自定义
  async () => {
    return await getContentByPage(queryCollection, currentPage.value, perPage)
  },
  {watch: [currentPage]}
)
const blogList = data.value.paginatedArticles;
const totalPages = data.value.totalPages;

definePageMeta( {
  layout: "page",
});

useSeoMeta({
  title: () => `${author_name}|博客|第${currentPage}页`,
  description: () => author_name+"的博客文章",
})
</script>