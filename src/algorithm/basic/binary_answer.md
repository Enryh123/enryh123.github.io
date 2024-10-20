---
title: 二分答案
order: 3
---

## 什么是二分答案
理解了普通的二分查找之后，我们可以进一步讨论「二分答案」这一类算法，它主要用于求解满足某种条件的最大值或最小值。例如「最小的最大，最大的最小」这一类问题。

这种问题的答案通常是在某个范围内，并且具有单调性：当我们知道某个数符合条件后，往往可以推断出比它更大（或更小）的数也符合条件或不符合条件。

::: info 适用情况
二分答案算法是针对问题的结果进行二分，而不是查找某个具体数值。它通常用于以下情况：
- 结果在一个确定范围，需要探索。
- 在范围中，某个值及其以上/以下的所有数值都满足某一特定条件，而另一部分则不满足。
- 我们需要找到满足条件的最大值或最小值。
:::

## 程序模版
### 左区间的右极限
```cpp title="左区间模版"
// [ 左边界 1,2,3, ....答案 ] ............ 右边界
int l=minn, r=maxn, mid;
while(l<r){
    mid = (l+r+1)/2;
    if(左侧区间的值均满足的条件) l=mid;
    else r=mid-1;
}
cout<<l; // 答案
```

### 右区间的左极限
```cpp title="右区间模版"
// 左边界 1,2,3, .... [ 答案  ............ 右边界 ]
int l=minn, r=maxn, mid;
while(l<r){
    mid = (l+r)/2;
    if(右侧区间的值均满足的条件) r=mid;
    else l=mid+1;
}
cout<<l; // 答案
```

### 浮点数二分模版
```cpp title="浮点数二分模版"
double l=minn, r=maxn, mid;
double e=1e-6; // 精度，例如保留5位小数
while(r-l>e){
    mid = (l+r)/2;
    if(左侧满足某个性质) l=mid;
    else r=mid;
}
cout<<l; // 答案
```

## 问题示例
### [1305 造海船](https://oj.aicoders.cn/problem/1350) <Badge text="左区间模版" type="info" vertical="middle" />

有 `n` 根原木，现在想把这些木头切割成 `k` 段长度均为 `l` 的小段木头（木头有可能有剩余），希望得到的小段木头越长越好，请求出 l 的最大值。

**问题分析：**
- `l` 的值在一个明确的范围内，`[0, 最大的原木长度]`。
- 假设按照 `20` 的长度去切割原木，**能**切出 `k` 段，那么我们可以推断出 $20$ 是一个可行的答案，尝试去选择更大的长度，并且保留 `20` 这个可行的答案。
- 假设按照 `50` 的长度去切割原木，**不能**切出 `k` 段，那么我们可以推断出 $50$ 及以上的长度，都不是我们需要的答案，尝试去选择更短的长度。
- 如此重复，范围会逐渐缩小，最终找到我们需要的 `l` 的最大值。

::: tip
这个问题的答案具有单调性，即某个长度能切成 `k` 段，则更小的长度也能切，若某个长度不能切成 `k` 段，则更大的长度也不能切。这正是二分答案问题的特点。

`l` 的长度范围： `[0, 1, 2, 3, 4, 5, ......., 最长的原木长度]`

按照对应 `l` 的长度是否能切成 `k` 段： `[能, 能, 能, 能, ........., 不能, 不能, 不能]`
:::

