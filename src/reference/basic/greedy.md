---
title: 贪心算法
---



## 题目示例

### [7973 区间选点](https://oj.aicoders.cn/problem/7973)

**问题分析**

1. 本题要求在数轴上选取尽量少的点，使得每个给定的闭区间 `[l, r]` 中至少包含一个选定的点。一个有效的贪心策略是：优先选择靠近右端的点，因为这样可以覆盖尽可能多的区间，减少选点数量。

2. 为了实现这一策略：
   - 将区间按右端点 `r` 从小到大排序。这样处理时，每次都优先选择当前未覆盖区间中右端点最小的一个区间。
   - 依次遍历排序后的区间列表，选取一个覆盖点后，将其记录并跳过所有已被覆盖的区间。

3. 该方法确保了选点数量最少，符合题目的贪心要求。

::: tip 证明
- 考虑按右端点排序的区间 $I1, I2, ..., In$。贪心策略会在处理每个区间时，选择区间的右端点作为选点，只有在该选定点无法覆盖下一个区间时才再选一个点。

- 假设按右端点排序的贪心选择中选出的点集为 $S$。如果存在一种选择 $S'$，使得 $S'$ 比 $S$ 更少，则 $S'$ 必须包含与 $S$ 相同或更少的点数来覆盖相同的区间集合。
  
- 然而，由于贪心策略在最靠右的位置选择了最少的点数，因此 $S'$ 无法比 $S$ 更少，即不可能存在一种选择，比 $S$ 更少。
:::

::: details 代码实现
```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // pair<first, second> 可以直接使用 sort() 根据 first 的值排序
    vector< pair<int, int> > points(n);
    
    // 读取区间
    for (int i = 0; i < n; i++) {
        int l, r;
        cin >> l >> r;
        points[i] = {r, l};  // 按右端点排序，将右端点放在第一个位置
    }
    
    // 按右端点排序
    sort(points.begin(), points.end());

    int selectedPoints = 0;
    int lastPoint = INT_MIN;  // 初始化最后选定的点位置

    // 遍历每个区间
    for (auto p : points) {
        int l = p.second; // 左端点在第二个位置
        int r = p.first;  // 右端点在第一个位置
        
        // 如果当前区间不被 lastPoint 覆盖，则选择 r 作为新的点
        if (lastPoint < l) {
            selectedPoints++;
            lastPoint = r;
        }
    }

    // 输出最小选点数量
    cout << selectedPoints << endl;

    return 0;
}
```
:::
