<template>
  <main class="blog-main">
    <div style="margin: 6px 0;">
      <div class="side-left">
        <p><span v-for="(item) in yearlyCount" class="year-btn"
          :key="'year'+item.year">
          <nuxt-link :to="'/gallery/'+item.year">{{item.year}}年({{item.picCount}})</nuxt-link>
          <span>
          </span>
          &nbsp;
        </span>
        </p>
      </div>
    </div>
    <h2>{{currYear}}年</h2>
    <div
      class="pic-month-unit"
      v-for="[month, picURLs] in picByMonth"
      :key="`${currYear}-${month}`"
    >
      <div class="month">{{ month }}月</div>
      <div class="pic-container-outer">
        <div class="pic-container-inner">
          <div
            class="col-4"
            v-for="(url, urlIndex) in picURLs"
            :key="urlIndex"
          >
            <img :src="resolveSrc(url)" loading="lazy">
          </div>
        </div>
      </div>
    </div>
    <ClientOnly>
      <ImageZoom ref="imageZoomRef"/>
    </ClientOnly>
  </main>
</template>

<style>
.pic-month-unit {
  background: white;
}
.pic-month-unit .year {
  color: silver;
}
.pic-container-outer {
  width: 594px;
  display: inline-block;  
}
.pic-container-inner {
  padding-top: 20px;
  max-width: 680px;
  flex-wrap: wrap;
  display: flex;
}
.pic-container-inner .col-4 {
  position: relative;
  margin: 0 10px 10px 0;
  padding-bottom: 23%;
  width: 23%;
  height: 0;
  overflow: hidden;
}
.col-4 img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media all and (max-width: 425px) {
  .all-pic {
    padding: 10px 0px 0px 10px;
  }
  .pic-month-unit {
    padding-bottom: 10px;
  }
  .pic-container-outer {
    width: 310px;
  }
  .pic-container-inner {
    padding-top: 10px;
  }
  .pic-container-inner .col-4 {
    width: 31%;
    padding-bottom: 31%;
    margin: 0 4px 4px 0;
  }
}
</style>

<script setup>
import { joinURL } from 'ufo'
const config = useRuntimeConfig()
const baseURL = config.app.baseURL;

const isExternal = (url) => /^(https?:)?\/\//i.test(url)

const resolveSrc = (url) =>
  isExternal(url) ? url : joinURL(baseURL, url)

const route = useRoute()
const currYear = computed(() => parseInt(route.params.gallery) || 1);
const myYear = currYear.value;

const { data } = await useFetch('/api/blog-images', {
  query: { year: myYear, excludeGif: true } // 参数可以自由传递
})

const picByMonth = data.value.yearData;//[["10", ["asdf.jpg","fdsa.jpg"]],["09", ["asdf.jpg","fdsa.jpg"]]]
const yearlyCount = data.value.yearlyCount;

definePageMeta( {
  layout: "page",
});

const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const author_name = settings.value.author_name;

useSeoMeta({
  title: () => author_name+"|相册"+myYear,
  description: () => author_name+"的相册",
})
</script>