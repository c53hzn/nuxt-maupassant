---
date: 2020-04-13
slug: script-for-photoshop-bulk-resize-and-watermark-en
language: English
title: Write a JavaScript script for Photoshop image batch processing
description: I made a JavaScript script to bulk resize image and canvas, then add watermark and save as new image, learnt a lot during this process.
categories: [Tech]
tags: [JavaScript,Photoshop,Batch Process]
comments: true
---

## Preface

This is a translation of my original article [用JavaScript写一个Photoshop批处理脚本](/blog/script-for-photoshop-bulk-resize-and-watermark).

Recently I need to add watermarks for a batch of images, I started to wonder if there are some technical methods to speed up this process after manually finished 3 images with Photoshop.

I have used `Actions` when I had to shoot photos and edit them all by myself. `Actions` can record and play repeating steps, I can use it to adjust image size and canvas size, or even add watermark image, merge layers and save in new folder.

But `Actions` has its limitations. This function cannot adjust image size and canvas size according to image shape, and the images that I have to process don't share the same shape, some of them need resizing based on their width, some on their height. If `Actions` fails at the first step, then there is no need to do the rest of the steps.

So I Googled relevant information to see if it is possible to customize `Actions` to meet my requirements. The result comes back positive, but there are only a few conditions to use, and they still cannot solve my problem.

Then I saw this post that said you can use `Photoshop Scripts` to do this, so I did some research on this and found that Photoshop accepts 3 scripting languages: `AppleScript`, `JavaScript` and `VBScript`.

How convenient that I happen to know one of these languages! *Among scripts used by everyone, JavaScript is always number one!* (Said by myself)

Let's start copying, no, start learning some tricks then.

## JavaScript scripts for Photoshop that I found online

I found 3 JavaScript scripts for Photoshop that might be useful on Google.

### Batch resizing image size and image canvas

[https://ricardomoinhos.com/photoshop-scripting/](https://ricardomoinhos.com/photoshop-scripting/ "Photoshop Scripting – Batch resizing image size and image canvas")

This script can bulk adjust image size and canvas size and do something more and save them in new folder, I can modify it for my use.

### PlaceWatermark scripts

[http://www.mouseprints.net/old/dpr/PlaceWatermark.jsx](http://www.mouseprints.net/old/dpr/PlaceWatermark.jsx "JJMack's PlaceWatermark")

This script can add watermark to images and adjust watermark position. I don't need adjusting since my watermark is exactly the same size as canvas size, so I can use this script after deleting some steps.

### Merge all visible layers

[https://community.adobe.com/t5/photoshop/help-need-a-script-to-merge-all-layers-even-if-there-is-only-one-layer/td-p/3301907?page=1](https://community.adobe.com/t5/photoshop/help-need-a-script-to-merge-all-layers-even-if-there-is-only-one-layer/td-p/3301907?page=1 "Merge all visible layers")

There is one thing not mentioned in previous scripts--how to merge all layers. One reply in this page talked about how to merge all visible layers, since I will not use any invisible layers, this will do though.

With the 3 scripts above, I can make my own script now.

## Modify the scripts to fit my needs

What I want to do with my images is simple, first adjust image size to no more than `1333 x 1000 px` and keep the width/height ratio at the same time, then expand canvas to `1600 x 1200 px` and add a `1600 x 1200 px` watermark to it, merge watermark layer and background layer and save in a new folder, done.

If done by hand, I can finish one image in 30 seconds, but I can speed up the process and set my hands free with scripts, now I will have time for more cat videos on Youtube.

Also please note that the JS code file needs to be saved as `.jsx` format, you can click `File > Scripts > View` in Photoshop to select script and run it.

Full scripts is as follows

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

## Experience from this

I really like this saying(by myself) *"JavaScript is always number one"* now, so far I can finish most of the tech-related works with JavaScript, this alone is amazing.

But it seems that there are not many learning materials about JavaScript for Photoshop online, I'll have to wait til next time I encounter a problem to learn more then.

Thumb up for JavaScript here!