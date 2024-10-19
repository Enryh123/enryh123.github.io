#include <unordered_map>
#include <iostream>
using namespace std;

int main() {
    unordered_multimap<string, int> scores;
    scores.insert({"Alice", 90});
    scores.insert({"Bob", 85});
    scores.insert({"Alice", 95});  // 键 "Alice" 可以重复
    auto range = scores.equal_range("Alice");
    for(auto it = range.first; it != range.second; ++it){
        cout<< it->second << endl;
        cout<< it->first << endl;
    }
    for (const auto &entry : scores) {
        cout << entry.first << ": " << entry.second << endl;
    }
    return 0;
}