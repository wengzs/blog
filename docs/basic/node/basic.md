# 基础模块

## event

1. 同步触发、忽略返回值
2. 应该始终为eventEmitter注册error事件

## buffer

### node & js 中 buffer 的区别

> `ArrayBuffer`对象代表原始的二进制数据 `TypedArray`视图用来读写简单类型的二进制数据（ArrayBuffer），`DataView`视图用来读写复杂类型的二进制数据(ArrayBuffer)。 Node中的`Buffer`类是以更优化和更适合Nodejs的方式实现了`Uint8Array` API，意思就是`Buffer`类其实是`TypedArray(Uint8Array)`的nodejs实现。

### buffer & cache

buffer的目的是起到流量整形的作用，减少短期内突发I/O的影响。

cache是处理系统两端处理速度不匹配的情况，比如磁盘、内存、cpu处理速度不一样，所以会有各种缓存技术。cache中的数据是可以重复获取的。

### 创建buffer

1. Blob类
    1. Blob 封装了不可变数据，可以在多个工作线程中安全地共享，v15新增
    2. 使用 `new  buffer.Blob(source, opts)` 创建
2. Buffer类
    1. `alloc(size, fill = 0, encoding = 'utf8')`
    2. `allocUnsafe(size)`
    3. `allocUnsafeSlow(size)`
    4. `from()`
        1. array、arrayBuffer、buffer、object、string
3. 字符编码默认使用`utf8`
    1. 支持`utf8 utf16le latin1 base64 base64url hex ascii latin1 binary`
4. 使用 `for...of` 遍历buffer

### 读取中文字符串，按照固定长度分割 buffer 乱码问题

中文字符在`utf8`中占3个字节。

需要设置stream的编码方式为`utf8`。通过`setEncoding` 设置的buffer，在被处理的时候已经转为中文字符串了。

### buffer内存分配原理

