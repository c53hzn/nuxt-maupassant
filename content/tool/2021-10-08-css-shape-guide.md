---
date: 2021-05-28
slug: css-shape-guide
language: 中文
title: Pure CSS Shapes--A Handy Guidebook
description: Sample CSS codes for some commonly used shapes
categories: [CSS]
tags: [HTML]
keywords: [Gear, Heart, Pentagram, Hollow, Tomato]
comments: true
---

## Introduction

I made some shapes using only CSS codes, here are some of the features that they share:

- They are all DIV+CSS structured
- They are compatible with mobile devices and most browsers
- You can easily change size by specifying their outer width and height
- "box-sizing" must be set to "content-box"

Hope you will enjoy them.

## Pure CSS heart

<div class="heartOuter">
  <div class="heartInner">
    <div class="heartSquare">
    </div>
    <div class="heartHalfCircle1">
    </div>
    <div class="heartHalfCircle2">
    </div>
  </div>
</div>

### HTML part

```html
<div class="heartOuter">
  <div class="heartInner">
    <div class="heartSquare">
    </div>
    <div class="heartHalfCircle1">
    </div>
    <div class="heartHalfCircle2">
    </div>
  </div>
</div>
```

### CSS part
```css
/* css heart start */
.heartOuter{
  position: relative;
  margin: 0px auto;
  /* change size start */
  width: 200px;
  height: 200px;
  /* change size end */
}
.heartInner{
  position: absolute;
  top: 4%;
  left: 12.5%;
  width: 75%;
  height: 75%;
  transform: rotate(-45deg);
}
.heartSquare, .heartHalfCircle1, .heartHalfCircle2{
  position: absolute;
  background: red;
}
.heartSquare{
  top: 25%;
  left: 0px;
  width: 75%;
  height: 75%;
}
.heartHalfCircle1, .heartHalfCircle2{
  width: 75%;
  height: 75%;
}
.heartHalfCircle1{
  top: -15%;
  left: 0px;
  border-radius: 100% 100% 0 0;
  background: red;
}
.heartHalfCircle2{
  top: 25%;
  left: 40%;
  border-radius: 0 100% 100% 0;
}
/* css heart end */
```

## 8-tooth CSS gear

<div class="gearOuter">
  <div class="gearCircle"></div>
  <div class="tooth1"></div>
  <div class="tooth2"></div>
  <div class="tooth3"></div>
  <div class="tooth4"></div>
  <div class="tooth5"></div>
  <div class="tooth6"></div>
  <div class="tooth7"></div>
  <div class="tooth8"></div>
</div>

### HTML part

```html
<div class="gearOuter">
  <div class="gearCircle"></div>
  <div class="tooth1"></div>
  <div class="tooth2"></div>
  <div class="tooth3"></div>
  <div class="tooth4"></div>
  <div class="tooth5"></div>
  <div class="tooth6"></div>
  <div class="tooth7"></div>
  <div class="tooth8"></div>
</div>
```

### CSS part

```css
/*eight-tooth gear CSS start*/
.gearOuter{
  position: relative;
  /*change size start*/
  width: 300px;
  height: 300px;
  /*change size end*/
  margin: 0px auto;
}
.gearCircle{
  position: absolute;
  top: 16.67%;
  left: 16.67%;
  height: 33.33%;
  width: 33.33%;
  /*change border width start*/
  border: 50px solid gray;
  /*border-width must be 1/6 of outer box
    border-width cannot be percentage
  /*change border width end*/
  border-radius: 100%;
}
.tooth1, .tooth2, .tooth3, .tooth4, .tooth5, .tooth6, .tooth7, .tooth8{
  position: absolute;
  background: gray;
  border-radius: 20%;
}
.tooth1{
  top: 8.5%;
  left: 41.667%;
  width: 16.67%;
  height: 16.67%;
}
.tooth2{
  top: 41.667%;
  left: 8.5%;
  width: 16.67%;
  height: 16.67%;
}
.tooth3{
  transform:rotate(45deg);
  top: 18%;
  left: 18%;
  width: 16.67%;
  height: 16.67%;
}
.tooth4{
  transform:rotate(-45deg);
  top: 18%;
  right: 18%;
  width: 16.67%;
  height: 16.67%;
}
.tooth5{
  bottom: 8.5%;
  right: 41.667%;
  width: 16.67%;
  height: 16.67%;
}
.tooth6{
  top: 41.667%;
  right: 8.5%;
  width: 16.67%;
  height: 16.67%;
}
.tooth7{
  transform:rotate(45deg);
  bottom: 18%;
  left: 18%;
  width: 16.67%;
  height: 16.67%;
}
.tooth8{
  transform:rotate(-45deg);
  bottom: 18%;
  right: 18%;
  width: 16.67%;
  height: 16.67%;
}
/*eight-tooth gear CSS end*/
```

## CSS tomato consisted of circle and pentagram

<div class="tomato-container">
  <div class="tomato-circle">
    <div class="tomato-circle-inner">
      <div class="tomato-mask1"></div>
      <div class="tomato-mask2"></div>
      <div class="tomato-mask3"></div>
      <div class="tomato-mask4"></div>
      <div class="tomato-mask5"></div>
    </div>
  </div>
</div>

### HTML part

```html
<div class="tomato-container">
  <div class="tomato-circle">
    <div class="tomato-circle-inner">
      <div class="tomato-mask1"></div>
      <div class="tomato-mask2"></div>
      <div class="tomato-mask3"></div>
      <div class="tomato-mask4"></div>
      <div class="tomato-mask5"></div>
    </div>
  </div>
</div>
```

