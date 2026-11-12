<template>
  <nav>
    <div class="nav-wrap">
      <header> 
        <nuxt-link class="no-decor-link nav-home" to="/">
          {{site_name}}
        </nuxt-link>
        <div class="nav-subtitle">
          {{site_description}}
        </div>
      </header>
      <ul class="nav-ul">
        <li class="nav-link" v-for="(link, index) in navLinks"
        :key="index">
          <nuxt-link v-if="link.target=='internal'"
          :to="link.path" class="no-decor-link">
            <i class="fa" :class="link.fa_class"></i>
            {{link.title}}
          </nuxt-link>
          <a v-if="link.target=='external'" target="_blank"
          :href="link.path" class="no-decor-link">
            <i class="fa fa-external-link"></i>
            {{link.title}}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const author_name = settings.value.author_name;
const site_name = settings.value.site_name;
const site_description = settings.value.site_description;
const navLinks = settings.value.navLinks;
</script>
