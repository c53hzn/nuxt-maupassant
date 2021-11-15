<template>
  <div class="container">
    <Navigation></Navigation>
    <main>
      <nuxt />
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
export default {
  components: {
    Navigation,
    Footer
  }
}
</script>


<style>

</style>

