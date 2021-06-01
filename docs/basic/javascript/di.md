# TS 与依赖注入（DI）

## 概念

有以下两个类：`Animal`、`Cat`，在`Cat`类中调用了`Animal`的`bark`方法，通常简单的写法是这样的：

```ts
class Animal {
    bark(type: string) {
        console.log(`${type} bark`);
    }
}
class Cat {
    type = "cat";
    animal = new Animal();
    bark() {
        this.animal.bark(this.type);
    }
}

const cat = new Cat();
cat.bark(); // cat bark
```

上面的代码存在强耦合，我们改造下，将`Animal`的实例作为构造参数传入`Cat`类：

```ts
class Animal {
    bark(type: string) {
        console.log(`${type} bark`);
    }
}
class Cat {
    type = "cat";
    constructor(private animal: Animal) {}
    bark() {
        this.animal.bark(this.type);
    }
}

const cat = new Cat(new Animal());
cat.bark(); // cat bark
```

这一步我们实现了依赖倒置(`DIP`)。`Cat`类不再直接依赖于`Animal`类，而依赖了`Animal`抽象接口。

> 依赖反转原则（DIP）：
> 
> 高层次的模块不应该依赖于低层次的模块，两者都应该依赖于抽象接口。
> 
> 抽象接口不应该依赖于具体实现。而具体实现则应该依赖于抽象接口。

那控制反转（`IoC`）、依赖注入（`DI`）又是什么呢？

> 控制反转（英语：Inversion of Control，缩写为 IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。
> 
> 其中最常见的方式叫做依赖注入（Dependency Injection，简称 DI），还有一种方式叫“依赖查找”（Dependency Lookup）。

控制反转主要目的是：

> 大多数应用程序都是由两个或是更多的类通过彼此的合作来实现业务逻辑，这使得每个对象都需要获取与其合作的对象（也就是它所依赖的对象）的引用。如果这个获取过程要靠自身实现，那么这将导致代码高度耦合并且难以维护和调试。
> 
> 例如：
> 
> Class A 中用到了 Class B 的对象 b，一般情况下，需要在 A 的代码中显式的 new 一个 B 的对象。
> 
> 采用依赖注入技术之后，A 的代码只需要定义一个私有的 B 对象，不需要直接 new 来获得这个对象，而是通过相关的容器控制程序来将 B 对象在外部 new 出来并注入到 A 类里的引用中。而具体获取的方法、对象被获取时的状态由配置文件（如 XML）来指定。

实现依赖注入(`DI`)的方式有：

> 基于接口。实现特定接口以供外部容器注入所依赖类型的对象。
> 
> 基于 set 方法。实现特定属性的 public set 方法，来让外部容器调用传入所依赖类型的对象。
> 
> 基于构造函数。实现特定参数的构造函数，在新建对象时传入所依赖类型的对象。
> 
> 基于注解。基于 Java 的注解功能，在私有变量前加“@Autowired”等注解，不需要显式的定义以上三种代码，便可以让外部容器传入对应的对象。该方案相当于定义了 public 的 set 方法，但是因为没有真正的 set 方法，从而不会为了实现依赖注入导致暴露了不该暴露的接口（因为 set 方法只想让容器访问来注入而并不希望其他依赖此类的对象访问）。

了解了以上知识点，由于我们写的是`TypeScript`，我们可以使用注解（装饰器）、Reflect 来实现`IoC`。

我们希望能做到：

```ts
import { Injectable, Controller, IocContainer } from "myDI";

@Injectable()
class Animal {
  bark(type: string) {
    console.log(`${type} bark`);
  }
}

@Controller()
class Cat {
  type = "cat";
  // -----
  // 这里做一个约定：constructor 中注入的实例变量名与类名相同，第一个单词小写
  // 当然也可以在 @Controller 中传入参数解决这个问题
  // -----
  constructor(private animal: Animal) {}
  bark() {
    this.animal.bark(this.type);
  }
}

const iocContainer = new IocContainer({
  provider: [Animal],
  controller: [Cat],
});

const cat = iocContainer.getInstance("Cat");
cat.bark();
```

