### 介绍 
这个插件主要是提供样式美化的,可以修改任何样式,包括箭头和滚动条

#### 使用方法 
使用示例看sample.html

### 详细说明(可不看,最基本的用法看sample.html就可以)

  除了optionAry是必填的,其他都有默认值,选填
 最直观的是看jquery_beautfiySelect.js 里面的opt对象, opt对象里的全是默认值,在实例化的时候按照
     opt结构按需设置css都是覆盖默认值opt的属性从而修改select的样式

```javascript
 $(".target").beautifySelect({
        optionAry:[ //option数组
            {
                val:"id1",//为<options></option> 的value
                showTxt1:"A项目",//显示在li的内容
                showTxt2:"9人投票" //如果有showText2 就在li的右边显示,可不填
            },
            {
                val:"id2",
                showTxt1:"B项目",
                showTxt2:"239人投票"
            },
            {
                val:"id3",
                showTxt1:"C项目",
                showTxt2:"349人投票"
            }

        ],
        trigger:"hover", //触发条件为hover,默认为click触发
        defaultVal:"请选择", //select默认显示内容,
        outer:{//最外围的div样式设置,就是在sample中的<div class="target"></div>
             display: "inline-block",
             position: "relative",
              boxSizing: "border-box"
        },
        select:{
            style:{//select的样式,驼峰写法,覆盖自定义样式
                border: "1px solid #E0E2E4"
            },
            hoverStyle:{ //select的hover样式
                
            },
            focusStyle:{//待完善
                
            }
        },
        optionsBorder:{//显示的下拉框样式
          
        },
        option:{
            //li的样式
            style:{},
            hoverStyle:{}
        },
        scrollBarStyle:{},//滚动条的样式,
        triangle:{},//三角形的样式,可以通过修改样式,通过背景图片,把三角形改为箭头图片,
        liSpan:{ //li可接受两个内容,一左一右显示
            span1:{
                style:{},
                hoverStyle:{}
            },
            span2:{
                style:{},
                hoverStyle:{}
            }
        }

    });
``` 
### 兼容性测试
IE9+ 通过

### 示例
  ![image](https://github.com/niangkouss/pics/raw/master/select.png)

### 后续
不定期优化增强
