---
title: Lesson 9 - 大整数乘法
order: 9
---

## 逐步分析大整数乘法过程
### 1. 无进位乘法
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1.当字符串输入
	char a[1001],b[1001];
	cin>>a>>b;
	//2.转换反转到整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[1001]={},b1[1001]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3.模拟整数乘法
	int c1[2001]={};
	for(int i=0;i<lb;i++){
		for(int j=0;j<la;j++){
			c1[j+i]=c1[j+i]+a1[j]*b1[i];
		}
	}
	//4.逆序输出
	int lc=la+lb-1;
	for(int i=lc-1;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
} 
```

### 2. 有进位乘法
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1.当字符串输入
	char a[1001],b[1001];
	cin>>a>>b;
	//2.转换反转到整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[1001]={},b1[1001]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3.模拟整数乘法
	int c1[2001]={};
	int x=0;
	for(int i=0;i<lb;i++){
		for(int j=0;j<la;j++){
			c1[j+i]=c1[j+i]+a1[j]*b1[i]+x;
			x=c1[j+i]/10;
			c1[j+i]=c1[j+i]%10;
		}
		c1[i+la]=x;
		x=0;
	}
	//4.最后的进位非0，长度加1
	int lc=la+lb-1;
	if(c1[lc]!=0){
		lc++;
	}
	//5.逆序输出
	for(int i=lc-1;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
} 
```

## 课堂练习
::: details 统计数码
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1.当字符串输入
	char a[1001],b[1001];
	int c;
	cin>>a>>b>>c;
	//2.转换反转到整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[1001]={},b1[1001]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3.模拟整数乘法
	int c1[2001]={},x=0;
	for(int i=0;i<lb;i++){//第2个整数
		for(int j=0;j<la;j++){//第1个整数
			c1[j+i]=c1[j+i]+a1[j]*b1[i]+x;
			x=c1[j+i]/10;
			c1[j+i]=c1[j+i]%10;
		}
		c1[i+la]=x;//存储进位
		x=0; //进位重新赋0
	}
	//4.最后的进位非0，长度加1
	int lc=la+lb-1;
	if(c1[lc]!=0){
		lc++;
	}
	//5.统计并输出结果
	int res = 0; //存储结果并初始化0
	for(int i=lc-1;i>=0;i--){
		if(c1[i]==c)
			res++;
	}
	cout<<res;
	return 0;
} 
```
:::

::: details 大整数乘以小整数-解法1
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1.当字符串输入
	char a[1001],b[11];
	cin>>a>>b;
	//2.转换反转到整数数组
	int la=strlen(a),lb=strlen(b);
	int a1[1001]={},b1[11]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	for(int i=0;i<lb;i++){
		b1[lb-1-i]=b[i]-48;
	}
	//3.模拟整数乘法
	int c1[1011]={},x=0;
	for(int i=0;i<lb;i++){//第2个整数
		for(int j=0;j<la;j++){//第1个整数
			c1[j+i]=c1[j+i]+a1[j]*b1[i]+x;
			x=c1[j+i]/10;
			c1[j+i]=c1[j+i]%10;
		}
		c1[i+la]=x;
		x=0;
	}
	//4.最后的进位非0，长度加1
	int lc=la+lb-1;
	if(c1[lc]!=0){
		lc++;
	}
	//5.逆序输出
	for(int i=lc-1;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
} 
```
:::


