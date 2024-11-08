---
title: Lesson 3 - 前缀和
order: 3
---

## 算法思想
前缀和就像一种累加记录，表示前 `n` 项的和。假设我们有一个数字列表，比如 `[3, 5, 2, 6, 8]`，前缀和就是每次把这些数从头到尾依次累加的结果。

**举个例子：**
- 第1个前缀和就是第1个数：$3$
- 第2个前缀和就是前两个数的和：$3 + 5 = 8$
- 第3个前缀和是前三个数的和：$3 + 5 + 2 = 10$
- 依此类推，得到一系列累加结果，这些就是前缀和。

我们把这些前缀和放到一个新数组里，就得到一个**前缀和数组**。

### 前缀和数组

前缀和数组就是把所有的前缀和按顺序放在一个数组里。这样当我们想快速知道从第1个数到某个数的累加结果时，就可以直接去前缀和数组里找，非常方便。

用刚才的例子 `[3, 5, 2, 6, 8]`：

- 它的前缀和数组是 `[3, 8, 10, 16, 24]`。

也就是说：
- 前缀和数组的第 1 个元素 $3$ 表示第1个数本身；
- 前缀和数组的第 2 个元素 $8$ 表示前两个数的和 $3 + 5$；
- 前缀和数组的第 3 个元素 $10$ 表示前三个数的和 $3 + 5 + 2$；
- 依此类推。

### 前缀和的递推式子

前缀和数组可以用一个递推公式来计算。假设我们用 `pre[i]` 表示前缀和数组的第 `i` 个元素， `a[i]` 表示原数组中的第 `i` 个元素，那么公式是：

$$pre[i] = pre[i - 1] + a[i]$$


意思是，第 `i` 个前缀和等于前一个前缀和加上原数组的第 `i` 个元素。

前缀和的优势和用途
- 快速求累加和：有了前缀和数组，我们可以快速找到某个位置之前的所有数的和。
- 求任意区间的和：如果我们想求数组的某一部分的和，有了前缀和数组，我们就不需要重复计算。只需要两步就能算出答案！

### 利用前缀和求区间和

假设我们有一个数组 `arr`，前缀和数组是 `pre`，如果想快速计算 `arr` 中从第 `L` 到第 `R` 个数的和，可以用以下公式：

$$sum = pre[R] - pre[L - 1]$$


这样就能快速求出任何区间的和，而不需要从头开始一个一个加。

**例子**

假设数组是 `[3, 5, 2, 6, 8]`，前缀和数组是 `[3, 8, 10, 16, 24]`。

如果我们想求从第`2`个数到第`4`个数的和，也就是 `[5, 2, 6]` 的和，可以这样做：
1. 用公式 $pre[4] - pre[1]$，即 $16 - 3 = 13$。
2. 结果 `13` 就是 `[5, 2, 6]` 的和。

::: tip 总结
- 前缀和：逐步累加得到的和。
- 前缀和数组：所有前缀和按顺序放在一个新数组里。
- 递推公式： $pre[i] = pre[i - 1] + a[i]$
- 区间和公式：$sum = pre[R] - pre[L-1]$
- 优点：可以快速求区间和。
:::

## 题目示例

### [2915 计算区间和](https://oj.aicoders.cn/problem/2915)

**问题分析**

1. 本题要求对一个整数数组的多个区间求和。每个区间由起始下标 `L` 和终止下标 `R` 给出。

2. 直接对每个区间进行遍历求和的时间复杂度较高。考虑到输入规模可能很大（`n, m`均可达`500000`），我们可以通过优化来避免每次都重复计算区间和。

3. 使用前缀和数组 `pre`：`pre[i]` 表示从数组起始位置到位置 `i` 的所有元素之和。这样一来，区间 `[L, R]` 的和就可以通过公式 `pre[R] - pre[L - 1]` 在常数时间内获得。

4. 构建前缀和数组的时间复杂度是 $O(n)$，而每次区间和查询的时间复杂度为 $O(1)$，因此总体复杂度为 $O(n + m)$，可以满足题目要求。

::: tip  
使用前缀和数组可以减少每次计算区间和的复杂度，只需通过两次数组访问即可获得结果。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 5e5 + 10;
int arr[MAXN];   // 存储输入的数组
int pre[MAXN];   // 存储前缀和数组

