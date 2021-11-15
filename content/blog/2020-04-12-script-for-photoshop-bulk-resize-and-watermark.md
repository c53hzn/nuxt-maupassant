---
date: 2020-04-12
slug: script-for-photoshop-bulk-resize-and-watermark
language: 中文
title: 用JavaScript写一个Photoshop批处理脚本
description: 我攒了一个可以在Photoshop里批量调整图像大小和画布大小、添加水印、另存为的JavaScript脚本，又学到了不少东西。
categories: [技术]
tags: [JavaScript,Photoshop,批处理]
keywords: [Batch Processing]
comments: true
---

## 契机

最近需要给一批图片加水印，用 Photoshop 手动做了三张之后我就开始琢磨能不能用一些技术手段来加快处理。

以前处理图片的时候用过 `动作（Actions）`，这样可以一键完成多步重复性动作，比如调整图像大小和画布大小，然后置入水印图片、合并图层、保存到另一文件夹，这都是可以做到的。

但是 `动作` 的局限性在于无法根据要处理的图片的形状和尺寸来决定调整图像大小和画布大小的方式，而我要处理的图片就没有形状一样的，有的要以宽度为基准来缩放，有的要以高度为基准来缩放，这样第一步就错了，后面也就没有意义了。

于是我在 Google 上搜索相关信息，看看 `动作` 有没有个性化设置的可能，然后发现是可以的，但是能用来判断的条件还是太少了，不符合我的要求。

接着就看到有人说，可以试一下用 `脚本（Scripts）` 来处理，于是又研究了下，发现 Photoshop 接受三种语言写成的脚本： `AppleScript`、`JavaScript` 和 `VBScript`。

这不是巧了嘛！天下脚本千千万，JavaScript南波湾！那我们就开始抄，哦不，开始学吧！

新增英文版 [Write a JavaScript script for Photoshop image batch processing](/blog/script-for-photoshop-bulk-resize-and-watermark-en)，大家随便看看就可以了。

## 网上搜到可参考的 JavaScript 脚本

我在 Google 上搜到 3 个可用的用 JavaScript 写成的 Photoshop 脚本：

### 批量调整图像大小和画布大小