::: details 大整数乘以小整数-解法2
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	//1.输入两个整数a,b
	char a[1001]; //大整数
	int b; //小整数
	cin>>a>>b;
	//2.大整数转换反转到整数数组
	int la=strlen(a);
	int a1[1001]={};
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
	}
	//3.数组a1的元素依次乘以b
	int c1[1011]={},x=0; //c1存乘积,x存进位
	for(int i=0;i<la;i++){
		c1[i] = a1[i]*b + x;
		x = c1[i]/10;
		c1[i] = c1[i]%10;
	}
	//4.拆分存储最后的进位
	while(x>0){
		c1[la]=x%10;
		x=x/10;
		la++;
	}
	//5.逆序输出
	for(int i=la-1;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```
:::


::: details 求10000以内n的阶乘
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int n;
	cin>>n;
	//1.准备数组存储累乘
	int c1[50001]={1};
	int lc=1;//结果长度
	//2.遍历小整数1~n
	for(int i=1;i<=n;i++){
		//3.大整数c1乘以小整数i
		int x=0;//进位
		for(int j=0;j<lc;j++){
			c1[j]=c1[j]*i+x;
			x=c1[j]/10;
			c1[j]=c1[j]%10;
		}
		//拆分存储最后的进位
		while(x>0){
			c1[lc]=x%10;
			x=x/10;
			lc++;
		}
		//注意：下标lc未使用，结果逆序从下标lc-1输出
	}
	//4.逆序输出
	for(int i=lc-1;i>=0;i--){
		cout<<c1[i];
	}
	return 0;
}
```
:::

## 课后练习
::: details 计算多组大整数相乘
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int t;
	cin>>t;
	for(int k=1;k<=t;k++){
		//1.当字符串输入
		char a[105],b[105];
		cin>>a>>b;
		int la=strlen(a),lb=strlen(b);
		//2.转换反转到整数数组
		int a1[105]={},b1[105]={};
		for(int i=0;i<la;i++){
			a1[la-1-i]=a[i]-48;
		}
		for(int i=0;i<lb;i++){
			b1[lb-1-i]=b[i]-48;
		}
		//3.模拟整数乘法
		int c1[205]={};
		int x=0;
		for(int i=0;i<lb;i++){//第2个因数
			for(int j=0;j<la;j++){//第1个因数
				c1[j+i]=c1[j+i]+a1[j]*b1[i]+x;
				x=c1[j+i]/10;
				c1[j+i]=c1[j+i]%10;
			}
			c1[i+la]=x;
			x=0;
		}
		//4.最后的进位非0，长度加1
		int lc=la+lb-1;
		if(c1[lc]!=0){
			lc++;
		}
		//5.逆序输出
		for(int i=lc-1;i>=0;i--){
			cout<<c1[i];
		}
		cout<<endl; //换行
	}
	return 0;
}
```
:::

::: details 先加再乘
```cpp
#include<bits/stdc++.h>
using namespace std;
char a[205],b[205],c[205]; 
int a1[205]={},b1[205]={},c1[205]={};
int main(){
	//当字符串输入
	cin>>a>>b>>c;
	int la=strlen(a),lb=strlen(b),lc=strlen(c);
	
	//计算(a+b)的和
	for(int i=0;i<la;i++)	a1[la-1-i]=a[i]-48;
	for(int i=0;i<lb;i++)	b1[lb-1-i]=b[i]-48;
	int ld=la>lb?la:lb; //和的长度
	int d1[205]={},x1=0; //d1保存和，x1进位
	for(int i=0;i<ld;i++){
		d1[i]=a1[i]+b1[i]+x1;
		x1=d1[i]/10;
		d1[i]=d1[i]%10;
	}
	if(x1!=0){
		d1[ld]=x1;
		ld++;
	}
	
	for(int i=0;i<lc;i++)	c1[lc-1-i]=c[i]-48;
	//计算d*c的积
	int e1[500]={},x2=0; //保存积，注意数组的大小
	//d1的长度ld，c1的长度lc
	for(int i=0;i<lc;i++){ //第2个因数
		for(int j=0;j<ld;j++){ //第1个因数
			e1[j+i]=e1[j+i]+d1[j]*c1[i]+x2;
			x2=e1[j+i]/10;
			e1[j+i]=e1[j+i]%10;
		}
		e1[i+ld]=x2;
		x2=0;
	}
	
	int le=ld+lc-1;
	if(e1[le]!=0){
		le++;
	}
	
	//逆序输出
	for(int i=le-1;i>=0;i--)
		cout<<e1[i];
	return 0;
}
```
:::

::: details 阶乘表达式
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	string str;
	cin>>str;
	int len=str.size();//表达式长度
	
	//提取整数n
	//1、k1存储n最高位下标，k2存储个位下标
	int k1=len-2,k2=len-2; 
	while((str[k1]>='0'&&str[k1]<='9') && k1>=0)
		k1--;
	k1++;
	//2、利用k1~k2计算整数n
	int n=0;
	for(int i=k1;i<=k2;i++)
		n=n*10+(str[i]-48);
	
	//计算1!+2!+...+n!
	int s1[50001]={},ls=0,x1=0; //累加
	int c1[50001]={1},lc=1,x=0;//阶乘
	for(int i=1;i<=n;i++){
		//计算i(1~n)的阶乘
		for(int j=0;j<lc;j++){
			c1[j]=c1[j]*i+x;
			x=c1[j]/10;
			c1[j]=c1[j]%10;
		}
		while(x>0){
			c1[lc]=x%10;
			x=x/10;
			lc++;
		}
		//x2=0;
		
		//1.计算和的长度
		ls=ls>lc?ls:lc;
		//2.将c1的元素对位累加进s1
		for(int k=0;k<ls;k++){
			s1[k]=s1[k]+c1[k]+x1;
			x1=s1[k]/10;
			s1[k]=s1[k]%10;
		}
		//3.处理最后相加的进位
		if(x1!=0){
			s1[ls]=x1;
			ls++;
		}
		x1=0;
	}
	//逆序输出
	for(int i=ls-1;i>=0;i--){
		cout<<s1[i];
	}
	return 0;
}
```
:::

::: details 两个小数相乘
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	char a[31],b[31]; 
	int a1[31]={},b1[31]={};
	cin>>a>>b;
	int la=strlen(a);
	
	//确定小数点下标
	int index=0;
	for(int i=0;i<la;i++){
		if(a[i]=='.'){
			index=i;
			break;
		}	
	}
	int lx=la-index-1; //小数的长度
	
	//去掉小数点：从index+1开始都向前移动一位
	for(int i=index+1;i<la;i++){
		a[i-1]=a[i];
		b[i-1]=b[i];
	}
	la--; //去掉小数点，长度减1
	
	//转换反转整数数组
	for(int i=0;i<la;i++){
		a1[la-1-i]=a[i]-48;
		b1[la-1-i]=b[i]-48;
	}
	
	//模拟整数乘法
	int c1[51]={};
	int x=0;
	for(int i=0;i<la;i++){//第2个因数
		for(int j=0;j<la;j++){//第1个因数
			c1[j+i]=c1[j+i]+a1[j]*b1[i]+x;
			x=c1[j+i]/10;
			c1[j+i]=c1[j+i]%10;
		}
		c1[i+la]=x;
		x=0;
	}
	int lc=la+la-1;
	if(c1[lc]!=0){
		lc++;
	}
	
	//逆序输出
	for(int i=lc-1;i>=0;i--){
		cout<<c1[i];
		//因数小数位长度lx，积小数位长度lx*2
		if(i==(lx*2))
			cout<<".";
	}
	return 0;
}
```
:::