---
title: 力扣402. 移掉 K 位数字
date: 2021-10-26 18:44:37
tags:
- 力扣
- 算法
- 单调栈
- 字符串
- 贪心
categories:
- 力扣
---

## 题目描述

给你一个以字符串表示的非负整数 `num` 和一个整数 `k` ，移除这个数中的 `k` 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。

**示例：**

> 输入：num = "1432219", k = 3
> 
> 输出："1219"
>``
> 解释：移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 

## 题解

### 算法思路

- 单调栈
- 贪心

#### 贪心

考虑这样的贪心策略：

对于两个**位数相同**的整数$a$和$b$，一种直观的比较两个数大小的方法是：**从左向右**看去，直到某一位上出现**第一个不相同的数字**，该位数字更小的整数值更小

对于该题目，考虑某一次删除数字。由于无论删除哪一个数字，最后得到的整数的总位数是相同的，因此就可以使用上面的引理。

这里首先给出结论：

> 应删除第一个满足$s[i]>s[i+1]$的$s[i]$。

证明比较简单：
- 对于小于$i$的情况，如果删除，则更大的数字会提到前面，得到的结果势必是更大的。
- 对于大于$i$的情况，如果删除，则紧挨着$i$的更小梳子不会被提到前面，得到的结果也势必是更大的。

#### 单调栈

这里依旧要在一个线性的数据结构中，找到每一个满足$s[i]>s[i+1]$的$s[i]$。显然就是要用非常经典的单调栈。

但是题目中有一个限定条件：**最多删除k个数字**。添加相应的判断分支即可。

### 代码实现

```java
class Solution {
    public String removeKdigits(String num, int k) {
        Deque<Character> deque = new LinkedList<Character>();
        int length = num.length();
        for (int i = 0; i < length; ++i) {
            char digit = num.charAt(i);
            while (!deque.isEmpty() && k > 0 && deque.peekLast() > digit) {
                deque.pollLast();
                k--;
            }
            deque.offerLast(digit);
        }
        
        for (int i = 0; i < k; ++i) {
            deque.pollLast();
        }
        
        StringBuilder ret = new StringBuilder();
        boolean leadingZero = true;
        while (!deque.isEmpty()) {
            char digit = deque.pollFirst();
            if (leadingZero && digit == '0') {
                continue;
            }
            leadingZero = false;
            ret.append(digit);
        }
        return ret.length() == 0 ? "0" : ret.toString();
    }
}
```

官方的代码似乎挺一般的，贴一下自己写的：

```java
class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder sb = new StringBuilder();
        int count = 0;

        for (int i = 0; i < num.length(); ++i) {
            char curChar = num.charAt(i);
            while (sb.length() != 0 && sb.charAt(sb.length() - 1) > curChar)
                if (count < k) {
                    sb.deleteCharAt(sb.length() - 1);
                    ++count;
                } else
                    break;
            sb.append(curChar);
        }

        if (count < k)
            sb.delete(sb.length() - (k - count), sb.length());

        int lastZero = 0;
        while (lastZero < sb.length() && sb.charAt(lastZero) == '0')
            ++lastZero;
        sb.delete(0, lastZero);
        if (sb.length() > 0)
            return sb.toString();
        else
            return "0";
    }
}
```