int main() {
    int n, m;
    cin >> n >> m;

    // 读取输入的数组并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }
    
    // 处理每个查询
    while (m--) {
        int L, R;
        cin >> L >> R;
        cout << pre[R] - pre[L - 1] << endl;
    }

    return 0;
}
```
:::



### [2916 K个元素和](https://oj.aicoders.cn/problem/2916)

**问题分析**

1. 本题要求计算所有连续且长度为 `K` 的子数组的元素和。

2. 如果直接用暴力枚举计算每个子数组的和，时间复杂度较高。为了优化，可以先构建一个前缀和数组，使得每个长度为 `K` 的子数组和可以通过前缀和数组在常数时间内得到。

3. 前缀和数组 `pre` 的构建方式是：`pre[i]` 表示数组从起始位置到位置 `i` 的元素之和。对于起始位置为 `i` 的长度为 `K` 的子数组和，可以通过 `pre[i + K - 1] - pre[i - 1]` 快速求解。

::: tip  
利用前缀和数组可以将每个子数组和的计算简化为常数时间操作，极大优化暴力枚举的效率。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 5e5 + 10;
int arr[MAXN];   // 存储输入的数组
int pre[MAXN];   // 存储前缀和数组

int main() {
    int n, K;
    cin >> n >> K;

    // 读取数组并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    // 枚举每个长度为K的子数组的起始位置
    for (int i = 1; i <= n - K + 1; i++) {
        int sum = pre[i + K - 1] - pre[i - 1];  // 利用前缀和计算区间和
        cout << sum << ' ';
    }

    return 0;
}
```
:::


### [4434 m倍的区间](https://oj.aicoders.cn/problem/4434)

**问题分析**

1. 本题要求在所有连续且长度为 `K` 的子数组中，统计有多少个子数组的和是 `m` 的倍数。

2. 为了高效计算每个长度为 `K` 的子数组的和，可以使用前缀和数组。通过前缀和数组，我们可以在常数时间内得到任何长度为 `K` 的子数组的和，并逐个检查是否为 `m` 的倍数。

3. 具体方法是：先构建前缀和数组 `pre`，其中 `pre[i]` 表示从数组起始位置到下标 `i` 的元素之和。对于起始位置为 `i` 的长度为 `K` 的子数组和，可以通过 `pre[i + K - 1] - pre[i - 1]` 计算，随后判断该和是否为 `m` 的倍数。

::: tip  
利用前缀和数组可以快速计算子数组和，并结合取余运算判断是否为指定数的倍数。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 5e5 + 10;
int arr[MAXN];   // 存储输入的数组
int pre[MAXN];   // 存储前缀和数组

int main() {
    int n, K, m;
    cin >> n >> K >> m;

    // 读取数组并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    int count = 0;

    // 枚举每个长度为K的子数组的起始位置
    for (int i = 1; i <= n - K + 1; i++) {
        int sum = pre[i + K - 1] - pre[i - 1];  // 利用前缀和计算区间和
        if (sum % m == 0) count++;              // 检查是否为m的倍数
    }

    // 输出结果
    cout << count << endl;

    return 0;
}
```
:::


### [4433 最大区间和](https://oj.aicoders.cn/problem/4433)

**问题分析**

1. 本题要求找到所有连续且长度为 `K` 的子数组中最大的区间和，以及该区间的起点和终点下标。

2. 为了高效计算每个长度为 `K` 的子数组的和，可以使用前缀和数组。通过前缀和数组，我们可以在常数时间内得到任意长度为 `K` 的子数组的和。

3. 具体方法是：先构建前缀和数组 `pre`，其中 `pre[i]` 表示从数组起始位置到下标 `i` 的元素之和。对于起始位置为 `i` 的长度为 `K` 的子数组和，可以通过公式 `pre[i + K - 1] - pre[i - 1]` 计算。遍历每个可能的起始位置 `i`，记录最大区间和以及对应的起点和终点下标。

::: tip  
使用前缀和数组可以高效计算子数组和，并快速找出最大区间和。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 5e5 + 10;
int arr[MAXN];   // 存储输入的数组
int pre[MAXN];   // 存储前缀和数组

int main() {
    int n, K;
    cin >> n >> K;

    // 读取数组并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    int maxSum = INT_MIN;  // 记录最大区间和
    int startIdx = 1, endIdx = K;  // 记录最大区间的起始和终止下标

    // 枚举每个长度为K的子数组的起始位置
    for (int i = 1; i <= n - K + 1; i++) {
        int sum = pre[i + K - 1] - pre[i - 1];  // 利用前缀和计算区间和
        if (sum > maxSum) {                     // 更新最大和及其下标范围
            maxSum = sum;
            startIdx = i;
            endIdx = i + K - 1;
        }
    }

    // 输出结果
    cout << maxSum << endl;
    cout << startIdx << " " << endIdx << endl;

    return 0;
}
```
:::


