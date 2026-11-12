<template>
  <div class="container-main">
    <AppNavigation></AppNavigation>
    <div class="blog-wrap">
      <slot />
      <AppAside></AppAside> 
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

