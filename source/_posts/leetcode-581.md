---
title: 力扣581. 最短无序连续子数组
date: 2021-10-26 19:47:34
tags:
- 力扣
- 算法
- 双指针
- 贪心
categories:
- 力扣
---

## 题目描述

给你一个整数数组 `nums` ，你需要找出一个 **连续子数组** ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

请你找出符合题意的 **最短** 子数组，并输出它的长度。

**示例：**

> 输入：nums = [2,6,4,8,10,9,15]
> 
> 输出：5
> 
> 解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。

## 题解

### 暴力算法

#### 算法思路

考虑需要排序的最小序列，显然可以将整个数组都进行排序，最后变化的部分就是需要排序的最小序列

#### 代码实现

```java
class Solution {
    public int findUnsortedSubarray(int[] nums) {
        if (isSorted(nums)) {
            return 0;
        }
        int[] numsSorted = new int[nums.length];
        System.arraycopy(nums, 0, numsSorted, 0, nums.length);
        Arrays.sort(numsSorted);
        int left = 0;
        while (nums[left] == numsSorted[left]) {
            left++;
        }
        int right = nums.length - 1;
        while (nums[right] == numsSorted[right]) {
            right--;
        }
        return right - left + 1;
    }

    public boolean isSorted(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < nums[i - 1]) {
                return false;
            }
        }
        return true;
    }
}
```

### 一次遍历

#### 算法描述

![](https://pic-1302007621.cos.ap-shanghai.myqcloud.com/img/2021/10/26/19-54-41-976b843627c77943f3647e7925685662.png)

将数组 `nums` 分成三份：
1. 左边排好序的 `nums1`
2. 中间未排序的最小序列 `nums2`
3. 右边排好序的 `nums3`

考虑整个排好序的数组，和暴力算法类似地，左边排好序的所有元素（或者说是区间右边的最大元素），**小于其之后的所有元素**；同理，右边排好序的所有元素（或者说是区间左边的最小元素），**大于其之前的所有元素**。

从右到左遍历数组，维护最小值，最后一个大于最小值的元素（其左边的全部元素都符合 `nums1` 的性质）就是 `nums2` 的左边界；同理，从左到右遍历数组，维护最大值，最后一个小于最大值的元素（其右边的全部元素都符合 `nums3` 的性质）就是 `nums2` 的有边界。

#### 代码描述

```java
class Solution {
    public int findUnsortedSubarray(int[] nums) {
        int n = nums.length;
        int maxn = Integer.MIN_VALUE, right = -1;
        int minn = Integer.MAX_VALUE, left = -1;
        for (int i = 0; i < n; i++) {
            if (maxn > nums[i]) {
                right = i;
            } else {
                maxn = nums[i];
            }
            if (minn < nums[n - i - 1]) {
                left = n - i - 1;
            } else {
                minn = nums[n - i - 1];
            }
        }
        return right == -1 ? 0 : right - left + 1;
    }
}
```

- 一个 `for` 循环里面就可以进行完从左到右和从右到左的两次遍历。时间复杂度应该最后是一样的，但是代码更加简洁一些。