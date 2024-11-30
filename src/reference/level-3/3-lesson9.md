---
title: Lesson 5 - 归并排序
order: 9
---

### [9563 录取分数线](https://oj.aicoders.cn/problem/9563)
```cpp
#include <bits/stdc++.h>
using namespace std;
//a:为待排序元素数组
//b:存放中间结果的临时数组
//L:数组a中当前待排序元素的最小下标
//R:数组a中当前待排序元素的最大下标
//first:数组a中当前待排序元素左半部分首元素下标
//second:数组a中当前待排序元素右半部分首元素下标
long long a[200010],b[200010];
//合并函数
void merge(long long L,long long R){
	long long mid=(L+R)/2,t=0,first=L,second=mid+1;
	while(first<=mid&&second<=R){ //判断左右区间是否有值
		if(a[first]>=a[second]) //左右区间首元素对比
			b[t++]=a[first++]; //左区间数进入临时数组
		else {
			b[t++]=a[second++]; //否则右区间的数进入临时数组
		}
	}
	//当左区间或右区间有剩余元素时，直接进入临时数组
	while(first<=mid) b[t++]=a[first++];
	while(second<=R) b[t++]=a[second++];
	for(int i=0;i<R-L+1;i++)
		a[L+i]=b[i]; //转存到原数组
}
//归并函数
void mergeSort(long long L,long long R){
	//取下标中间值
	long long mid=(L+R)/2;
	//对左序列归并排序
	if(mid>L) mergeSort(L,mid);
	//对右序列归并排序
	if(mid+1<R) mergeSort(mid+1,R);
	//将左右序列合并成有序序列
	merge(L,R);
}
int main() {
	//n为人数 m为选取人数
	int n=0, m=0;
	cin>>n>>m;
	for(int i=0;i<n;i++)
		cin>>a[i];
	mergeSort(0,n-1);
	while(a[m-1]==a[m]&&m>=1) {
		m--;
	}
	cout<<a[m-1];
	return 0;
}
```

### [2938 兔子排行榜](https://oj.aicoders.cn/problem/2938)
```cpp
#include <bits/stdc++.h>
using namespace std;
struct node{
	string name;
	int score;
}a[100010]; 
node b[100010]; //临时数组
//合并函数
void merge(long long L,long long R){
	long long mid=(L+R)/2,t=0,first=L,second=mid+1;
	while(first<=mid&&second<=R){ //判断左右区间是否有元素
		if(a[first].score>=a[second].score){ //左右区间首元素分数对比
			//左区间元素进入临时数组，元素中包含分数及名字
			b[t++]=a[first++];
		}
		else{
			//否则右区间元素进入临时数组，元素中包含分数及名字
			b[t++]=a[second++];
		}
	} 
	//当左区间或右区间有剩余元素时，直接进入临时数组
	while(first<=mid)
		b[t++]=a[first++];
	while(second<=R)
		b[t++]=a[second++];
	//转存到原数组
	for(int i=0;i<R-L+1;i++)
		a[L+i]=b[i];
}
//归并排序
void mergeSort(long long L,long long R){
	//取下标中间值
	long long mid=(L+R)/2;
	//对左序列归并排序
	if(mid>L) mergeSort(L,mid);
	//对右序列归并排序
	if(mid+1<R) mergeSort(mid+1,R);
	//将左右序列合并成有序序列
	merge(L,R);
} 
int main(){
	int n,k;
	cin>>n>>k;
	for(int i=0;i<n;i++) {
		cin>>a[i].name>>a[i].score;
	}
	mergeSort(0,n-1);
	for(int i=0;i<k;i++) {
		cout<<a[i].name<<" "<<a[i].score<<endl;
	}
	return 0;
} 
```

