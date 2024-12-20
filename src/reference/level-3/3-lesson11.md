---
title: Lesson 11 - 队列进阶
order: 11
---

## 课堂练习
::: details 猴子选大王
```cpp
#include<bits/stdc++.h>
using namespace std;
int q[301]; //队列
int front=0,rear=0;
void push(int x){
	if((rear+1)%301!=front){ //未满
		q[rear] = x;
		rear = (rear+1)%301; //更新队尾
	}
}
void pop(){
	if(rear!=front){ //非空
		front = (front+1)%301; //更新队首	
	}
}
int main(){
	int n,m; //n只猴子从1~m报数
	cin>>n>>m;
	//猴子编号1~n入队
	for(int i=1;i<=n;i++)
		push(i);
	int ans; //记录出队编号
	int k = 1; //报的数字
	while(rear != front){
		if(k%m!=0){ //不是m的倍数
			push(q[front]);
			pop();
		}else{ //m的倍数
			ans = q[front];
			pop();
		}
		k++;
	}
	cout<<ans;//输出最后淘汰的编号
	return 0;
}
```
:::

::: details 选领诵
```cpp
#include<bits/stdc++.h>
using namespace std;
struct stu{
	int times; //次数
	int id; //编号
};
stu q[21]; //循环队列
int front=0,rear=0;
void push(stu x){
	if((rear+1)%21!=front){//队列不满
		q[rear] = x;
		rear = (rear+1)%21;//队尾rear加1
	}
}
void pop(){
	if(front!=rear){ //队列非空
		front = (front+1)%21;//队首front加1
	}
}
int main(){
	int n,m,a; //同学人数n，出局数字m，性别a
	cin>>n;
	stu b;
	for(int i=1;i<=n;i++){
		cin>>a; //1是男生，0是女生
		b.times = (a==1?1:2); //男生1次，女生2次
		b.id = i;
		push(b); //入队
	}
	cin>>m;
	int k=1,ans; //报数k
	while(front != rear){ //循环队列非空
		if(k%m!=0){ //不是m的倍数
			push(q[front]);
			pop();
		}else if(k%m==0 && q[front].times>1){//报数m且次数大于1
			q[front].times--;
			push(q[front]);
			pop();
		}else{//报数m且次数只有1
			ans = q[front].id;
			pop();
		}
		k++;
	}
	cout<<ans;
	return 0;
}
```
:::

::: details 排队看病
```cpp
#include<bits/stdc++.h>
using namespace std;
deque<string> dq; //双端队列
int main(){
	int n;//病人数量
	cin>>n;
	int a;//0左边坐下，1右边坐下
	string name;//姓名
	for(int i=1;i<=n;i++){
		cin>>a>>name;
		if(a==0) //队首添加
			dq.push_front(name);
		else //队尾添加
			dq.push_back(name);
	}
	while(dq.empty()!=1){//队列不为空
		cout<<dq.front()<<endl;//取队首元素
		dq.pop_front();//删除队首元素
	}
	return 0;
}
```
:::

::: details 公交换乘
```cpp
#include<bits/stdc++.h>
using namespace std;
struct node{
	int p;//优惠劵面值
	int t; //开始时间
	bool f;//使用标记(0未使用1已使用)
};
node q[100010];//队列
int front,rear;
int ans;//总花费
int main(){
	int n;//出行记录数量
	int go,price,time;//出行工具,票价,开始时间
	cin>>n;
	for(int i=1;i<=n;i++){
		cin>>go>>price>>time;//1条出行记录
		if(go==0){ //乘坐地铁
			ans=ans+price;//累加地铁票价
			node a={price,time,0};
			q[rear++] = a;//增加一张优惠劵
		}
		else{//乘坐公交
			//删除过期的优惠劵
			while(front<rear){//队列非空
				if(time-q[front].t > 45)    front++; //过期
				else break;//未过期则退出
			}
			bool flag = 0;//标记：0表示不存在满足的优惠劵
			for(int j=front;j<rear;j++){//遍历优惠劵
				if(price<=q[j].p && q[j].f==0){
					flag = 1;//更新标记
					q[j].f = 1;//标记劵j已使用
					break;
				}
			}
			if(flag==0) //判断标记
				ans = ans + price;
		}
	}
	cout<<ans;
	return 0;
} 

```
:::

## 课后作业
::: details 难忘的生日
```cpp
#include<bits/stdc++.h>
using namespace std;
queue<int> q;
int main(){
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
		q.push(i);
	int k=1;
	int ans;//答案
	while(q.empty()!=1){//非空
		if(k%3!=0){//不是3倍数放到队尾
			q.push(q.front());
			q.pop();
		}else{//3的倍数记录编号
			ans = q.front();
			q.pop();
		}
		k++;
	}
	cout<<ans;
	return 0;
}
```
:::

::: details 座次表
```cpp
#include<bits/stdc++.h>
using namespace std;
deque<string> dq; //双端队列
int main(){
	int n; //1~20000
	cin>>n;
	int a;
	string name;
	for(int i=1;i<=n;i++){
		cin>>a>>name;
		if(a==0)//a=0从左边进			
			dq.push_front(name);
		else //a=1从右边进
			dq.push_back(name);
	}
	while(dq.empty()!=1){
		cout<<dq.front()<<endl;
		dq.pop_front();
	}
	return 0;
}
```
:::

::: details 童童去存款
```cpp
#include<bits/stdc++.h>
using namespace std;
queue<int> qa;
queue<int> qb;
int main(){
	int n;
	cin>>n;
	int id;
	for(int i=1;i<=n;i++){
		cin>>id;
		if(id%2!=0)
			qa.push(id);
		else
			qb.push(id);
	}
	while(qa.empty()!=1 || qb.empty()!=1){	
		if(qa.size()>0){ //判断元素个数非0
			cout<<qa.front()<<" ";
			qa.pop();
		}
		if(qa.size()>0){
			cout<<qa.front()<<" ";
			qa.pop();
		}
		if(qb.size()>0){
			cout<<qb.front()<<" ";
			qb.pop();
		}
	}
	return 0;
}
```
:::

::: details 机器翻译
```cpp
#include<bits/stdc++.h>
using namespace std;
int vis[1010]; //标记数组
queue<int> q; //队列
int main(){
	int m,n; //内存容量，n个单词
	cin>>m>>n;
	int num;
	int ans = 0; //答案
	for(int i=1;i<=n;i++){
		cin>>num;
		if(vis[num]==0){ //内存没有记录
			if(q.size()>=m){ //腾出一个空间
				vis[q.front()]=0;
				q.pop();
			}
			q.push(num);
			vis[num] = 1;
			ans++;
		}
	}
	cout<<ans;
	return 0;
}
```
:::