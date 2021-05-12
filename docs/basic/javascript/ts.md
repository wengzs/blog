# TS 补遗

- 什么情况下写的代码处于全局命名空间？

不使用模块语法的文件

- js 使用函数实现命名空间

```js
(function (something) {
  something.foo = 123;
})(something || (something = {}));
```

- 什么是类型保护？

ts 能够推导出在条件块中的的变量类型。

- readonly 和 const 的区别

const 用于变量，被 const 修饰的变量不能重新赋值。
readonly 用于属性，但这个属性的变量被其他使用者（如函数）调用的时候，可以被修改。

- 类型兼容

ts 是结构化的语言，只要结构匹配，就能够进行赋值。

- Never 和 void 的区别

void 表示没有任何类型，可以被赋值；never 表示永远不存在的值的类型，不能赋值给其他任何类型，除了 never。

- ts 如何实现多继承？

创建一个构造函数：

```ts
type Constructor<T = {}> = new (...args: any[]) => T;
```

扩展一个类并且返回它:

```ts
// 添加属性的混合例子
function TimesTamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}
```
