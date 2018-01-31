### 介绍 
1. 这个插件主要是提供样式美化的,所以代码都会标注得很详细,以供大家一目了然,之后针对自己特殊的业务需求做拓展 
2. 支持滚动条样式修改,滚动条啊,太麻烦了,就算能改变原生滚动条的样式,也不能改变滚动条的占位,所以内容看起来总是缺一块,所以这里的滚动条也是画的,支持各种样式
#### 原理
因为浏览器的兼容问题,select这个标签本身是无法通过改变样式去达到现在所需求的美化界面,所以还是需要重新画一个

自定义滚动条就是让宽度+18px,让原生滚动条看不见,之后自己画一个滚动条
#### 目标 
1. 尽量提供多的API可以改变select的样式以供任何项目使用 
2. 兼容所有现代浏览器 
3. 尽量提供多方法 

#### 使用方法 
1. 先确保引入jquery,并且在当前脚本之前引入
```html
2. 在结构上,还是原来的select标签使用方法:

``` 

```javascript
之后js部分:

``` 
### 后续
不定期优化增强


### 待续功能
1. 双输入
2. 三角形图片输入
3. 设定默认select
