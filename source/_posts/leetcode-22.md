---
title: 力扣22. 括号生成
date: 2021-10-27 09:18:48
tags:
- 力扣
- 算法
- 贪心
- 字符串
categories:
- 力扣
---

## 题目描述

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

有效括号组合需满足：左括号必须以正确的顺序闭合。

**示例 1：**

> 输入：n = 3
> 
> 输出：["((()))","(()())","(())()","()(())","()()()"]

**示例 2：**

> 输入：n = 1
> 
> 输出：["()"]

## 题解

### 算法思路

看到问题规模很小，就知道应该是用比较暴力的回溯法。

最暴力的回溯法是，找到所有的**不管合不合法的，用 `(` 和 `)` 填充的**字符串，之后挨个检查一遍合法性进行筛选。

稍微好一点的回溯法是，在填充字符串的过程中进行**递推的**合法性检查，最后只将合法的字符串放入最终结果中。

如何在填充的过程中判断一个字符串是否合法呢？和有多种括号的{% post_link leetcode-20 %}必须用栈进行匹配不同，只有一种括号可以**只用计数器**（在多种括号的题目中是一种错误的思路）

维护两个计数器：
- 左括号出现的次数 `total`。如果有 `total < n`，就可以继续添加左括号
- 尚未被匹配的左括号 `rest`。如果有 `rest > 0`，就可以继续添加右括号（因为可以匹配右括号的左括号一定**已经**被添加进了字符串，所以只能从 `rest` 里面的左括号中选择）

### 代码实现

```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new ArrayList<String>();
        backtrack(ans, new StringBuilder(), 0, 0, n);
        return ans;
    }

    public void backtrack(List<String> ans, StringBuilder cur, int open, int close, int max) {
        if (cur.length() == max * 2) {
            ans.add(cur.toString());
            return;
        }
        if (open < max) {
            cur.append('(');
            backtrack(ans, cur, open + 1, close, max);
            cur.deleteCharAt(cur.length() - 1);
        }
        if (close < open) {
            cur.append(')');
            backtrack(ans, cur, open, close + 1, max);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}
```

- 用 `StringBuilder`，并且在跳出下一次递归调用之后，删除刚刚添加的尾部元素