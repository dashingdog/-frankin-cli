# 通过npm包制作命令行工具
日常中我们经常会使用到webpack、eslint、vue-cli等命令行指令,而通过指令运行node_modules包的代码是如何实现的？

## node_modules/.bin目录
在项目目录中，我们执行完npm install时，会将包安装到node_modules下，并且可以发现除了我们安装的包之外，还有个.bin目录。

.bin目录下的文件



## 指令文件
第一行写入` #!/usr/bin/env node`


### Unix-like 平台
当全局安装 npm 包的时候，npm 会把 package.json 中 bin 配置的 command-name 添加到系统 $PATH 中去。拿 macOS 举例，npm 会在 /usr/local/bin 下创建一个以 command-name 为名字的软链接，指向全局安装下来的 my-cli 包下面的 js：jsfile。（/usr/local/bin 是在 $PATH 中的）
在命令行键入 command-name 相当于执行了文本文件 jsfile。
在执行的时候碰到第一行 #!/usr/bin/env node，这是一个 shebang 行。这行告诉系统使用 node 去执行当前文件。（shebang 只有在Unix-like平台才有）
执行 js 文件。这里有一个问题：#! 并不是一个符合 js 语法的语句，理论上直接执行是会有 syntax error 的。但是 node 对 shebang 行做了例外处理，所以用 node 执行带 shebang 行的 js 文件是没有问题的。

### Windows 平台
全局安装会把包安装到 C:\Users\username\AppData\Roaming\npm\node_modules下面，然后在 C:\Users\username\AppData\Roaming\npm 生成一个以 command-name 为名字的 cmd 文件：command-name.cmd。（C:\Users\username\AppData\Roaming\npm 在安装 npm 时被加入到 %PATH% 中）
在 Windows 平台运行 cmd 文件是不需要后缀名的，所以当在命令行键入 command-name 相当于执行 C:\Users\username\AppData\Roaming\npm\command-name.cmd。
为什么有这个 cmd 文件，因为 windows 平台没有 shebang，那么 command-name.cmd 就模拟了 #!/usr/bin/env node 的功能，调用 C:\Users\username\AppData\Roaming\npm\node_modules\my-cli\ jsfile

