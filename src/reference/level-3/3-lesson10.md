---
title: Lesson 10 - 栈进阶
order: 10
---

## 课堂练习
::: details 合理的栈顺序
```cpp
#include<bits/stdc++.h>
using namespace std;
stack<char> s;
string a,b;
int main() {
	//输入入栈及出栈顺序
	cin>>a>>b;
	int l=a.size();
	int num=0;//出栈元素的下标
	for (int i=0;i<l;i++) {
		//1)安排一个字符入栈
		s.push(a[i]);
		//2)验证栈顶字符和出栈字符相等
		while(!s.empty()&&s.top()==b[num]){
			s.pop(); //出栈
			num++;//下标加1，验证下一元素
		}
	}
	if(s.empty())
		cout<<"right";
	else
		cout<<"error";
	return 0;
} 
```
:::

::: details 后缀表达式求值
```cpp
#include<bits/stdc++.h>
using namespace std;
char c[1001][10];
stack<double> s;
//用栈实现后缀表达式运算
void fun(char str[]) {
	switch (str[0]) {
		double a,b;
		case '+':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(b+a); break;
		case '-':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(b-a); break;
		case '*':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(b*a); break;
		case '/':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(b/a); break;
		default:
			//字符串数字转浮点数入栈
			s.push(atof(str));
	}
}
int main() {
	int k=0;
	//输入
	while (cin>>c[k])k++;
	//处理所有的数字和符号
	for (int i=0; i<=k-2; i++) {
		fun(c[i]);
	}
	//输出结果
	cout<<s.top();
	return 0;
}
```
:::

::: details 波兰表达式
```cpp
#include<bits/stdc++.h>
using namespace std;
char c[100][100];
stack<double> s;
void fun(char str[]) {
	switch (str[0]) {
		double a,b;
		case '+':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(a+b);
			break;
		case '-':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(a-b);
			break;
		case '*':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(a*b);
			break;
		case '/':
			a=s.top();s.pop();
			b=s.top();s.pop();
			s.push(a/b);
			break;
		default:
			s.push(atof(str));
	}
}
int main() {
	int k=0;
	while (cin>>c[k])k++;
	for (int i=k-1; i>=0; i--) {
		fun(c[i]);
	}
	cout<<fixed<<setprecision(6)<<s.top();
	return 0;
}
```
:::

::: details 表达式求值
```cpp
#include<bits/stdc++.h>
using namespace std;
stack<int> s;
int main() {
	int a=0,sum=0, b=0; char c;
	cin>>a;
	s.push(a%10000);
	//符号与数字成组输入
	while (cin>>c, cin>>b) {
		if (c=='+') {
			s.push(b%10000);
		} else {
			int x=s.top();
			s.pop();
			s.push(x*b%10000);
		}
	}
	while (s.empty()!=1) {
		sum=(sum+s.top())%10000;
		s.pop();
	}
	cout<<sum;
	return 0;
}
```
:::

::: details 后缀表达式
```cpp
/*
输出后缀表达式
碰到数字就输出
符号入栈，栈中符号顺序，按照优先级从小到大。不符合顺序的符号出栈输出。
括号正常入栈，一旦成对，括号内符号出栈输出
最后栈中剩余符号顺序出栈输出
*/
#include<bits/stdc++.h>
using namespace std;
stack <char> s;
//指定优先级
int grade(char c) {
	//定义符号优先级
	if (c == '*' || c == '/') return 2;
	else if (c == '+' || c == '-') return 1;
	else return 0;
}
int main() {
	char str[210]={};
	//输入
	cin >> str;
	//中缀表达式转后缀表达式
	for (int i = 0; str[i]; i++) {
		//是字母则直接输出
		if (str[i] >= 'a' && str[i] <= 'z') {
			cout<<str[i];
		} else {//不是字母
			//遇到左括号时直接入栈
			if (str[i]=='(') s.push(str[i]);
			else if (str[i]==')') {
				while (s.top()!='(') {
					cout<<s.top();
					s.pop();
				}
				s.pop();//左括号出栈
			} else {//处理不符合优先级的运算符
				while (s.empty()!=1 && grade(str[i]) <= grade(s.top())) {
					cout<<s.top();
					s.pop();
					//栈空跳出循环
					if (s.empty()) break; 
				}
				s.push(str[i]);//此时运算符可入栈
			}
		}
	}
	//输出栈中剩余符号
	while (s.empty()!=1) {
		cout<<s.top();
		s.pop();
	}
	return 0;
}
```
:::

