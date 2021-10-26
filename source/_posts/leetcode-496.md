---
title: 力扣496. 下一个更大元素 I
date: 2021-10-26 09:10:38
tags:
- 力扣
- 算法
- 单调栈
---

## 题目描述

给你两个 **没有重复元素** 的数组 `nums1` 和 `nums2` ，其中`nums1` 是 `nums2` 的子集。

请你找出 `nums1` 中每个元素在 `nums2` 中的下一个比其大的值。

`nums1` 中数字 `x` 的下一个更大元素是指 `x` 在 `nums2` 中对应位置的右边的第一个比 `x` 大的元素。如果不存在，对应位置输出 `-1` 。

**示例 1：**
```
输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
解释:
    对于 num1 中的数字 4 ，你无法在第二个数组中找到下一个更大的数字，因此输出 -1 。
    对于 num1 中的数字 1 ，第二个数组中数字1右边的下一个较大数字是 3 。
    对于 num1 中的数字 2 ，第二个数组中没有下一个更大的数字，因此输出 -1 。
```

**示例 2：**
```
输入: nums1 = [2,4], nums2 = [1,2,3,4].
输出: [3,-1]
解释:
    对于 num1 中的数字 2 ，第二个数组中的下一个较大数字是 3 。
    对于 num1 中的数字 4 ，第二个数组中没有下一个更大的数字，因此输出 -1 。
```

## 题解

### 算法思路

暴力模拟的算法肯定不用说了，对于`nums1`中的每一个元素，都找到其在`nums2`中的位置并继续线性地找下一个更大的元素，时间复杂度显然是$O(mn)$。

题目中建议使用一个$O(m+n)$时间复杂度的算法。评论区中看到这样一句话：

![](https://www.png8.com/imgs/2021/10/81f64888c96c8cc8.png)

单调栈的具体使用方法是：
1. 倒序遍历`nums2`，维护从栈底到栈顶元素**单调递减**。也就是在处理当前的`nums2[i]`时，将栈中所有小于`nums2[i]`的元素都弹出。
2. 其实在入栈的过程中，就已经找到了**右边第一个更大的元素**，
   1. 倒序遍历保证了**栈中的元素都是右边的**
   2. 单调又保证了，**比当前元素小的都出栈了，栈顶一定是比当前元素大的**
   3. 栈的先入先出保证了，**栈顶一定是最近刚刚放入的元素，因此是第一个更大的**

使用一个`map<当前元素，结果值>`在入栈的时候存储结果，`nums1`只需要直接以`nums[i]`为key访问即可。

### 代码实现

```java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        Deque<Integer> stack = new ArrayDeque<Integer>();
        for (int i = nums2.length - 1; i >= 0; --i) {
            int num = nums2[i];
            while (!stack.isEmpty() && num >= stack.peek()) {
                stack.pop();
            }
            map.put(num, stack.isEmpty() ? -1 : stack.peek());
            stack.push(num);
        }
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; ++i) {
            res[i] = map.get(nums1[i]);
        }
        return res;
    }
}
```