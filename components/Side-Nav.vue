<template>
  <div class="side-nav" 
  :class="{'show': isShow, 'desk-fix': !!isDeskFix}">
    <slot></slot>
    <div class="close"
    @click="toggle">
      <i class="fa fa-window-close-o"></i>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
	name:'Side-Nav',
  data() {
    return {
      isShow: false
    }
  },
  props: {
    isDeskFix: {
      type: Boolean
    }
  },
  methods: {
    toggle() {
      this.isShow = this.isShow?false:true;
    }
  }
}
</script>
<style type="text/css">
.side-nav .close {
  position: absolute;
  top: 4px;
  right: 18px;
  font-size: 24px;
  cursor: pointer;
  display: none;
}
.desk-fix {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  padding: 10px;
  width: 400px;
  height: 400px;
  overflow-y: overlay;
  display: none;
}
.desk-fix .close {
  display: block;
}
@media all and (max-width: 768px) {
  .side-nav {
    position: fixed;
    top: 0px;
    left: 0px;
    margin: 60px 10px 40px 10px;
    padding: 10px;
    width: calc(100vw - 20px);
    height: calc(100vh - 100px);
    overflow-y: scroll;
    display: none;
	}
  .side-nav .close{
    display: block;
  }
}
.show {
  display: block;
}
</style>