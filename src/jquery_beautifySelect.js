(function () {
    var beautifySelect = function ($) {

        $.fn.beautifySelect = function (options) {

            //默认样式
            var opt = {
                outer:{
                    display: "inline-block",
                    position:"relative",
                    boxSizing:"border-box"
                },
                select: {
                    style: {
                        display: "inline-block",
                        width: "200px",
                        height: "40px",
                        lineHeight: "40px",
                        border: "1px solid #E0E2E4",
                        background: "#FFFFFF",
                        borderRadius: "3px",
                        cursor: "pointer",
                        textAlign: "center",
                        zIndex:999
                    },
                    hoverStyle: {
                        border: "1px solid #E0E2E4"
                    },
                    focusStyle: {
                        border: "1px solid #CCC"
                    }
                },
                optionsWrapper: {
                    width: "200px",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    boxSizing: "border-box",
                    paddingTop:"50px",
                    zIndex:-99,
                    display:"none"
                },
                optionsBorder:{
                    maxHeight: "200px",
                    width: "200",
                    border: "1px solid #E0E2E4",
                    boxSizing: "border-box",
                    overflow:"hidden"
                },
                options:{ //ul 的样式
                    maxHeight: "220px",
                    width: "218px",
                    overflowY: "scroll",
                    overflowX: "scroll",

                },
                option: { //li
                    style: {
                        height: "36px",
                        lineHeight: "36px",
                        fontSize: "16px",
                        color:"#333",
                        backgroundColor: "#fff",
                        listStyle: "none",
                        textAlign:"left",
                        cursor:"pointer",
                        paddingLeft:"15px"
                    },
                    hoverStyle: {
                        backgroundColor: "#F1F2F4"
                    },
                    focusStyle: {}
                },
                scrollBarStyle :{
                    position:"absolute",
                    top:"50px",
                    right:"0",
                    height:"200px",
                    width:"6px",
                    backgroundColor:"#eff1f3",
                    borderRadius:"100px",
                },
                triangle: {
                    style: {},
                    hoverStyle: {},
                    focusStyle: {}
                },
                liSpan:{
                    span1:{
                        display:"inline-block",
                        height:"100%",
                        width:"40%"
                    },
                    span2:{
                        display:"inline-block",
                        height:"100%",
                        width:"50%",
                        textAlign:"right"
                    }
                }
            };

            //合并数据
            opt = $.extend(true,{},opt,options); //和外部输入样式合并

            //设置结构
            let $this = $(this),//获取目标
                $select = $("<div></div>"),//
                $optionsWrapper = $("<div></div>"),
                $optionsBorder = $("<div></div>"),
                $ul = $("<ul></ul>"),
                $scrollBar = $("<div></div>"),
                $lists = opt.optionAry,
                isHover = opt.trigger,
                listsHeight = 0;


            //设置样式
            $this.css(opt.outer);
            $select.css(opt.select.style); //select
            $optionsWrapper.css(opt.optionsWrapper);
            $optionsBorder.css(opt.optionsBorder);
            $ul.css(opt.options);
            $scrollBar.css(opt.scrollBarStyle);

            $this.append($select,$optionsWrapper);
            $optionsWrapper.append($optionsBorder);
            $optionsBorder.append($ul,$scrollBar);

            //向ul塞入内容

            var liFunction = function (target) {
                target.hover(function () {
                    $(this).css(opt.option.hoverStyle);
                }, function () {
                    $(this).css(opt.option.style);
                }).click(() => {
                    let str = "";
                    str += target.children().html();
                    $select.attr("value",target.attr("value")).html(str);
                });
            };

            $lists.forEach(obj => {
                var _length = 0;
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        _length ++;
                        if(_length ===1){
                            var $li = $("<li></li>").css(opt.option.style).attr("value",obj[key]);
                            listsHeight += parseInt($li.css("height"));
                            liFunction($li);
                        }else if(_length ===2){
                            var $span = $("<span></span>").html(obj[key]).css(opt.liSpan.span1);
                            $li.append($span);
                        }else{
                            $span = $("<span></span>").html(obj[key]).css(opt.liSpan.span2);
                            $li.append($span);
                        }
                    }
                }
                $ul.append($li);
            });

            var showDropdown = function () {
                var ulHeight = $ul.height(),
                    ulTop = parseInt($optionsWrapper.css("paddingTop")),
                    scrollHeight = Math.floor(parseInt(opt.scrollBarStyle.height)*0.7),
                    scrollBlank = parseInt(opt.scrollBarStyle.height)-scrollHeight;
                $scrollBar.height(scrollHeight);
                $ul.scroll( ()=> {
                    let scroTop = $ul.scrollTop(),
                        outlength = listsHeight- ulHeight,
                        outRate = scrollBlank*(scroTop/outlength);
                    $scrollBar.css({
                        top:ulTop+outRate
                    });
                });
            };
            showDropdown();
            //触发select的条件
            if(isHover){
                $select.hover(()=>{
                    $optionsWrapper.show();
                    $optionsBorder.slideDown(400);
                    showDropdown();
                });
            }else{
                $select.click(()=>{
                    $optionsWrapper.show();
                    $optionsBorder.slideDown(400);
                    showDropdown();
                });
            }
            $this.mouseleave(()=>{
                $optionsWrapper.slideUp(300);

            });
            return this;//返回jQuery本身
        };
    };

    if (jQuery === 'undefined') {
        throw new Error("jquery_beautifySelect requires jQuery");
    }
    beautifySelect(jQuery);
})();