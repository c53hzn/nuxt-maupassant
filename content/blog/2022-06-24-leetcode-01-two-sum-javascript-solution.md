---
date: 2022-06-24
slug: leetcode-01-two-sum-javascript-solution
language: 中文
title: leetCode第1题Two Sum的JS解法
description: 加法的三个要素已知两个，那么第三个也很好找了。
categories: [技术]
tags: [leetCode,JavaScript]
keywords: [刷题]
comments: true
---

## Two Sum题目

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

Constraints:

- 2 <= nums.length <= 104
- -109 <= nums[i] <= 109
- -109 <= target <= 109
- Only one valid answer exists.

## 分析

题目给出了一个整数的数列和一个整数，要求在数列中找到加起来正好是那个整数的两个数字，然后返回两个数字元素的下标。

其实不需要把数列里面的数字两两组合，全都加一遍。

我们已经知道两数之和是多少，那么从数列里拿出一个数，减一下就知道另一个数是多少了，然后再往后遍历，看看有没有这个数。

所以我们遍历的时候要做两件事：

1. 记录已经遍历过的数字及其下标
2. 找到和它对应的数字

我们可以用一个 `object` 来记录遍历过的数字，由于查询是否存在时可能会遇到下标 `0` ，所以我们统一给所有下标 `+1` ，在输出的时候再减去即可。

## 解法

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var obj = {};
    for (let i = 0; i < nums.length; i++) {
        if (obj[target-nums[i]]) {
            return [i,obj[target-nums[i]]-1];
        } else {
            obj[nums[i]] = i+1;
        }
    }
};
```

## 思考

一开始还想了一些所谓的特殊情况，比如两数相等之类的，后来发现没必要，先查询是否存在对应数字，有就输出，没有才存入当前数字，这样就行了。

全文完。
