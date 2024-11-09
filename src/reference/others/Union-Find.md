---
title: 并查集
---

## 并查集的概念

**什么是并查集？**

想象一下，我们有很多个小团体，每个团体里有几个人，刚开始每个人都独自成一个小团体，没有和其他人“连通”。如果我们让两个人成为朋友，就要让他们所在的两个团体合并。为了简化管理，我们希望用一种方法快速判断两个团体是否已经合并在一起，或快速让两个团体合并。**并查集**就是为了解决这类问题的一个数据结构。

在并查集中，每个“元素”都有一个“父节点”，一组有共同“父节点”的元素就属于一个团体。并查集支持两个主要操作：
1. **查找**（Find）：找到某个元素所在团体的“根节点”。
2. **合并**（Union）：将两个团体合并成一个团体。

## 并查集的应用

[P111 修复公路](https://www.luogu.com.cn/problem/P1111)

我们可以用并查集来解决“修复公路”的问题。题目要求我们判断所有村庄何时能够连通，也就是说，要知道每个村庄是否属于同一个连通的团体。如果每个村庄都能互相连通，那么它们就属于同一个团体。

### [P111 修复公路] 具体步骤

#### 步骤1：初始化并查集

假设我们有 5 个村庄（编号为 1 到 5），一开始，每个村庄都是一个独立的团体。我们可以用一个数组 `parent` 来表示每个村庄的父节点关系：
```cpp
parent[i] = i;  // 刚开始时，每个村庄都是自己的父节点
```
- 例子：村庄1的父节点是1，村庄2的父节点是2，以此类推。

```cpp
// 初始化每个村庄为自己的父节点
void init(int n) {
	parent.resize(n + 1);
	for (int i = 1; i <= n; ++i) {
		parent[i] = i;  // 每个村庄自己就是自己的父节点
	}
}
```

#### 步骤2：合并两个团体

假设村庄1和村庄2之间修好了公路，我们就可以把它们合并成一个团体。如何合并呢？我们可以让村庄1的父节点变成村庄2的父节点，或者反过来都可以。**合并之后，它们会拥有同一个父节点**，从而表示属于同一个团体。

在并查集中，这一步称为“合并”操作（Union），通常我们把其中一个村庄的父节点设为另一个村庄的父节点。例如：
```cpp
parent[1] = 2;  // 让村庄1的父节点变成村庄2的父节点
```

```cpp
// 合并两个村庄所在的团体，按深度合并
bool unite(int x, int y) {
	int rootX = find(x);
	int rootY = find(y);
	if (rootX == rootY) return false;  // 已经连通，不需要再合并
	parent[rootY] = rootX;
	return true;
}
```

#### 步骤3：查找团体根节点

为了方便判断两个村庄是否在同一个团体，我们需要找到某个村庄所属团体的根节点。如果两个村庄的根节点相同，说明它们属于同一个团体。

查找根节点的过程叫做“查找”操作（Find）。例如，如果我们要查找村庄1的根节点，我们可以查看 `parent` 数组，继续沿着父节点往上找，直到找到自己是自己的父节点为止。

```cpp
// 查找根节点，并路径压缩
int find(int x) {
	if (parent[x] == x) return parent[x];
	int root = find(parent[x]);  
	return parent[x] = root;
}
```


#### 步骤4：解决问题的过程

让我们具体看看如何用并查集解决这个问题。

1. **读取输入**：输入包含村庄数 `N` 和公路数 `M`，然后是 `M` 条公路的信息。每条公路告诉我们两个村庄和修复完成的时间。
  
2. **按时间排序公路**：为了找到最早的连通时间，我们按公路的修复时间 `t` 从小到大排序。这样，我们可以从最早修复的公路开始逐步合并村庄。

3. **遍历公路并合并村庄**：依次处理每条公路：
   - 使用并查集的合并操作（Union）将两个村庄连接在一起。
   - 每次成功连接两个村庄时，检查当前的村庄连通情况。

4. **判断是否完全连通**：在每次连接后，检查是否所有村庄都属于同一个团体。若是，则记录此时的时间 `t`，并结束循环。如果最终遍历完所有公路后，仍然有村庄不连通，则返回 `-1`。

#### 完整代码

```cpp
#include <bits/stdc++.h>
using namespace std;

// 初始化并查集数组
vector<int> parent;

// 初始化每个村庄为自己的父节点
void init(int n) {
	parent.resize(n + 1);
	for (int i = 1; i <= n; ++i) {
		parent[i] = i;  // 每个村庄自己就是自己的父节点
	}
}

// 查找根节点，并路径压缩
int find(int x) {
	if (parent[x] == x) return parent[x];
	int root = find(parent[x]);  
	return parent[x] = root;
}

// 合并两个村庄所在的团体，按深度合并
bool unite(int x, int y) {
	int rootX = find(x);
	int rootY = find(y);
	if (rootX == rootY) return false;  // 已经连通，不需要再合并
	parent[rootY] = rootX;
	return true;
}

// 主函数
int main() {
	int N, M;
	cin >> N >> M;
	
	vector<tuple<int, int, int>> roads;  // 存储每条公路的信息
	for (int i = 0; i < M; ++i) {
		int x, y, t;
		cin >> x >> y >> t;
		roads.emplace_back(t, x, y);  // 直接构建tuple并插入
	}
	
	// 按照时间 t 从小到大排序
	sort(roads.begin(), roads.end());
	
	init(N);  // 初始化并查集
	
	int earliest_time = -1;  // 最早连通时间
	int components = N;  // 初始时有 N 个独立团体
	
	for (auto road : roads) {
		int t = get<0>(road);
		int x = get<1>(road);
		int y = get<2>(road);
		
		if (unite(x, y)) {  // 如果成功连接
			--components;  // 减少一个独立团体
			if (components == 1) {  // 如果所有村庄连通
				earliest_time = t;  // 记录时间
				break;
			}
		}
	}
	
	cout << earliest_time << endl;  // 输出结果
	return 0;
}
```


::: tip
`emplace_back` 是 C++11 引入的一种向 `std::vector`、`std::deque` 等容器尾部添加元素的方法。它的作用和 `push_back` 类似，但有一些不同之处，主要在于它能直接在容器内构造元素，从而减少不必要的临时对象构造和复制，提高代码的效率。

**解释 `push_back` 和 `emplace_back` 的区别**

- **`push_back`**：向容器尾部添加一个已构造好的对象，容器内部会先创建一个临时对象，再把这个临时对象复制或移动到容器尾部。
- **`emplace_back`**：直接在容器尾部构造对象，传入构造该对象所需的参数，避免了临时对象的创建和复制，效率更高。

**举个例子**

假设我们有一个简单的类 `Person`，它包含名字和年龄：

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Person {
    string name;
    int age;
    Person(string n, int a) : name(n), age(a) {}  // 构造函数
};
```

**使用 `push_back`**

如果我们用 `push_back` 来添加 `Person` 对象，我们需要先构造一个 `Person` 对象，然后将它传递给 `push_back`，如下：

```cpp
int main() {
    vector<Person> people;
    Person p("Alice", 30);  // 构造一个临时对象 p
    people.push_back(p);    // 将 p 复制到 vector 中
    return 0;
}
```

在这种情况下，`p` 对象是先创建好的，然后 `push_back` 会把 `p` 复制到 `vector` 尾部。这就意味着需要一次额外的构造和复制。

**使用 `emplace_back`**

使用 `emplace_back`，可以直接在 `vector` 中构造 `Person`，不需要额外的临时对象。它的用法如下：

```cpp
int main() {
    vector<Person> people;
    people.emplace_back("Alice", 30);  // 直接在 vector 中构造 Person 对象
    return 0;
}
```

这里 `emplace_back` 会传递参数 `"Alice"` 和 `30`，并在 `vector` 尾部直接构造一个 `Person` 对象，而不需要构造临时对象，也没有复制的开销。

**总结**

- **`push_back`** 需要一个已构造好的对象，会有额外的复制（或移动）操作。
- **`emplace_back`** 直接在容器尾部构造对象，可以避免临时对象的构造和复制，更高效。
:::

### 优化

“按秩合并”是并查集（Union-Find）算法中的一种优化策略，目的是减少合并操作中的树高度，从而提高查找操作的效率。

#### 并查集中的树结构

在并查集中，每个元素都有一个父节点，通过父节点可以逐层向上找到所属团体的根节点。合并多个元素时，会形成一个树状结构。在最坏情况下，如果树高度很大，查找（Find）操作的效率会变得很低。按秩合并就是为了解决这个问题。

#### 什么是秩（Rank）

在按秩合并中，“秩”（Rank）是用来表示树的“高度”或者“深度”的一个概念。每个节点都有一个秩，初始时，每个节点的秩为 0，因为它们都是单独的节点。

在并查集中，**秩的意义是该节点为根的树的深度**。秩越高，意味着该树的深度越大。

#### 按秩合并的过程

当我们想合并两个不同的集合（即合并两个不同的根节点）时：

1. **找到两个集合的根节点**：找到两个元素各自的根节点（使用路径压缩优化）。
2. **比较两个根节点的秩**：
   - 如果根节点 A 的秩大于根节点 B 的秩，将 B 的根节点设为 A，这样新的合并结果的深度不会增加。
   - 如果根节点 B 的秩大于根节点 A 的秩，则将 A 的根节点设为 B。
   - 如果两个根节点的秩相同，则任选一个作为根节点（通常让其中一个的父节点指向另一个），并将新根节点的秩增加 1。

按秩合并的好处是：**可以有效地保持树的高度较小，从而在后续查找操作中减少路径的长度，优化查找速度**。

#### 举个例子

假设我们有五个元素，初始状态每个元素都是自己的集合，即 `parent` 数组为 `[0, 1, 2, 3, 4, 5]`，每个元素的秩都为 0（如图所示）。

##### 初始状态

| 元素 | 1 | 2 | 3 | 4 | 5 |
|------|---|---|---|---|---|
| 父节点 | 1 | 2 | 3 | 4 | 5 |
| 秩 | 0 | 0 | 0 | 0 | 0 |

##### 合并操作

1. **合并 1 和 2**：两者秩相同，可以任选一个为根。假设让 1 成为根节点，将 2 的父节点设为 1，并将 1 的秩增加到 1。

   结果：

   | 元素 | 1 | 2 | 3 | 4 | 5 |
   |------|---|---|---|---|---|
   | 父节点 | 1 | 1 | 3 | 4 | 5 |
   | 秩 | 1 | 0 | 0 | 0 | 0 |

2. **合并 3 和 4**：同理，假设让 3 成为根，将 4 的父节点设为 3，3 的秩增加到 1。

   结果：

   | 元素 | 1 | 2 | 3 | 4 | 5 |
   |------|---|---|---|---|---|
   | 父节点 | 1 | 1 | 3 | 3 | 5 |
   | 秩 | 1 | 0 | 1 | 0 | 0 |

3. **合并 1 和 3**：现在，1 和 3 都是各自集合的根节点，并且它们的秩相同（都是 1）。我们可以选择将 3 的父节点设为 1（或反过来），并将新根节点 1 的秩增加到 2。

   结果：

   | 元素 | 1 | 2 | 3 | 4 | 5 |
   |------|---|---|---|---|---|
   | 父节点 | 1 | 1 | 1 | 3 | 5 |
   | 秩 | 2 | 0 | 1 | 0 | 0 |

#### 按秩合并的效果

通过按秩合并，树的高度被尽量压缩，这样在查找操作中能够更快地找到根节点。与路径压缩一起使用时，按秩合并可以使并查集的效率接近于常数时间（接近 $O(1)$）。

::: details
```cpp
#include <bits/stdc++.h>
using namespace std;

// 初始化并查集数组
vector<int> parent, deep;

// 初始化每个村庄为自己的父节点
void init_union_find(int n) {
    parent.resize(n + 1);
    deep.resize(n + 1, 0);  // 深度初始为0，用于优化合并
    for (int i = 1; i <= n; ++i) {
        parent[i] = i;  // 每个村庄自己就是自己的父节点
    }
}

// 查找根节点，并路径压缩
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // 递归查找并压缩路径
    }
    return parent[x];
}

