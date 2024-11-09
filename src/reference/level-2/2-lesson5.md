---
title: Lesson 5 - 贪心算法
order: 5
---

通过局部最优解，推导出全局最优解。

## 问题示例

### [2909 贪心的小童](https://oj.aicoders.cn/problem/2909)

#### 问题分析
小童希望从4堆胡萝卜中各拿1根胡萝卜，使得这4根胡萝卜的总重量最大。每堆胡萝卜有多个不同重量的选择。为实现总重量最大，我们可以选择每堆中最重的胡萝卜。

#### 贪心策略分析
贪心算法的核心思想是每一步都做出当前情况下的最佳选择。在本题中，小童在每堆胡萝卜中选择重量最大的1根，这样可以确保每堆都贡献了其最大可能重量。这种方法保证了在每堆独立情况下的最优解，进而得到全局的最优解，即4根胡萝卜重量的最大总和。

::: tip
1. 对于每堆胡萝卜，找到重量最大的胡萝卜。
2. 将4堆中找到的最大重量相加，得到结果。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int sum = 0;  // 存储4堆中最大重量胡萝卜的总和

    // 循环4次，读取每堆胡萝卜的数据
    for (int i = 0; i < 4; i++) {
        int n;  // 每堆胡萝卜的数量
        cin >> n;

        int max_weight = 0;  // 当前堆的最大胡萝卜重量
        for (int j = 0; j < n; j++) {
            int weight;
            cin >> weight;
            max_weight = max(max_weight, weight);  // 更新当前堆的最大重量
        }

        sum += max_weight;  // 累加每堆的最大重量
    }

    cout << sum << endl;  // 输出总重量

    return 0;
}
```
:::

### [2910 士兵突击](https://oj.aicoders.cn/problem/2910)

#### 问题分析
在一次运输中，船有一个固定的载重量，我们希望在不超重的前提下装载最多的士兵。每名士兵的体重已知。为了尽可能多地装载士兵，我们可以优先选择较轻的士兵上船，从而在总重量允许的范围内装载更多士兵。

#### 贪心策略分析
该问题的贪心策略是**优先选择重量较轻的士兵**，这样在每次加入士兵时，可以避免过早超重，从而容纳更多士兵。我们可以将士兵按体重排序，从轻到重依次累加体重，直到船的载重量达到或接近最大值为止。

::: tip
1. 将士兵体重排序。
2. 依次累加体重，直到即将超过船的最大载重量。
3. 记录可以装载的士兵数量。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n, max_weight;  // 士兵数量和船的载重量
    cin >> n >> max_weight;

    int weights[2000];  // 存储每名士兵的体重（最多2000名士兵）
    for (int i = 0; i < n; i++) {
        cin >> weights[i];
    }

    // 按体重从小到大排序
    sort(weights, weights + n);

    int count = 0, total_weight = 0;

    // 尽可能多地装载士兵
    for (int i = 0; i < n; i++) {
        if (total_weight + weights[i] <= max_weight) {
            total_weight += weights[i];  // 更新总重量
            count++;  // 记录当前装载的士兵数量
        } else {
            break;  // 超重则停止
        }
    }

    cout << count << endl;  // 输出最多能装载的士兵数量

    return 0;
}
```
:::

### [4454 上船问题](https://oj.aicoders.cn/problem/4454)

#### 问题分析
需要将 \( n \) 个人过河，每艘船的载重为 \( m \)，并且每艘船最多只能容纳两人。目标是计算所需的最少船只数量。为了使船只数量最少，可以尝试将体重较轻和较重的乘客配对放在同一艘船上（贪心策略）。

#### 贪心策略分析
本题的贪心策略是**尽量使最轻的和最重的乘客同船**。这样我们可以保证船的载重被充分利用，同时减少船的使用数量：
1. 首先对所有体重排序。
2. 使用双指针法：一个指针指向最轻的人（从数组开头），另一个指针指向最重的人（从数组末尾）。
3. 尝试将当前最轻和最重的两人配对，如果两人重量之和不超过船的载重 \( m \)，则将他们一起安排一艘船，并移动两个指针。
4. 如果两人重量之和超过载重 \( m \)，则只能让最重的那人单独上船，移动右侧指针。
5. 重复以上过程直到所有人都安排上船。

