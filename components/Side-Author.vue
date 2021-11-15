<template>
  <div id="my-info">
    <nuxt-link to="history" class="no-decor-link">
      <div style="position: absolute;">关于作者</div>
      <img style="width: 64px;margin: 10px auto;display: block;" :src="profile_pic">
      <div>自学前端开发，专业电商运营，熟练掌握Photoshop和Excel的72种用法，欢迎来我的小站玩耍~</div>
    </nuxt-link>
  </div>
</template>

<script type="text/javascript">
export default {
	name:'Side-Author',
  data() {
    return {
      profile_pic: 'img/mypic.png',
    }
  }
}
</script>
<style type="text/css">
#my-info:hover {
  border-color: black;
}
#my-info a {
  display: block;
}
</style>