// 合并两个村庄所在的团体，按深度合并
bool unite(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);
    if (rootX == rootY) return false;  // 已经连通，不需要再合并
    if (deep[rootX] > deep[rootY]) {
        parent[rootY] = rootX;
    } else if (deep[rootX] < deep[rootY]) {
        parent[rootX] = rootY;
    } else {
        parent[rootY] = rootX;
        ++deep[rootX];
    }
    return true;
}

// 主函数
int main() {
    int N, M;
    cin >> N >> M;

    vector<tuple<int, int, int>> roads;  // 存储每条公路的信息
    for (int i = 0; i < M; ++i) {
        int x, y, t;
        cin >> x >> y >> t;
        roads.emplace_back(t, x, y);  // 直接构建tuple并插入
    }

    // 按照时间 t 从小到大排序
    sort(roads.begin(), roads.end());

    init_union_find(N);  // 初始化并查集

    int earliest_time = -1;  // 最早连通时间
    int components = N;  // 初始时有 N 个独立团体

    for (const auto& road : roads) {
        int t = get<0>(road);
        int x = get<1>(road);
        int y = get<2>(road);
        
        if (unite(x, y)) {  // 如果成功连接
            --components;  // 减少一个独立团体
            if (components == 1) {  // 如果所有村庄连通
                earliest_time = t;  // 记录时间
                break;
            }
        }
    }

    cout << earliest_time << endl;  // 输出结果
    return 0;
}
```
:::


### [P1195 口袋的天空](https://www.luogu.com.cn/problem/P1195)
这道题可以用和“修复公路”类似的思路来解决，依然可以用并查集（Union-Find）的思想来处理。我们要将云朵分成 $K$ 个“棉花糖”，并保证连接的代价最小。下面是解题的详细思路。

### 解题思路

**理解目标**：
- 我们有 $N$ 朵云和 $M$ 条可以连接的边，每条边有一个连接代价。
- 目标是把 $N$ 朵云分成 $K$ 个连通分量，每个连通分量代表一个“棉花糖”。
- 要求使得连接的总代价最小。



### 代码实现

根据上述思路，我们可以写出代码。代码中我们依然使用并查集来判断连通性。

```cpp
#include <bits/stdc++.h>
using namespace std;

