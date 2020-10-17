# JS汇总

## 题目汇总

- 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal
  考察的知识点：
  - setTimeout 与 clearTimeout
    - 参考：[调度：setTimeout 和 setInterval](https://zh.javascript.info/settimeout-setinterval)
  - 函数参数传递：值传递 还是引用传递：TODO
    - 简单类型是按值传递，函数内改变外部不可见
    - 引用类型传递的是指针（内存地址），函数内改变，外部可见

## 知识点汇总 - todo

1. 闭包
2. 作用链
3. this
4. apply、call、bind
5. 原型链


## 参考
1. [现代 JavaScript 教程](https://zh.javascript.info/)