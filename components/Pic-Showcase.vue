<template>
  <div class="pic-showcase">
    <div :class="picClass[index]"
    v-for="(pic,index) in pic_showcase_pics"
    :key="'showcasepic'+index">
      <div class="pic-showcase-bg" 
      :class="{
        'h-full pos-absolute':txt_pos!='below',
        'h-200 pos-relative rectangle-bottom':txt_pos=='below'&&(column==4||column==3),
        'h-300 pos-relative rectangle-bottom':txt_pos=='below'&&column==2
      }"
      :style="{backgroundImage: 'url('+pic.src+')'}"
      >
        <div v-if="pic.tag" class="pic-showcase-unit-tag">{{pic.tag}}</div>
      </div>
      <div :class="'pic-showcase-text-'+txt_pos">
        <div v-if="pic.link" class="pic-showcase-title">
          <a :href="pic.link" :title="pic.title" :target="linkTarget">
            <span class="title" v-html="pic.title"></span>
          </a>
          <p v-if="pic.desc" v-html="pic.desc"></p>
        </div>
        <div v-if="!pic.link" class="pic-showcase-title">
          <strong>{{pic.title}}</strong>
          <p v-if="pic.desc" v-html="pic.desc"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Pic-Showcase',
  data: function() {
  	var that = this;
  	var arr = that.pic_showcase_pics;
  	var picClass = [];
  	for (let i = 0; i < arr.length; i++) {
  		let tempClass = "";
  		if (that.txt_pos=='below') {
  			tempClass = 'pic-showcase-unit-'+that.column+' h-auto';
  		} else {
  			tempClass = 'pic-showcase-unit-'+that.column+' h-300'
  		}
  		if (that.isNeedFeat == "enabled" && !arr[i].feat) {
  			tempClass += " mobile-hidden";
  		}
  		picClass.push(tempClass);
  	}

    var linkTarget = that.newWindow
    ?that.newWindow==1?'_blank':''
    :'_blank';


  	return {
  		picClass,
      linkTarget
  	}
  },
  props: {
    pic_showcase_pics: {
      type: Array,
      /*[
          {
            src: "/img/portfolio/portfolio01.png", //required
            title: "Markdown editor", //required
            link: "https://codepen.io/c53hzn/full/YzzRzxR", //optional
            desc: "This is a description", //optional
            tag: "HKD 100", // optional
            feat: true
          },
      ]*/
      required: true
    },
    column: {//2, 3, 4
      type: String,
      required: true
    },
    txt_pos: {//left, bottom, below
      type: String,
      required: true
    },
    isNeedFeat: {
      type: String
    },
    newWindow: {
      type: String
    }
  }
}
</script>

<style>
.pic-showcase {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
}
.pic-showcase-unit-2, .pic-showcase-unit-3 {
  position: relative;
  margin: 20px;
  border: 1px solid silver;
  border-radius: 5px;
  overflow: hidden;
}
.pic-showcase-unit-2 {
  width: 45%;
}
.pic-showcase-unit-3 {
  width: 29%;
}
.pic-showcase-unit-4 {
  position: relative;
  margin: 20px 10px 0px 10px;
  width: 22%;
  border: 1px solid silver;
  border-radius: 5px;
  overflow: hidden;
}
.pic-showcase-bg {
  width: 100%;
  background: no-repeat top center;
  background-size: cover;
  border: 2px solid white;
  border-radius: 6px;
}
.rectangle-bottom {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.pic-showcase-unit-tag {
  position: absolute;
  left: 5px;
  bottom: 5px;
  padding: 2px 8px;
  font-size: 12px;
  background: rgb(225, 225, 225);
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 16px;
}
.pic-showcase-text-left {
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  color: white;
  background: rgba(0,0,0,0.7);
  transform: translateX(-100%);
  transition: transform 0.5s;
  justify-content:center;
  display:flex;
}
.pic-showcase-text-left div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
}
.pic-showcase-text-bottom {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  color: white;
  background: rgba(0,0,0,0.7);
  transform: translateY(100%);
  transition: transform 0.5s;
}
.pic-showcase-text-below {
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 50%;
}
.pic-showcase-unit-2 .pic-showcase-text-bottom {
  height: 50%;
  display: table;
}
.pic-showcase-unit-2 .pic-showcase-text-bottom div {
  padding: 20px;
  display: table-cell;
  vertical-align: middle;
}
.pic-showcase-unit-2:hover > .pic-showcase-text-left {
  transform: translateX(0);
}
.pic-showcase-unit-2:hover > .pic-showcase-text-bottom {
  transform: translateY(0);
}
.pic-showcase-unit-3:hover > .pic-showcase-text-left {
  transform: translateX(0);
}
.pic-showcase-unit-3:hover > .pic-showcase-text-bottom {
  transform: translateY(0);
}
.pic-showcase-unit-4:hover > .pic-showcase-text-left {
  transform: translateX(0);
}
.pic-showcase-unit-4:hover > .pic-showcase-text-bottom {
  transform: translateY(0);
}
.pic-showcase-title {
  margin: 0px 5px;
  padding: 16px 0px;
  text-align: center;
}
.pic-showcase-title span.title {
  font-weight: bold;
}
.h-auto .pic-showcase-title {
  padding: 8px 0px 10px 0px;
}
.h-auto .pic-showcase-title span.title {
  max-height: 108px;
  display: block;
  overflow: hidden;
}
.pic-showcase-unit-4.h-auto .pic-showcase-title span.title {
  font-size: 16px;
  font-weight: normal;
  line-height: 18px;
  max-height: 92px;
}
.h-200 {
  height: 200px;
}
.h-300 {
  height: 300px;
}
.h-400 {
  height: 400px;
}
.h-500 {
  height: 500px;
}
.h-full {
  height: 100%;
}
.h-half {
  height: 50%;
}
.h-auto {
  height: auto;
}
.pos-relative {
  position: relative;
}
.pos-absolute {
  position: absolute;
}
@media all and (max-width: 1024px) {
	.pic-showcase-unit-2 {
		margin: 0px 10px 20px 10px;
	}
  .pic-showcase-text-bottom {
    transform: translateY(0);
  }
  .pic-showcase-text-left {
    transform: translateX(0);
    position: relative;
  }
}
@media all and (max-width: 768px) {
  .pic-showcase-unit-2, .pic-showcase-unit-4, .h-300 {
    height: 200px;
  }
  .pic-showcase-unit-2 {
    width: 44%;
  }
  .pic-showcase-unit-3 {
  	margin: 0px 10px 10px 10px;
    width: 45%;
  }
  .h-auto {
    height: auto;
  }
  .h-auto .h-200 {
    height: 140px;
  }
  .pic-showcase-unit-4 {
    width: 22%;
  }
}
@media all and (max-width: 539px) {
  .pic-showcase-unit-2 {
  	margin: 0px 5px 10px 5px;
    width: 100%;
  }
  .pic-showcase-unit-3 {
  	margin: 0px 5px 10px 5px;
    width: 47%;
  }
  .pic-showcase-unit-4 {
  	margin-left: 5px;
    margin-right: 5px;
    width: 46%;
  }
  .mobile-hidden {
  	display: none;
  }
}
@media all and (max-width: 425px) {
  .pic-showcase-unit-3 {
    width: 48%;
  }
}
</style>