// 并查集
vector<int> parent;

// 初始化并查集
void init(int n) {
	parent.resize(n + 1);
	for (int i = 1; i <= n; ++i) {
		parent[i] = i;  
	}
}

// 查找根节点，并路径压缩
int find(int x) {
	if (parent[x] == x) return parent[x];
	int root = find(parent[x]);  
	return parent[x] = root;
}

// 合并两个集合，按深度合并
bool unite(int x, int y) {
	int rootX = find(x);
	int rootY = find(y);
	if (rootX == rootY) return false;  // 已经在同一集合中
	parent[rootY] = rootX;
	return true;
}

// 主函数
int main() {
	int N, M, K;
	cin >> N >> M >> K;
	
	vector<tuple<int, int, int>> edges;  // 存储边的信息 (代价，节点1，节点2)
	for (int i = 0; i < M; ++i) {
		int X, Y, L;
		cin >> X >> Y >> L;
		edges.emplace_back(L, X, Y);
	}
	
	// 按照代价从小到大排序
	sort(edges.begin(), edges.end());
	
	init(N);  // 初始化并查集
	
	int cost = 0;  // 最小生成树的总代价
	int components = N;  // 初始时每个节点都是一个独立的分量
	
	for (auto edge : edges) {
		int L = get<0>(edge);
		int X = get<1>(edge);
		int Y = get<2>(edge);
		
		if (unite(X, Y)) {  // 如果成功合并
			cost += L;  // 更新总代价
			--components;  // 减少一个连通分量
			if (components == K) break;  // 已形成K个连通分量
		}
	}
	
	// 如果最后连通分量数量不足K，则无法分成K个棉花糖
	if (components > K) {
		cout << "No Answer" << endl;
	} else {
		cout << cost << endl;  // 输出最终最小代价
	}
	
	return 0;
}
```

### [P1196 [NOI2002] 银河英雄传说](https://www.luogu.com.cn/problem/P1196)

```cpp
#include <bits/stdc++.h>
using namespace std;

