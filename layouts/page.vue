<template>
  <div class="container-main">
    <ForkOnGithub></ForkOnGithub>
    <Navigation></Navigation>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ForkOnGithub from '../components/Fork-On-Github';

export default {
  components: {
    Navigation,
    Footer,
    ForkOnGithub
  }
}
</script>
