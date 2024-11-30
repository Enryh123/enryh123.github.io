---
title: Lesson 7 - 大整数加法
order: 7
---

日常生活中存在一些有趣的情况，比如：电脑的计算器，当输入一定位数后，就无法继续输入。计算器的运算就更无法完成！针对这类 **特别大的整数** 的计算，需要单独处理。

## 高精度加法模版

### 思路

1.	将两个输入的字符串 s1 和 s2 分别代表两个大整数。
2.	从字符串的最后一位开始逐位相加，记录每一位的和，同时处理进位。
3.	如果两个字符串都遍历完但仍有进位，则继续处理进位。
4.	将结果存储在一个 `vector<int>` 中，最后逆序输出该数组。

### 代码解析
```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s1, s2; // 定义两个字符串变量，表示输入的两个大整数
    vector<int> ans; // 定义一个向量存储计算的每一位结果
    cin >> s1 >> s2; // 输入两个大整数的字符串表示
    // 初始化 i 和 j 为字符串末尾的索引
    int i = s1.size() - 1, j = s2.size() - 1; 
    int carry = 0; // 初始化进位为 0

    // 使用 while 循环从末位开始逐位相加
    while (i >= 0 || j >= 0 || carry) {
        int sum = carry; // 每轮相加时，将进位加入到 sum
        // 如果 i 位置有效，将 s1 的当前位加到 sum，并将 i 向前移动
        if (i >= 0) sum += s1[i--] - '0'; 
        // 如果 j 位置有效，将 s2 的当前位加到 sum，并将 j 向前移动
        if (j >= 0) sum += s2[j--] - '0'; 
        // 计算进位值，将 sum 除以 10 得到进位
        carry = sum / 10; 
        // 将当前位的结果存入 ans 中，只保留个位
        ans.push_back(sum % 10); 
    }

    // 将结果数组反转以便从高位到低位输出
    reverse(ans.begin(), ans.end());

    // 输出结果
    for (int i = 0; i < ans.size(); i++) cout << ans[i];

    return 0;
}
```

### 总结

1. 处理大整数
   - 使用字符串来表示大整数，以便能处理超过 int 和 long long 的范围。
   - 从字符串的末尾开始逐位相加，模拟手算加法。

2. 使用 vector 存储结果
   - vector 动态分配空间，适合处理不确定长度的结果。
   - 每次将个位结果 sum % 10 存入 vector 中。

3. 进位处理
   - carry 记录进位，每次 sum / 10 更新 carry。
   - 循环条件中包含 carry，保证进位在加法完成后仍然得到处理。

4. 字符串与数字的转换
   - s1[i] - '0' 将字符转换成对应的整数，利用 ASCII 值的差实现。

5. 结果反转
   - 因为从低位到高位存储每一位的结果，最终输出前使用 reverse 将结果反转，保证从高位到低位输出。

6. 输出结果
   - 使用循环遍历 vector 并逐位输出，实现高精度加法结果的输出。

### 例题

### [2805 存储两个大整数](https://oj.aicoders.cn/problem/2805)

#### 问题分析
题目要求读取两个位数相同的大整数，并将它们逐位存储到整数数组中，最后逐位输出两个整数的结果。由于输入的数字可能非常大（最多 2000 位），我们不能使用普通的整型变量来存储。因此，需要使用字符串来读取这些大整数，然后将每一位转换成整数并存储在数组中。

代码的实现流程：
1. 读取两个大整数并存储在字符串中。
2. 将每个字符串的每一位转换成整数并存储在数组中。
3. 逆序存储每一位（从字符串末尾开始读取）到数组，然后再逆转数组使其符合原始顺序。
4. 最终逐位输出数组中的值。

