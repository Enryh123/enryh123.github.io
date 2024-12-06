---
title: Lesson 8 - 分支结构综合应用
---

## 数据的真假性

C++中的所有数据都有真假性，非 0 值代表真 ，0 值代表假。 

假：`0`, `'\0'`, `false`, `NULL`
真：`100`, `true`, `'A'`, `"orange"`, `2.5`, `-1`

布尔值可以用来表示数据的真假性，true 为真，false 为假。 

任何类型的数据都可以赋值给 bool 类型的变量，会将该数据转换为布尔值，该布尔值即为 **该数据的真假性。** 

```cpp
bool b; 
b = 0;  // 0 
b = '\0'; // 0 
b = false; // 0 
b = NULL; // 0 

bool a; 
a = 100; // 1 
a = 'A'; // 1 
a = "orange"; // 1 
a = 2.5; // 1
```

### [3053 小美要健康](https://oj.aicoders.cn/problem/3053)

#### 问题分析
这道题目要求根据输入的一个日期，判断当天是否需要去 KFC 或是待在家里。通过一个数字 `x` 来表示日期，如果该数字能被9整除，则选择 "KFC"，否则选择 "home"。

简而言之，输入一个日期数字，如果这个数字除以 9 的余数是 0，那么输出 "KFC"；否则输出 "home"。这可以通过判断 `x % 9 == 0` 来实现。

::: tip
这道题的核心在于利用余数运算（`%`）来决定选择，余数为0时选择 KFC，其他情况选择家里。
:::

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	//1、接收输入的日期
	int x;
	cin >> x;
	//2、根据日期判断当日的饮食
	//方式一：
//	if(x%9==0)
//		cout << "KFC" << endl;
//	else
//		cout << "home" << endl;
	//方式二：
	if(x%9)
		cout << "home" << endl;
	else
		cout << "KFC" << endl;
	return 0;
}
```
:::


### [3054 是否通过考试](https://oj.aicoders.cn/problem/3054)

#### 问题分析
本题需要根据学生的考试分数判断是否通过考试。通过的标准是分数 **大于等于 60**。如果满足条件，输出 `"Pass"`；否则，输出 `"Fail"`。为了简化逻辑，可以使用条件运算符 `? :`，它允许我们将简单的条件判断紧凑地表达在一行中。

::: tip
条件运算符 `? :` 是非常实用的工具，可以简化简单的分支逻辑。它的语法是：
`条件 ? 真值表达式 : 假值表达式`。
例如：`n >= 60 ? "Pass" : "Fail"`。
:::

::: details 代码实现
```cpp
#include <iostream>
using namespace std;

int main(){
	//1. 接收输入的分数
	int n;
	cin >> n;
	//2. 判断分数是否大于等于60，输出对应的结果
    cout << (n>=60 ? "Pass":"Fail");
	return 0;
}
```
:::


### [3055 获取月份对应的天数](https://oj.aicoders.cn/problem/3055)

#### 问题分析
本题要求根据输入的年份和月份，计算该月有多少天。需要注意的是，二月的天数在闰年和非闰年之间有所不同：

- 闰年的判定条件：
  1. 年份能被4整除且不能被100整除；
  2. 或者能被400整除。
- 非闰年二月有28天，闰年二月有29天。
- 其他月份的天数固定：31天（1, 3, 5, 7, 8, 10, 12）或30天（4, 6, 9, 11）。

本题的逻辑可以通过 `switch` 语句结合条件运算符来实现，简化代码结构。

::: tip
- `switch` 语句可以方便地根据不同的月份执行对应的逻辑。
- 条件运算符 `? :` 可用于简化闰年的判断逻辑：`y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28`。
:::


::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	//1、接收用户输入的年份和月份
	int y, m;
	cin >> y >> m;
	//2、创建整型变量保存每个月的天数
	int x=0;
	//3、根据输入，判断这一年的这个月份有多少天
	switch(m){
		case 1: case 3: case 5: case 7: case 8: case 10: case 12: x=31;break;
		case 4: case 6: case 9: case 11: x=30;break;
		case 2:x = y%4==0 && y%100!=0 || y%400==0 ? 29 : 28; break;
		default:cout << "error" << endl;
	}
	//4、输出这一年的这个月有多少天
	cout << x << endl;
	return 0;
}
```
:::

### [3061 客栈选择](https://oj.aicoders.cn/problem/3061)

#### 问题分析
本题要求根据用户的预算和偏好的色调选择合适的客栈。逻辑分为以下几步：

1. 首先判断预算 `m` 的范围：
   - 如果预算 `>= 200`，根据色调 `c` 决定选择客栈 1 或 2；
   - 如果预算 `>= 100`，根据色调 `c` 决定选择客栈 3 或 4；
   - 如果预算低于 100，根据色调 `c` 决定选择客栈 5 或 6。
2. 色调 `c` 的取值范围是字符，`b` 表示蓝色偏好，`y` 表示黄色偏好。
3. 根据逻辑判断，最终输出客栈编号。

