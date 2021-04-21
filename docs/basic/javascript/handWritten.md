# 手写代码

## 手写一个 JS 深拷贝

```js
const cloneDeep = (target, targetList = []) => {
    let result;
    // 非对象、数组
    if (
        typeof target !== "object" ||
        typeof target === "undefined" ||
        target === null
    ) {
        return target;
    }
    // 数组
    if (Array.isArray(target)) {
        result = [];
        target.forEach((item, index) => {
            if (targetList.includes(item)) {
                result[index] = item;
            } else {
                targetList.push(item);
                result[index] = cloneDeep(item, targetList);
            }
        });
        return result;
    }
    // 对象
    result = {};
    Object.keys(target).forEach((key) => {
        if (targetList.includes(target[key])) {
            result[key] = target[key];
        } else {
            targetList.push(target[key]);
            result[key] = cloneDeep(target[key], targetList);
        }
    });
    return result;
};

const target = {
    a: {
        b: {
            c: [1, 3, { d: 1 }],
        },
    },
    b: [1, 2, 3],
    c: null,
    d: undefined,
};
const loop = { a: 1, b: 2 };
loop.b = loop;

const clone = cloneDeep(target);
const loopClone = cloneDeep(loop);

console.log(clone);
console.log(loopClone);
```

## 实现一个 JS 函数柯里化

```js
const curry = (fn) => {
    let arg = [];
    return function _fn(...res) {
        if (res.length > 0) {
            arg = arg.concat(res);
            return _fn;
        } else {
            return fn(...arg);
        }
    };
};
const fn = (a, b, c, d) => a + b + c + d;
const curringFn = curry(fn);
console.log(curringFn(1)(2)(3)(4)());
```

## 实现 call / apply

```js
Function.prototype.myCall = function (thisObj, ...arg) {
    thisObj._fn_ = this;
    thisObj._fn_(...arg);
    delete thisObj._fn_;
};
```

## 实现 bind

```js
Function.prototype.myBind = function (thisObj, ...arg) {
    thisObj._fn_ = this;
    return () => {
        thisObj._fn_(...arg);
        delete thisObj._fn_;
    };
};
```

## 实现 new

```js
function newFunction(fn, ...arg) {
    let obj = {};
    obj.__proto__ = fn.prototype;
    let res = fn.call(obj, ...arg);
    return typeof res === "object" ? res : obj;
}
```

## 实现防抖(debounce)

```js
const debounce = (fn, delay) => {
  let timer;
  return (...rest) => {
    if (timer && !timer._destroyed) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        clearTimeout(timer);
      }, delay);
      return;
    }
    fn(...rest);
    timer = setTimeout(() => {
      clearTimeout(timer);
    }, delay);
  };
};

const log = (index) => {
  console.log("函数执行:", index);
};

const newLog = debounce(log, 1000);
newLog(1);
newLog(2);
setTimeout(() => {
  newLog(3);
}, 500);
setTimeout(() => {
  newLog(4);
}, 1000);
setTimeout(() => {
  newLog(5);
}, 2500);

// 1， 5
```

## 实现节流(throttle)

```js
const throttle = (fn, delay) => {
  let timer;
  return (...rest) => {
    if (timer && !timer._destroyed) return;
    fn(...rest);
    timer = setTimeout(() => {
      clearTimeout(timer);
    }, delay);
  };
};

const log = (index) => {
  console.log("函数执行:", index);
};

const newLog = throttle(log, 1000);
newLog(1);
newLog(2);
newLog(3);
setTimeout(() => {
  newLog(4);
}, 1100);

// 1， 4
```

## 实现观察者模式

> 观察者模式(Observer Pattern)： 定义对象间一种一对多的依赖关系，使得当每一个对象改变状态，则所有依赖于它的对象都会得到通知并自动更新。观察者模式的别名包括发布-订阅（Publish/Subscribe）模式、模型-视图（Model/View）模式、源-监听器（Source/Listener）模式或从属者（Dependents）模式。发布订阅和观察者有些不同，可以理解成发布订阅模式属于广义上的观察者模式。

```bash
 ╭─────────────╮  Fire Event  ╭──────────────╮
 │             │─────────────>│              │
 │   Subject   │              │   Observer   │
 │             │<─────────────│              │
 ╰─────────────╯  Subscribe   ╰──────────────╯
```

```ts
// 观察者 接口
interface ObserverInterface {
  update: () => void;
}
// 被观察对象 抽象类
abstract class SubjectAbstract {
  private obsList: ObserverInterface[] = [];
  public addObserver = (obs: ObserverInterface) => {
    this.obsList.push(obs);
  };
  public removeObserver = (obs: ObserverInterface) => {
    this.obsList = this.obsList.filter((item) => item !== obs);
  };
  public notifyObserver = () => {
    this.obsList.forEach((obs) => {
      obs.update();
    });
  };
  public abstract doSomething: () => void;
}
// 实现观察者
class Observer implements ObserverInterface {
  index = "";
  update = () => {
    console.log(`观察者${this.index}接收到通知`);
  };
  constructor(index) {
    this.index = index;
  }
}
// 实现被观察对象
class Subject extends SubjectAbstract {
  doSomething = () => {
    console.log("被观察对象发出消息");
    this.notifyObserver();
  };
}

const subject = new Subject();
const obs1 = new Observer(1);
const obs2 = new Observer(2);

subject.addObserver(obs1);
subject.addObserver(obs2);

subject.doSomething();
```

## 实现订阅发布模式

```bash
 ╭─────────────╮                 ╭───────────────╮   Fire Event   ╭──────────────╮
 │             │  Publish Event  │               │───────────────>│              │
 │  Publisher  │────────────────>│ Event Channel │                │  Subscriber  │
 │             │                 │               │<───────────────│              │
 ╰─────────────╯                 ╰───────────────╯    Subscribe   ╰──────────────╯
```

```ts
?。
```

## 手写一个 Promise