::: details 代码实现
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s1, s2;
    vector<int> ans1, ans2;

    // 读取两个大整数
    cin >> s1 >> s2;

    // 将s1的每一位存入ans1数组，逆序存入
    for (int i = s1.size() - 1; i >= 0; i--) {
        ans1.push_back(s1[i] - '0');
    }

    // 将s2的每一位存入ans2数组，逆序存入
    for (int i = s2.size() - 1; i >= 0; i--) {
        ans2.push_back(s2[i] - '0');
    }

    // 逆转数组，恢复原始顺序
    reverse(ans1.begin(), ans1.end());
    reverse(ans2.begin(), ans2.end());

    // 输出两个数组中的每一位
    for (int i = 0; i < ans1.size(); i++) cout << ans1[i];
    cout << endl;
    for (int i = 0; i < ans2.size(); i++) cout << ans2[i];
    cout << endl;

    return 0;
}
```
:::


### [2811 三个大整数相加](https://oj.aicoders.cn/problem/2811)

#### 问题分析
题目要求输入三个非常大的正整数并计算它们的和。由于这些数字位数可以达到 2000 位，无法用普通的整型变量直接相加，因此需要用字符串处理并逐位进行加法运算。

解决方案思路如下：
1. 读取三个大整数字符串，并逐位从低位到高位进行加法运算。
2. 设定进位变量 `carry`，逐位相加并处理进位。
3. 每次将当前位的结果存入数组中，最后将数组逆序输出得到最终结果。

::: details 代码实现
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s1, s2, s3;
    vector<int> ans;

    // 读取三个大整数
    cin >> s1 >> s2 >> s3;

    int i = s1.size() - 1, j = s2.size() - 1, k = s3.size() - 1;
    int carry = 0;

    // 逐位相加，直到所有位和进位处理完毕
    while (i >= 0 || j >= 0 || k >= 0 || carry != 0) {
        int sum = carry;
        if (i >= 0) sum += s1[i--] - '0';
        if (j >= 0) sum += s2[j--] - '0';
        if (k >= 0) sum += s3[k--] - '0';
        
        ans.push_back(sum % 10);  // 当前位结果
        carry = sum / 10;         // 更新进位
    }

    // 结果逆序输出
    reverse(ans.begin(), ans.end());
    for (int i = 0; i < ans.size(); i++) cout << ans[i];
    cout << endl;

    return 0;
}
```
:::

### [4319 加法计算器](https://oj.aicoders.cn/problem/4319)

#### 问题分析
本题要求计算四个大整数的和，整数的位数可能达到 100 位，因此无法直接使用整型变量存储和计算。解决方案是通过字符串读取每个数字，逐位进行加法运算，同时处理进位。

#### 解题思路
1. 读取四个大整数字符串，逐位进行加法计算。
2. 使用进位变量 `carry`，每次将当前位的和（包括进位）计算后存储在结果数组 `ans` 中。
3. 遍历四个字符串的每一位，从低位到高位逐位相加。
4. 将每一位结果存入 `ans` 数组，计算完毕后将结果逆序输出即可。

::: details 代码实现
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s1, s2, s3, s4;
    vector<int> ans;

    // 读取四个大整数
    cin >> s1 >> s2 >> s3 >> s4;

    int i = s1.size() - 1, j = s2.size() - 1, k = s3.size() - 1, m = s4.size() - 1;
    int carry = 0;

    // 逐位相加，直到所有位和进位处理完毕
    while (i >= 0 || j >= 0 || k >= 0 || m >= 0 || carry != 0) {
        int sum = carry;
        if (i >= 0) sum += s1[i--] - '0';
        if (j >= 0) sum += s2[j--] - '0';
        if (k >= 0) sum += s3[k--] - '0';
        if (m >= 0) sum += s4[m--] - '0';

        carry = sum / 10;
        ans.push_back(sum % 10);
    }

    // 结果逆序输出
    reverse(ans.begin(), ans.end());
    for (int i = 0; i < ans.size(); i++) cout << ans[i];
    cout << endl;

    return 0;
}
```
:::

### [2827 回文数求和](https://oj.aicoders.cn/problem/2827)

#### 问题分析
本题要求判断输入的一个大整数是否为回文数。如果是回文数，输出 `YES`；如果不是回文数，则计算该数加自身的结果并输出。由于输入的数字位数可能达到 2000 位，无法直接使用整型变量，因此需要使用字符串处理。

回文数判断方法是逐位比较数字的前后对称位置；若相同，则是回文数。否则，将该数与自身相加，逐位计算，并处理进位。

#### 解题思路
1. 判断字符串是否为回文：
   - 遍历字符串前半部分，逐位比较与后半部分对称位置的字符是否相同。
2. 若是回文数，直接输出 `YES`。
3. 若不是回文数，则计算字符串表示的数字 `a + a` 的和：
   - 从低位到高位逐位相加，处理进位，将结果存储在数组 `ans` 中。
   - 最终逆序输出数组中的结果。

::: details 代码实现
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    bool flag = true;

    // 判断是否为回文数
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - i - 1]) {
            flag = false;
            break;
        }
    }

    if (flag) {
        cout << "YES" << endl;
    } else {
        vector<int> ans;
        int i = n - 1, carry = 0;

        // 逐位计算 a + a 的和
        while (i >= 0 || carry) {
            int sum = carry;
            if (i >= 0) sum += (s[i--] - '0') * 2;
            carry = sum / 10;
            ans.push_back(sum % 10);
        }

        // 逆序输出结果
        reverse(ans.begin(), ans.end());
        for (int i = 0; i < ans.size(); i++) cout << ans[i];
        cout << endl;
    }

    return 0;
}
```
:::

