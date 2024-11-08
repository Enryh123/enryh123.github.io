---
title: Lesson 4 - 二分算法
order: 4
---

## 什么是二分算法

理解了普通的二分查找之后，我们可以进一步讨论「二分答案」这一类算法，它主要用于求解满足某种条件的最大值或最小值。例如「最小的最大，最大的最小」这一类问题。

这种问题的答案通常是在某个范围内，并且具有单调性：当我们知道某个数符合条件后，往往可以推断出比它更大（或更小）的数也符合条件或不符合条件。

::: info 适用情况
二分答案算法是针对问题的结果进行二分，而不是查找某个具体数值。它通常用于以下情况：

- 结果在一个确定范围，需要探索。
- 在范围中，某个值及其以上/以下的所有数值都满足某一特定条件，而另一部分则不满足。
- 我们需要找到满足条件的最大值或最小值。
  :::

## 问题示例

### [2828 字典找字 ](https://oj.aicoders.cn/problem/2828)

**问题分析**

题目要求在字典的指定页码范围内使用二分查找法找到某一页的页码，并计算查找次数。二分查找法的思想是每次将搜索范围缩小一半，直到找到目标页码。初始范围是 15 到 45 页，取中间页码 `mid = (最大值 + 最小值) / 2`，并根据中间值与目标页码的关系调整查找范围。

::: tip
在进行二分查找时，每次计算 `mid` 后，根据 `n` 与 `mid` 的大小关系决定是继续查找左半部分还是右半部分，直到 `mid` 等于 `n`。
:::

::: details 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

// 函数：binary_search_count
// 功能：在字典的页码范围内查找目标页码，并返回查找次数
int binary_search_count(int n) {
    int left = 15;        // 定义查找的最小页码
    int right = 45;       // 定义查找的最大页码
    int count = 0;        // 计数器，用于记录查找次数

    // 当左边界小于等于右边界时，继续查找
    while (left <= right) {
        count++;                  // 每次查找计数器加一
        int mid = (left + right) / 2;  // 计算当前查找的中间页码

        if (mid == n) {           // 如果中间页码等于目标页码
            return count;         // 返回查找次数
        } else if (mid < n) {     // 如果中间页码小于目标页码
            left = mid + 1;       // 将左边界移动到 mid + 1
        } else {                  // 如果中间页码大于目标页码
            right = mid - 1;      // 将右边界移动到 mid - 1
        }
    }

    return count;                 // 返回查找次数（理论上不会执行到这里）
}

int main() {
    int n;
    cin >> n;                      // 输入目标页码
    cout << binary_search_count(n) << endl;  // 输出查找次数
    return 0;
}
```

:::

### [2830 猜数游戏 2 ](https://oj.aicoders.cn/problem/2830)

**问题分析**

题目要求判断小童在二分法猜数的情况下是否能在 20 次内猜中一个不超过 10 亿的数字。二分查找法每次将查找范围缩小一半，因此可以快速锁定目标数字。由于查找的次数与数据范围成对数关系，10 亿的数值在 20 次以内可以确定其位置。

::: tip
二分查找在每次判断时都会缩小一半的范围，通过计数器记录查找次数，判断是否在 20 次之内找到目标数字。如果查找次数不超过 20，则返回"YES"，否则返回"NO"。
:::

::: details 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

// 函数：can_win_game
// 功能：判断是否可以在20次以内猜中目标数字
string can_win_game(int n) {
    int left = 1;             // 定义查找的最小值
    int right = 1000000000;   // 定义查找的最大值
    int count = 0;            // 计数器，用于记录查找次数

    // 当左边界小于等于右边界时，继续查找
    while (left <= right) {
        count++;                  // 每次查找计数器加一
        int mid = (left + right) / 2;  // 计算当前查找的中间值

        if (mid == n) {           // 如果中间值等于目标数字
            return (count <= 20) ? "YES" : "NO";  // 判断是否在20次内找到
        } else if (mid < n) {     // 如果中间值小于目标数字
            left = mid + 1;       // 将左边界移动到 mid + 1
        } else {                  // 如果中间值大于目标数字
            right = mid - 1;      // 将右边界移动到 mid - 1
        }
    }

    return "NO";  // 如果超过查找范围（理论上不会执行到这里）
}

int main() {
    int n;
    cin >> n;                     // 输入目标数字
    cout << can_win_game(n) << endl;  // 输出是否在20次内猜中
    return 0;
}
```

:::

### [2862 团队猜数 ](https://oj.aicoders.cn/problem/2862)

**问题分析**