::: tip
1. 对体重排序，从轻到重尝试配对。
2. 双指针方式安排每艘船的乘客，尽量配对。
3. 统计最少需要的船只数量。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n, m;  // 人数和船的载重
    cin >> n >> m;

    int weights[200];  // 每个人的体重（最多200人）
    for (int i = 0; i < n; i++) {
        cin >> weights[i];
    }

    // 按体重从小到大排序
    sort(weights, weights + n);

    int left = 0;          // 指向最轻的人的指针
    int right = n - 1;     // 指向最重的人的指针
    int boats = 0;         // 记录所需的船数

    // 使用双指针分配船
    while (left <= right) {
        if (weights[left] + weights[right] <= m) {
            // 如果最轻和最重的人可以同船
            left++;
            right--;
        } else {
            // 如果最重的人需要单独一艘船
            right--;
        }
        boats++;  // 每次循环分配一艘船
    }

    cout << boats << endl;  // 输出所需的最少船数

    return 0;
}
```
:::

### [2908 节省时间](https://oj.aicoders.cn/problem/2908)

#### 问题分析
为了让同学们的平均答疑完成时间最少，我们可以通过调整答疑顺序来实现。若把答疑时间短的同学排在前面，可以减少后面同学的等待时间，从而降低整体的平均完成时间。这是一个典型的**最小化等待时间**的问题，可以使用贪心策略来解决。

#### 贪心策略分析
贪心策略的核心思想是：**按答疑时间从小到大排序，让短答疑时间的学生先答疑**。这样每个同学的等待时间都会被最小化。  
答疑完成时间的计算公式为：  
- 对每个同学，答疑完成时间等于自己的答疑时间加上前面同学的累计时间。
- 最后将所有同学的答疑完成时间相加并除以学生总数，即可得到平均答疑完成时间。

::: tip
1. 对答疑时间从小到大排序。
2. 计算每个同学的完成时间，累加得到总答疑完成时间。
3. 计算平均答疑完成时间。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n;  // 学生数量
    cin >> n;

    int times[1000];  // 每个学生的预估答疑时间（最多1000人）
    for (int i = 0; i < n; i++) {
        cin >> times[i];
    }

    // 按答疑时间从小到大排序
    sort(times, times + n);

    long long total_time = 0;  // 总完成时间
    long long cumulative_time = 0;  // 前面学生的累计答疑时间

    // 计算总完成时间
    for (int i = 0; i < n; i++) {
        cumulative_time += times[i];  // 当前学生的完成时间
        total_time += cumulative_time;
    }

    // 计算并输出平均完成时间（保留两位小数）
    double average_time = (double)total_time / n;
    cout << fixed << setprecision(2) << average_time << endl;

    return 0;
}
```
:::

### [4453 购物竞赛](https://oj.aicoders.cn/problem/4453)

#### 问题分析
在这次购物竞赛中，每种商品被拆分成多个包装，每个包装的价值相同。我们的目标是在购物车的容量限制内选择包装，尽可能地增加购物车中的商品总价值。

- 每种商品的总价 \( M \) 被拆分成 \( K \) 个包装，因此每个包装的价值为 \( M/K \)。
- 我们需要在总包装数 \( L \) 的限制下，选出价值最高的组合。

#### 贪心策略分析
该问题的贪心策略是**优先选择单个包装价值高的商品**。对每种商品，计算出单个包装的价值，将所有商品的包装价值从高到低排序，依次选择，直到购物车的容量（包装数量）达到限制为止。

#### 结构体排序
使用结构体存储每种商品的总价、包装个数和单个包装价值，然后按单个包装价值从高到低排序，依次选择最高价值的包装，直到达到购物车的容量限制。

::: tip
1. 定义结构体 `Item` 包含商品的总价 `M`、包装个数 `K` 和单个包装的价值 `value`。
2. 对结构体数组按包装价值从高到低排序。
3. 按排序结果选择包装，直到达到购物车容量。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

// 定义结构体存储每个商品的信息
struct Item {
    int M;      // 商品的总价
    int K;      // 商品的包装个数
    int value;  // 单个包装的价值
};

// 排序函数：按单个包装价值从高到低排序
bool compare(Item a, Item b) {
    return a.value > b.value;
}

