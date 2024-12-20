---
title: Lesson 1 - 输入输出与变量
---

## 输出语句

```cpp
cout << "Hello world";
```

- `cout` 输出指令

- `<<` 输出运算符，与 `cout` 配合使用，后跟要输出的内容

- `"Hello World"` 字符串，使用双引号包裹起来

- `;` 每行指令的末尾必须写分号，表示本行指令结束



### 换行及连续输出

```cpp
cout << 1+2 << "1+2" << endl;
```

- `<<...<<` 可以连续使用输出运算符拼接多个输出内容

- `endl` 用于表示换行
- 注意数字或算式的输出不要加引号



## C++程序的执行过程

![](https://enryh-image-1302512306.cos.ap-chongqing.myqcloud.com/picgo/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86.png)

## 变量

变量用于**存储数据**，但是**不同类型**的数据只能存储在**对应数据类型**的变量中

```cpp
int a,b,c;  // 这是注释， 多个变量可以逗号隔开
int d=2;    // 创建变量时可以同步赋值
```

- 语法：`变量类型 变量名字;` 或 `变量类型 变量名字 = 变量的初始值;`
- 变量命名规则：
  1. 只能由小写字母，大写字母，下划线`_`等构成，不能出现其他符号
  2. 不能以数字开头
  3. 不能用系统保留的指令作为变量名，如 `int` 等



### `int` 整型

- 最大值 $2147483647$ 即 $2^{31}-1$ （ $2^{31}$ 表示 $31$个 $2$ 相乘 ）
- 最小值 $-2147483648$ 即 $-2^{31}-1$
- 因此约在 $2\times10^{9}$范围内的数可以使用 `int` 类型。

**注意：**

- 数据大小在 21 亿内的整数均可以使用 `int` 类型的变量进行存储
- 使用 `int` 类型变量存储小数会丢失小数部分数据



### 变量重新赋值

```cpp
int a;
a = 4;
cout << a << endl;
a = 5;
cout << a << endl;
```

- `=` 赋值运算符，将右侧的数据存储至左侧变量中
- 变量创建后，可以任意重新赋值为其他数据



## 输入语句

```cpp
int a;
cin >> a;            // 运行后键盘输入3，按回车确定
cout << a << endl;   // 3会被输入并存储在 a 变量中
```

- `cin` 输入指令
- `>>` 输入运算符，与 `cin` 配合使用，后跟要存储数据的变量

**注意**

- `cin` 输入会自动忽略**空格**和**换行**，因此键盘输入时，不论输入多少**空格**会自动忽略，输入**换行**时表示当前输入指令输入完毕。
- 输入时，会自动将类型匹配的第一个数据存储在变量中



### 连续输入

```cpp
int a, b, c;
cin >> a >> b >> c;  // 运行后输入 3 4 5，空格隔开
cout << a << b << c << endl; // 3 4 5 依次存储在 a b c 中
```

- `cin >> 变量 >> 变量;` 依次将输入的数据从左至右存储至变量中 