---
title: Lesson 2 - 递推
order: 2
---

## 算法思想
从已知的初始条件出发，依据递推关系，推出所求的结果。

**递推题目需要满足的条件：**
- 从已知条件到所求问题之间，总存在相互的联系。**（递推关系）**
- 递推要确定2点：
	1. 确定初始条件
	2. 确定递推关系（找规律）

**顺推和逆推：**
- 顺推：从事件的开始状态推导到结束状态。[**4451 运输椰子**](https://oj.aicoders.cn/problem/4451)
- 逆推：从事件的结束状态推导到开始状态。[**3677 猴子吃桃**](https://oj.aicoders.cn/problem/3677)
::: details 运输椰子参考程序
```cpp title="4451 运输椰子"
#include<bits/stdc++.h>
using namespace std;

int a[1100];
int main(){
    a[0] = 64062; // 初始值
	for(int i=1; i<=5; i++){ // 顺推
        a[i] = a[i-1]/2 - 1; // 递推式
    }
    cout<<a[5];
	return 0;
}
```
:::

::: details 猴子吃桃参考程序
```cpp title="3677 猴子吃桃"
#include <iostream>
using namespace std;
int a[30];
int main() {
	int n;
	cin>>n;
	a[n] = 1; // 初始值
	for(int i=n-1; i>=1; i--){ // 逆推
		a[i] = (a[i+1]+1)*2; // 递推式
	}
	cout<<a[1];
	return 0;
}
```
:::

## 常见递推模型
### 斐波那契数列类型
递推式子：$a[i] = a[i-1] + a[i-2]$
注意此类模型递推式子再特定题目下的含义和初始值，并且斐波那契数列的增长很大，所求项数较大时，注意开 `long long`

**参考例题：**

[**4427 兔子繁殖**](https://oj.aicoders.cn/problem/4427) 
- 初始值 $a[1]=1, a[2]=1$
- 递推式本质：第 `i` 个月的兔子由来：第 `i-2` 个月的兔子(因为两个月后会生产) + 第 `i-1` 个月的兔子（大兔子和未长大的兔子）

::: details 兔子繁殖参考程序
```cpp title="4427 兔子繁殖"
#include<bits/stdc++.h>
using namespace std;
int a[50];

int main(){
	int n;
    cin>>n;
    
    a[1]=1, a[2]=1;
    for(int i=3; i<=n; i++){
        a[i] = a[i-1] + a[i-2];
    }
    
    cout<<a[n];
	return 0;
}
```
:::

[**4452 养牛场**](https://oj.aicoders.cn/problem/4452)
- 初始值 $a[1]=1, a[2]=2$
- 递推式本质：第 `i` 年的牛由来 = 第 `i-2` 年的牛(因为两年后会成熟会生产) + 第 `i-1` 年的牛（母牛和未成熟的小牛）

::: details 养牛场参考程序
```cpp title="4452 养牛场"
#include<bits/stdc++.h>
using namespace std;
int a[30];
int main(){
	int n;
    cin>>n;
    a[1]=1, a[2]=2;
    for(int i=3; i<=n; i++){
        a[i]=a[i-1]+a[i-2];
    }
    cout<<a[n]-1; // 题目问生产的小牛，减去最初的1头母牛
	return 0;
}
```
:::

[**2854 台阶问题**](https://oj.aicoders.cn/problem/2854)
- 初始值 $a[1]=1, a[2]=2$
- 递推式本质：第 `i` 阶台阶的走法 = 第 `i-2` 阶台阶的走法（一次迈2个台阶可直接到达第 `i` 阶）+ 第 `i-1` 阶台阶的走法（一次迈1个台阶可直接到达第 `i` 阶）

::: details 台阶问题参考程序
```cpp title="2854 台阶问题"
#include <iostream>
using namespace std;

int a[30];
int main() {
	int n;
    cin>>n;
    a[1]=1, a[2]=2;
    for(int i=3; i<=n; i++){
        a[i]=a[i-1]+a[i-2];
    }
    cout<<a[n];
  	return 0;
}
```
:::

[**4428 铺瓷砖**](https://oj.aicoders.cn/problem/4428)
- 初始值 $a[1]=1, a[2]=2$
- 递推式本质：长为 `i` 的墙面的铺设方法 = 长为 `i-2` 的墙面的铺设方法（铺两块瓷砖横着放）+ 长为 `i-1` 的墙面的铺设方法（铺一块瓷砖竖着放）

::: details 铺瓷砖参考程序
```cpp title="4428 铺瓷砖"
#include<bits/stdc++.h>
using namespace std;

int a[30];
int main(){
	int n;
    cin>>n;
    a[1]=1;  a[2]=2;
    for(int i=3; i<=n; i++){
        a[i]=a[i-1]+a[i-2];
    }
    cout<<a[n];
	return 0;
}
```
:::

### 其他变种模型
[**4430 直线分割平面**](https://oj.aicoders.cn/problem/4430)
- 递推式 $a[i]=a[i-1]+i$
- 初始值 $a[1] = 2$
- 递推式本质：添加第  $i$  条直线，这条直线会和之前的  $i-1$  条直线相交，且这些交点会把新添加的直线分割成  $i$  段。每一段都会形成一个新的区域。因此，新的区域数会比原来的增加  $i$  个。因此，第  $i$  步的区域数  $a[i]$  是前一步的区域数  $a[i-1]$  加上新增的  $i$  个区域，即：$a[i] = a[i-1] + i$

::: details 直线分割平面参考程序
```cpp title="4430 直线分割平面"
#include<bits/stdc++.h>
using namespace std;

int n,a[60];
int main(){
	cin>>n;
    a[1] = 2; // 初始值：1条直线，2个平面
    for(int i=2; i<=n; i++){
        a[i]=a[i-1]+i;
    }
    cout<<a[n];
	return 0;
}
```
:::

## 练习
[**2924 斐波那契数列**](https://oj.aicoders.cn/problem/2924)
- 递推式 $a[i]=a[i-1]+a[i-2]$
- 初始值 $a[1] = 1, a[2] = 1$

::: details 斐波那契数列参考程序
```cpp title="2924 斐波那契数列"
#include <iostream>
using namespace std;
long long a[100];
int main() {
	int n;
    cin>>n;
    a[1]=1, a[2]=1;
    for(int i=3; i<=n; i++){
        a[i]=a[i-1]+a[i-2];
    }
    cout<<a[n];
  return 0;
}
```
:::

[**4432 纸的折痕**](https://oj.aicoders.cn/problem/4432)
- 递推式 $a[i]=a[i-1]*2+1$
- 初始值 $a[1] = 1$
- 递推式本质：第  $i$  次折叠，都会让之前  $i-1$ 次折叠产生的折横对称的生成 $2$ 倍的折横，同时，每次在中间会再多产生 $1$ 条新的折痕。

::: details 纸的折痕参考程序
```cpp title="4432 纸的折痕"
#include<bits/stdc++.h>
using namespace std;
int a[30],n;

int main(){
	cin>>n;
    a[1]=1;
    for(int i=2; i<=n; i++){
        a[i] = a[i-1]*2+1;
    }
    cout<<a[n];
	return 0;
}
```
:::

[**1756 Pell数列**](https://oj.aicoders.cn/problem/1756)
- 递推式 $a[i] = 2*a[i-1]+a[i-2]$
- 初始值 $a[1] = 1, a[2] = 2$
- 递推式本质：第  $i$  次折叠，都会让之前  $i-1$ 次折叠产生的折横对称的生成 $2$ 倍的折横，同时，每次在中间会再多产生 $1$ 条新的折痕。

::: details Pell数列参考程序
```cpp title="1756 Pell数列"
#include<bits/stdc++.h>
using namespace std;
int a[1000010],k;

int main(){
	
    a[1]=1,a[2]=2;
    for(int i=3; i<=1000000; i++){
        a[i] = 2*a[i-1]+a[i-2];
        a[i] = a[i]%32767;  // 数字过大，注意按照题目要求求模（取余）
    }
    cin>>k;
    while(k--){ // 注意 k 组数据的输入，每输入1组数据，就输出1行答案
        int x;
        cin>>x;
        cout<<a[x]<<endl;
    }
	return 0;
}
```
:::

