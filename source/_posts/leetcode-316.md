---
title: 力扣316. 去除重复字母
date: 2021-10-26 16:19:41
tags:
- 力扣
- 算法
- 单调栈
- 字符串
categories:
- 力扣
---

## 题目描述

给你一个字符串 `s` ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 **返回结果的字典序最小**（要求不能打乱其他字符的相对位置）。

**示例：**


> 输入：s = "cbacdcbc"
> 
> 输出："acdb"


## 题解

### 算法思路

题目与其说是“去除重复字符”，更重要的是“返回结果的**字典序最小**”。

不考虑去除重复字符的要求，如果要使得当前字符串在删除一个字符`ch`之后字典序最小，就应该：

> 找到最小的满足`s[i] > s[i+1]`的下标`i`，并删除`s[i]`。称`s[i]`为**关键字符**

一种直觉是要用单调栈的，最后的单调栈含有的字符应该就是该返回的字符序列。具体的操作逻辑是：

- 入栈：
  - 首先考虑**重复**问题。扫描栈中是否已经有了当前字符，如果有则直接跳过

- 出栈
  - 首先考虑**必须有一个**的性质。应该维护一个每一个字符后面剩余出现次数的`map`（其实不必使用`HashMap`，直接用数组线性映射就可以），如果**只有一个就不能进行出栈**。
  - 其次考虑**字典序**问题。从前往后扫描原字符串，直觉上如果栈顶元素大于当前元素，就应该进行出栈。

### 代码实现

```java
class Solution {
    public String removeDuplicateLetters(String s) {
        boolean[] vis = new boolean[26];
        int[] num = new int[26];
        for (int i = 0; i < s.length(); i++) {
            num[s.charAt(i) - 'a']++;
        }

        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (!vis[ch - 'a']) {
                while (sb.length() > 0 && sb.charAt(sb.length() - 1) > ch) {
                    if (num[sb.charAt(sb.length() - 1) - 'a'] > 0) {
                        vis[sb.charAt(sb.length() - 1) - 'a'] = false;
                        sb.deleteCharAt(sb.length() - 1);
                    } else {
                        break;
                    }
                }
                vis[ch - 'a'] = true;
                sb.append(ch);
            }
            num[ch - 'a'] -= 1;
        }
        return sb.toString();
    }
}
```

- `StringBuffer`可以直接当作栈来使用
  - `peek()`、`pop()`可以直接用比较暴力的`xxxAt(length() - 1)`进行实现
  - `push()`直接用`append()`就比较优雅
- 判定字符是否在栈中，**不需要进行扫描**，只要不断**更新一个`boolean`数组**就可以