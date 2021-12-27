<template>
  <div class="container-main">
    <ForkOnGithub></ForkOnGithub>
    <Navigation></Navigation>
    <div class="blog-wrap">
      <nuxt />
      <Aside></Aside> 
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ForkOnGithub from '../components/Fork-On-Github';
import Aside from "~/components/Aside";

export default {
  components: {
    Navigation,
    Footer,
    ForkOnGithub,
    Aside
  },
  mounted: function() {
    var that = this;
    that.$nextTick(() => {
      var w = window;
      var d = document;

      //add scrollIntoView to anchor link, new window open to external link
      var h2Tags = d.querySelectorAll(".blog-wrap h2");
      var h3Tags = d.querySelectorAll(".blog-wrap h3");
      for (let i = 0; i < h2Tags.length; i++) {
        h2Tags[i].innerHTML = `<a id=${h2Tags[i].id}></a>` + h2Tags[i].innerText;
        h2Tags[i].id = "h2-" + (i+1);
      }
      for (let i = 0; i < h3Tags.length; i++) {
        h3Tags[i].innerHTML = `<a id=${h3Tags[i].id}></a>` + h3Tags[i].innerText;
        h3Tags[i].id = "h3-" + (i+1);
      }
      var aTags = d.querySelectorAll(".blog-wrap a[href]");
      for (let i = 0; i < aTags.length; i++) {
        let isAnchor = aTags[i].href.indexOf("#") !== -1;
        let isExternal = aTags[i].host !== w.location.host;
        if (isAnchor && !isExternal) {
          aTags[i].onclick = function(e) {
            var c = e || event;
            c.preventDefault();
            var href = aTags[i].href;
            var hashPos = href.indexOf("#");
            var id = href.substring(hashPos+1, href.length);
            d.querySelector("a[id='"+decodeURI(id)+"']").scrollIntoView({behavior: "smooth"});
          }
        }
      }
    });
  }
}
</script>