### [2945 能量收集器](https://oj.aicoders.cn/problem/2945)
```cpp
#include <bits/stdc++.h>
using namespace std;
//a:为待排序元素数组
//b:存放中间结果的临时数组
//L:数组a中当前待排序元素的最小下标
//R:数组a中当前待排序元素的最大下标
//first:数组a中当前待排序元素左半部分首元素下标
//second:数组a中当前待排序元素右半部分首元素下标
long long a[100010],b[100010],ans;
//合并
void merge(long long L,long long R){
	long long mid=(L+R)/2,t=0,first=L,second=mid+1;
	while(first<=mid&&second<=R){ //判断左右区间是否有值
		if(a[first]<=a[second]) //左右区间首元素对比
			b[t++]=a[first++]; //左区间数进入临时数组
		else {
			b[t++]=a[second++]; //否则右区间的数进入临时数组
			ans+=mid-first+1;
		}
	}
	//当左区间或右区间有剩余元素时，直接进入临时数组
	while(first<=mid) b[t++]=a[first++];
	while(second<=R) b[t++]=a[second++];
	for(int i=0;i<R-L+1;i++)
		a[L+i]=b[i]; //转存到原数组
}
//递归处理左右序列，将左右序列合并成有序
void mergeSort(long long L,long long R){
	//取下标中间值
	long long mid=(L+R)/2;
	//对左序列归并排序
	if(mid>L) mergeSort(L,mid);
	//对右序列归并排序
	if(mid+1<R) mergeSort(mid+1,R);
	//将左右序列合并成有序序列
	merge(L,R);
}
int main() {
	int n=0;
	cin>>n;
	for(int i=0;i<n;i++)
		cin>>a[i];
	mergeSort(0,n-1);
	cout<<ans;
	return 0;
} 
```

### [1398 排序](https://oj.aicoders.cn/problem/1398)
```cpp
#include <bits/stdc++.h>
using namespace std;
//a:为待排序元素数组
//b:存放中间结果的临时数组
//L:数组a中当前待排序元素的最小下标
//R:数组a中当前待排序元素的最大下标
//first:数组a中当前待排序元素左半部分首元素下标
//second:数组a中当前待排序元素右半部分首元素下标
long long n,a[500010],b[500010];
//合并
void merge(long long L,long long R){
	long long mid=(L+R)/2,t=0,first=L,second=mid+1;
	while(first<=mid&&second<=R){ //判断左右区间是否有值
		if(a[first]<=a[second]) //左右区间首元素对比
			b[t++]=a[first++]; //左区间数进入临时数组
		else
			b[t++]=a[second++]; //否则右区间的数进入临时数组
	}
	//当左区间或右区间有剩余元素时，直接进入临时数组
	while(first<=mid) b[t++]=a[first++];
	while(second<=R) b[t++]=a[second++];
	for(int i=0;i<R-L+1;i++)
		a[L+i]=b[i]; //转存到原数组
}
//递归处理左右序列，将左右序列合并成有序
void mergeSort(long long L,long long R){
	//取下标中间值
	long long mid=(L+R)/2;
	//对左序列归并排序
	if(mid>L) mergeSort(L,mid);
	//对右序列归并排序
	if(mid+1<R) mergeSort(mid+1,R);
	//将左右序列合并成有序序列
	merge(L,R);
}
int main() {
	cin>>n;
	for(int i=0;i<n;i++)
		cin>>a[i];
	mergeSort(0,n-1);
	for(int i=0;i<n;i++)
		cout<<a[i]<<" ";
	return 0;
} 
```

