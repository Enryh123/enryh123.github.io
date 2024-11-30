---
title: Lesson 7 - switch 语句
---

## switch 语句的基本结构
根据不同的情况进行多种选择也可以使用 switch 多分支语句完成。

使用 switch 多分支语句实现根据不同天气进行不同安排，示例代码如下：

![](https://enryh-image-1302512306.cos.ap-chongqing.myqcloud.com/picgo/20241127141423.png)

::: details 示例代码
```cpp
#include <iostream>
using namespace std;
int main(){
	int n;
	cin >> n;
	switch(n){
		case 1: cout<<"park"; break;
		case 2: cout<<"hill"; break;
		case 3: cout<<"library"; break;
		default: cout<<"homework"; break;
	}
	return 0;
}
```
:::


## switch 语句的语法
switch 多分支语句的语法格式如下：

```cpp
switch(表达式){
	case 数值1: 语句1; break;
	case 数值2: 语句2; break;
	......
	case 数值n: 语句n; break;
	default: 语句; break;
}
```

**switch 多分支语句的执行规则：**

根据 switch 后面表达式的值，找到匹配的 case，执行相应的语句。找不到匹配的 case， 则执行 default 语句。

**switch 多分支语句的注意事项：**
1. switch 表达式结果必须为**整型**。
2. case 后面不能是变量，必须为**具体数值**，可以是整数、字符、布尔值。该数值不能重复。
3. default 语句是默认语句，当表达式的结果与所有 case 都不匹配时，执行该语句。
4. default 语句**不是必须**的，可以写在任意位置，不一定是最后。


### [3047 自定义的计算器](https://oj.aicoders.cn/problem/3047)

#### 问题分析
分别判断 +，-，*，/，% 五种运算，并执行对应语句，可以使用 switch 语句。

::: details 代码实现
```cpp
#include<iostream>
using namespace std;

int main(){
    int a, b;
    char op;
    cin >> a >> op >> b;
    
    switch(op){
        case '+': cout<<a+b; break;
        case '-': cout<<a-b; break;
        case '*': cout<<a*b; break;
        case '/': cout<<a/b; break;
        case '%': cout<<a%b; break;
    }
    
    return 0;
}
```
:::


## break 关键字
break 的作用是终止整个 switch 语句。switch 多分支语句执行过程中，通过表达式的结果找到匹配的 case 分支或者 default 作为入口，直到遇到 break，结束整个  switch 语句。 

示例代码和执行流程图如下：

![](https://enryh-image-1302512306.cos.ap-chongqing.myqcloud.com/picgo/20241127142103.png)


## switch 语句的应用

### [3048 停车计费](https://oj.aicoders.cn/problem/3048)

#### 问题分析
判断输入的小时数，第1个小时和第2个小时单独计算，从第3个小时，按照20的价格计算，并加上之前2个小时的费用。可以使用 switch 语句实现，单独判断 case 1 和 case 2, 其他情况使用 default 处理。

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
    //1、接收输入的停车小时数
	int h;
    cin >> h;
    //2、记录停车的总费用
    int sum = 0;
    //3、根据小时数，计算停车的总费用
	switch(h){
        case 1: sum += 10; break;
        case 2: sum += 10+15; break;
        default: sum += 10+15+20*(h-2); break;
    }
    //4、输出停车总费用
	cout << sum;
    return 0;
} 
```
:::

### [3049 大白老师的工资](https://oj.aicoders.cn/problem/3049)

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
    //1、保存大白老师的原始工资8000
	int m = 8000;
    //2、接收输入评级
	char x;
    cin >> x;
    //3、根据评级，计算大白老师下一年的工资
	switch(x){
        case 'A': m += 500; break;
        case 'B': m += 200; break;
        case 'C': break;
        case 'D': m -= 200; break;
        case 'E': m -= 500; break;
        default: cout<<"error"<<endl; break;
    }
    //4、输出计算结果
    cout << m;
    return 0;
}
```
:::

### [3037 判断成绩等级](https://oj.aicoders.cn/problem/3037)

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	int x;
    cin >> x;
	switch(x/10){
        case 10: 
        case 9: cout<<'A'; break;
        case 8: 
        case 7: cout<<'B'; break;
        case 6: cout<<'C'; break;
        default: cout<<'D'; break;
    }
    return 0;
}
```
:::


## 课后练习

### [3051 今天星期几](https://oj.aicoders.cn/problem/3051)

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	int x;
    cin >> x;
	switch(x){
        case 1: cout<<"Monday"<<endl; break;
        case 2: cout<<"Tuesday"<<endl; break;
        case 3: cout<<"Wednesday"<<endl; break;
        case 4: cout<<"Thursday"<<endl; break;
        case 5: cout<<"Friday"<<endl; break;
        case 6: cout<<"Saturday"<<endl; break;
        case 7: cout<<"Sunday"<<endl; break;   
    }
    return 0;
}
```
:::


### [3052 图书套餐](https://oj.aicoders.cn/problem/3052)

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	int n, sum = 0;
    cin>>n;
    switch(n){
        case 1: sum+=54+49; break;
        case 2: sum+=59+42; break;
        case 3: sum+=30+31; break;
        case 4: sum+=30+50; break;
    }
    if(sum >= 100) sum -= 10;
    cout << sum;
    return 0;
}
```
:::

### [3495 成绩等级与分数](https://oj.aicoders.cn/problem/3495)

::: details 代码实现
```cpp
#include <iostream>
using namespace std;
int main(){
	char x;
    cin >> x;
	switch(x){
        case 'A': cout<<"90~100"<<endl; break;
        case 'B': cout<<"80~90"<<endl; break;
        case 'C': cout<<"60~80"<<endl; break;
        case 'D': cout<<"fail"<<endl; break;
        default: cout<<"error"<<endl; break;
    }
    return 0;
}
```
:::


### [3496 买钢笔](https://oj.aicoders.cn/problem/3496)
优先买4元的钢笔，通过判断余数来识别钱是否有剩余。

- 余数为0，无剩余，全部买4元的钢笔。
- 余数为1，剩1元，因此需要买1一只5元的钢笔，剩余的买4元的钢笔。
- 余数为2，剩2元，因此需要买1一只6元的钢笔，剩余的买4元的钢笔。
- 余数为3，剩3元，因此需要买1一只5元的钢笔和1只6元的钢笔，剩余的买4元的钢笔。

::: details 代码实现
```cpp
#include <iostream>
using namespace std;

int main() {
	int n, a=0, b=0, c=0;
    cin>>n;
    switch(n%4){
        case 0: a += n/4; break;
        case 1: a += (n-5)/4; b+=1; break;
        case 2: a += (n-6)/4; c+=1; break;
        case 3: a += (n-11)/4; b+=1; c+=1; break;
    }
    cout << c << ' ' << b << ' ' << a; 
	return 0;
}
```
:::