### [4459 大整数加法](https://oj.aicoders.cn/problem/4459)

#### 问题分析
本题要求对给定的 \( t \) 组大整数进行逐位加法。由于输入的整数长度可达 \( 10^{25} \) 位，无法直接使用整型变量，需要将输入作为字符串处理并模拟加法运算。

对于两个字符串表示的大整数 `m` 和 `n`，从低位开始逐位相加，处理进位，最终获得相加结果。

#### 解题思路
1. 读取 `t`，表示有 `t` 组数据。
2. 对于每一组大整数：
   - 从字符串的低位逐位相加，使用 `carry` 处理进位。
   - 将每一位的结果存储到结果数组 `ans` 中。
3. 将 `ans` 数组逆序输出即为相加结果。


::: details 代码实现
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    cin.ignore();

    while (t--) {
        string s1, s2;
        vector<int> ans;
        cin >> s1 >> s2;

        int i = s1.size() - 1, j = s2.size() - 1, carry = 0;

        // 逐位相加，直到所有位和进位处理完毕
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry;
            if (i >= 0) sum += s1[i--] - '0';
            if (j >= 0) sum += s2[j--] - '0';
            carry = sum / 10;
            ans.push_back(sum % 10);
        }

        // 逆序输出结果
        reverse(ans.begin(), ans.end());
        for (int i = 0; i < ans.size(); i++) cout << ans[i];
        cout << endl;
    }

    return 0;
}
```
:::


### [4460 两个小数相加](https://oj.aicoders.cn/problem/4460)

#### 问题分析
本题要求实现两个大精度小数的加法，由于小数长度可达 25 位，且小数点后位数相同，因此可以将小数部分和整数部分分别进行逐位计算，类似于高精度整数加法。

需要注意小数位的对齐，确保两个小数点的位置一致。

#### 解题思路
1. **补齐小数位**：判断两个小数小数位的长度是否一致，如果不一致则在较短的小数后面补零。
2. **逐位相加**：
   - 从低位向高位进行逐位加法。
   - 处理小数点：在小数点位置跳过，注意在输出时插入小数点。
3. **输出结果**：按顺序输出整数和小数部分的计算结果。


::: details 代码实现
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s1, s2;
    vector<int> ans;

    // 读取两个小数
    cin >> s1 >> s2;

    // 计算小数点后的位数
    int dot1 = s1.size() - s1.find('.') - 1;
    int dot2 = s2.size() - s2.find('.') - 1;

    // 对齐小数部分，补齐位数
    if (dot1 > dot2)
        for (int i = 1; i <= dot1 - dot2; i++) s2 += '0';
    else if (dot2 > dot1)
        for (int i = 1; i <= dot2 - dot1; i++) s1 += '0';

    int i = s1.size() - 1, j = s2.size() - 1, carry = 0;

    // 逐位相加处理进位
    while (i >= 0 || j >= 0 || carry) {
        int sum = carry;
        // 跳过小数点位置
        if(s1[i]=='.') i--;
        if(s2[j]=='.') j--;
        // 逐位相加
        if (i >= 0) sum += s1[i--] - '0';
        if (j >= 0) sum += s2[j--] - '0';
        // 处理进位
        carry = sum / 10;
        ans.push_back(sum % 10);
    }

    // 逆序输出结果，注意判断小数点位置
    reverse(ans.begin(), ans.end());
    
    for(int i=0; i<ans.size(); i++){
        if(i==ans.size()-max(dot1, dot2)) cout<<'.';
        cout<<ans[i];
    }

    return 0;
}
```
:::