### [3044 童程算法大赛-全国公开赛](https://oj.aicoders.cn/problem/3044)
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 500010;
struct node {
	string name;
	int score;
};
int n;
node a[N];
node b[N];
//合并函数
void merge(long long L, long long R) {
	long long mid = (L + R) / 2, t = 0, first = L, second = mid + 1;
	while (first <= mid && second <= R) { //判断左右区间是否有元素
		if (a[first].score >= a[second].score) { //左右区间首元素分数对比
			//左区间元素进入临时数组，元素中包含分数及名字
			b[t++] = a[first++];
		} else {
			//否则右区间元素进入临时数组，元素中包含分数及名字
			b[t++] = a[second++];
		}
	}
	//当左区间或右区间有剩余元素时，直接进入临时数组
	while (first <= mid)
		b[t++] = a[first++];
	while (second <= R)
		b[t++] = a[second++];
	//转存到原数组
	for (int i = 0; i < R - L + 1; i++)
		a[L + i] = b[i];
}
//归并排序
void mergeSort(long long L, long long R) {
	//取下标中间值
	long long mid = (L + R) / 2;
	//对左序列归并排序
	if (mid > L) mergeSort(L, mid);
	//对右序列归并排序
	if (mid + 1 < R) mergeSort(mid + 1, R);
	//将左右序列合并成有序序列
	merge(L, R);
}
int main() {
	//cin.tie(0),cout.tie(0),ios::sync_with_stdio(false);
	cin >> n;
	for (int i = 1; i <= n; i++) {
		cin >> a[i].name >> a[i].score;
	}
	mergeSort(1,n);
	for (int i = 1; i <= n; i++) {
		cout << a[i].name << " " << a[i].score;
		if (a[i].score >= 400) cout << " Gold medal\n";
		else if (a[i].score >= 300) cout << " Silver medal\n";
		else if (a[i].score >= 200) cout << " Bronze medal\n";
		else if (a[i].score >= 1) cout << " Not good\n";
		else cout << " Bad\n";
	}
}
```

### [2978 逆序对比赛](https://oj.aicoders.cn/problem/2978)
```cpp
#include <bits/stdc++.h>
using namespace std;
//a:为待排序元素数组
//b:存放中间结果的临时数组
//L:数组a中当前待排序元素的最小下标
//R:数组a中当前待排序元素的最大下标
//first:数组a中当前待排序元素左半部分首元素下标
//second:数组a中当前待排序元素右半部分首元素下标
long long a[100010],b[100010],ans;
//合并
void merge(long long L,long long R){
	long long mid=(L+R)/2,t=0,first=L,second=mid+1;
	while(first<=mid&&second<=R){ //判断左右区间是否有值
		if(a[first]<=a[second]) //左右区间首元素对比
			b[t++]=a[first++]; //左区间数进入临时数组
		else {
			b[t++]=a[second++]; //否则右区间的数进入临时数组
			ans+=mid-first+1;
		}
	}
	//当左区间或右区间有剩余元素时，直接进入临时数组
	while(first<=mid) b[t++]=a[first++];
	while(second<=R) b[t++]=a[second++];
	for(int i=0;i<R-L+1;i++)
		a[L+i]=b[i]; //转存到原数组
}
//递归处理左右序列，将左右序列合并成有序
void mergeSort(long long L,long long R){
	//取下标中间值
	long long mid=(L+R)/2;
	//对左序列归并排序
	if(mid>L) mergeSort(L,mid);
	//对右序列归并排序
	if(mid+1<R) mergeSort(mid+1,R);
	//将左右序列合并成有序序列
	merge(L,R);
}
int main() {
	int n=0;
	cin>>n;
	for(int i=0;i<n;i++)
		cin>>a[i];
	mergeSort(0,n-1);
	cout<<ans;
	return 0;
} 
```

### [1847 元宇宙](https://oj.aicoders.cn/problem/1847)
```cpp
#include <bits/stdc++.h>
using namespace std;
//a:为待排序元素数组
//b:存放中间结果的临时数组
//L:数组a中当前待排序元素的最小下标
//R:数组a中当前待排序元素的最大下标
//first:数组a中当前待排序元素左半部分首元素下标
//second:数组a中当前待排序元素右半部分首元素下标
long long a[100010],b[100010],ans;
//合并
void merge(long long L,long long R){
	long long mid=(L+R)/2,t=0,first=L,second=mid+1;
	while(first<=mid&&second<=R){ //判断左右区间是否有值
		if(a[first]<=a[second]) //左右区间首元素对比
			b[t++]=a[first++]; //左区间数进入临时数组
		else {
			b[t++]=a[second++]; //否则右区间的数进入临时数组
			ans+=mid-first+1;
		}
	}
	//当左区间或右区间有剩余元素时，直接进入临时数组
	while(first<=mid) b[t++]=a[first++];
	while(second<=R) b[t++]=a[second++];
	for(int i=0;i<R-L+1;i++)
		a[L+i]=b[i]; //转存到原数组
}
//递归处理左右序列，将左右序列合并成有序
void mergeSort(long long L,long long R){
	//取下标中间值
	long long mid=(L+R)/2;
	//对左序列归并排序
	if(mid>L) mergeSort(L,mid);
	//对右序列归并排序
	if(mid+1<R) mergeSort(mid+1,R);
	//将左右序列合并成有序序列
	merge(L,R);
}
int main() {
	int n=0;
	cin>>n;
	for(int i=0;i<n;i++)
		cin>>a[i];
	mergeSort(0,n-1);
	cout<<ans;
	return 0;
} 
```