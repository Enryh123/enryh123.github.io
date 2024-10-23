---
title: for 循环
order: 3
---

## 1. 基本 for 循环语法
```cpp
for (初始化表达式; 条件表达式; 迭代表达式) {
    // 循环体
}
```
- 初始化表达式：通常用于初始化循环变量。
- 条件表达式：循环条件，每次循环开始时检查，如果为 `true`，继续执行循环体；如果为 `false`，退出循环。
- 迭代表达式：每次循环结束后执行的操作，通常用于更新循环变量。

## 2. 经典的 for 循环

用于从一个数到另一个数进行遍历。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // 从0循环到4，共执行5次
    for (int i = 0; i < 5; i++) {
        cout << i << " "; // 输出 0 1 2 3 4
    }
    return 0;
}
```

## 3. 逆序循环

可以从大到小进行遍历。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // 从4循环到0，倒序输出
    for (int i = 4; i >= 0; i--) {
        cout << i << " "; // 输出 4 3 2 1 0
    }
    return 0;
}
```

## 4. for 循环中的步长

循环变量每次可以增加或减少任意值，而不仅仅是1。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // 每次循环变量增加2
    for (int i = 0; i < 10; i += 2) {
        cout << i << " "; // 输出 0 2 4 6 8
    }
    return 0;
}
```

## 5. 遍历数组

使用 `for` 循环遍历数组中的每个元素是非常常见的操作。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    
    // 使用 for 循环遍历数组
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " "; // 输出数组中的每个元素：1 2 3 4 5
    }
    
    return 0;
}
```

## 6. for 循环嵌套

在多维数组或者矩阵等结构中，可以使用嵌套的 `for` 循环。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // 输出一个 5x5 的矩阵
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            cout << i * 5 + j << " "; // 输出每个元素
        }
        cout << endl; // 换行
    }
    return 0;
}
```

## 7. for 循环的提前退出

可以使用 `break` 来提前退出循环。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // 找到第一个能被3整除的数字，之后退出循环
    for (int i = 0; i < 10; i++) {
        if (i % 3 == 0 && i != 0) {
            cout << "找到：" << i << endl;
            break; // 提前退出循环
        }
    }
    return 0;
}
```

## 8. for 循环中的 continue

可以使用 `continue` 跳过本次循环，进入下一次迭代。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // 跳过偶数，只输出奇数
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            continue; // 跳过偶数
        }
        cout << i << " "; // 输出奇数：1 3 5 7 9
    }
    return 0;
}
```

## 9. 范围 for 循环

如果不需要手动处理数组索引，可以使用更简洁的范围 `for` 循环。
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int arr[5] = {1, 2, 3, 4, 5};

    // 使用范围 for 循环遍历数组
    for (int x : arr) {
        cout << x << " "; // 输出 1 2 3 4 5
    }

    return 0;
}
```

## 总结
1.	基本结构：`for` 循环有初始化、条件、迭代三个部分。
2.	常见用法：正序、逆序遍历，带步长的遍历，嵌套循环，数组遍历等。
3.	控制循环：可以用 `break` 提前退出循环，或用 `continue` 跳过本次迭代。