::: tip
- 条件语句的嵌套结构可以精确表达多重条件，但也可以通过逻辑清晰的分支组织代码，避免混乱。
- 字符比较使用单引号 `''`。
:::


::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	//1、接收用户输入的预算和色调
	int m;
	char c;
	cin >> m >> c;
	//2、创建整型变量保存客栈编号
	int x;
	//3、根据预算选择客栈
	if(m>=200){
		//4、根据色调进一步选择
		if(c=='b') x=1;
		else x=2;
	}
	else if(m>=100){
		if(c=='y') x=3;
		else x=4;
	}else{
		if(c=='b') x=5;
		else x=6;	
	}
	//5、输出最终选择的客栈编号
	cout << x << endl;
	return 0;
}
```
:::


### [3063 某年的第几天](https://oj.aicoders.cn/problem/3063)

#### 问题分析
本题要求根据输入的年份、月份和日期，计算该日期是该年的第几天。关键点在于处理每月的天数和闰年情况：

1. 闰年的判断：
   - 闰年条件是：年份能被4整除且不能被100整除，或能被400整除。
   - 闰年二月有29天，非闰年二月有28天。

2. 每月的天数：
   - 固定天数的月份：31天（1, 3, 5, 7, 8, 10, 12），30天（4, 6, 9, 11）。
   - 二月的天数需根据闰年与否动态计算。

3. 累加从一月到前一个月的天数，再加上输入的日期 `d`，即可得出结果。

::: tip
- 使用 `switch` 语句便于根据月份累加天数。
- 闰年的判定逻辑应使用条件运算符，确保代码简洁。
:::

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	//1、接收输入的月份和日期
	int y, m, d;
	cin >> y >> m >> d;
	//计算二月份天数
	int feb=y%4==0&&y%100!=0||y%400==0?29:28;
	//2、创建整型变量保存天数
	int sum=0;
	//3、根据输入的月份和日期，计算天数
	switch(m){
		case 2:sum=31;break;
		case 3:sum=31+feb;break;
		case 4:sum=31+feb+31;break;
		case 5:sum=31+feb+31+30;break;
		case 6:sum=31+feb+31+30+31;break;
		case 7:sum=31+feb+31+30+31+30;break;
		case 8:sum=31+feb+31+30+31+30+31;break;
		case 9:sum=31+feb+31+30+31+30+31+31;break;
		case 10:sum=31+feb+31+30+31+30+31+31+30;break;
		case 11:sum=31+feb+31+30+31+30+31+31+30+31;break;
		case 12:sum=31+feb+31+30+31+30+31+31+30+31+30;break;
	}
	sum+=d;
	//输出这是某年的第几天
	cout<<sum;
	return 0;
}
```
:::


## 课后练习参考程序

::: details 3058 公园门票收费系统
```cpp
#include <iostream>
using namespace std;
int main(){
	//1、接收输入的购票人数
	int x;
	cin >> x;
	//2、创建变量保存购票花费
	int y=0;
	//3、根据人数，计算购票花费
	if(x<10) y=45*x;
	else if(x>=10 && x<20) y=(45-2)*x;
	else if(x>=20 && x<30) y=(45-5)*x;
	else y=(45-10)*x;
	//4、输出总费用
	cout << y << endl;
	return 0;
}
```
:::


::: details 3059 自动加油站
```cpp
#include <iostream>
using namespace std;
int main(){
	//1、接收加油量、加油种类、服务类型
	int m;
	char c, ch;
	cin >> m >> c >> ch;
	//2、存储加油总花费
	int x=0;
	//3、根据套餐，计算套餐花费
	switch(c){
		case 'a': x = 1*m; break;
		case 'b': x = 2*m; break;
		case 'c': x = 3*m; break;
	}
	//4、根据套餐，计算套餐花费
	switch(ch){
		case 'f': break;
		case 'm': x-=3; break;
		case 'e': x+=10; break;
	}
	//4、输出加油总花费
	cout << x << endl;
	return 0;
}
```
:::

::: details 3050 公益一日行
```cpp
#include <iostream>
using namespace std;
int main(){
	//1、保存原始积分
	int x=800;
	//2、接收输入的公益活动选项
	int c;
	cin>>c;
	//3、根据输入的公益活动选项，计算最终的积分
	switch(c){
		case 1: x+=100; break;
		case 2: x+=200; break;
		case 3: x+=300; break;
		case 4: x+=400; break;
	}
	//4、输出最终公益积分
	cout<<x<<endl;
	//5、判断能否得到徽章
	if(x>=1000) cout<<"yes";
	else cout<<"no";
	return 0;
}
```
:::

::: details 3498 教学楼
```cpp
#include <iostream>
using namespace std;
int main(){
	int n;
	cin>>n;
	int a,b,c;
	cin>>a>>b>>c;
	if(n<=3){
		if(a<b&&a<c){
			cout <<"library";
		}
		else if(b<c){
			cout <<"comprehensive";
		}
		else cout <<"art";
	}
	else if(n<=5){
		if(b<c){
			cout <<"comprehensive";
		}
		else cout <<"art";
	}
	else cout <<"art";
	return 0;
}
```
:::