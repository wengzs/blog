# vue 实现要点

## 响应式

vue2 用观察者模式（订阅发布）实现了双向数据绑定。

1. 在数据的 getter 属性中进行依赖注册，在 setter 中通知到 watcher
2. array 处理
    1. 重写了 array 的 push、pop 等方法，使得在使用 array 的时候也能够触发双向数据绑定的机制
3. 代理到 this
    1. 将 data、prop、computed 数据代理到 this 上

## 事件机制

1.  维护一个 watcher 队列，这个队列当任务不会立即执行。同一个 id 的任务（针对同一个 dom）的操作在队列中只会保留最新的状态。
2.  使用浏览器的 task - micro task - render 策略来实现渲染，将 vue 的任务用 promise / MutationObserver 推送到 micro task 队列中（backup 方案：用 setTimeout 推送到 下一个循环的 task 队列，这样会稍微慢一点，UI 会多渲染一次）。
3.  浏览器 task - micro task - render 策略
    1.  task
        1. script(整体代码)
        2. setTimeout
        3. setInterval
        4. I/O
        5. UI 交互事件
        6. postMessage
        7. MessageChannel
        8. setImmediate(Node.js 环境)
    2.  micro task
        1. Promise.then
        2. Object.observe
        3. MutationObserver
        4. process.nextTick(Node.js 环境)
    3.  执行顺序：task -> microTask -> render

## dom 更新策略

diff 算法目标：寻找需要修改的最小单位

1.  同层的树节点进行比较而非对树进行逐层搜索遍历的方式，时间复杂度只有 O(n)
2.  isSameNode ? patch : removeNode / createNode
    1.  sameNode: tag、key、isComment 都相同
3.  patch: 针对单个节点
4.  updateChildren：针对同一层级
    1.  new / old 从两头开始向中间遍历比对。
    2.  尽可能的就地复用
    3.  如果 new > old，则创建，则创建新的 vNode
    4.  如果 new < old，则将多余的 vNode 移除
5.  Dom 操作
    1.  在 create / update 钩子中更新 Dom 属性

## template 编译

1. 以 render 函数为起点（如果不存在，则将其他写法，如 jsx，template 转为 render 函数）
2. template 被编译为 AST 抽象语法树 、 render 函数、staticRenderFns 字符串。
3. 在编译中会使用函数缓存
4. 最终 render 函数会生成 vNode

## keep-alive 实现

在 destroyed 中将满足条件的 vNode 缓存起来，在 create 中将 vNode 覆盖上去。
