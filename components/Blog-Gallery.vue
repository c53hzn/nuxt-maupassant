<template>
	<div class="blog-gallery">
    <div 
    class="blog-gallery-unit"
    v-for="(blog, index) in blogList" 
    :key="index">
      <div class="blog-gallery-inner align-left">
        <h2>
          <nuxt-link class="no-decor-link blog-link" :to="'/blog/'+blog.slug">
            {{blog.title}}
          </nuxt-link>
        </h2>
        <div class="date-lang">
          <span class="blog-date">
            <i class="fa fa-calendar"></i>
            &nbsp;{{blog.date.substring(0,10)}}
          </span>
        </div>
        <p class="desc-tag">
          <span class="blog-gallery-desc">{{blog.description}}</span>
        </p>
        <p class="align-right">
          <nuxt-link class="no-decor-link read-more" :to="'/blog/'+blog.slug">
            <span>阅读全文<i class="fa fa-angle-double-right"></i></span>
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Blog-Gallery',
  props: {
    blogList: {
      type: Array,
      required: true
    },
    col: {
      type: String
    }
  }
}
</script>

<style>
.blog-gallery {
  margin: 0px auto;
}
.blog-gallery-unit {
  margin: 0px 20px 10px 0px;
}
.blog-gallery-inner h4 {
  margin-top: 0px;
  margin-bottom: 8px;
  max-height: 42px;
  line-height: 20px;
  overflow: hidden;
}
.blog-gallery-unit .date-lang, .blog-gallery-unit .desc-tag {
  margin-top: 8px;
  margin-bottom: 8px;
}
.blog-gallery-desc {
  line-height: 21px;
  max-height: 64px;
  display: block;
  overflow: hidden;
}
.blog-gallery-cat, .blog-gallery-tag {
  margin: 1px;
  padding: 0px 8px 1px 8px;
  font-size: 14px;
  font-family: 'Noto Sans SC', sans-serif;;
  line-height: 20px;
  border-radius: 999px;
  display: inline-block;
}
.blog-gallery-cat {
  color: #4c4c4c;
  border: 1px solid #4c4c4c;
}
.blog-gallery-tag {
  color: white;
  background: gray;
}
.blog-gallery-lang {
  padding: 0px 5px;
  width: 60px;
  font-size: 14px;
  text-align: center;
  color: gray;
  border: 1px solid silver;
  border-radius: 4px;
}
.read-more {
  padding: 4px 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.read-more:hover {
  color: black;
  border-color: black;
}
</style>
