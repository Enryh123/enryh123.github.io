```cpp title:公交换乘
#include<bits/stdc++.h>
using namespace std;
struct g{
	int price, time;
}a[100005];
int main(){
    
    int n,c,p,t,gc = 0;
    int sum = 0;
    cin>>n;
	for(int i = 0;i<n;i++){
		cin>>c>>p>>t;
		if(c==0){
			a[gc].price = p; a[gc].time = t; gc++;
			sum+=p;
		}else{
			bool flag = false;
			for(int j = 0;j<gc;j++){
				if(t-a[j].time<=45&&a[j].price>=p){
					a[j].price = 0;
					flag = true;
					break;
				}
			}
			if(!flag) sum+=p;
		}
	} 
	cout<<sum;
    return 0;
}
```

```cpp title:乘方
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int a, b;
    cin>>a>>b;
    if(b==1){
        cout<<a;
        return 0;
    }
    if(a==1){
        cout<<1;
        return 0;
    }
    long long sum=1;
    for(int i=1; i<=b; i++){
        sum*=a;
        if(sum>(int)1e9){
            cout<<-1;
            return 0;
        }
    }    
    cout<<sum;
    return 0;
}
```

```cpp title:解谜
#include <bits/stdc++.h>
using namespace std;

typedef long long LL;

int main()
{
    int k;
    cin>>k;
    cin.tie(0);
    ios::sync_with_stdio(false);
    while(k--){
        LL n,d,e;  // p*q = n,    p+q = n-e*d+2,    p<=q
        cin>>n>>d>>e;   // p最大是和q相等 =>  p最大是 (n-e*d+2)/2
        LL l = 1, r = (n-e*d+2)/2, mid;
        while(l<r){
            mid = (l+r)/2;
            if(mid*(n-e*d+2-mid)>=n) r=mid;
            else l=mid+1;
        }
        if(l*(n-e*d+2-l)==n) cout<<l<<' '<<n-e*d+2-l<<endl;
        else cout<<"NO"<<endl;
    }
    return 0;
}

```

```cpp title:直播获奖
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, w, b[610]={};
    cin>>n>>w;
    for(int i=1; i<=n; i++){
        int x;
        cin>>x;
        // 计算分数线，输入一个计算一个
        b[x]++;
        // 从最高分依次录取，确保获奖率 > w%
        int sum = 0;
        for(int j=600; j>=0; j--){
            sum += b[j];
            if(sum >= 1 && sum>=i*w/100){
                cout<<j<<' ';
                break;
            }
        }
    }
    return 0;
}
```

```cpp title:公路
#include <bits/stdc++.h>
using namespace std;

/*
n个站点，s[i] 表示第i个站与起点的距离
1. s[]={0,0,10,20,30,40}
          1  2  3  4  5
L~R的距离  s[R]-s[L-1]
求第4个站和第3个站的距离  s[4]-s[3-1]

2. cur=1 从1号站点开始
3. 循环找到比1号站点油价便宜的站点，用i表示
    ceil((s[i]-s[cur]-上一次剩下油能走的距离)/d) 需要加的油
    费用： sum += 油*price[i];  cur=i;

重复上述操作
*/
int n;
long long s[100010], d, p[100010];
int main()
{
    cin>>n>>d; // 站点数和每升油可以走的距离
    for(int i=2; i<=n; i++){
        int t;
        cin>>t;
        s[i] = s[i-1]+t; // 计算每个站点离起点的距离
    }
    for(int i=1; i<=n; i++) cin>>p[i]; // 输入油价

    int cur=1;
    long long rest=0, sum=0;
    while(cur!=n){ // 只要没有到达终点，就要重复计算
        int mini=cur;
        for(int i=cur+1; i<=n; i++){ 
            if(p[i]<p[mini]) {
                mini=i; // 找到便宜的站点 
                break;
            }
        }
        if(mini==cur || mini==n){ // 特殊情况，直接能去到终点
            sum += ceil(1.0*(s[n]-s[cur]-rest)/d)*p[cur];
            cout<<sum<<endl;
            return 0;
        }
        long long dist = ceil(1.0*(s[mini]-s[cur]-rest)/d); // 计算加多少升油
        sum += dist*p[cur]; // 加油费用
        rest = dist*d - (s[mini]-s[cur]-rest); // 剩余可以走的距离
        // printf("下一个站点%d，加%d升油，剩余%d距离，油价%d\n", mini, dist, rest, dist*p[cur]);
        cur = mini; // 移动到便宜的站点
    }
    cout<<sum<<endl;
    return 0;
}
```