---
title: 阶段测试
---

### 单选题
1. 在C++中，假设N为正整数2，则 `cout << (N / 3 + N % 3)` 将输出( )。

A. 0 B. 2 C. 3 D. 4

2. C++语句 `cout << 7%3 << ' '<< "7%3"<< ' ' << "7%3={7%3}"` 执行后的输出是( )

A. `1 1 1=1` B. `1 7%3 1=1` C. `1 7%3 7%3=1` D. `1 7%3 7%3={7%3}`

3. 下面C++代码执行后，求出几天后星期几。如果星期日则输出“星期天”否则输出形如“星期1”。 的代码是（ ）。

```cpp
int N, nowDay, afterDays;
cout << "今天星期几？" <<endl;
cin >> nowDay;
cout << "求几天后星期几？"<< endl;
cin >>afterDays;

N = nowDay+afterDays;
if(_________________)
	printf("星期天");
else
	printf("星期%d", N%7);
```

A. `N % 7 != 0` B. `N % 7 == 0` C. `N == 0` D. `N % 7`

4. 下面的程序用于判断输入的整数N是否为能被3整除的偶数，横线处应填写代码是()

```cpp
int N;
cin >> N;
if(___________________)
	cout << "能被3整除的偶数" << endl;
else
	cout << "其他情形" << endl;
	
cout << endl;
```

A. `(N%2)&&(N%3)`
B. `(N%2==0)&&(N%3)`
C. `(N%2)&&(N%3==0)`
D. `(N%2==0)&&(N%3==0)`

5. 以下C++不可以作为变量的名称的是（ ）。

A. `redStar` B. `RedStar` C. `red_star` D. `red star`

6.  C++表达式 `2 - 1 && 2 % 10` 的值是（ ）。

A. 0 B. 1 C. 2 D. 3

7. 下面C++代码段执行后的输出是（ ）。

```cpp
int a = 3, b = 4;
cout << "a+b=" << a+b;
```

A. `3+4=7`   B. `3+4=7`    C. `a+b=7`    D. `a+b=a+b`

8. 在C++语言中， int 类型的变量 x 、 y 、 z 的值分别为 2 、 4 、 6 ，以下表达式的值为真的是（ ）

A. `x>y||x>z`   B. `x!=z-y`   C. `z>y+x`   D. `x<y||!x<z`


9. 对 int 类型的变量 a 、 b 、 c ，下列语句不符合C++语法是（ ）。

A. `c += 5;`   

B. `b = c % 2.5;`   

C. `a = (b = 3, c = 4, b + c);`

D. `a -= a = (b = 6) / (c = 2);`


10. 下面C++代码执行后的输出是（）。

```cpp
int x = 3;
switch(x){
    case 1: cout<<1; break;
    case 2: cout<<2; break;
    case 3: cout<<3; 
    case 4: cout<<4; break;
}
```

A. 1 B. 12 C. 3 D. 34

11. 下列关于 C++语言的叙述，不正确的是（）。

A. 变量定义时可以不初始化

B. 变量被赋值之后的类型不变

C. 变量没有定义也能够使用

D. 变量名必须是合法的标识符

12. 如果 a、b 和 c 都是 int 类型的变量，下列哪个语句不符合 C++语法？

A. `c = a + b;`

B. `c += a + b;`

C. `c = a = b;`

D. `c = a - b;`

13. 如果用两个 int 类型的变量 a 和 b 分别表达长方形的长和宽，则下列哪个表
达式不能用来计算长方形的周长？

A. `a + b * 2`
B. `2 * a + 2 * b`

C. `a + b + a + b`
D. `b + a * 2 + b`

14. 如果 a 为 int 类型的变量，且 a 的值为 6，则执行 `a *= 3;` 之后，a 的值会是（）。

A. 3 B. 6 C. 9 D. 18

15. 如果 a 和 b 均为 int 类型的变量，下列表达式不能正确判断“a 等于 0 且 b
等于 0”的是（）。

A. `(a == 0) && (b == 0)`
B. `(a == b == 0)`

C. `(!a) && (!b)`
D. `(a == 0) + (b == 0) == 2`

16. 在下列代码的横线处填写（），可以使得输出是“20 10”。

```cpp
#include<iostream>
using namespace std;
int main(){
    int a=10, b=20;
    a = `__________`; // 在此处填入代码
    b = a / 100;
    a = a % 100;
    cout << a << " " << b << endl;
    return 0;
}
```

A.`a + b`
B. `(a + b) * 100`

C. `b * 100 + a`
D. `a * 100 + b`

17. 以下C++不可以作为变量的名称的是( )。

A. CCF GESP
B. ccfGESP
C. CCFgesp
D. CCF_GESP

18. C++表达式 10 - 3 * (2 + 1) % 10 的值是( )。

A. 0
B. 1
C. 2
D. 3

19.  C++语句 `cout<<"6%2={"<<6%2<<"}"` 执行后的输出是( )。

A. `"6%2={6%2}"`
B. `6%2={6%2}`
C. `0=0`
D. `6%2={0}`

20.  在C++中，假设N为正整数10，则 `cout <<(N / 3 + N % 3)` 将输出( )。

A. 6
B. 4.3
C. 4
D. 2

