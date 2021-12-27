<template>
  <main class="blog-main">
    <h1 class="align-center article-title">{{blog.title}}</h1>
    <p class="align-center">
      <span class="blog-date">
        <i class="fa fa-calendar "></i>
        {{blog.date.substring(0,10)}}
      </span>
      <nuxt-link :to="'/blog/language/' + blog.language">
        <span class="blog-lang">
          <i class="fa fa-language"></i>
          {{blog.language}}
        </span>
      </nuxt-link>
    </p>
    <p class="align-center">
      <span v-for="(cat, index) in blog.categories" :key="index"
      class="blog-cat">
        <nuxt-link :to="'/blog/category/' + cat">
          <i class="fa fa-folder-open"></i>
          {{cat}}
        </nuxt-link>
      </span>
    </p>
    <p class="blog-tags align-center">
      <span v-for="(tag, index) in blog.tags" :key="index"
      class="blog-tag">
        <nuxt-link :to="'/blog/tag/' + tag">
          <i class="fa fa-tag" style="color:inherit;"></i>
          {{tag}}
        </nuxt-link>
      </span>
    </p>
    <p class="blog-desc" v-html="blog.description"></p>
    <article>
      <ul class="toc">
        <li
        v-for="link of blog.toc"
        :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }"
        :key="link.id">
          <nuxt-link :to="`#${link.id}`">{{ link.text }}</nuxt-link>
        </li>
      </ul>
      <nuxt-content :document="blog" class="markdown-body"/>
    </article>
    <div class="prev-next">
      <div class="prev">
        <nuxt-link v-if="blog.prev" 
        :to="'/blog/'+blog.prev.slug" class="no-decor-link"
        :title="blog.prev.description">
          <span class="prev-next-arrow">
            <i class="fa fa-long-arrow-left"></i>
          </span>
          <br>
          <span class="title">{{blog.prev.title}}</span>
        </nuxt-link>
      </div>
      <div class="next">
        <nuxt-link v-if="blog.next" 
        :to="'/blog/'+blog.next.slug" class="no-decor-link"
        :title="blog.next.description">
          <span class="prev-next-arrow">
            <i class="fa fa-long-arrow-right"></i>
          </span>
          <br>
          <span class="title">{{blog.next.title}}</span>
        </nuxt-link>
      </div>
    </div>
  </main>
</template>


<script type="text/javascript">
import zoompic from "../../plugins/zoompic";

export default {
  layout: "post",
  async asyncData(context) {
    const mySlug = context.params.slug;
    const arr0 = await context.$content('blog').where({slug: mySlug}).fetch();
    var blog = arr0[0];
    const prevNext = await context.$content('blog')
    .only(['title', 'slug','description'])
    .sortBy('date')
    .surround(mySlug)
    .fetch();
    blog.prev = prevNext[0];
    blog.next = prevNext[1];

    return {
      blog,
      mySlug,
      keywords: blog.keywords?blog.keywords:[],
      myBase: context.app.router.options.base,
    };
  },
  mounted: function(){
    var that = this;
    that.$nextTick(() => {
      that.loadCustomScripts();
    });
  },
  methods: {
    loadCustomScripts() {
      var that = this;
      var w = window;
      var myImg = document.querySelectorAll(".nuxt-content img");
      for (let i = 0; i < myImg.length; i++) {
        if (myImg[i].naturalWidth/myImg[i].naturalHeight > 2) {
          myImg[i].style.maxWidth = "100%";
        } else {
          myImg[i].style.height = "150px";
        }
      }

      //add zoompic for imgs
      zoompic([[".nuxt-content img",true]]);

      //open new window for links except for anchors
      var aInArticle = document.querySelectorAll(".nuxt-content a[href]");

      for (let l = 0; l < aInArticle.length; l++) {
        let isExternal = aInArticle[l].host !== w.location.host;
        if (isExternal) {
          aInArticle[l].target = "_blank";
          let linkIcon = document.createElement("i");
          linkIcon.className = "fa fa-external-link";
          aInArticle[l].appendChild(linkIcon);
        }
      }

      //remove empty a tags in h4 and h5
      var aInH4Tags = document.querySelectorAll(".nuxt-content h4 a");
      var aInH5Tags = document.querySelectorAll(".nuxt-content h5 a");
      for (let s = 0; s < aInH4Tags.length; s++) {
        if (aInH4Tags[s].innerText == "") {
          aInH4Tags[s].style.display = "none";
        }
      }
      for (let t = 0; t < aInH5Tags.length; t++) {
        if (aInH5Tags[t].innerText == "") {
          aInH5Tags[t].style.display = "none";
        }
      }
    }
  },
  head() {
    return {
      title: this.blog.title,
      meta: [
        { hid: 'date', name: 'date', content: this.blog.date.substring(0,10) },
        { hid: 'description', name: 'description', content: this.blog.description },
        { hid: 'keyword',
          name: 'keyword',
          content: this.keywords.length?
          this.blog.categories.join(",")+","+this.blog.tags.join(",")+","+this.keywords.join(",")
          :this.blog.categories.join(",")+","+this.blog.tags.join(",")
        }
      ],
      link: [
        { rel: "stylesheet", href: this.myBase + "css/github-markdown.min.css"}
      ]
    }
  }
}
</script>

<style type="text/css">
.nuxt-content {
  margin-bottom: 50px;
  text-align: justify;
  word-break: break-all;
}
.nuxt-content h2 {
  margin: 9px 0px;
  padding: 9px 0px;
}
.nuxt-content h3, .nuxt-content h4, .nuxt-content h5  {
  margin: 8px 0px;
  padding: 0px;
}
.nuxt-content h2, .nuxt-content h3 {
  border-bottom: 1px solid silver;
}
.nuxt-content h2 {
  font-size: 30px;
}
.nuxt-content h3 {
  font-size: 26px;
}
.nuxt-content h4 {
  font-size: 24px;
}
.nuxt-content h5 {
  font-size: 20px;
}
.nuxt-content p {
  line-height: 24px;
}
.nuxt-content ol {
  padding-right: 18px;
}
.nuxt-content li {
  line-height: 24px;
}
.nuxt-content iframe {
  margin: 0px 20px;
}
.nuxt-content iframe.youtube {
  margin: 8px auto 8px 20px;
  width: 480px;
  height: 360px;
  display: block;
}
.nuxt-content blockquote{
  margin: 16px 0px;
  padding: 10px;
  color: #6a737d;
  background-color: #f8f8f8;
  border-left: .25em solid #dfe2e5;
}
.toc a,.toc a:visited,.toc a:active, .nuxt-content a {
  color: black;
  font-weight: bold;
  text-decoration: underline;
  border: none;
}
.toc a:hover, .nuxt-content a:hover {
  color: gray;
}
li.toc3 {
  list-style: circle;
  margin-left: 15px;
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
#disqus_thread {
  margin-top: 20px;
}
.prev-next {
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.prev-next a {
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