int main() {
    int N, L;  // 商品种类数和购物车能装载的最大包装数
    cin >> N >> L;

    Item items[100];  // 最多100种商品

    // 输入每种商品的总价和包装数，计算每个包装的价值
    for (int i = 0; i < N; i++) {
        cin >> items[i].M >> items[i].K;
        items[i].value = items[i].M / items[i].K;  // 计算并存储单个包装的价值
    }

    // 按照包装价值从高到低排序
    sort(items, items + N, compare);

    int max_value = 0;  // 购物车中的最大总价值

    // 选择前L个最高价值的包装，直到达到容量限制
    for (int i = 0; i < N; i++) {
        if(items[i].K<=L){
            L-=items[i].K;
            max_value += items[i].M;
        }else{
            max_value += items[i].value * L;
            break;
        }
    }

    cout << max_value << endl;  // 输出购物车中可以装载的最大价值

    return 0;
}

```
:::

### [2911 突飞猛进](https://oj.aicoders.cn/problem/2911)

#### 问题分析
兔子们需要使用一间会议室召开最多数量的作战会议。每个会议的开始和结束时间给定，且没有间隔。我们要在不重叠会议的前提下，找到能够安排的最多会议数。

#### 贪心策略分析
该问题可以通过**贪心算法**解决：  
1. **优先选择结束时间早的会议**。这样可以让后续会议有更多的时间可供选择，从而最大化会议数量。
2. 排序会议时间表后，按照结束时间从早到晚依次安排会议。如果当前会议的开始时间晚于或等于前一个选定会议的结束时间，则可以安排该会议。

#### 解题步骤
1. 将会议时间表按结束时间从小到大排序。
2. 遍历排序后的会议，选择符合条件的会议安排。
3. 输出最多可以安排的会议数量。

::: tip
1. 按结束时间排序，贪心选择结束时间早的会议。
2. 遍历会议，若当前会议开始时间晚于等于上一个会议的结束时间，则选择该会议。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

// 定义结构体存储会议的开始和结束时间
struct Meeting {
    int start;
    int end;
};

// 排序函数：按会议结束时间升序排序
bool compare(Meeting a, Meeting b) {
    return a.end < b.end;
}

int main() {
    int n;  // 会议数量
    cin >> n;

    Meeting meetings[1000];  // 存储所有会议（最多1000个）

    // 输入每个会议的开始和结束时间
    for (int i = 0; i < n; i++) {
        cin >> meetings[i].start >> meetings[i].end;
    }

    // 按结束时间排序
    sort(meetings, meetings + n, compare);

    int count = 0;  // 记录可以安排的会议数量
    int last_end = 0;  // 上一个会议的结束时间

    // 遍历会议，选择非重叠的会议
    for (int i = 0; i < n; i++) {
        if (meetings[i].start >= last_end) {
            count++;  // 选中该会议
            last_end = meetings[i].end;  // 更新最后选中会议的结束时间
        }
    }

    cout << count << endl;  // 输出最多可以安排的会议数量

    return 0;
}
```
:::


### [2381 可可岛的宝藏](https://oj.aicoders.cn/problem/2381)

#### 问题分析
童童希望从岛上尽可能多地带走金属，使得所带金属的总价值最大化。因为口袋有承重限制 \( w \)，并且金属可以任意分割，因此可以通过选择价值密度（即单位重量的价值）最高的金属来优先装满口袋。

#### 贪心策略分析
该问题的贪心策略是**优先选择单位重量价值高的金属**。具体做法如下：
1. 计算每种金属的单位重量价值：价值密度 = 总价值 / 总重量。
2. 将金属按照价值密度从高到低排序。
3. 按照排序结果依次装入口袋，直到达到重量上限。

#### 解题步骤
1. 读取并计算每种金属的价值密度。
2. 将金属按价值密度从高到低排序。
3. 根据口袋的承重上限，优先选择价值密度高的金属分割装入，直到达到承重上限。
4. 输出结果保留两位小数。

::: tip
1. 计算每种金属的单位价值密度。
2. 按照价值密度排序，优先选择高价值密度的金属。
3. 在承重范围内尽可能多地装入金属。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

// 定义结构体存储每种金属的信息
struct Metal {
    double weight;     // 金属总重量
    double value;      // 金属总价值
    double d;    // 单位重量价值密度
};

// 排序函数：按价值密度从高到低排序
bool compare(Metal a, Metal b) {
    return a.d > b.d;
}