### CSS part

```css
/* css tomato start */
.tomato-container{
  margin: 20px auto;
  /* change size start */
  width: 200px;
  height: 200px;
  /* change size end */
}
.tomato-circle{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: darkgreen;
  transform: rotate(-30deg);
  overflow: hidden;
}
.tomato-circle-inner{
  position: absolute;
  top: 17%;
  left: 13%;
  margin: 0px auto;
  width: 100%;
  height: 100%;
  transform: rotate(-13deg);
}
.tomato-mask1, .tomato-mask2, .tomato-mask3, .tomato-mask4, .tomato-mask5{
  position: absolute;
  background: red;
}
.tomato-mask1{
  top: 25%;
  left: -10%;
  width: 60%;
  height: 100%;
  transform: skewy(20deg) rotate(0deg);
}
.tomato-mask2{
  top: -74%;
  left: -50%;
  width: 100%;
  height: 100%;
  transform: skewy(-10deg) rotate(0deg);
}
.tomato-mask3{
  top: 58%;
  left: 30%;
  width: 100%;
  height: 100%;
  transform: skewy(-20deg) rotate(36deg);
}
.tomato-mask4{
  top: -50%;
  left: 40%;
  width: 50%;
  height: 50%;
  transform: skewy(45deg) rotate(40deg);
}
.tomato-mask5{
  top: -13%;
  right: -29%;
  width: 50%;
  height: 50%;
  transform: skewx(10deg) skewy(-48deg) rotate(-15deg);
}
/* css tomato end */
```

## CSS solid pentagram

<div class="solid-pentagram-container">
  <div class="solid-pentagram-outer">
    <div class="solid-pentagram-inner">
      <div class="solid-triangle-outer-1">
        <div class="solid-triangle-inner"></div>
      </div>
      <div class="solid-triangle-outer-2">
        <div class="solid-triangle-inner"></div>
      </div>
      <div class="solid-triangle-outer-3">
        <div class="solid-triangle-inner"></div>
      </div>
    </div>
  </div>
</div>

### HTML part

```html
<div class="solid-pentagram-container">
  <div class="solid-pentagram-outer">
    <div class="solid-pentagram-inner">
      <div class="solid-triangle-outer-1">
        <div class="solid-triangle-inner"></div>
      </div>
      <div class="solid-triangle-outer-2">
        <div class="solid-triangle-inner"></div>
      </div>
      <div class="solid-triangle-outer-3">
        <div class="solid-triangle-inner"></div>
      </div>
    </div>
  </div>
</div>
```

### CSS part

```css
.solid-pentagram-container{
  /* change size start */
  width: 200px;
  height: 200px;
  /* change size end */
  border-radius: 100%;
  border: red solid 5px; 
}
.solid-pentagram-outer{
  position: relative;
  left: 10%;
  width: 77%;
  height: 77%;
}
.solid-pentagram-inner{
  position: relative;
  width: 100%;
  height: 100%;
}
.solid-triangle-outer-1, .solid-triangle-outer-2, .solid-triangle-outer-3{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.solid-triangle-outer-1{
  top: -2.5%;
  left: -25%;
  transform: rotate(-36deg);
}
.solid-triangle-outer-2{
  top: -16%;
  left: 10%;
  transform: rotate(36deg);
}
.solid-triangle-outer-3{
  top: 13%;
  right: -34.5%;
  transform: rotate(108deg);
}
.solid-triangle-inner{
  position: absolute;
  top: 122.5%;
  right: 0%;
  width: 200%;
  height: 100%;
  background-color: red;
  transform: rotate(108deg) skewx(54deg);
}
```

## CSS hollow pentagram

<div class="pentagram-container">
	<div class="pentagram-outer">
	  <div class="pentagram-inner">
	    <div class="pentagram-01"></div>
	    <div class="pentagram-02"></div>
	    <div class="pentagram-03"></div>
	    <div class="pentagram-04"></div>
	    <div class="pentagram-05"></div>
	  </div>
	</div>
</div>

### HTML part

```html
<div class="pentagram-container">
	<div class="pentagram-outer">
	  <div class="pentagram-inner">
	    <div class="pentagram-01"></div>
	    <div class="pentagram-02"></div>
	    <div class="pentagram-03"></div>
	    <div class="pentagram-04"></div>
	    <div class="pentagram-05"></div>
	  </div>
	</div>
</div>
```

### CSS part

```css
.pentagram-container{
  /* change size start */
  width: 200px;
  height: 200px;
  /* change size end */
}
.pentagram-outer{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
}
.pentagram-inner{
  position: relative;
  width: 100%;
  height: 100%;
}
.pentagram-01, .pentagram-02, .pentagram-03, .pentagram-04, .pentagram-05{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
}
.pentagram-01{
  top: -66%;
  left: 45%;
  transform: skewx(18deg);
}
.pentagram-02{
  top: -66%;
  right: 45%;
  transform: skewx(-18deg);
}
.pentagram-03{
  bottom: -22.5%;
  right: 75.5%;
  transform: rotate(18deg) skewy(18deg);
}
.pentagram-04{
  bottom: -22.5%;
  left: 75.5%;
  transform: rotate(-18deg) skewy(-18deg);
}
.pentagram-05{
  width: 100%;
  height: 100%;
  bottom: -80%;
  left: 2%;
  transform: rotate(54deg) skewy(-18deg);
}
```