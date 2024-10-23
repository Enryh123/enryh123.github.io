---
title: 结构体
---

## 1. 什么是结构体？

在C++中，**结构体（struct）** 是一个可以把多种不同类型的数据放在一起的工具。可以把结构体想象成一个文具盒，里面可以装铅笔、橡皮、尺子等不同类型的文具。结构体帮助我们把很多相关的东西组织在一起，方便管理。

## 2. 如何创建一个结构体？

我们先来看一个简单的例子，假设我们要存储一个学生的信息，包括他的名字、年龄和成绩，我们可以用结构体来表示。

```cpp
#include <bits/stdc++.h>
using namespace std;  // 包含所有常用头文件

// 定义一个学生的结构体
struct Student {
    string name;  // 学生的名字
    int age;           // 学生的年龄
    double score;      // 学生的成绩
};
```

这个结构体叫 `Student`，包含三个部分：名字 (`name`)，年龄 (`age`) 和成绩 (`score`)。这样定义好之后，我们就可以用 `Student` 来创建学生。

## 3. 如何使用结构体？

创建好结构体之后，我们可以像下面这样创建一个学生，并给他的属性赋值。

```cpp
int main() {
    Student student1;  // 创建一个名为 student1 的学生
    student1.name = "小明";  // 给名字赋值
    student1.age = 12;       // 给年龄赋值
    student1.score = 95.5;   // 给成绩赋值

    // 输出学生的信息
    cout << "名字: " << student1.name << endl;
    cout << "年龄: " << student1.age << endl;
    cout << "成绩: " << student1.score << endl;

    return 0;
}
```

这里我们创建了一个叫 `student1` 的学生，并给他赋了名字、年龄和成绩，然后用 `cout` 输出他的这些信息。

## 4. 结构体数组

有时候，我们需要存储很多个学生的信息，比如一个班级的所有学生。这时，我们可以用**结构体数组**。

```cpp
int main() {
    Student students[3];  // 创建一个包含3个学生的数组

    // 给每个学生赋值
    students[0] = {"小明", 12, 95.5};
    students[1] = {"小红", 11, 89.0};
    students[2] = {"小刚", 12, 76.5};

    // 输出每个学生的信息
    for (int i = 0; i < 3; i++) {
        cout << "名字: " << students[i].name << ", 年龄: " << students[i].age << ", 成绩: " << students[i].score << endl;
    }

    return 0;
}
```

在这个例子里，我们创建了一个包含3个学生的数组 `students`，并给每个学生赋值。然后用一个 `for` 循环把每个学生的信息输出。

## 5. 结构体数组排序

我们还可以对这些学生按成绩进行排序。比如我们想按成绩从高到低排序，可以这样做：

```cpp
bool compare(Student a, Student b) {
    return a.score > b.score;  // 按成绩从高到低排序
}

int main() {
    Student students[3] = { {"小明", 12, 95.5}, {"小红", 11, 89.0}, {"小刚", 12, 76.5} };

    // 使用 sort 函数排序，传入比较函数 compare
    sort(students, students + 3, compare);

    // 输出排序后的学生信息
    for (int i = 0; i < 3; i++) {
        cout << "名字: " << students[i].name << ", 年龄: " << students[i].age << ", 成绩: " << students[i].score << endl;
    }

    return 0;
}
```

这里我们写了一个 `compare` 函数，用来比较两个学生的成绩，然后用 `sort` 对学生数组进行排序。

## 6. 例题

### 按成绩排序并找出成绩最高的学生

**题目描述**

有一个班级有5个学生，输入每个学生的名字、年龄和成绩，要求按成绩从高到低排序，并输出成绩最高的学生的信息。

**输入数据**

```
小明 12 95.5
小红 11 89.0
小刚 12 76.5
小华 11 85.0
小强 13 92.0
```

**解题思路**

1. 创建一个包含5个学生的结构体数组。
2. 使用 `for` 循环读取每个学生的信息。
3. 使用 `sort` 函数按成绩从高到低对学生数组进行排序。
4. 输出成绩最高的学生的信息。

**代码实现**

```cpp
#include <bits/stdc++.h>  // 包含所有常用头文件

// 定义学生结构体
struct Student {
    string name;  // 学生名字
    int age;           // 学生年龄
    double score;      // 学生成绩
};

// 比较函数，用于排序
bool compare(Student a, Student b) {
    return a.score > b.score;  // 按成绩从高到低排序
}

int main() {
    Student students[5];  // 创建一个包含5个学生的数组

    // 输入每个学生的信息
    for (int i = 0; i < 5; i++) {
        cout << "请输入学生" << i + 1 << "的名字、年龄和成绩: ";
        cin >> students[i].name >> students[i].age >> students[i].score;
    }

    // 按成绩从高到低排序
    sort(students, students + 5, compare);

    // 输出成绩最高的学生信息
    cout << "成绩最高的学生是: " << endl;
    cout << "名字: " << students[0].name << ", 年龄: " << students[0].age << ", 成绩: " << students[0].score << endl;

    return 0;
}
```

**代码说明**

1. 使用 `for` 循环让用户输入每个学生的名字、年龄和成绩。
2. 使用 `sort` 函数对 `students` 数组按成绩从高到低进行排序。
3. 排序完成后，输出成绩最高的学生的信息，也就是数组中的第一个学生。