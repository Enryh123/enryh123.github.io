---
title: Lesson 8 - 大整数减法
order: 8
---

## 逐步分析大整数减法过程
### 1. 数位相同没有借位
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1. 当字符串输入
	char a[21],b[21];
	cin>>a>>b;
	//2. 转换到整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[21]={},b1[21]={};
	for(int i=0;i<la;i++){
		a1[i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[i]=b[i]-48;
	}
	//3. 对应位相减
	for(int i=0;i<la;i++){
		cout<<a1[i]-b1[i];
	}
	return 0;
}
```

### 2. 数位不同没有借位
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1. 当字符串输入
	char a[21],b[21];
	cin>>a>>b;
	//2. 转换反转整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[21]={},b1[21]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3. 对应位相减（差的长度等于la）
	int c1[21]={}; //存储差
	for(int i=0;i<la;i++){
		c1[i]=a1[i]-b1[i];
	}
	//4. 逆序输出
	for(int i=la-1;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```

### 3. 数位不同存在借位
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1. 当字符串输入
	char a[21],b[21];
	cin>>a>>b;
	//2. 转换反转整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[21]={},b1[21]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3. 对应位相减
	int c1[21]={}; //存储差
	for(int i=0;i<la;i++){
		if(a1[i]<b1[i]){//处理借位
			a1[i+1]--;
			a1[i]=a1[i]+10;
		}
		c1[i]=a1[i]-b1[i];
	}
	//4. 逆序输出
	for(int i=la-1;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```

### 4. 存在前导0
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1. 当字符串输入
	char a[21],b[21];
	cin>>a>>b;
	//2. 转换反转整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[21]={},b1[21]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3. 对应位相减
	int c1[21]={}; //存储差
	for(int i=0;i<la;i++){
		if(a1[i]<b1[i]){//处理借位
			a1[i+1]--;
			a1[i]=a1[i]+10;
		}
		c1[i]=a1[i]-b1[i];
	}
	//4. 去除前导0
	int k;
	for(k=la-1;k>=0;k--){
		if(c1[k]!=0){
			break;
		}
	}
	//5. 逆序输出
	for(int i=k;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```

### 5. 被减数等于减数
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1. 当字符串输入
	char a[21],b[21];
	cin>>a>>b;
	//2. 转换反转整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[21]={},b1[21]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3. 对应位相减
	int c1[21]={}; //存储差
	for(int i=0;i<la;i++){
		if(a1[i]<b1[i]){//处理借位
			a1[i+1]--;
			a1[i]=a1[i]+10;
		}
		c1[i]=a1[i]-b1[i];
	}
	//4. 去除前导0
	int k;
	for(k=la-1;k>0;k--){
		if(c1[k]!=0){
			break;
		}
	}
	//5. 逆序输出
	for(int i=k;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```

## 课堂练习
::: details 判断两个大整数大小
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	char a[2001],b[2001];
	cin>>a>>b;
	int la=strlen(a),lb=strlen(b);
	if((la<lb) || (la==lb&&strcmp(a,b)<0)){
		cout<<"YES";
	}else{
		cout<<"NO";
	}
	return 0;
}
```
:::

::: details 被减数小于减数
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1. 当字符串输入
	char a[21],b[21];
	cin>>a>>b;
	//2. 处理被减数小于减数
	int la=strlen(a),lb=strlen(b);
	if((la<lb) || (la==lb&&strcmp(a,b)<0)){
		swap(a,b);
		swap(la,lb);
		cout<<"-";
	}
	//3. 转换反转整数数组
	int a1[21]={},b1[21]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//4. 对应位相减
	int c1[21]={}; //存储差
	for(int i=0;i<la;i++){
		if(a1[i]<b1[i]){
			a1[i+1]--;
			a1[i]=a1[i]+10;
		}
		c1[i]=a1[i]-b1[i];
	}
	//5. 去除前导0
	int k;
	for(k=la-1;k>0;k--){
		if(c1[k]!=0){
			break;
		}
	}
	//6. 逆序输出
	for(int i=k;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```
:::


::: details 三个大整数加减
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	char a[2001],b[2001],c[2001];
	cin>>a>>b>>c;
	//加法：数位相同没有进位
	int la=strlen(a);
	int a1[2001]={},b1[2001]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
		b1[la-1-i]=b[i]-48;
	}
	int t1[2001]={};
	for(int i=0;i<la;i++){
		t1[i]=a1[i]+b1[i];
	}
	
	//减法：被减数t1大于等于减数c1
	int lc=strlen(c);
	int c1[2001]={};
	for(int i=0;i<lc;i++){
		c1[lc-1-i]=c[i]-48;
	}
	//按位相减
	int d1[2001]={};//结果
	for(int i=0;i<la;i++){
		if(t1[i]<c1[i]){ //处理借位
			t1[i+1]--;
			t1[i]=t1[i]+10;
		}
		d1[i]=t1[i]-c1[i];
	}
	//去除前导0
	int k;
	for(k=la-1;k>0;k--){
		if(d1[k]!=0){
			break;
		}
	}
	//逆序输出
	for(int i=k;i>=0;i--){
		cout<<d1[i];
	}
	return 0;
}
```
:::


## 课后练习
::: details 守护者的问题
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1. 当字符串输入
	char a[501],b[501];
	cin>>a>>b;
	//2. 处理被减数小于减数
	int la=strlen(a),lb=strlen(b);
	if((la<lb) || (la==lb&&strcmp(a,b)<0)){
		swap(a,b);
		swap(la,lb);
		cout<<"-";
	}
	//3. 转换反转整数数组
	int a1[501]={},b1[501]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//4. 对应位相减
	int c1[501]={}; //存储差
	for(int i=0;i<la;i++){
		if(a1[i]<b1[i]){
			a1[i+1]--;
			a1[i]=a1[i]+10;
		}
		c1[i]=a1[i]-b1[i];
	}
	//5. 去除前导0
	int k;
	for(k=la-1;k>0;k--){
		if(c1[k]!=0){
			break;
		}
	}
	//6. 逆序输出
	for(int i=k;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```
:::

::: details 大整数相减
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int t;
	cin>>t;
	//循环t次，处理t组数据
	for(int h=1;h<=t;h++){ 
		char a[105],b[105];
		int a1[105]={},b1[105]={};
		//1. 当字符串输入
		cin>>a>>b;
		int la=strlen(a),lb=strlen(b);
		//2. 处理被减数小于减数
		if((la<lb) || (la==lb&&strcmp(a,b)<0)){
			swap(a,b);
			swap(la,lb);
			cout<<"-";
		}
		//3. 转换反转整数数组
		for(int i=0;i<la;i++){
			a1[la-1-i]=a[i]-48;
		}
		for(int i=0;i<lb;i++){
			b1[lb-1-i]=b[i]-48;
		}
		//4. 对应位相减
		int c1[105]={}; //结果
		int lc=la; //结果长度
		for(int i=0;i<lc;i++){
			if(a1[i]<b1[i]){//处理借位
				a1[i+1]--;
				a1[i]=a1[i]+10;
			}
			c1[i]=a1[i]-b1[i];
		}
		//5. 去除前导0
		int k;
		for(k=lc-1;k>0;k--){
			if(c1[k]!=0){
				break;
			}
		}
		//6. 逆序输出
		for(int i=k;i>=0;i--){
			cout<<c1[i];
		}
		
		cout<<endl; //换行
	}
	return 0;
}
```
:::

::: details n进制的减法
```cpp
#include<bits/stdc++.h>
using namespace std;
char a[1005],b[1005];
int a1[1005]={},b1[1005]={};
int c1[1005]={}; //结果
int main(){
	int n;
	cin>>n;
	
	//1. 当字符串输入
	cin>>a>>b;
	int la=strlen(a),lb=strlen(b);
	//2. 处理被减数小于减数
	if((la<lb) || (la==lb&&strcmp(a,b)<0)){
		swap(a,b);
		swap(la,lb);
		cout<<"-";
	}
	//3. 转换反转整数数组
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//4. 对应位相减
	int lc=la; //结果长度
	for(int i=0;i<lc;i++){
		if(a1[i]<b1[i]){//处理借位
			a1[i+1]--;
			a1[i]=a1[i]+n;  //借1当n
		}
		c1[i]=a1[i]-b1[i];
	}
	//5. 去除前导0
	int k;
	for(k=lc-1;k>0;k--){
		if(c1[k]!=0){
			break;
		}
	}
	//6. 逆序输出
	for(int i=k;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```
:::

::: details 部分数字的减法
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	string s1,s2;
	cin>>s1>>s2;
	int q,z;
	cin>>q>>z; //截取范围
	//1. 截取两个整数
	string a = s1.substr(q-1 , (z-q+1));
	string b = s2.substr(q-1 , (z-q+1));
	//2. 处理被减数小的情况
	if(a<b){
		string t = a;
		a = b;
		b = t;
		cout<<"-";
	}
	//3. 转换反转大整数
	int a1[101]={},b1[101]={};
	int l=a.size();
	for(int i=0;i<l;i++){
		a1[l-i-1]=a[i]-48;
		b1[l-i-1]=b[i]-48;
	}
	//4. 对应位相减
	int c1[101]={};
	for(int i=0;i<l;i++){
		if(a1[i]<b1[i]){
			a1[i+1]--;
			a1[i]=a1[i]+10;
		}
		c1[i]=a1[i]-b1[i];
	}
	//5. 处理前导0
	int k;
	for(k=l-1;k>0;k--){
		if(c1[k]!=0){
			break;
		}
	}
	//6. 逆序输出
	for(int i=k;i>=0;i--){
		cout<<c1[i];
	}
	
	return 0;
}
```
:::