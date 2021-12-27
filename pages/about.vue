<template>
  <main class="blog-main">
    自我介绍
  </main>
</template>

<script>
export default {
  layout: "page",
  // async asyncData(context) {
  //   var that = this;

  //   return {
      
  //   }
  // },
  head () {
    return {
      title: "关于我",
      meta: [
        { 
          hid: 'description',
          name: 'description',
          content: "A minimalist blog theme designed for Nuxt.js"
        }
      ]
    }
  }
}
</script>