[https://ricardomoinhos.com/photoshop-scripting/](https://ricardomoinhos.com/photoshop-scripting/ "Photoshop Scripting – Batch resizing image size and image canvas")

这个脚本主要写的是指定一个源文件夹和目标文件夹，经过一番处理之后把源文件夹里的图片保存到目标文件夹里。他的一番处理里面包括了图像大小和画布大小，这些改一改就可以用了。

### 置入水印脚本

[http://www.mouseprints.net/old/dpr/PlaceWatermark.jsx](http://www.mouseprints.net/old/dpr/PlaceWatermark.jsx "JJMack's PlaceWatermark")

这个脚本写的是怎么加水印和调整水印在图片上的位置，由于我要加的水印尺寸和最终需要的画布大小一致，也不需要调整位置，所以有些步骤就删掉了。

### 合并所有可见图层

[https://community.adobe.com/t5/photoshop/help-need-a-script-to-merge-all-layers-even-if-there-is-only-one-layer/td-p/3301907?page=1](https://community.adobe.com/t5/photoshop/help-need-a-script-to-merge-all-layers-even-if-there-is-only-one-layer/td-p/3301907?page=1 "Merge all visible layers")

我需要一个“合并所有图层”的写法，所以也参考了这个帖子。Photoshop脚本的默认功能里面好像只有“合并所有可见图层”，但是因为这次的操作不会用到隐藏图层，所以这样应该就够了。

有以上 3 个脚本，基本上就满足我的需求了。

## 改写成适合我自己情况的脚本

其实我要对图片进行的处理很简单，根据图片的形状，把它的图像大小按比例缩放成不超过 `1333 x 1000 px` 的尺寸，然后扩展画布大小变成 `1600 x 1200 px` 的尺寸，然后再把一个 `1600 x 1200 px` 的水印图片导入进来，合并水印图层和背景图层，另存进一个新的文件夹，完事。

如果手动操作，差不多30秒可以完成一张图，但是如果用代码，不仅能提高速度，还可以解放我的双手，有这时间多刷刷微博也是好的呀。

需要注意的是 Photoshop 用的 JS 代码需要保存成 `.jsx` 格式的文件，使用时在 Photoshop 里面点击 `文件 > 脚本 > 浏览` 然后选择脚本执行即可。

完整的代码如下：

```javascript
app.preferences.rulerUnits = Units.PIXELS;
if (app.documents.length > 0) {//If there is file left open
  alert("Please close all open documents before running this script.");
} else {
  // The width and height for output. You may have to change this to make it dynamic.
  var finalWidth = 1600;
  var finalHeight = 1200;
  // Use folder selection dialogs to get the location of the input files
  // and where to save the new output files.
  var sourceFolder = Folder.selectDialog("Please choose the source image folder.", Folder.myDocuments);
  var destFolder = Folder.selectDialog("Please choose the target image folder", sourceFolder);
  var watermarkFile = File.openDialog("Please choose a watermark image file.", "*.png")
  // Consider only some images filetypes.
  var files = sourceFolder.getFiles(/.+\.(?:jpe?g|bmp|png)$/i);
  var numOfFiles = files.length;
  //Iterate through folder
  for (var i = 0; i < files.length; i++){
    var f = files[i];
    if (f instanceof Folder) {//if file is folder, jump to next
      continue;
    }
    var docRef = app.open(f);
    var layerRef = docRef.activeLayer;
    //Resize image according to shape
    var actualWidth = docRef.width;
    var actualHeight = docRef.height;
    var imgHeight = 1000;
    var imgWidth = actualWidth * imgHeight / actualHeight;
    if (imgWidth > 1333) {
      imgWidth = 1333;
      imgHeight = actualHeight * imgWidth / actualWidth;
    }
    docRef.resizeImage(imgWidth,imgHeight);
    //Resize canvas, keep img in center
    docRef.resizeCanvas(finalWidth, finalHeight, AnchorPosition.MIDDLECENTER);
    //Add watermark
    app.bringToFront();
    var logoFile = watermarkFile; 
    placeWatermark(logoFile);
    //Merge visible layers, there is no mergeAllLayer function
    try{
        activeDocument.mergeVisibleLayers();
    } catch(e) {}
    //Get filename and extension to use it when saving.
    var fileExtension = getFileExtension(f.name);
    var filename = getFilename(f.name);
    //Create new image and save as JPG
    var outputFile = new File(destFolder.absoluteURI + "/" + filename + "." + fileExtension);
    saveAsJPG(docRef, outputFile, 10);
    //Close active document, this cannot be done w/o merging all layers
    docRef.close();
  }
  alert(numOfFiles + " files have been processed.");
}

function getFileExtension(fullFilename) {
  return fullFilename.split('.').pop();
}
function getFilename(fullFilename) {
  var finalDotPosition = fullFilename.lastIndexOf(".") ;
  if ( finalDotPosition > -1 ) {
    return fullFilename.substr( 0 , finalDotPosition );
  }
  return fullFilename;
}
function saveAsJPG(docRef, saveFile, jpegQuality) {
  options = new JPEGSaveOptions();
  options.quality = jpegQuality;
  docRef.saveAs(saveFile, options, false,Extension.LOWERCASE);
}
function placeWatermark(Image){  
  if(!documents.length) {// if no image is open then return
    return;
  } 
  var fileObj = new File(Image);// the passed file
  if(!fileObj.exists){// If watermark file does not exits tell user 
    alert(fileObj.name  + " does not exist!");// Alert User 
    return;
  }  
  try{  
    var doc = app.activeDocument;// set Doc object to active document
    app.displayDialogs = DialogModes.NO;// Dialog off 
    var strtRulerUnits = app.preferences.rulerUnits;// Save Users ruler units 
    var strtTypeUnits = app.preferences.typeUnits;// Save Users Type units 
    app.preferences.rulerUnits = Units.PIXELS;// work with pixels 
    app.preferences.typeUnits = TypeUnits.PIXELS;// work with pixels 
    var layers = app.activeDocument.layers;// get layers
    app.activeDocument.activeLayer = layers[0];// Target Top Layer
    placeFile(fileObj);// Place in file the Watermark png file
  }
  catch(e) { alert(e + ': on line ' + e.line); }// inform user of error
  finally{  
    app.preferences.rulerUnits = strtRulerUnits;// Restore user ruler units  
    app.preferences.typeUnits = strtTypeUnits;// Restore user type units    
  };
}
function placeFile(placeFile) {  
  var desc21 = new ActionDescriptor();  
  desc21.putPath( charIDToTypeID('null'), new File(placeFile) );  
  desc21.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );  
  var desc22 = new ActionDescriptor();  
  desc22.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );  
  desc22.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );  
  desc21.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc22 );  
  executeAction( charIDToTypeID('Plc '), desc21, DialogModes.NO );  
}
```

## 心得体会

这次真的觉得“JavaScript南波湾”不是一句空话，到目前为止我想做的所有跟技术相关的事情几乎都可以用 JavaScript 来完成，这本身就是十分值得惊叹的一件事。

不过网上好像找不到系统学习 Photoshop 专用的 JavaScript 代码的教程，那我就只能下次再有别的需求的时候再学别的了。

在这里给 JavaScript 点个赞！