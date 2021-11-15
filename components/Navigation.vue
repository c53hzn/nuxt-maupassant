<template>
  <nav>
    <div class="nav-wrap">
      <header> 
        <Nuxt-Link class="no-decor-link nav-home" to="/">
          Jenny's Blog
        </Nuxt-Link>
        <div class="nav-subtitle">
          多学多想
        </div>
      </header>
      <ul class="nav-ul">
        <li class="nav-link" v-for="(link, index) in nav_links_zh"
        :key="index">
          <nuxt-link v-if="!/http/.test(link.path)"
          :to="link.path" class="no-decor-link">
            <i class="fa" :class="link.fa_class"></i>
            {{link.title}}
          </nuxt-link>
          <a v-if="/http/.test(link.path)" target="_blank"
          :href="link.path" class="no-decor-link">
            {{link.title}}
          <i v-if="link.target=='_blank'" class="fa fa-external-link"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Vuex from 'vuex';

export default {
  name: 'Navigation',
  data() {
    var that = this;
    var siteName = "Jenny's blog";
    var nav_links_zh = [{
        path: "/",
        title: "首页",
        target: "_self",
        fa_class: "fa-home"
      },
      {
        path: "/about",
        title: "关于",
        target: "_self",
        fa_class: "fa-user"
      },
      {
        path: "/history",
        title: "历史",
        target: "_self",
        fa_class: "fa-book"
      },
      {
        path: "/blog",
        title: "博客",
        target: "_self",
        fa_class: "fa-archive"
      },
      {
        path: "/blog/feed.xml",
        title: "订阅",
        target: "_blank",
        fa_class: "fa-rss"
      },
      {
        path: "https://www.houzhenni.com",
        title: "主站",
        target: "_blank",
      }
    ];

    return {
      siteName,
      isNavVisible: false,
      nav_links_zh
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang.val;
    }
  },
  mounted: function() {
    var that = this;
    if (process.client) {
      var localLang = localStorage.getItem("lang");
      var browserLang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏览器
      browserLang = browserLang.substr(0, 2);//截取lang前2位字符
      var targetLang = localLang?localLang
      :browserLang=="zh"?"Chi":"Eng";
      localStorage.setItem("lang",targetLang);
      if (targetLang != that.$store.state.lang.val) {
        that.$store.commit("lang/toggleLang");
      }
    }
  },
  methods: {
    toggleLang: function() {
      var that = this;
      that.$store.commit('lang/toggleLang');
      localStorage.setItem("lang",that.$store.state.lang.val);
    }
  }
}
</script>