题目要求三人分别对给定的三个数字进行二分查找，并计算三次查找所需的总次数。每个数的查找过程独立进行，通过二分查找法计算每个人猜中目标所需的次数，最后累加得到团队的总猜数次数。

::: tip
在每个数字的查找过程中，初始范围是从 1 到 10 亿，使用二分查找法逐步缩小范围，直到找到目标数字，并记录每次查找的次数。
:::

::: details 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

// 函数：binary_search_count
// 功能：返回查找给定目标数所需的二分查找次数
int binary_search_count(int n) {
    int left = 1;             // 定义查找的最小值
    int right = 1000000000;   // 定义查找的最大值
    int count = 0;            // 计数器，用于记录查找次数

    while (left <= right) {
        count++;                      // 每次查找计数器加一
        int mid = (left + right) / 2; // 计算当前查找的中间值

        if (mid == n) {               // 如果中间值等于目标数
            return count;             // 返回当前查找次数
        } else if (mid < n) {         // 如果中间值小于目标数
            left = mid + 1;           // 将左边界移动到 mid + 1
        } else {                      // 如果中间值大于目标数
            right = mid - 1;          // 将右边界移动到 mid - 1
        }
    }

    return count;  // 返回查找次数
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;  // 输入三个目标数
    int total_count = binary_search_count(a)
                    + binary_search_count(b)
                    + binary_search_count(c);  // 计算三人的总猜数次数
    cout << total_count << endl;  // 输出团队总次数
    return 0;
}
```

:::

### [2832 找苹果 ](https://oj.aicoders.cn/problem/2832)

**问题分析**

小鹿有一堆按照重量从小到大排列的苹果，目标是判断其中是否有一个重量为`m`的苹果。题目要求用二分查找法在已排序的数组中快速查找目标值。如果找到了目标重量，则输出“YES”，否则输出“NO”。

::: tip
二分查找适用于已排序的数组，可以在每次查找中将范围缩小一半，大大减少查找时间。当目标值等于当前中间值时表示找到了目标，否则根据目标值与中间值的大小关系选择左半部分或右半部分继续查找。
:::

::: details 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 10000010;  // 定义数组最大容量为 10,000,010（在最大值基础上 +10）
int apples[MAXN];           // 全局数组，用于存储苹果的重量，从索引 1 开始
int n, m;                   // 全局变量 n 为苹果数量，m 为小鹿想要的苹果重量

// 函数：find_apple
// 功能：在已排序的苹果重量数组中查找是否存在重量为 m 的苹果
string find_apple() {
    int left = 1;                   // 定义左边界为数组起始位置（从1开始）
    int right = n;                  // 定义右边界为数组结束位置

    while (left <= right) {
        int mid = (left + right) / 2;  // 计算中间位置

        if (apples[mid] == m) {        // 如果中间位置的苹果重量等于 m
            return "YES";              // 找到目标重量，返回 YES
        } else if (apples[mid] < m) {  // 如果中间重量小于目标重量
            left = mid + 1;            // 在右半部分继续查找
        } else {                       // 如果中间重量大于目标重量
            right = mid - 1;           // 在左半部分继续查找
        }
    }

    return "NO";  // 未找到目标重量，返回 NO
}

int main() {
    cin >> n;                         // 输入苹果数量
    for (int i = 1; i <= n; i++) {    // 从索引 1 开始存储苹果重量
        cin >> apples[i];
    }

    cin >> m;                         // 输入小鹿想要的苹果重量
    cout << find_apple() << endl;     // 输出查找结果
    return 0;
}
```

:::

### [2833 图书管理员 ](https://oj.aicoders.cn/problem/2833)

**问题分析**

题目要求使用二分查找法在每层书架中查找指定的图书编号，并统计每层查找的比较次数。书架有三层，每层编号范围不同，需要分别在每个范围内进行二分查找。

各层编号范围如下：

- 第一层：编号从 1 到 36
- 第二层：编号从 1 到 15
- 第三层：编号从 5 到 26

对于每层书架，应用二分查找法。每次查找时，将范围缩小一半，直到找到目标编号，并记录查找次数。

::: tip
在二分查找过程中，每次将范围的中间值 `(L + R) / 2` 与目标值比较。若中间值等于目标编号，则查找结束；若中间值小于目标编号，缩小左边界；若中间值大于目标编号，缩小右边界。这样可以高效地统计每层查找的比较次数。
:::

::: details 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

