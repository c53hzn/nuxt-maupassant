---
date: 2021-06-26
slug: split-one-to-many-rows-to-one-to-one-rows
language: 中文
title: 如何在Excel内将一对多的两列分离成每行都是一对一的两列
description: 做数据交叉对照查询的时候，如果关键字挤在同一个单元格里，可以先将其分离出来变成多行，再进行查找。
categories: [技术]
tags: [Excel,分列,vlookup]
keywords: [MS Excel,WPS表格,VLOOKUP]
comments: true
---

## 分离单元格内多行数据并建立查找关系

先看看效果

![image](https://user-images.githubusercontent.com/30020736/123504634-39991a80-d68d-11eb-956a-13acfc5ae997.png)

## vlookup的关键字列包含多行数据？

假设我们要根据城市名查找省份名，最理想的原数据格式是这样的，用 VLOOKUP 一分钟就搞定。或者如果是左省右市，你自己把省份名复制到城市名右边，最多两分钟搞定。

![image](https://user-images.githubusercontent.com/30020736/123506517-24c18480-d697-11eb-931c-a038a7592dfc.png)

但是如果真的这么不幸，天要亡你，同事给了你单行、一对多的原始数据，先别急着跳楼，还有救。

![image](https://user-images.githubusercontent.com/30020736/123506907-399f1780-d699-11eb-8d1e-53a57234cff6.png)

## 在辅助列补写对应关系

我们可以在 C 列建立辅助列，填写公式 `=A1&"-"&SUBSTITUTE(B1,CHAR(10),CHAR(10)&A1&"-")`，然后点击单元格右下角十字按钮下拉填充。

![image](https://user-images.githubusercontent.com/30020736/123507166-8d5e3080-d69a-11eb-9578-936e104e6008.png)

解释：

`CHAR(10)` 是代表单元格内的换行符，我们可以用它来定位需要分离的位置，然后用 `SUBSTITUTE` 函数补足对应的省份名以及分离用的识别符号 `-` 以便下一步操作。

## 将补写好的结果用记事本中转一下

首先复制 C 列内容

![image](https://user-images.githubusercontent.com/30020736/123507375-969bcd00-d69b-11eb-833a-bafae28db005.png)

然后粘贴到空白记事本内，使用 `查找和替换` 功能，把英文的双引号删掉

![image](https://user-images.githubusercontent.com/30020736/123507432-e8445780-d69b-11eb-982a-83c9e0c34e43.png)

让记事本内变成这样

![image](https://user-images.githubusercontent.com/30020736/123507448-fc885480-d69b-11eb-9609-818e55bcaf4d.png)

从记事本内复制处理后的数据，再新建一个空白的 Excel 表格，粘贴进去

![image](https://user-images.githubusercontent.com/30020736/123507490-51c46600-d69c-11eb-89f0-b1eea38da035.png)

再点击菜单栏的 `数据` 选项卡，找到 `分列` 按钮

![image](https://user-images.githubusercontent.com/30020736/123507538-8b956c80-d69c-11eb-82c3-f738ef6893fe.png)

然后选择使用 `分隔符号` 来分隔

![image](https://user-images.githubusercontent.com/30020736/123507563-b2ec3980-d69c-11eb-95ec-68ae6469ac7b.png)

填写 `-` 作为分隔用的符号

![image](https://user-images.githubusercontent.com/30020736/123507577-d0210800-d69c-11eb-8bc5-702dafc57d22.png)

数据类型方面，如果不是日期也不是用于计算的数字，建议都选 `文本` ，这样比较安全。

![image](https://user-images.githubusercontent.com/30020736/123507634-12e2e000-d69d-11eb-8140-d37d9a77e2f3.png)

这样就完成啦！

![image](https://user-images.githubusercontent.com/30020736/123507662-2c842780-d69d-11eb-8c14-d3dd17f14a6c.png)

## 结语

给数据的人可能是无心的，对方也不知道拿到数据的人会怎么处理。如果你有时间再交涉一遍，让对方重新导出符合要求的数据，那自然是好的。但是如果时间不够了，可以尝试用这个方法来应急。

全文完~