## 课后作业
::: details 简单表达式求值
```cpp
#include<bits/stdc++.h>
using namespace std;
stack<double> s;
int main() {
	double a=0,sum=0;
	cin>>a;
	s.push(a);
	double b=0,x=0; char c;
	//符号与数字成组输入
	while (cin>>c, cin>>b) {
		if (c=='+') {
			s.push(b);
		} else if (c=='-') {
			s.push(-b);
		} else if (c=='*') {
			x=s.top();
			s.pop();
			s.push(x*b);
		} else {
			x=s.top();
			s.pop();
			s.push(x/b);
		}
	}
	while (s.empty()!=1) {
		sum=sum+s.top();
		s.pop();
	}
	cout<<fixed<<setprecision(2)<<sum;
	return 0;
}
```
:::

::: details 前缀式计算
```cpp
#include<bits/stdc++.h>
using namespace std;
char c[1010][1010];
stack<double> s;
void fun(char str[]) {
	switch (str[0]) {
		double a,b;
	case '+':
		a=s.top();s.pop();
		b=s.top();s.pop();
		s.push(a+b);
		break;
	case '-':
		a=s.top();s.pop();
		b=s.top();s.pop();
		s.push(a-b);
		break;
	case '*':
		a=s.top();s.pop();
		b=s.top();s.pop();
		s.push(a*b);
		break;
	case '/':
		a=s.top();s.pop();
		b=s.top();s.pop();
		s.push(a/b);
		break;
		default:
			s.push(atof(str));
	}
}
int main() {
	int k=0;
	while (cin>>c[k])k++;
	for (int i=k-1; i>=0; i--) {
		fun(c[i]);
	}
	cout<<fixed<<setprecision(2)<<s.top();
	return 0;
}
```
:::

::: details 后缀表达式的值
```cpp
#include<bits/stdc++.h>
using namespace std;
stack <long long>s;
long long x;
int main(){
	string str;
	getline(cin,str);
	for(int i=0;i<str.length();i++){
		if(str[i]>='0'&&str[i]<='9')
			x=x*10+(str[i]-'0');
		if(str[i]==' '){
			s.push(x);
			x=0;
		}
		switch (str[i]) {
			double a,b;
			case '+':
				a=s.top();s.pop();
				b=s.top();s.pop();
				s.push(b+a); break;
			case '-':
				a=s.top();s.pop();
				b=s.top();s.pop();
				s.push(b-a); break;
			case '*':
				a=s.top();s.pop();
				b=s.top();s.pop();
				s.push(b*a); break;
			case '/':
				a=s.top();s.pop();
				b=s.top();s.pop();
				s.push(b/a); break;
		}
	} 
	cout<<s.top();
	return 0;
}
```
:::

::: details 中缀转后缀表达式
```cpp
/*
输出后缀表达式
碰到数字就输出
符号入栈，栈中符号顺序，按照优先级从小到大。不符合顺序的符号出栈输出。
括号正常入栈，一旦成对，括号内符号出栈输出
最后栈中剩余符号顺序出栈输出
*/
#include<bits/stdc++.h>
using namespace std;
stack <char> s;
//指定优先级
int grade(char c) {
	//定义符号优先级
	if (c == '*' || c == '/') return 2;
	else if (c == '+' || c == '-') return 1;
	else return 0;
}
int main() {
	char str[1010]={};
	//输入
	cin >> str;
	//中缀表达式转后缀表达式
	for (int i = 0; str[i]; i++) {
		//是字母则直接输出
		if (str[i] >= 'a' && str[i] <= 'z') {
			cout<<str[i];
		} else {//不是字母
			//遇到左括号时直接入栈
			if (str[i]=='(') s.push(str[i]);
			else if (str[i]==')') {
				while (s.top()!='(') {
					cout<<s.top();
					s.pop();
				}
				s.pop();//左括号出栈
			} else {//处理不符合优先级的运算符
				while (s.empty()!=1 && grade(str[i]) <= grade(s.top())) {
					cout<<s.top();
					s.pop();
					//栈空跳出循环
					if (s.empty()) break; 
				}
				s.push(str[i]);//此时运算符可入栈
			}
		}
	}
	//输出栈中剩余符号
	while (s.empty()!=1) {
		cout<<s.top();
		s.pop();
	}
	return 0;
}
```
:::