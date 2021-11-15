<template>
	<div id="gallery-pic" class="gallery-float">
    <div class="img-big">
      <img v-for="(photo,index) in photos" 
      @click="showFullScreen"
      :class="{
        'gallery-photo-in':index==activePhotoIndex,
        'gallery-photo-out':index!=activePhotoIndex
      }"
      :key="'big'+index" :src="photo" class="zoomable">
      <span v-if="photos.length>1">
        <div class="arrow-label arrow-left"
        @click="switchTo(leftIndex)">&lt;</div>
        <div class="arrow-label arrow-right"
        @click="switchTo(rightIndex)">&gt;</div>
      </span>
    </div>
    <div class="img-thumb-wrap">
      <div 
      v-for="(photo,index) in photos" :key="'thumb'+index"
      :for="'img-thumb-'+(index+1)" 
      :class="{
        'size50':(photos.length>4),
        'size100':(photos.length<5),
        'img-thumb-active':(index==activePhotoIndex)
      }"
      @click="switchTo(index)"
      class="img-thumb-label">
        <img class="img-thumb" :src="photo">
      </div>
    </div>
    <div id="mask_layer" 
    :class="{
      'hidden':!isMaskLoaded,
      'fade-in-anime':!isMaskHidden,
      'fade-out-anime':isMaskHidden
    }">
      <div id="mask_child" :style="{backgroundImage:'url('+photos[activePhotoIndex]+')'}"
      @click="hideFullScreen"></div>
      <div class="arrow arrow-left"
      v-if="photos.length>1"
      @click="switchTo(leftIndex)">&lt;</div>
      <div class="arrow arrow-right"
      v-if="photos.length>1"
      @click="switchTo(rightIndex)">&gt;</div>
    </div>
	</div>
</template>

<script>
export default {
    name:'PhotoGallery',
    props: {
      photos: {
        type: Array,
        required: true 
      }
    },
    data() {
      return {
        isMaskHidden: true,
        fullScreenImg: this.photos[0],
        activePhotoIndex: 0,
        isMaskLoaded: false
      }
    },
    computed: {
      leftIndex() {
        return this.activePhotoIndex==0
        ?this.photos.length-1
        :this.activePhotoIndex-1;
      },
      rightIndex() {
        return this.activePhotoIndex==this.photos.length-1
        ?0
        :this.activePhotoIndex+1;
      },
    },
    methods: {
      hideFullScreen() {
        this.isMaskHidden = true;
      },
      showFullScreen() {
        this.isMaskHidden = false;
        this.isMaskLoaded = true;
      },
      switchTo(i) {
        this.activePhotoIndex = i;
      }
    }
}
</script>

<style>
#gallery-pic {
  text-align: center;
}
.gallery-float {
  margin: 10px 10px 10px 30px;
  width: 460px;
}
.gallery-center {
  margin: 10px auto;
  width: 500px;
}
.gallery-left {
  margin: 10px auto;
  width: 710px;
  display: flex;
}
.gallery-left .img-big {
  margin-left: 40px;
  margin-right: 0px;
  width: 500px;
}
.gallery-left .img-thumb-wrap {
  margin-top: 20px;
  width: 150px;
}
.img-thumb-label {
  margin: 5px;
  opacity: 0.5;
  transition: opacity 0.3s;
  cursor: pointer;
  display: inline-block;
}
.img-big {
  position: relative;
  margin: 20px auto;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 1px 1px silver;
}
.arrow-label {
  position: absolute;
  top: 50%;
  left: 0px;
  right: 0px;
  width: 28px;
  color: white;
  text-align: center;
  line-height: 30px;
  vertical-align: top;
  background: rgba(0,0,0,0.5);
  transform: translateY(-15px);
  user-select: none;
  cursor: pointer;
}
.arrow-label:hover {
  opacity: 0.7;
}
.arrow-left {
  left: 0px;
  right: auto;
}
.arrow-right {
  left: auto;
  right: 0px;
}
.img-big img {
  top: 0px;
  left: 0px;
  width: 100%;
  animation-fill-mode: forwards;
  display: block;
}
.size100 {
  width: 100px;
  height: 100px;
}
.size50 {
  width: 50px;
  height: 50px;
}
.img-thumb-label:hover, .img-thumb-active {
  box-shadow: 0px 0px 1px 1px gray;
  opacity: 1;
}
img.img-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-center {
  text-align: center;
}
.hidden {
  display: none;
}
.gallery-photo-in {
  position: unset;
  animation: gallery-fade-in 0.5s;
}
.gallery-photo-out {
  position: absolute;
  animation: gallery-fade-out 0.5s;
}
@keyframes gallery-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes gallery-fade-out {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
@media all and (max-width: 768px) {
  .gallery-float {
    margin: 10px;
    width: auto;
    float: none;
  }
  .size50 {
    margin: 1px;
  }
  .size100 {
    margin: 1px;
    width: 50px;
    height: 50px;
  }
  .img-big {
    margin: 0px 0px 10px 0px;
    width: 100%;
    height: auto;
  }
}

.zoomable {
  cursor: zoom-in;
}
#mask_layer {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
}
#mask_child {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: zoom-out;
}
#mask_layer .arrow {
  position: absolute;
  top: 50%;
  left: 0px;
  right: 0px;
  width: 48px;
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 50px;
  vertical-align: top;
  background: rgba(0,0,0,0.5);
  transform: translateY(-25px);
  user-select: none;
  cursor: pointer;
}
#mask_layer .arrow:hover {
  opacity: 0.7;
}
#mask_layer .arrow-left {
  left: 0px;
  right: auto;
}
#mask_layer .arrow-right {
  left: auto;
  right: 0px;
}
.hidden {
  display: none;
}
.fade-in-anime {
  animation: fade-in 0.5s;
    z-index: 2;
}
.fade-out-anime {
  animation: fade-out 0.5s;
  animation-fill-mode: forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
    z-index: 2;
  }
  to {
    opacity: 1;
    z-index: 2;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
    z-index: 2;
  }
  99% {
    opacity: 0;
    z-index: 2;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
</style>