# html & css
## 特殊标签

### meta

1. 是一个空元素，位于 `head` 标签内
2. 用于表示元数据
3. 被浏览器、搜索引擎或者其它web服务调用
4. name属性：定义key值
5. http-equiv属性：定义key值
    1. content-type
    2. default-style
    3. refresh
    4. x-ua-compatible
    5. content-security-policy
6. content：name 和 http-equiv 的值
7. charset：只能是 utf-8

### script

用于嵌入可执行脚本。

#### defer & async

1. defer
    1. 具有src属性才生效
    2. 并行下载，下载过程不阻塞渲染
    3. 在DOM解析完毕之后执行，在`DOMContentLoaded`之前执行完毕
    4. 按顺序执行
2. async
    1. 并行下载，下载过程不阻塞渲染
    2. 下载之后立即执行，阻塞渲染
    3. 不保证顺序

#### esm

需要设置 `type="module" src="xx.js"`

### link

用于指定外部资源，通常为css、ico、字体。

#### 加载css

`rel="stylesheet" href="xxx.css"`

#### 预加载

```html
<link rel="prefetch" href="//example.com/next-page.html" as="document" crossorigin="use-credentials">
<link rel="prefetch" href="/library.js" as="script">
```

#### 预渲染

```html
<link rel="prerender" href="//example.com/next-page.html">
```

#### href & src

href：超文本引用，表示引用、指向。用于`link a`标签。

src：下载并替换当前内容。用于`script img iframe`标签。


### title

定义文档标题。

## 音视频

见直播部分。

## 定位

1. 盒模型
2. bfc 块级格式上下文
    1. 触发方式：absolute&fixed定位、浮动、overflow: hidden、display不为null。
    2. 可以解决margin重叠问题

## 动画

css3动画会启用GPU渲染。

#### animation & keyframe

animation定义动画属性，如时间、时长、周期、延时、动画名称；

keyframe定义动画序列状态。可以用from to，也可以用百分比。

## 布局

#### rem

1. rem、em、px区别
    1. em相对父元素，rem相对根元素
2. rem自适应方案
    1. 在初始化、屏幕尺寸发生变化的时候，根据屏幕宽度生成合适的rem值
    2. 所有的大小都基于rem

#### vw/vh

自适应方案采用webpack插件编译的方式。

#### grid

-
