### 红外遥控操作

#### 1. 红外遥控基础

- **红外遥控器**：我们平时用的电视遥控器就是一种红外遥控器。它通过发送不可见的红外光信号来控制设备。
- **红外接收器**：Arduino上的红外接收器负责接收遥控器发出的红外信号，并把这些信号传给Arduino来处理。



#### 2. 引入IRremote库

- **IRremote库**：这个库就像一个工具包，专门用来帮助Arduino接收和处理红外遥控器的信号。我们可以通过它轻松地让Arduino“听懂”遥控器的指令。
  ```cpp
  #include<IRremote.h>
  ```



#### 3. 代码详解

- **初始化红外接收器**：
  ```cpp
  IRrecv IR(11);
  ```
  这行代码告诉Arduino，红外接收器连接在11号引脚。

- **设置与开始运行**：
  
  ```cpp
  void setup() {
      Serial.begin(115200);
      IR.enableIRIn();  
  }
  ```
  
  - `Serial.begin(115200);`：打开串口通信，这样我们可以看到Arduino接收到的信号（在电脑的串口监视器上显示）。
  - `IR.enableIRIn();`：启动红外接收器，准备接收信号。
  
- **处理红外信号**：
  ```c title:处理红外信号
  void loop() {
      if (IR.decode()) {
          Serial.println(IR.results.value, HEX);
          IR.resume(); 
      }
  }
  ```

  - `if (IR.decode())`：检查有没有接收到遥控器的信号。
  - `Serial.println(IR.results.value, HEX);`：将接收到的信号以16进制的形式打印出来，方便我们观察和调试。



#### 4. switch-case结构与布尔类型变量

- **switch-case结构**：这个结构就像一个分岔路口，根据不同的信号，选择不同的路径来执行不同的命令。
  ```cpp
  switch(IR.results.value){
      case 0xFF30CF: a = !a; break;
      case 0xFF18E7: b = !b; break;
      case 0xFF7A85: a = b = true; break;
      case 0xFF10EF: a = b = false; break;
  }
  ```
  
- `case 0xFF30CF: a = !a; break;`：如果接收到的是0xFF30CF信号（比如遥控器的某个按钮），就切换`a`的状态。`!a`表示把`a`的值从`true`变成`false`，或从`false`变成`true`。
- `case 0xFF18E7: b = !b; break;`：同理，这行代码控制`b`变量的状态。
- `case 0xFF7A85: a = b = true; break;`：如果接收到0xFF7A85信号，`a`和`b`都变成`true`。
- `case 0xFF10EF: a = b = false; break;`：如果接收到0xFF10EF信号，`a`和`b`都变成`false`。

- **布尔类型变量**：`bool`类型变量只有两个值，`true`和`false`，用来表示“是”或“否”、“开”或“关”。



#### 5. 控制LED灯

- **通过布尔变量控制LED**：
  ```cpp
  if(a){ 
      analogWrite(5, 255); 
      delay(200); 
      analogWrite(5, 0); 
      delay(200); 
  }
  if(b){ 
  	analogWrite(6,255);
  }else{ 
  	analogWrite(6,0);
  }
  ```
  
  - `if(a){}`：如果`a`是`true`，就让接在5号引脚的LED灯闪烁。`255`表示最亮，`0`表示关灯。
  - 如果`b`是`true`，6号引脚的LED灯亮；如果`b`是`false`，LED灯熄灭。



### 完整程序

```cpp
// 引入IRremote库，用于处理红外遥控信号
#include <IRremote.h> 
// 创建IRrecv对象，指定11号引脚作为红外接收器的输入引脚
IRrecv IR(11); 

void setup() {
	// 初始化串口通信，波特率为115200，用于在串口监视器上显示数据
    Serial.begin(115200);     
	// 启动红外接收器，开始接收遥控器信号
	IR.enableIRIn();  
}

void loop() {
	// 检查是否接收到红外信号，如果接收到则返回true
    if (IR.decode()) { 
		// 将接收到的信号以16进制形式打印到串口监视器
        Serial.println(IR.results.value, HEX);         
        // 使用switch-case结构来处理不同的红外信号
        switch(IR.results.value){
		  // 如果接收到的信号是0xFF30CF，则切换布尔变量a的状态
          case 0xFF30CF: a = !a; break; 
          // 如果接收到的信号是0xFF18E7，则切换布尔变量b的状态
          case 0xFF18E7: b = !b; break; 
          // 如果接收到的信号是0xFF7A85，则将a和b都设置为true
          case 0xFF7A85: a = b = true; break; 
          // 如果接收到的信号是0xFF10EF，则将a和b都设置为false
          case 0xFF10EF: a = b = false; break; 
        }
        // 处理完当前信号后，准备接收下一个信号
        IR.resume(); 
    } 
    
    if(a){ // 如果变量a为true，执行以下代码块
      analogWrite(5, 255); // 将5号引脚输出最大电压，使连接的LED灯亮
      delay(200); // 延迟200毫秒
      analogWrite(5, 0); // 将5号引脚的输出电压设为0，使LED灯熄灭
      delay(200); // 再次延迟200毫秒，使LED灯形成闪烁效果
    }
    if(b){ //如果b为true，则6号引脚输出最大电压点亮LED灯；
		analogWrite(6,255);
	}else{ // 否则输出0电压关闭LED灯
		analogWrite(6,0);
	}
}
```