### [4436 混合操作](https://oj.aicoders.cn/problem/4436)

**问题分析**

1. 本题需要处理多次操作，包括区间和查询和单点修改。区间和查询需要快速计算指定区间的和，而单点修改只会出现一次。

2. 使用前缀和数组来高效地实现区间和查询。前缀和数组 `pre` 中的 `pre[i]` 表示从数组起始位置到下标 `i` 的元素之和。通过 `pre[R] - pre[L - 1]` 可以在常数时间内得到区间 `[L, R]` 的和。

3. 因为只有一次单点修改，在执行该操作时，需要更新前缀和数组，保证后续查询的正确性。

::: tip  
在进行单点修改时，注意及时更新前缀和数组，确保后续的查询能够正确反映更新后的数据。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 10;
int arr[MAXN];   // 存储输入的数组
int pre[MAXN];   // 存储前缀和数组

int main() {
    int n;
    cin >> n;

    // 读取数组并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    int m;
    cin >> m;

    while (m--) {
        int op;
        cin >> op;

        if (op == 1) {  // 区间和查询
            int L, R;
            cin >> L >> R;
            int sum = pre[R] - pre[L - 1];
            cout << sum << endl;

        } else if (op == 2) {  // 单点修改
            int k, num;
            cin >> k >> num;
            int diff = num - arr[k];   // 计算新值与原值的差值
            arr[k] = num;              // 更新原数组中的值为新值

            // 更新前缀和数组中的相关值，保证之后的查询结果正确
            // 从位置 k 开始，将前缀和数组的每个元素增加 diff
            // 这样后续所有涉及 k 之后的区间和查询都会正确反映更新后的值
            for (int j = k; j <= n; j++) {
                pre[j] += diff;
            }
        }
    }

    return 0;
}
```
:::


### [2919 最要强的飞行员](https://oj.aicoders.cn/problem/2919)

**问题分析**

1. 本题要求找到多个攻击区间中总牢固值最大的一个区间。给定多个区间 `[L, R]`，每个区间的总牢固值为该区间内所有据点的牢固值之和。

2. 为了快速计算每个区间的和，可以使用前缀和数组。前缀和数组 `pre` 中的 `pre[i]` 表示从数组起始位置到下标 `i` 的元素之和。这样，对于区间 `[L, R]` 的总牢固值可以通过 `pre[R] - pre[L - 1]` 在常数时间内计算。

3. 遍历每个区间 `[L, R]`，计算其总牢固值并记录最大值。

::: tip  
使用前缀和数组可以快速计算每个区间的和，从而找到所有攻击区间中总牢固值最大的一个。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 5e5 + 10;
int arr[MAXN];   // 存储据点的牢固值
int pre[MAXN];   // 存储前缀和数组

int main() {
    int n, m;
    cin >> n >> m;

    // 读取据点的牢固值并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    int maxSum = INT_MIN;

    // 处理每个攻击区间
    while (m--) {
        int L, R;
        cin >> L >> R;
        int totalSturdiness = pre[R] - pre[L - 1];  // 计算区间 [L, R] 的总牢固值
        maxSum = max(maxSum, totalSturdiness);
    }

    // 输出最大的总牢固值
    cout << maxSum << endl;

    return 0;
}
```
:::


### [2939 纸牌PK](https://oj.aicoders.cn/problem/2939)

**问题分析**

1. 本题需要两人各自抽取 `m` 个区间的纸牌，并计算每个区间的牌面和，累加到各自的总和，比较两人的总和来判断谁更大。

2. 为了快速计算每个区间的和，可以使用前缀和数组。前缀和数组 `pre` 能在常数时间内计算任何区间 `[L, R]` 的和。