让我们对上述代码进行一些改造，通过依赖注入(`DI`)实现控制反转(`IoC`)吧。

## 实现 Injectable

我们需要先掌握[TS 装饰器](https://www.tslang.cn/docs/handbook/decorators.html)的知识。

以一个简单的例子开始：

我们先定义一个`Injectable`的装饰器工厂函数，使用`Reflect.defineMetadata`将元数据注入到`Animal`类中。然后可以使用`Reflect.getMetadata`来获取注入的元数据。就是这么简单。

```ts
import "reflect-metadata";

// 定义一个 Injectable 的装饰器工厂函数
function Injectable() {
  return (target) => {
    // 注入元数据 { metaData: "metaData" }
    Reflect.defineMetadata("ioc-key", { metaData: "metaData" }, target);
    return target;
  };
}

// 使用装饰器
@Injectable()
class Animal {}

// 获取元数据
console.log(Reflect.getMetadata("ioc-key", Animal)); // { metaData: 'metaData' }
```

我们可以使用`Function.toString()`来获取具体的类名、类构造函数的入参，并将这些信息写入元数据中。将上面的代码稍微改造下：

```ts
import "reflect-metadata";

// 获取类构造函数的入参
function getArgs(func) {
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
  return args
    .split(",")
    .map(function (arg) {
      return arg.replace(/\/\*.*\*\//, "").trim();
    })
    .filter(function (arg) {
      return arg;
    });
}
// 获取类名
function getName(func) {
  return func.toString().match(/function\s(.*)\(.*/)[1];
}

function Injectable() {
  return (target) => {
    const className = getName(target);
    Reflect.defineMetadata("injectable", { className }, target);
    return target;
  };
}

function Controller() {
  return (target) => {
    const deps = getArgs(target);
    const className = getName(target);
    Reflect.defineMetadata("controller", { deps, className }, target);
    return target;
  };
}

@Injectable()
class Animal {
  bark(type: string) {
    console.log(`${type} bark`);
  }
}

@Controller()
class Cat {
  type = "cat";
  constructor(private animal: Animal) {}
  bark() {
    this.animal.bark(this.type);
  }
}

console.log(Reflect.getMetadata("injectable", Animal)); // { className: 'Animal' }
console.log(Reflect.getMetadata("controller", Cat)); // { deps: [ 'animal' ] }
```

## 实现 IocContainer

我们在上一章节中，已经将依赖信息注入到了各个类的元数据中。接下来我们实现容器`IocContainer`类。

```ts
type Constructor = new (...any) => object;
interface Options {
    provider: Constructor[];
    controller: Constructor[];
}

class IocContainer {
  /**
   * provider容器
   */
  private provider: {
    className: string;
    instance: object;
  }[] = [];
  /**
   * controller容器
   */
  private controller: {
    className: string;
    instance: object;
  }[] = [];
  constructor(options: Options) {
    /**
     * 提取provider信息
     */
    options.provider.forEach((provider) => {
      const { className } = Reflect.getMetadata("injectable", provider);
      /**
       * 此处实现了单例
       */
      if (!this.isInProvider(className)) {
        this.provider.push({
          className: className.toLowerCase(),
          instance: new provider(),
        });
      }
    });
    /**
     * 提取controller信息
     */
    options.controller.forEach((controller) => {
      const { deps, className } = Reflect.getMetadata("controller", controller);
      let instanceList = [];
      deps.forEach((instanceName) => {
        if (this.isInProvider(instanceName.toLowerCase())) {
          const instance = this.getProvider(instanceName.toLowerCase());
          instanceList.push(instance);
        } else {
          throw new Error(`未声明实例化变量${instanceName}所需要的类`);
        }
      });
      this.controller.push({
        className: className.toLowerCase(),
        instance: new controller(...instanceList),
      });
    });
  }
  private isInProvider(className: string) {
    return this.provider.some((provider) => provider.className === className);
  }
  private getProvider(className: string) {
    return this.provider.filter(
      (provider) => provider.className === className
    )[0].instance;
  }
  /**
   * 从容器中获取实例
   */
  public getInstance(className: string) {
    const result = this.controller.filter(
      (controller) => controller.className === className.toLowerCase()
    );
    if (result.length > 0) {
      return result[0].instance;
    } else {
      throw new Error(`${className}未注册！`);
    }
  }
}
```

## 总结

TS 实现 IoC 的简易代码如下：

```ts
// myDI.ts
import "reflect-metadata";


type Constructor = new (...any) => object;

interface Options {
    provider: Constructor[];
    controller: Constructor[];
}

function getArgs(func) {
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    return args
        .split(",")
        .map(function (arg) {
            return arg.replace(/\/\*.*\*\//, "").trim();
        })
        .filter(function (arg) {
            return arg;
        });
}

function getName(func) {
    return func.toString().match(/function\s(.*)\(.*/)[1];
}

export function Injectable() {
    return (target) => {
        const className = getName(target);
        Reflect.defineMetadata("injectable", { className }, target);
        return target;
    };
}

export function Controller() {
    return (target) => {
        const deps = getArgs(target);
        const className = getName(target);
        Reflect.defineMetadata("controller", { deps, className }, target);
        return target;
    };
}

export class IocContainer {
    /**
     * provider容器
     */
    private provider: {
        className: string;
        instance: object;
    }[] = [];
    /**
     * controller容器
     */
    private controller: {
        className: string;
        instance: object;
    }[] = [];
    constructor(options: Options) {
        /**
         * 提取provider信息
         */
        options.provider.forEach((provider) => {
            const { className } = Reflect.getMetadata("injectable", provider);
            /**
             * 此处实现了单例
             */
            if (!this.isInProvider(className)) {
                this.provider.push({
                    className: className.toLowerCase(),
                    instance: new provider(),
                });
            }
        });
        /**
         * 提取controller信息
         */
        options.controller.forEach((controller) => {
            const { deps, className } = Reflect.getMetadata("controller", controller);
            let instanceList = [];
            deps.forEach((instanceName) => {
                if (this.isInProvider(instanceName.toLowerCase())) {
                    const instance = this.getProvider(instanceName.toLowerCase());
                    instanceList.push(instance);
                } else {
                    throw new Error(`未声明实例化变量${instanceName}所需要的类`);
                }
            });
            this.controller.push({
                className: className.toLowerCase(),
                instance: new controller(...instanceList),
            });
        });
    }
    private isInProvider(className: string) {
        return this.provider.some((provider) => provider.className === className);
    }
    private getProvider(className: string) {
        return this.provider.filter(
            (provider) => provider.className === className
        )[0].instance;
    }
    /**
     * 从容器中获取实例
     */
    public getInstance(className: string) {
        const result = this.controller.filter(
            (controller) => controller.className === className.toLowerCase()
        );
        if (result.length > 0) {
            return result[0].instance;
        } else {
            throw new Error(`${className}未注册！`);
        }
    }
}
```

```ts
import { Injectable, Controller, IocContainer } from "myDI";

@Injectable()
class Animal {
  bark(type: string) {
    console.log(`${type} bark`);
  }
}

@Controller()
class Cat {
  type = "cat";
  constructor(private animal: Animal) {}
  bark() {
    this.animal.bark(this.type);
  }
}

const iocContainer = new IocContainer({
  provider: [Animal],
  controller: [Cat],
});

const cat = iocContainer.getInstance("cat");

// 类型传递问题先忽略
// @ts-ignore
cat.bark(); // cat bark
```

要点有三个：

1. 使用`function.toString()`方法获取类名、构造函数入参
2. 在装饰器中使用`reflect-metadata`将上述元数据注入到类里
3. 确保单例
