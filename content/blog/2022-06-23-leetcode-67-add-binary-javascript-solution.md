---
date: 2022-06-23
slug: leetcode-67-add-binary-javascript-solution
language: 中文
title: leetCode第67题Add Binary的JS解法
description: 其实这题的重点不在于二进制和十进制的转换。
categories: [技术]
tags: [leetCode,JavaScript]
keywords: [刷题]
comments: true
---

## Add Binary题目

Given two binary strings a and b, return their sum as a binary string.

**Example 1:** 

```
Input: a = "11", b = "1"
Output: "100"
```

**Example 2:**

```
Input: a = "1010", b = "1011"
Output: "10101"
 ```

Constraints:

- 1 <= a.length, b.length <= 104
- a and b consist only of '0' or '1' characters.
- Each string does not contain leading zeros except for the zero itself.

## 分析

题目要求把两个二进制数字相加，输出一个二进制数字的字符串。

一开始我以为是二进制转十进制再转二进制的问题，费劲写好两个转换的过程之后发现，如果出现了很大的数字，中间就会丢失精度，然后就出错了。

然后我在网上搜了一下，发现原来可以直接在二进制状态下解决。别人写的解法我就不看了，套用他的思路来写个自己的。

先把两个数字 `split` 变成两个 `array` ，然后对应数位的数字相加，如果需要进位，则加到左边的数字上，再要进位就再往左加。整个就是一个小学数学的思路。

## 解法

```js
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    if (!a.length) return b;
    if (!b.length) return a;
    var arrA = a.split("");
    var arrB = b.split("");
    var len = arrA.length>arrB.length?arrA.length:arrB.length;
    var arr = [];
    for (let i = 0; i < len; i++) {
        let lastA = arrA.length-i-1;
        let lastB = arrB.length-i-1;
        let last = len-i-1;
        let num = arr[last]?arr[last]:0;
        num += (arrA[lastA]?Number(arrA[lastA]):0) + (arrB[lastB]?Number(arrB[lastB]):0);
        arr[last] = num%2;
        if (num>1) {
            if (last==0) {
                arr.unshift(1);
            } else {
                arr[last-1] = 1;
            }
        }
    }
    return arr.join("");
};
```

顺便附送一下二进制转十进制和十进制转二进制的解法

```js
function biToDe(bi) {
    var arr = bi.split("");
    var result = arr[arr.length-1]*1;
    for (let i = 0; i < arr.length-1; i++) {
        result += arr[i]*Math.pow(2,arr.length-i-1);
    }
    return String(result);
}
function deToBi(de) {
    de = de*1;
    var arr = [];
    while (de>0) {
        arr.unshift(de%2);
        de = Math.floor(de/2);
    }
    return arr.length?arr.join(""):"0";
}
```

## 思考

这是两个二进制数相加，如果是三个、四个，或者直接给一个数列的二进制数字呢？

感觉最简单的做法是直接拿前面的算法来遍历数组，累加一遍就有了。

恩，先这样。