::: details 代码实现
```cpp title="1305 造海船参考程序"
#include<bits/stdc++.h>
using namespace std;
const int MAXN = 1e5+10;
int n, k, a[MAXN];

bool canCut(int x){ // 检测按照 x 来切，是否能切成 k 段
    int cnt = 0;
    for(int i=1; i<=n; i++){
        cnt += a[i]/x;
        if(cnt>=k) return true;
    }
    return false;
}

int main(){
    int l=0, r=0, mid; // 确定答案的范围
    cin>>n>>k;
    for(int i=1; i<=n; i++){
        cin>>a[i];
        r = max(r, a[i]); // 找到最大的原木长度
    }
    // 答案所在的范围，左侧数据均满足条件，右侧不满足
    // 下列模版用于找最大的满足条件的值（左区间模版）
    while(l<r){ 
        mid = (l+r+1)/2;
        if(canCut(mid)) l=mid; // 能切，保留答案
        else r=mid-1; // 不能切，排除右侧答案
    }
    cout <<l<<endl;
    return 0;
}
```
:::


### [1785 新校区布网](https://oj.aicoders.cn/problem/1785) <Badge text="左区间模版" type="info" vertical="middle" />

**问题分析：**
- 网线长度在一个明确的范围内，`[0, 最长的网线长度]`。
- 同上一题，假设选择的某个长度能切出 `K` 根网线，则尝试更大的长度，并保留当前选择，假设不能切出 `K` 根网线，则尝试更小的长度。

::: tip
题目输入数据单位为 `m`，为小数，因此计算过程中，应转换为 `cm` 进行计算，可以避免浮点数运算。

选择的长度范围： `[0, 1, 2, 3, 4, 5, ......., 最长的网线长度]`

对应长度是否能切成 `k` 根网线： `[能, 能, 能, 能, ........., 不能, 不能, 不能]`

依然是一个找到满足要求的最大值问题（左区间模版）
:::

::: details 代码实现
```cpp title="1785 新校区布网参考程序"
#include<bits/stdc++.h>
using namespace std;
const int MAXN = 1e5+10;
int n, k, a[MAXN];

bool canCut(int x){ // 判断是否能切成 k 段
    int cnt = 0;
    for(int i=1; i<=n; i++){
        cnt += a[i]/x;
        if(cnt>=k) return true;
    }
    return false;
}

int main(){
    int l=1, r=0, mid;
    cin>>n>>k;
    for(int i=1; i<=n; i++){
        double t;
        cin>>t;
        a[i] = t*100; // 注意转换单位，转换成整数
        r = max(r, a[i]);
    }
    
    while(l<r){
        mid = (l+r+1)/2;
        if(canCut(mid)) l=mid;
        else r=mid-1;
    }
    cout<<fixed<<setprecision(2)<<l/100.0<<endl;
    return 0;
}
```
:::


### [1483 饲养斗牛](https://oj.aicoders.cn/problem/1483) <Badge text="左区间模版" type="info" vertical="middle" />

**问题分析：**
- 牛舍间的距离在一个明确的范围内，`[1, 最远位置]`。
- 假设选择按照某个距离进行牛的安置，如果能安置所有的牛，说明当前选择的距离可行，尝试增加距离，若不够安置所有牛，说明距离选择大了，尝试选择更小的距离。

::: tip
- 注意题目输入的牛舍的位置，并不是按照从小到大的顺序输入的，需要在二分前进行排序。
- 此题难点在于如何判断当前选择的距离是否够放所有牛，可采取如下思路：
  1. 第 1 头牛一定放在第 1 间牛舍，记录最近一头牛的位置 `last = 1`
  2. 依次遍历剩余的牛舍，计算第 i 间牛舍的位置和上一头牛的间隔，`if(a[i]-last>=当前选择的间隔)`，当条件成立时，说明当前牛舍可以放牛，`cnt++` 并且更新 `last = i`
  3. 最终检查 `cnt`，判断是否安置了所有的牛

选择的间隔距离范围： `[1, 2, 3, 4, 5, ......., 最远位置]`

是否能安置所有牛： `[能, 能, 能, 能, ........., 不能, 不能, 不能]`

依然是一个找到满足要求的最大值问题（左区间模版）
:::