// 并查集
vector<int> parent, num, front;

// 初始化并查集
void init(int n) {
	parent.resize(n + 1);
	num.resize(n + 1);
	front.resize(n + 1);
	for (int i = 1; i <= n; ++i) {
		parent[i] = i;   // 每个战舰的父节点都是自己
		num[i] = 1;   // 每个战舰开始时单独为一个集合，大小为 1
	}
}

// 查找操作，路径压缩
int find(int x) {
	if (parent[x] == x) return parent[x];
	int root = find(parent[x]);  // 路径压缩
	front[x] += front[parent[x]];
	return parent[x]=root;
}


// 合并操作
void unite(int x, int y) {
	int rootX = find(x);
	int rootY = find(y);
	// x合并到y
	front[rootX] += num[rootY];  // x前面的节点要加上合并后y的长度
	parent[rootX] = rootY;
	num[rootY] += num[rootX];
	num[rootX] = 0;
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(0);
	
	int T;
	cin >> T;
	init(30000);  // 初始化并查集
	
	while (T--) {
		char cmd;
		int i,j;
		cin >> cmd >> i >> j;
		
		if (cmd == 'M') {  // 合并指令
			unite(i, j);
		} else if (cmd == 'C') {  // 查询指令
			if (find(i) == find(j)) {
				cout << abs(front[i] - front[j])-1 << endl;  // 在同一列时输出两者之间的战舰数目
			} else {
				cout << -1 << endl;  // 不在同一列
			}
		}
	}
	
	return 0;
}
```

### [P1396 营救](https://www.luogu.com.cn/problem/P1396)
```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

