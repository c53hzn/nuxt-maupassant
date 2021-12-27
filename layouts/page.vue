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
  }
}
</script>
