<template>
  <footer>
    <div v-for="(item, index) in myFooter" :key="'footer-line-'+index">
      <span v-if="item.text">{{item.text}}&nbsp;</span><a v-if="item.link" :href="item.link.href" target="_blank">{{item.link.text}}<i class="fa" :class="item.link.fa_class"></i></a>
    </div>
  </footer>
</template>

<script setup>
const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const site_description = settings.value.site_description;
const myFooter = settings.value.footer;
</script>

<style type="text/css">
footer {
  font-size: 14px;
  text-align: center;
}
footer a {
  text-decoration: none;
  font-weight: bold;
}
</style>