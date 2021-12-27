<template>
  <main class="blog-main">
    <div class="timeline-centered">
      <div class="line"></div>
      <div class="present">Past</div>
      <div class="dot_tp"></div>
      <div class="born">Now</div>
      <div class="dot_bt"></div>
      <div v-for="(item, i) in histories" :key="'num'+i"
      class="timeline-entry">
        <div class="timeline-entry-inner">
          <div class="timeline-icon wow fadeInUp">
            <span class="timeline-number">{{i+1}}</span>
          </div>
          <div class="timeline-label wow fadeInUp">
            <span class="word">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: "page",
  async asyncData(context) {
    var that = this;
    var history = await context.$content('history').fetch();
    return {
      histories: history.content
    }
  },
  head () {
    return {
      title: "历史",
      meta: [
        { 
          hid: 'description',
          name: 'description',
          content: "A minimalist blog theme designed for Nuxt.js"
        }
      ]
    }
  }
}
</script>

<style>
.timeline-centered {
  position: relative;
  margin-top: 100px;
  margin-right: 10px;
  margin-bottom: 30px;
}
.timeline-centered::before {
  content: '';
  position: absolute;
  display: block;
  width: 4px;
  background: #f5f5f6;
  top: 50px;
  bottom: 50px;
  margin-left: 10px;
}
.line {
  position: absolute;
  display: block;
  width: 4px;
  background: #eee;
  top: -3%;
  right: -30px;
  bottom: -3%;
}
.present {
  position: absolute;
  top: -3%;
  right: 0;
  margin-top: -20px;
  line-height: 100%;
  color: #333;
  padding: 10px;
  background-color: #eee;
  border-radius: 3px;
}
.born {
  position: absolute;
  bottom: -3%;
  right: 0;
  margin-bottom: -20px;
  line-height: 100%;
}
.born, .present {
  font-size: 14px;
  font-family: Georgia,serif,Helvetica,"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","Source Han Sans CN","WenQuanYi Micro Hei",Arial,sans-serif;
  font-style: italic;
  color: #333;
  padding: 10px;
  background-color: #eee;
  border-radius: 3px;
}
.born::after, .present::after {
  left: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  border-color: rgba(136,183,213,0);
  border-left-color: #eee;
  border-width: 10px;
  margin-top: -10px;
}
.dot_tp {
  position: absolute;
  top: -3%;
  right: -35px;
  background-color: transparent;
  height: 15px;
  width: 15px;
  margin-top: -13px;
  border-radius: 50%;
  border: 3px solid #eee;
}
.timeline-centered .timeline-entry {
  position: relative;
  margin-top: 5px;
  margin-left: 20px;
  margin-bottom: 10px;
  clear: both;
}
.timeline-centered .timeline-entry::after, .timeline-centered .timeline-entry::before {
  content: " ";
  display: table;
}
.timeline-centered .timeline-entry .timeline-entry-inner {
  position: relative;
  margin-left: -20px;
}
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon {
  background: #fff;
  color: #737881;
  display: block;
  width: 40px;
  height: 40px;
  background-clip: padding-box;
  border-radius: 20px;
  text-align: center;
  border: 4px solid #f5f5f6;
  line-height: 40px;
  font-size: 15px;
  float: left;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  margin-left: -9px;
}
span.timeline-number {
  font-style: italic;
  font-size: 20px;
  line-height: 0;
  color: #e7e7e5;
  position: relative;
  top: -4px;
}
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label {
  position: relative;
  background: #eee;
  padding: 30px;
  margin-left: 60px;
  background-clip: padding-box;
  border-radius: 3px;
}
</style>