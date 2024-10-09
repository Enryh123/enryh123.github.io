digital 数字    analog 模拟    pin 引脚

Mode 模式     OUTPUT 输出    INPUT 输入

Write 输出   Read 输入    int 整数      float 浮点数

led 灯     button 按钮 

> button:
>
> pinMode(button, INPUT);
>
> int x = digitalRead(button);
>
> Led:
>
> pinMode(led, OUTPUT);
>
> digitalWrite(led, HIGH);
>
> analogWrite(led, 255);

dist 距离（distance）  get 得到      trig 发射     echo 接收

LOW 低    HIGH 高   delay 延时   Micro 微小的   seconds 秒

pulse 脉冲    In 输入（INPUT）   return 返回    time 时间

> int trig = 2;
>
> int echo = 3;
>
> pinMode(trig, OUTPUT);
>
> pinMode(echo, INPUT);
>
> int getDist(){
>
> ​	digitalWrite(trig, LOW);
>
> ​	delayMicroseconds(2);
>
> ​	digitalWrite(trig, HIGH);
>
> ​	delayMicroseconds(10);
>
> ​	digitalWrite(trig, LOW);
>
> ​	return pulseIn(echo, HIGH)/58.3;
>
> }
>
> 使用：getDist() 获取目前的距离



Serial 串口     begin 开始(设置波特率)     print 打印   

println 换行打印 （line 行）



Servo  舵机     attach 关联，连接     include 包括

> #include<Servo.h>
>
> Servo dj;
>
> dj.attach(9);      dj.write(30～150)

 

IR 红外     remote 遥控      recv 接收（receive）  enable 启动

decode 解码      if 如果      results 结果    value 数值   

resume 暂停

> #include<IRremote>
>
> IRrecv IR(引脚);
>
> IR.enableIn();
>
> if(IR.decode()){
>
> ​	switch(IR.results.value){
>
> ​		case 0xFF30CF:
>
> ​			.......;
>
> ​			break;
>
> ​	}
>
> }
>
> int pot = analogRead(A0);
>
> int x = map(pot, 0,1023, 0,255);



HEX 十六进制       OCT 八进制      BIN 二进制     DEC 十进制

十进制：10个符号，逢十进一， 0～9，876247

0 1 2 3 4 5 6 7 8 9    10 11 ... 19 20

二进制：2个符号，逢二进一，0～1，1110

0 1 10 11 100 101 110 111 1000  1001  1010  1011  1100 1101 1110

八进制：8个符号，逢八进一，0～7，102

> 每一位单独转成3位二进制

十六进制：16个符号，逢十六进一，0～9，ABCDEF

0 1 2 3 4 5 6 7 8 9 A B C D E F 10 11 12 13 14 15 16 17 18 19 1A...

1F 20



C语言

- 创建变量 `类型 名字 = 数字;` , `类型 名字;`

  - int a=32;
  - float b=3.14;
  - Servo dj;
  - IRrecv IR(引脚);
  - char c = 'A';   要用单引号

- 类型 

  - int 整数
  - float 浮点数
  - bool 布尔   boolean   true/false
  - char 字符

- 运算

  - `+`,`-`,`*`,`/`,`%`
  - `4%3` 结果是 `1`, 求余数

- 函数调用

  - `函数名字()` `模块.函数名字()`
  - `Serial.begin();`

- 导入库

  - `#include<库名.h>`

- 分支结构

  - ```cpp 
    if(判断条件)
    {
      	条件为true时执行的内容
        if(判断条件) 
        {
            ....
        }
    }
    if 判断条件：
      缩进后的内容是条件为true执行的内容
    ```

  - ```cpp
    if(判断条件)
    {
      	为true执行
    }
    else if(条件2)
    {
        条件2成立时执行
    }
    else
    {
      	为false时执行
    }
    ```

  - ```cpp
    switch( 希望匹配的数值 )
    {
      	case 数值1:
        	匹配数值1时执行
          break; 
      	case 数值2:
        	匹配数值2时执行
          break;
    }
    ```

  - 循环结构

    ```cpp
    for(int i=开始; i<=结束; i++)
    {
      	要重复的内容
    }
    for(int i=开始; i>=结束; i-=步长)
    {
      
    }
    Serial.begin(9600);
    for(int i=1;i<=100;i++){
      Serial.println("hello");
    }
    for(int i=2;i<=100;i+=2){
      Serial.println(i);
    }
    for(int i=1;i<=10;i++){
      for(int j=1;j<=3;j++){
        Serial.println(i+j);
      }
    }
    ```

- byte 类型变量的范围：0~255，占用 1 字节空间
- int 类型变量的范围：-32768~32767，占用 2 字节空间
- bool 1字节，float 4字节，long 4字节
  - 内存单位 TB>GB>MB>KB>B>字节>位
  - 除了1字节=8位外，其他都相差1024
- 转义字符 `\n`, 相当于换行