// 函数：binary_search_count
// 功能：计算查找给定目标编号所需的二分查找次数
int binary_search_count(int L, int R, int target) {
    int count = 0;            // 初始化查找次数
    while (L <= R) {
        count++;              // 每次查找计数器加一
        int mid = (L + R) / 2; // 计算中间编号
        if (mid == target) {   // 如果找到目标编号，返回查找次数
            return count;
        } else if (mid < target) { // 如果中间编号小于目标编号
            L = mid + 1;           // 缩小左边界
        } else {                   // 如果中间编号大于目标编号
            R = mid - 1;           // 缩小右边界
        }
    }
    return count;  // 返回查找次数
}

int main() {
    int book1, book2, book3;
    cin >> book1 >> book2 >> book3;   // 输入每层要查找的图书编号

    // 分别计算每层查找次数
    int count1 = binary_search_count(1, 36, book1);
    int count2 = binary_search_count(1, 15, book2);
    int count3 = binary_search_count(5, 26, book3);

    // 输出每层的查找次数
    cout << count1 << " " << count2 << " " << count3 << endl;

    return 0;
}
```

:::

### [3104 查找一个数是否存在](https://oj.aicoders.cn/problem/3104)

**问题分析**

题目要求在一个有序递增数组中查找目标值 `x` 的位置，若存在则输出其位置（下标从 1 开始），否则输出 `-1`。因为数组是有序的，可以通过二分查找法快速定位目标值。

::: tip
在二分查找过程中，每次计算中间位置 `(L + R) / 2` 并与目标值 `x` 比较。如果 `x` 等于中间值，则返回当前位置；若 `x` 小于中间值，缩小右边界；否则，缩小左边界。这样可以快速判断目标值是否存在及其位置。
:::

::: details 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 5000000 + 10;  // 定义数组最大长度（加上10作为余量）
int arr[MAXN];                  // 全局数组，从1开始存储元素
int n, x;                       // 全局变量 n 表示数组长度，x 为要查找的值

// 函数：binary_search_position
// 功能：在有序数组中查找目标值 x 的位置，若存在返回位置（1 开始），否则返回 -1
int binary_search_position(int x) {
    int left = 1;                 // 初始化左边界
    int right = n;                // 初始化右边界

    while (left <= right) {
        int mid = (left + right) / 2;  // 计算中间位置

        if (arr[mid] == x) {           // 如果找到目标值
            return mid;                // 返回位置（1 开始）
        } else if (arr[mid] < x) {     // 如果中间值小于目标值
            left = mid + 1;            // 缩小查找范围至右半部分
        } else {                       // 如果中间值大于目标值
            right = mid - 1;           // 缩小查找范围至左半部分
        }
    }

    return -1;  // 若未找到目标值，返回 -1
}

int main() {
    ios::sync_with_stdio(false);
    cin >> n;                         // 输入数组元素个数
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];                // 从索引 1 开始存储数组元素
    }

    cin >> x;                         // 输入目标值 x
    cout << binary_search_position(x) << endl;  // 输出查找结果

    return 0;
}
```

:::

### [4456 在数组中找数 ](https://oj.aicoders.cn/problem/4456)

**问题分析**

题目要求在给定的 `N` 个整数中查找多个目标整数 `d` 是否存在。可以先将输入的整数数组排序，然后使用二分查找法检查每个查询数 `d` 是否存在于已排序的数组中。如果存在则输出“Yes”，否则输出“No”。

::: tip
先对数组进行排序后，使用二分查找法逐个判断查询数是否存在于数组中。
:::

::: details 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1000000 + 10;  // 定义数组最大长度（加上10作为余量）
int arr[MAXN];                  // 全局数组存储输入的整数
int N, M;                       // 全局变量 N 表示数组长度，M 表示查询次数

// 函数：binary_search
// 功能：在排序数组中查找目标值 x，若存在返回 true，否则返回 false
bool binary_search(int x) {
    int left = 1, right = N;  // 数组从索引 1 开始存储元素
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == x) {
            return true;
        } else if (arr[mid] < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}

int main() {
    cin >> N >> M;              // 输入数组长度 N 和查询次数 M

    for (int i = 1; i <= N; i++) {
        cin >> arr[i];          // 从索引 1 开始存储数组元素
    }

    sort(arr + 1, arr + N + 1); // 对数组从索引 1 到 N 进行排序

    for (int i = 0; i < M; i++) {
        int d;
        cin >> d;               // 输入查询的整数
        if (binary_search(d)) { // 如果 d 在数组中
            cout << "Yes" << endl;
        } else {                // 如果 d 不在数组中
            cout << "No" << endl;
        }
    }

    return 0;
}
```

:::