int main() {
    int k;  // 测试数据组数
    cin >> k;

    while (k--) {
        int w, s;
        cin >> w >> s;  // 读取承重上限和金属种类数

        Metal metals[100];  // 最多100种金属

        // 读取每种金属的重量和价值，并计算价值密度
        for (int i = 0; i < s; i++) {
            cin >> metals[i].weight >> metals[i].value;
            metals[i].d = metals[i].value / metals[i].weight;
        }

        // 按价值密度排序
        sort(metals, metals + s, compare);

        double max_value = 0.0;  // 记录最大价值

        // 贪心选择金属
        for (int i = 0; i < s; i++) {
            if (metals[i].weight <= w) {
                // 当前金属可以全部装入
                max_value += metals[i].value;
                w -= metals[i].weight;
            } else {
                // 只能装入部分金属
                max_value += metals[i].d * w;
				break;
            }
        }

        // 输出结果，保留两位小数
        cout << fixed << setprecision(2) << max_value << endl;
    }

    return 0;
}
```
:::


### [4458 分配礼物](https://oj.aicoders.cn/problem/4458)

#### 问题分析
题目要求将礼物分成尽量少的组，每组包含的礼物数量最多为两个，且总价值不超过给定的上限 \( y \)。我们的目标是计算有多少组正好包含两个礼物的数量，即有多少同学能领到两件礼物。

#### 关键问题解析
在代码实现中，使用了双指针法：一个指针 `left` 指向数组的最小元素，一个指针 `right` 指向数组的最大元素。通过不断尝试将最小和最大元素配对，可以高效地满足条件并减少组数。

#### 为什么条件是 `left < right`，而不是 `left <= right`

在这个双指针方案中，循环的终止条件为 `left < right` 而不是 `left <= right`。原因如下：

1. **避免重复检查**：  
   当 `left == right` 时，指向的是同一个元素，意味着只剩下一个礼物。此时这个礼物只能独自成组，不可能和其他礼物配对。如果继续执行循环，会导致程序错误地尝试配对同一个礼物。

2. **确保所有礼物都被检查**：  
   使用 `left < right` 能保证程序在剩下两个礼物时进行最后一次有效配对，避免越界和冗余的单个礼物判断。

3. **保持逻辑清晰**：  
   当 `left < right` 时，正好满足配对条件，不需要再处理单个礼物的情况，使代码更简洁且避免不必要的分支处理。

#### 代码实现
::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n, y;
    cin >> n >> y;
    int w[100]; // 普通数组来存储礼物的价值，最大为 100
    
    for (int i = 0; i < n; i++) {
        cin >> w[i];
    }

    // 排序礼物价值，便于两端配对
    sort(w, w + n);
    int left = 0, right = n - 1;
    int twoGiftCount = 0; // 统计每组包含两个礼物的数量

    while (left < right) {
        // 如果最小值和最大值之和不超过 y，则可以配对
        if (w[left] + w[right] <= y) {
            twoGiftCount++; // 形成一组包含两个礼物
            left++;
            right--;
        } else {
            // 否则只选择价值最大的礼物独自成组
            right--;
        }
    }

    cout << twoGiftCount << endl;
    return 0;
}
```
:::

### [1743 童童看节目](https://oj.aicoders.cn/problem/1743)

#### 问题分析
童童想尽可能多地完整观看互不重叠的节目。此问题可通过贪心算法来解决：我们首先将节目按结束时间排序，然后尽量选择结束时间最早且不与已选择的其他节目重叠的节目，从而获得最多的可观看节目数量。

#### 解题步骤
1. 使用结构体 `Program` 来存储每个节目的开始和结束时间。
2. 将节目按结束时间排序。
3. 遍历节目表，选择符合条件的节目（即开始时间不早于上一个观看节目的结束时间），并计数。
4. 输出结果。

::: tip
通过结构体实现更清晰地表示节目的开始和结束时间，提高代码的可读性。
:::

#### 代码实现
::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

// 定义结构体 Program 存储节目的开始和结束时间
struct Program {
    int start;
    int end;
};

// 排序依据：按结束时间从小到大排序
bool compare(Program a, Program b) {
    return a.end < b.end;
}

int main() {
    while (true) {
        int n;
        cin >> n;
        if (n == 0) break;

        // 定义数组存储 n 个节目
        Program programs[100];
        for (int i = 0; i < n; i++) {
            cin >> programs[i].start >> programs[i].end;
        }

        // 按结束时间排序
        sort(programs, programs + n, compare);

        int count = 0;
        int last_end_time = 0;

        // 贪心选择不重叠的节目
        for (int i = 0; i < n; i++) {
            if (programs[i].start >= last_end_time) {
                count++;
                last_end_time = programs[i].end;
            }
        }

        cout << count << endl;
    }

    return 0;
}
```
:::