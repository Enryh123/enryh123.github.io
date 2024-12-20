---
title: Lesson 3 - 递推进阶
order: 3
---

## 1971 移动路线
**思路：**
1. 我们可以创建一个二维数组$dp$，其中$dp[i][j]$表示从左上角$(1,1)$移动到$(i,j)$的不同路线数目。
2. 蚂蚁只能向右或者向下移动，因此到达某个位置$(i, j)$的路线数目等于它上方的格子的路线数目加上它左边的格子的路线数目。
3. 边界条件是，第一行的所有位置只能从左边来，因此只有一种移动方式；第一列的所有位置只能从上边来，因此也只有一种移动方式。
4. 最终，我们要求的答案是$dp[n][m]$。

```plain title="输入数据"
10
20 40 32 67 40 20 89 300 400 15
```

**样例解释：**
对于输入 2 3：
1. (1,1) -> (1,2) -> (1,3) -> (2,3)
2. (1,1) -> (1,2) -> (2,2) -> (2,3)
3. (1,1) -> (2,1) -> (2,2) -> (2,3)

总共3种不同的移动路线，输出为3。

```cpp title="参考程序"
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m; // 输入矩阵的行数和列数

    long long dp[21][21] = {0}; // 定义动态规划数组，初始化为0，矩阵最大为20x20

    // 初始化起点
    dp[1][1] = 1;

    // 填充动态规划数组
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue; // 跳过起点
            dp[i][j] = 0; // 初始化当前位置的路径数为0
            // 如果有上方格子，加上从上方来的路径数
            if (i > 1) dp[i][j] += dp[i - 1][j]; 
            // 如果有左边格子，加上从左边来的路径数
            if (j > 1) dp[i][j] += dp[i][j - 1]; 
        }
    }

    // 输出从左上角到右下角的不同路线数目
    cout << dp[n][m] << endl;

    return 0;
}
```

## 6754 路径计数
**思路：**
1. 我们可以创建一个二维数组dp，其中$dp[i][j]$表示从左上角$(1,1)$移动到$(i,j)$的不同路线数目。
2. 蚂蚁只能向右或者向下移动，因此到达某个位置$(i, j)$的路线数目等于它上方的格子的路线数目加上它左边的格子的路线数目。
3. 需要考虑障碍的位置，使用一个障碍数组来标记哪些位置是不能走的。
4. 边界条件是，第一行的所有位置只能从左边来，因此只有一种移动方式；第一列的所有位置只能从上边来，因此也只有一种移动方式。
5. 最终，我们要求的答案是$dp[n][n]$。

**样例解释：**
对于输入 3 1 和障碍位置 (3,1)：
1. (1,1) -> (1,2) -> (1,3) -> (2,3) -> (3,3)
2. (1,1) -> (1,2) -> (2,2) -> (2,3) -> (3,3)
3. (1,1) -> (1,2) -> (2,2) -> (3,2) -> (3,3)
4. (1,1) -> (2,1) -> (2,2) -> (2,3) -> (3,3)
5. (1,1) -> (2,1) -> (2,2) -> (3,2) -> (3,3)

总共5种不同的移动路线，输出为5。

```cpp title="参考程序"
#include <bits/stdc++.h> 
using namespace std;

int main() {
    int n, m;
    cin >> n >> m; // 输入网格的边长和障碍数
    // 定义动态规划数组，使用long long以避免超出int范围
    long long dp[21][21] = {0}; 
    // 定义障碍标记数组，初始化为false
    bool obstacle[21][21] = {false}; 

    // 输入障碍位置
    for (int i = 0; i < m; i++) {
        int x, y;
        cin >> x >> y;
        obstacle[x][y] = true; // 标记障碍位置
    }

    // 初始化起点
    dp[1][1] = 1;

    // 填充动态规划数组
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i == 1 && j == 1) continue; // 跳过起点
            if (obstacle[i][j]) {
                dp[i][j] = 0; // 如果当前位置是障碍，路径数为0
                continue;
            }
            // 如果有上方格子，加上从上方来的路径数
            if (i > 1) dp[i][j] += dp[i - 1][j]; 
            // 如果有左边格子，加上从左边来的路径数
            if (j > 1) dp[i][j] += dp[i][j - 1]; 
        }
    }

    // 输出从左上角到右下角的不同路线数目
    cout << dp[n][n] << endl;

    return 0;
}
```

## 1796 数字金字塔
**思路：**
1. 使用动态规划来解决数字金字塔最大路径和的问题。
2. 我们从底部开始向上进行动态规划，每个点的最大路径和等于它当前的值加上它下面一层的两个子节点中较大的那个。
3. 最终我们可以在顶端得到最大路径和。

**样例解释：**
对于输入 5 行的金字塔：
```plain
13
11 8
12 7 26
6 14 15 8
12 7 13 24 11
```

从13到8到26到15到24的路径产生了最大的和86。