3. 由于纸牌数量 `n` 和操作次数 `m` 都可能较大，总和变量需要使用 `long long` 类型来避免整数溢出，这是本题的陷阱。

::: tip  
使用前缀和数组可以快速计算每个区间的和，注意累加总和时需要 `long long` 类型，以防止溢出。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 5e5 + 10;
int arr[MAXN];      // 存储纸牌上的数字
long long pre[MAXN]; // 存储前缀和数组，使用long long以防止溢出

int main() {
    int n, m;
    cin >> n >> m;

    // 读取纸牌上的数字并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    long long sumT = 0, sumC = 0;

    // 计算小童的总和
    for (int i = 0; i < m; i++) {
        int L, R;
        cin >> L >> R;
        sumT += pre[R] - pre[L - 1];
    }

    // 计算小程的总和
    for (int i = 0; i < m; i++) {
        int L, R;
        cin >> L >> R;
        sumC += pre[R] - pre[L - 1];
    }

    // 输出结果
    if (sumT > sumC) {
        cout << "T" << endl;
    } else if (sumC > sumT) {
        cout << "C" << endl;
    } else {
        cout << "D" << endl;
    }

    return 0;
}
```
:::


### [2918 物资准备](https://oj.aicoders.cn/problem/2918)

**问题分析**

1. 本题中有 `m` 门火炮，各自摧毁一段连续的据点，每个据点需要消耗与其牢固值相等数量的炮弹进行摧毁。需要计算所有火炮对指定区间内据点的牢固值之和，从而得到总共需要的炮弹数量。

2. 为了高效计算每门火炮摧毁的区间所需的炮弹数，可以使用前缀和数组 `pre`。通过前缀和数组，可以在常数时间内计算任意区间 `[L, R]` 的牢固值之和。

3. 遍历所有火炮的摧毁范围，计算每个区间的炮弹消耗，并将它们累加得到总炮弹数。

4. 注意使用 `long long` 确保累加结果不溢出。

::: tip  
前缀和数组可以快速计算区间和，能够在常数时间内得到每门火炮的摧毁区间所需的炮弹数量。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 10;
int arr[MAXN];      // 存储据点的牢固值
long long pre[MAXN]; // 存储前缀和数组，使用 long long 防止溢出

int main() {
    int n, m;
    cin >> n >> m;

    // 读取据点的牢固值并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    long long sum = 0;

    // 计算每门火炮的需求并累加到总炮弹数
    while (m--) {
        int L, R;
        cin >> L >> R;
        sum += pre[R] - pre[L - 1];  // 使用前缀和计算每门火炮的炮弹需求
    }

    // 输出炮弹总数
    cout << sum << endl;

    return 0;
}
```
:::


### [3212 有趣的求和](https://oj.aicoders.cn/problem/3212)

**问题分析**

1. 本题要求在一个长度为 `n` 的数列中，找到所有连续长度为 `L` 的子数组的最大和。

2. 为了高效计算每个长度为 `L` 的子数组和，可以使用前缀和数组。前缀和数组 `pre` 中的 `pre[i]` 表示从数组开头到位置 `i` 的元素之和。这样，任意区间 `[i, i+L-1]` 的和可以通过公式 `pre[i + L - 1] - pre[i - 1]` 快速求解。

3. 遍历所有可能的起始位置，计算对应的和，记录其中的最大和即可。

::: tip  
前缀和数组可以快速计算每个长度为 `L` 的子数组和，从而有效地找到最大和。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 1e6 + 10;
int arr[MAXN];     // 存储输入的数组
long long pre[MAXN]; // 存储前缀和数组，使用 long long 以防止溢出

int main() {
    int n, L;
    cin >> n >> L;

    // 读取数组并构建前缀和
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        pre[i] = pre[i - 1] + arr[i];
    }

    long long maxSum = LLONG_MIN;

    // 遍历所有长度为 L 的子数组的起始位置
    for (int i = 1; i <= n - L + 1; i++) {
        long long curSum = pre[i + L - 1] - pre[i - 1];  // 计算区间 [i, i + L - 1] 的和
        maxSum = max(maxSum, curSum);
    }

    // 输出最大和
    cout << maxSum << endl;

    return 0;
}
```
:::