// 初始化并查集
void init(int n){
	parent.resize(n + 1);  // 区域编号从1开始
	for (int i = 1; i <= n; ++i)
		parent[i] = i;
}


// 并查集查找
int find(int x) {
	if (parent[x] == x) return parent[x];
	int root = find(parent[x]);  // 路径压缩
	return parent[x] = root;
}

// 并查集合并
void unite(int x, int y) {
	int rootX = find(x);
	int rootY = find(y);
	if (rootX != rootY) parent[rootX] = rootY;
}

int main() {
	int n, m, s, t;
	cin >> n >> m >> s >> t;
	init(n);
	vector<tuple<int,int,int>> edges(m);
	// 读取道路信息
	for (int i = 0; i < m; ++i) {
		int u,v,w;
		cin>>u>>v>>w;
		edges.emplace_back(w,u,v);
	}
	
	// 按拥挤度从小到大排序
	sort(edges.begin(), edges.end(), less<tuple<int,int,int>>());
	
	// 遍历边，合并集合
	for (auto edge: edges) {
		int w = get<0>(edge);
		int u = get<1>(edge);
		int v = get<2>(edge);
		unite(u, v);
		// 检查 s 和 t 是否连通
		if (find(s) == find(t)) {
			cout << w << endl;
			return 0;
		}
	}
	
	return 0;
}
```

### [P1455 搭配购买](https://www.luogu.com.cn/problem/P1455)
```cpp
#include <bits/stdc++.h>
using namespace std;

// 并查集
vector<int> parent, prices, values;

// 初始化并查集
void init(int n) {
	parent.resize(n + 1);
	prices.resize(n + 1);
	values.resize(n + 1);

	for (int i = 1; i <= n; ++i) {
		parent[i] = i;  
	}
}

// 查找根节点，并路径压缩
int find(int x) {
	if (parent[x] == x) return parent[x];
	int root = find(parent[x]);
	return parent[x] = root;
}

// 合并两个物品的集合，按深度合并
void unite(int x, int y) {
	int rootX = find(x);
	int rootY = find(y);
	if (rootX != rootY) {
		// 合并
		prices[rootX] += prices[rootY];
		values[rootX] += values[rootY];
		parent[rootY] = rootX;
	}
}

int main() {
	int N, M, W;
	cin >> N >> M >> W;
	// 初始化并查集
	init(N);
	// 初始化物品属性
	for (int i = 1; i <= N; ++i) {
		cin >> prices[i] >> values[i];
	}
	
	// 合并物品集合
	vector<int> new_price, new_value;
	
	for (int i = 1; i <= M; ++i) {
		int x, y;
		cin >> x >> y;
		unite(x, y);
	}
	
	// 处理合并后的物品，将合并后的物品存入新数组
	for (int i = 1; i <= N; ++i) {
		if (parent[i] == i) {  // 只处理合并后的根节点
			new_price.push_back(prices[i]);
			new_value.push_back(values[i]);
		}
	}
	
	// 01背包计算
	vector<int> dp(W + 1, 0);  // 背包动态规划数组
	for (int i = 0; i < (int)new_price.size() ; i++) {
		for (int j = W; j >= new_price[i]; j--) {  // 01背包一维数组优化
			dp[j] = max(dp[j], dp[j - new_price[i]] + new_value[i]);
		}
	}
	cout << dp[W] << endl;
	
	return 0;
}
```