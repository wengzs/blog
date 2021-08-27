# shell拾遗

## 基本语法

1. echo
2. `;`
    1. 使用分号时，第二个命令总是接着第一个命令执行，不管第一个命令执行成功或失败。
3. `&&`
    1. 如果前面的运行成功，则运行后面的指令
4. `||`
    1. 如果前面的运行失败，则运行后面的指令
5. ctrl + l = clear

## 模式扩展

1. `~`  /home/userName
2. `?` 单字符
3. `*` 任意个数字符
4. `[abc]` a b c 中任意一个
5. `[0-9a-zA_-Z]` 范围中的一个
6. `!` 非
7. `{1,2,3}` 扩展，类似于js 的 map
8. `{1..10}` 扩展 1~10
9. `$` 变量
10. `$(ls)` 执行命令
11. `$((1+1))` 执行算数

## 引号和转义

1. 转义
2. 单引号
    1. 保留字符的字面含义，各种特殊字符在单引号里面，都会变为普通字符
3. 双引号
    1. 大部分特殊字符在双引号里面，都会失去特殊含义，变成普通字符； $ \ \`不在此列。
    2. 不会进行文件名扩展
4. here 文档
    1. << 开始
    2. _EOF_ 结束

## 变量

1. 环境变量
2. =  定义变量
3. $  读取变量
4. unset 删除变量
5. export 输出变量

## 字符串操作

1. `{#字符串}`长度
2. `${字符串:start:end}` 截取子串
3. `${字符串#patter}` 非贪婪匹配
4. `${字符串##patter}` 贪婪匹配
5. `${字符串^^}` 大写
6. `${字符串,,}` 小写

## 算术

1. `((...))` 算术
2. `expr  1+1` 算术
3. `let a=1+3` 算术

## 目录

1. cd
2. pushd
3. popd
4. dirs

## 脚本入门

### shebang

```bash
#!/bin/sh
# 或者
#!/bin/bash
# 保险的写法
#!/usr/bin/env bash
#!/usr/bin/env node
```

### 脚本参数

1. `$0`：脚本文件名，即`script.sh`。
2. `$1`~`$9`：对应脚本的第一个参数到第九个参数。
3. `$#`：参数的总数。

### exit

退出 & 退出码

### source

执行脚本，重新加载配置

### alias

别名

## read

命令行交互指令

## 条件判断

if

```bash
if commands; then
  commands
[elif commands; then
  commands...]
[else
  commands]
fi
```

测试真值，0 、 1

```bash
# 写法一
test expression

# 写法二
[ expression ]

# 写法三 支持正则
[[ expression ]]
```

![image-20210823173500169](https://zs-typora.oss-cn-hangzhou.aliyuncs.com/image/image-20210823173500169.png)

case 结构

```bash
case expression in
  pattern )
    commands ;;
  pattern )
    commands ;;
  ...
esac
```

## 循环

### while

```bash
while condition; do
  commands
done
```

for in

```bash
for variable in list
do
  commands
done

#!/bin/bash

for i in word1 word2 word3; do
  echo $i
done
```

for

```bash
for (( expression1; expression2; expression3 )); do
  commands
done
```

break, continue 跳出循环

select: 让用户选择一个选项

```bash
#!/bin/bash
# select.sh

select brand in Samsung Sony iphone symphony Walton
do
  echo "You have chosen $brand"
done

$ ./select.sh
1) Samsung
2) Sony
3) iphone
4) symphony
5) Walton
#?
```

## 函数

### 定义

```bash
# 第一种fn() {  # codes}# 第二种function fn() {  # codes}
```

### 执行

```bash
hello() {  echo "Hello $1"}$ hello worldhello world
```

### 删除函数

```bash
unset -f functionName
```

### 参数

- `$1`~`$9`：函数的第一个到第9个的参数。
- `$0`：函数所在的脚本名。

### 全局变量

Bash 函数体内直接声明的变量，属于全局变量，整个脚本都可以读取

## 数组

### 定义

`{v1,v2,v3...vn}`

或者

`ARRAY=(v1 v2 v3 ... vn)`

### 读取

读取指定

`array[i]`

读取所有

`array[@]`

### 长度

```bash
${#array[*]}${#array[@]}
```

### 添加成员

`array+=(a b c)`

## set

1. -u 忽略不存在的变量
2. -x 运行结果之前，先输出执行的那一行命令
3. -e 只要脚本发生错误，就立刻停止执行
4. -o pipefail 只要一个子命令失败，管道命令就会失败，脚本停止执行

## mktemp

用于创建临时文件

## trap

用来在 Bash 脚本中响应系统信号。

`trap 执行脚本 系统信号`



