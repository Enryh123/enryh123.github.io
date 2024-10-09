#### P5016 \[NOIP2018 普及组\] 龙虎斗
```cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXN = 1e5+10;
typedef long long LL;
LL n, m, p1, s1,s2,p2;
LL c[MAXN];
int main()
{
    // freopen("./a.in", "r", stdin);
    cin>>n;
    for(int i=1; i<=n; i++) cin>>c[i];
    cin>>m>>p1>>s1>>s2;

    c[p1]+=s1;
    LL dragon = 0, tiger = 0;
    for(int i=1; i<=m-1; i++) dragon += c[i]*(m-i);
    for(int i=m+1; i<=n; i++) tiger += c[i]*(i-m);
    // cout<<tiger<<' '<<dragon<<endl;
    LL minn=abs(dragon - tiger), mini=m;
    for(int i=1; i<=n; i++){
        if(i==m) continue;
        if(i<m){
            LL tmp = dragon + (m-i)*s2;
            if(abs(tmp-tiger)<minn){
                minn = abs(tmp-tiger), mini=i;
            }
        }else{
            LL tmp = tiger + (i-m)*s2;
            if(abs(dragon-tmp)<minn){
                minn = abs(dragon-tmp), mini=i;
            }
        }
    }
    cout<<mini;
    return 0;
}
```

#### P1055 \[NOIP2008 普及组\] ISBN 号码
```cpp
#include <bits/stdc++.h>
using namespace std;
string s;
string mod = "0123456789X";

int main()
{
    cin>>s;
    int i, j = 1, t = 0;
    for(i = 0; i < 12; i++) {
        //字符串为分隔符‘-’时跳过此次循环进入下一次循环    
        if(s[i] == '-') continue; 
        //t储存 第j个  数字  * j 的和
        t += (s[i]-'0')*j++; 
    }
    if(mod[t%11] == s[12]) cout<<"Right";
    else {
        s[12] = mod[t%11]; //若识别码错误，则赋正确的识别码，然后输出
        cout<<s;
    }
    return 0;
}
```

#### P1075 \[NOIP2012 普及组\] 质因数分解
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    // 题目说了输入数据由两个质数相乘，因此枚举较小的因数，然后算另一个因数即可
    for (int i = 2; i <= n; i++) if (n % i == 0) { 
        cout << n / i;
        break;
    }
    return 0;
}
```

#### P2440 木材加工
```cpp
#include<bits/stdc++.h>
using namespace std;
/*
[...112 113 114] [115 116 117 118 119 120 121 122...] 
    cnt>=k            cnt<k
暴力搜索范围：最小1，最大是最长的木头
  验证能切多少段，如果>=k 找到答案
 */
typedef long long LL;
const int MAXN = 1e5+10;
LL n,k,L[MAXN],maxn,ans;
int main(){
	cin>>n>>k;
	for(int i=1; i<=n; i++){
		cin>>L[i];
		maxn = max(maxn, L[i]); // 找最长的木头
	}
	LL l=0, r=maxn, mid; // 左区间模板
	while(l<r){
		mid = (l+r+1)/2; // mid相当于暴力搜索的len
		LL cnt=0; 
		for(int i=1; i<=n; i++){
			cnt += L[i]/mid;
		}
		if(cnt>=k) l=mid;
		else r=mid-1;
	}
	cout<<l;
//	for(LL len=1; len<=maxn; len++){ // i就是所有可能切的范围
//		LL cnt=0; 
//		for(int i=1; i<=n; i++){
//			cnt += L[i]/len;
//		}
//		if(cnt>=k) ans = max(ans, len);
//		else break;
//	}
//	cout<<ans;
	return 0;
}
```

#### P1678 烦恼的高考志愿
```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int m, n;
    cin>>m>>n;
    vector<int> school(m), stu(n);
    for(int i=0; i<m; i++) cin>>school[i];
    for(int i=0; i<n; i++) cin>>stu[i];

    sort(school.begin(), school.end());
    long long sum = 0;
    for(int i=0; i<n; i++){
        auto it = lower_bound(school.begin(), school.end(), stu[i]);
        if(it == school.begin()){
            sum += abs(stu[i]-school[0]);
        }else if(it == school.end())
            sum += abs(stu[i]-school[m-1]);
        else{
            sum += min(abs(stu[i]-*it), abs(stu[i]-*(it-1)));
        }
    }
    cout<<sum;
    
    return 0;
}

/*

// int l=1, r=m, mid;
        // while(l<r){
        //     mid = (l+r)/2;
        //     if(school[mid]>=stu[i]){
        //         r=mid;
        //     }else{
        //         l=mid+1;
        //     }
        // }
        // if(l==1) sum+=abs(stu[i]-school[1]);
        // else sum += min(abs(stu[i]-school[l-1]), abs(school[l]-stu[i]));
*/
```

