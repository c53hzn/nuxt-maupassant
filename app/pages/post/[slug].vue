<template>
  <main class="blog-main">
    <h1 class="align-center article-title">{{blog.title}}</h1>
    <p class="align-center">
      <span class="blog-date">
        <i class="fa fa-calendar "></i>
        {{blog.meta.date}}
      </span>
    </p>
    <p class="align-center">
      <span v-for="(cat, index) in blog.categories" :key="index"
      class="blog-cat">
        <nuxt-link :to="'/post/category/' + cat">
          <i class="fa fa-folder-open"></i>
          {{cat}}
        </nuxt-link>
      </span>
    </p>
    <p class="blog-tags align-center">
      <span v-for="(tag, index) in blog.tags" :key="index"
      class="blog-tag">
        <nuxt-link :to="'/post/tag/' + encodeURIComponent(tag)">
          <i class="fa fa-tag" style="color:inherit;"></i>
          {{tag}}
        </nuxt-link>
      </span>
    </p>
    <p class="blog-desc" v-html="blog.description"></p>
    <article>
      <ul class="toc">
        <li class='toc2'
        v-for="link of blog.body.toc.links"
        :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
          <!-- nested h3s -->
          <ul v-if="link.children?.length">
            <li v-for="child in link.children" :key="child.id" class='toc3'>
              <a :href="`#${child.id}`">{{ child.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <ContentRenderer :value="blog"/>
    </article>
    <div class="prev-next">
       <div class="prev">
        <nuxt-link v-if="prevNext[0]" 
        :to="'/post/'+prevNext[0].slug" class="no-decor-link"
        :title="prevNext[0].description">
          <span class="prev-next-arrow">
            <i class="fa fa-long-arrow-left"></i>
          </span>
          <br>
          <span class="title">{{prevNext[0].title}}</span>
        </nuxt-link>
      </div>
      <div class="next">
        <nuxt-link v-if="prevNext[1]" 
        :to="'/post/'+prevNext[1].slug" class="no-decor-link"
        :title="prevNext[1].description">
          <span class="prev-next-arrow">
            <i class="fa fa-long-arrow-right"></i>
          </span>
          <br>
          <span class="title">{{prevNext[1].title}}</span>
        </nuxt-link>
      </div>
    </div>
    <ClientOnly>
      <ImageZoom ref="imageZoomRef"/>
    </ClientOnly>
  </main>
</template>

<script setup>
const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const author_name = settings.value.author_name;
const prevNextIsExcludeDate = settings.value.prevNextIsExcludeDate;
const route = useRoute()
const slug = route.params.slug
const {data} = await useAsyncData(
  `blog-post-slug-${slug}`,
  async () => {
    return await queryCollection('blog').where('slug', '=', slug).first()
  },
)
const blog = data.value;

const data2 = await useAsyncData(
  `surround-${slug}`, 
  async () => {
    return await queryCollectionItemSurroundings('blog', blog.path)
  },
)

let prevNext = data2.data.value;

for (let i = 0; i<2; i++) {
  if(prevNext[i]) {
    if(prevNextIsExcludeDate) {
      prevNext[i].slug = prevNext[i].path.replace(/\/blog\/[0-9]{4}\-[0-9]{2}\-[0-9]{2}\-/,"")
    } else {
      prevNext[i].slug = prevNext[i].path.replace("/blog/","")
    }
  }
}

definePageMeta( {
  layout: "post",
});

useSeoMeta({
  title: () => `${author_name}:${blog.title}`,
  date: () => blog.meta.date,
  description: () => blog.description,
})
</script>

<style type="text/css">
article {
  margin-bottom: 50px;
  text-align: justify;
  word-break: break-all;
}
article h2 {
  margin: 9px 0px;
  padding: 9px 0px;
}
article h3, article h4, article h5  {
  margin: 8px 0px;
  padding: 0px;
}
article h2 {
  font-size: 28px;
  border-bottom: 1px solid silver;
}
article h3 {
  font-size: 26px;
}
article h4 {
  font-size: 24px;
}
article h5 {
  font-size: 20px;
}
article p {
  line-height: 24px;
}
article ol {
  padding-right: 18px;
}
article li {
  line-height: 24px;
}
article iframe {
  margin: 0px 20px;
}
article iframe.youtube {
  margin: 8px auto 8px 20px;
  width: 480px;
  height: 360px;
  display: block;
}
article blockquote{
  margin: 16px 0px;
  padding: 10px;
  color: #6a737d;
  background-color: #f8f8f8;
  border-left: .25em solid #dfe2e5;
}
article img {
  max-width: 300px;
}
.toc a,.toc a:visited,.toc a:active, article a, article a:visited {
  color: black;
  font-weight: bold;
  text-decoration: none;
  border: none;
}
.toc a:hover, .nuxt-content a:hover {
  color: gray;
}
.toc2 ul {
  padding-left: 10px;
}
li.toc3 {
  list-style: circle;
  margin-left: 0px;
}
a#comment-link {
  top: 0px;
}
.blog-desc {
  margin: 10px 0px;
  padding: 10px;
  color: #666;
  background-color: rgba(0,0,0,0.025);
}
.prev-next {
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.prev-next a {
  min-width: 100px;
  display: block;
}
.prev, .next {
  max-width: 42%;
  color: gray;
  cursor: pointer;
}
.prev {
  text-align: left;
}
.next {
  text-align: right;
}
.prev:hover, .next:hover {
  color: black;
}
.prev-next-arrow {
  font-size: 28px;
}
#comment {
  margin: 40px 0px 0px 0px;
  text-align: center;
}
.loadCommentBtn {
  margin-bottom: 20px;
  cursor: pointer;
  display: inline-block;
}
.loadCommentBtn:hover {
  color: gray;
}
@media all and (max-width: 768px) {
  .nuxt-content h2, .nuxt-content h3, .nuxt-content h4, .nuxt-content h5 {
  	margin: 9px 0px;
  }
  .nuxt-content blockquote{
    margin: 16px 0px;
  }
  .nuxt-content iframe {
    margin: 0px;
  }
  .nuxt-content iframe.youtube {
    margin: 8px auto;
    width: 100%;
  }
  .nuxt-content ul {
  	padding-left: 20px;
  }
  .nuxt-content pre {
  	margin-left: 0px;
  	margin-right: 0px;
  }
  .prev, .next {
    margin: 0px;
  }
  #comment {
    margin: 40px 0px 0px 0px;
  }
}
@media all and (max-width: 539px) {
  .nuxt-content iframe.youtube {
    height: auto;
  }
}
</style>
