## 1. 什么是JIT？哪些虚拟机用了JIT技术？
JIT（Just-In-Time）及时编译、实时编译，动态编译的一种形式，是一种提高程序运行效率的方法。通常，程序有两种运行方式：静态编译与动态解释。静态编译的程序在执行前全部被翻译为机器码，而解释执行的则是一句一句边运行边翻译。
即时编译器则混合了这二者，一句一句编译源代码，但是会将使用频繁代码翻译过后缓存起来以降低性能损耗。相对于静态编译代码，即时编译的代码可以处理延迟绑定并增强安全性。

### 哪些虚拟机用了JIT技术？
- Java JVM
- Python的第三方实现PyPy
- v8

### 静态编译 & 动态解释
1. 静态编译： C、C++直接编译为机器指令
2. 动态解释：JavaScript、Python、Erlang、PHP、Perl、Ruby
https://www.ibm.com/developerworks/cn/java/j-lo-just-in-time/index.html