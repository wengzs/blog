# 手写js代码

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

实现思路：定义定时器 => 定时器在运行则重新记时间，并 return => 函数执行 => 执行定时器

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

思路：定义定时器 => 如果存在定时器，则返回 => setTimeout => 执行函数，且清除定时器

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

## 实现发布订阅

## 实现观察者模式

## 手写一个 Promise