::: details 代码实现
```cpp title="1483 饲养斗牛参考程序"
#include<bits/stdc++.h>
using namespace std;
const int MAXN = 1e5+10;
int n, m, a[MAXN];

bool canPut(int x){ // 判断按照 x 的间距，是否能安置所有牛
    int cnt = 1; // 第一间牛舍一定放一头牛
    int last = 1; // 记录最近一头牛的位置
    for(int i=2; i<=n; i++){
        if(a[i]-last>=x){
            cnt++;
            last = a[i];
        }
        if(cnt>=m) return true;
    }
    return false;
}

int main(){
    int l=1, r=0, mid;
    cin>>n>>m;
    for(int i=1; i<=n; i++){
        cin>>a[i];
        r = max(r, a[i]);
    }
    sort(a+1, a+1+n); // 注意排序
    while(l<r){
        mid = (l+r+1)/2;
        if(canPut(mid)) l=mid;
        else r=mid-1;
    }
    cout<<l<<endl;
    return 0;
}
```
:::


### [1790 跳石头比赛](https://oj.aicoders.cn/problem/1790) <Badge text="左区间模版" type="info" vertical="middle" />

**问题分析：**
- 最短的跳跃距离在一个明确的范围内，`[1, 终点位置]`。
- 假设选择某个距离作为最短距离，如果需要移除的石头不超过M块，说明当前选择的距离可行，尝试增加距离，若需要移除的石头超过M块，说明距离选择大了，尝试选择更小的距离。

::: tip
- 此题难点在于如何判断当前选择的距离需要移动多少块石头，可采取如下思路：
  1. 刚开始站在起点，记录当前距离起点的距离 `last = 0`
  2. 依次遍历剩余的石头，计算第 i 块石头与上一次位置之间的距离，如果间距小于当前选择的距离，则需要移走着块石头，即 `if(a[i]-last<当前选择的最短距离) cnt++`，否则说明当前石头符合要求，跳到当前石头 `last = a[i]`
  3. 检查 `cnt`，如果超过了 `M` 说明当前方案不可行。

选择的最短距离范围： `[1, 2, 3, 4, 5, ......., 终点位置]`

移动石头的次数不超过M： `[是, 是, 是, 是, ........., 否, 否, 否]`

依然是一个找到满足要求的最大值问题（左区间模版）
:::

::: details 代码实现
```cpp title="1790 跳石头比赛"
#include<bits/stdc++.h>
using namespace std;
const int MAXN = 1e5+10;
int S,N,M, a[MAXN];

bool moveLessThanM(int x){ 
    int cnt = 0;
    int last = 0;
    for(int i=1; i<=N; i++){
        if(a[i]-last<x) cnt++;
        else last = a[i];
        if(cnt>M) return false;
    }
    return true;
}

int main(){
    cin>>S>>N>>M;
    for(int i=1; i<=N; i++){
        cin>>a[i];
    }
    
    int l=1, r=S, mid;

    while(l<r){
        mid = (l+r+1)/2;
        if(moveLessThanM(mid)) l=mid;
        else r=mid-1;
    }
    cout<<l<<endl;
    return 0;
}
```
:::

::: warning
使用二分模版时，重点还是在于分析要求的值是左区间还是右区间，但是具体程序取决于你对结果划分的判断，例如：

选择的最短距离范围： `[1, 2, 3, 4, 5, ......., 终点位置]`

**判断逻辑调整为**「移动石头的次数超过M」：`[否, 否, 否, 否, ........., 是, 是, 是]`

此时我们要找的是判断为否的最大的数，程序应当调整为：

```cpp
bool moveMoreThanM(int x){ 
    int cnt = 0;
    int last = 0;
    for(int i=1; i<=N; i++){
        if(a[i]-last<x) cnt++;
        else last = a[i];
        if(cnt>M) return true;
    }
    return false;
}

...

while(l<r){
    mid = (l+r+1)/2;
    if(moveMoreThanM(mid)) r=mid-1;
    else l=mid;
}
```
:::