```cpp title="参考程序"
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n; // 输入行数

    int pyramid[1001][1001] = {0}; // 定义数字金字塔数组，初始化为0

    // 输入数字金字塔的数据

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cin >> pyramid[i][j];
        }
    }

    // 从倒数第二行开始向上计算最大路径和
    for (int i = n - 1; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            pyramid[i][j] += 
              max(pyramid[i + 1][j], pyramid[i + 1][j + 1]);
        }
    }

    // 输出最大路径和
    cout << pyramid[1][1] << endl;

    return 0;
}
```

## 6753 数字金字塔2
**思路**
与上一题类似，改成求最小值

## 1672 莱布尼茨三角形
**思路**
1. 观察规律，`pyramid[i][j]` 的值为左上方的分数减去正左边的分数求的
2. 假设左上方的分数为 $\frac{1}{a}$，正左方的分数为 $\frac{1}{b}$
3. 则：$\frac{1}{a} - \frac{1}{b} = \frac{b}{ab} - \frac{a}{ab} = \frac{b-1}{ab}$
4. 由于每一个数字的分子均为1，因此化简为：$\frac{1}{\frac{ab}{b-a}}$，分母为$\frac{ab}{b-a}$
5. 因此，数组只需要存储分母即可，及第一列依次存储 `1~n`, 其余利用上述式子计算即可

```cpp title="参考程序"
#include<bits/stdc++.h>
using namespace std;

int main(){
    int n, m;
    cin>>n>>m;
    // 数据可能过大 开long long
    long long pyramid[31][31] = {0};
    // 初始化第一列的分母
    for(int i=1; i<=n; i++) pyramid[i][1] = i;
    
    for(int i=2; i<=n; i++){
        for(int j=2; j<=i; j++){
            // 计算当前数字的分母
            long long a = pyramid[i-1][j-1];
            long long b = pyramid[i][j-1];
            pyramid[i][j] = a*b/(b-a);
        }
    }
    
    cout<< "1/" << pyramid[n][m];
}
```


## 1700 爬行路线
**思路**
1. 本质上只是求斐波那契数列
2. 注意题目是从 M 到 N，因此 M 项相当于斐波那契数列的第 1 项，第 N 项相当于斐波那契数列的第 N-M+1 项

```cpp title="参考程序"
#include<bits/stdc++.h>
using namespace std;

int main(){
    int m, n;
    cin>>m>>n;
    long long ans[100]={0,1,1};
    for(int i=3; i<=n-m+1; i++) ans[i]=ans[i-1]+ans[i-2];
    
    cout<< ans[n-m+1];
    return 0;
}
```

## 8524 路径计数2
**思路**
和前面的题目类似，但是注意取模运算（求余数），需要再循环内每次进行

## 1258 杨辉三角
**思路**
1. 找规律，第一列和最后一列是数字 1
2. 其余数字等于正上方数字加左上方数字

```cpp title="参考程序"
#include<bits/stdc++.h>
using namespace std;

int main(){
    int n, m;
    cin>>n>>m;
    
    long long pyramid[31][31] = {0};
    
    for(int i=1; i<=n; i++){
        for(int j=1; j<=i; j++){
            if(j==1 || j==i) pyramid[i][j]=1;
            else pyramid[i][j] = pyramid[i-1][j-1]+pyramid[i-1][j];
            cout<<pyramid[i][j]<<' ';
        }
        cout<<endl;
    }

    return 0;
}
```

## 1970 苹果摆放
**思路：**
1. 使用动态规划的方法来解决把M个苹果放在N个盘子中的分法数目。
2. 使用一个二维数组$dp$，其中$dp[i][j]$表示将i个苹果放入j个盘子的不同分法数目。
3. 边界条件为，如果盘子数为1或者苹果数为0，则只有一种分法。
4. 通过迭代的方式，从下到上逐步填充$dp$数组，最终得到结果。

**样例解释：**
对于输入 7 个苹果和 3 个盘子：
1. 7, 0, 0
2. 6, 1, 0
3. 5, 2, 0
4. 5, 1, 1
5. 4, 3, 0
6. 4, 2, 1
7. 3, 3, 1
8. 3, 2, 2

总共有 8 种不同的分法，输出为 8。


```cpp title="参考程序"
#include <bits/stdc++.h> 
using namespace std;

int main() {
    int t;
    cin >> t; // 输入测试数据的数目

    while (t--) {
        int m, n;
        cin >> m >> n; // 输入苹果数和盘子数

        int dp[11][11] = {0}; // 定义动态规划数组，初始化为0，m, n <= 10

        // 初始化边界条件
        for (int i = 0; i <= n; i++) {
            dp[0][i] = 1; // 0个苹果放入i个盘子只有1种方法
        }
        for (int i = 0; i <= m; i++) {
            dp[i][1] = 1; // i个苹果放入1个盘子只有1种方法
        }

        // 填充动态规划数组
        for (int i = 1; i <= m; i++) {
            for (int j = 2; j <= n; j++) {
                if (i < j) {
                    dp[i][j] = dp[i][i]; // 苹果数小于盘子数，相当于只用i个盘子
                } else {
                    dp[i][j] = dp[i][j - 1] + dp[i - j][j]; // 两种情况：有一个盘子空着或者至少每个盘子有一个苹果
                }
            }
        }
        cout << dp[m][n] << endl;
    }

    return 0;
}
```