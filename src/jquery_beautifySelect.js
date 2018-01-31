(function () {
    var beautifySelect = function ($) {
        $.fn.beautifySelect = function (options) {

            //默认样式
            var opt = {
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
                        border: "1px solid #CCC"
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
                    display: "none",
                    paddingTop:"50px",
                    overflow:"hidden",
                    zIndex:-99
                },
                optionsBorder:{
                    maxHeight: "200px",
                    width: "198",
                    border: "1px solid #E0E2E4",
                    overflow:"hidden"
                },
                options:{
                    maxHeight: "220px",
                    width: "218px",
                    overflowY: "scroll",
                    overflowX: "scroll",

                },
                option: {
                    style: {
                        height: "36px",
                        lineHeight: "36px",
                        fontSize: "16px",
                        backgroundColor: "#fff",
                        listStyle: "none",
                        textAlign:"center",
                        cursor:"pointer"
                    },
                    hoverStyle: {
                        backgroundColor: "#F1F2F4"
                    },
                    focusStyle: {}
                },
                triangle: {
                    style: {},
                    hoverStyle: {},
                    focusStyle: {}
                },
                resultShowStyle: {
                    display: "inline-block",
                    width: "100%",
                    height: "100%"
                }
            };

            var hideStyle = {
                height:"0",
                transition:"all 5s",
                display:"none"
            };

            //默认样式与输入样式合并
           opt = $.extend(true,{},opt,options);
            let $this = $(this),//获取目标
                $select = $("<div></div>"),
                $optionsWrapper = $("<div></div>"),
                $optionsBorder = $("<div></div>"),
                $ul = $("<ul></ul>"),
                $lists = opt.optionAry,
                isOpen=false,
                isHover = opt.trigger,
                $scrollBar = $("<div></div>")
            ;

            let scrollBarStyle = {
                position:"absolute",
                top:"50px",
                right:"0",
                height:"200px",
                width:"6px",
                backgroundColor:"#eff1f3",
                borderRadius:"100px",

            };

            $optionsBorder.append($scrollBar);

            //获取border的宽度


            //设置样式
            $this.css({
                display: "inline-block",
                position:"relative"
            });
            $select.css(opt.select.style); //select
            $this.append($select,$optionsWrapper);
            $optionsWrapper.append($optionsBorder);
            $optionsBorder.append($ul);
            $ul.css(opt.options);
            $optionsWrapper.css(opt.optionsWrapper);
            $optionsBorder.css(opt.optionsBorder);

            if(isHover){
                $select.hover(()=>{
                    $ul.slideDown(200);
                    $optionsWrapper.show();

                    var outHeight = $optionsBorder.height();
                    var innnerHeight = $ul.height();
                    var diffrence = innnerHeight- outHeight;
                    scrollBarStyle.height = parseInt(scrollBarStyle.height) - diffrence;
                    $scrollBar.css(scrollBarStyle);





                });
            }else{
                $select.click(()=>{
                    $ul.slideDown(200);
                    $optionsWrapper.show();
                });
            }

            $ul.scroll( ()=> {
                let xxx = $ul.scrollTop();

                $scrollBar.css({
                    top:50+xxx
                });

            });


            $lists.forEach(item => {
                var $li = $("<li></li>").html(item).css(opt.option.style);
                $li.hover(function () {
                    $(this).css(opt.option.hoverStyle);
                }, function () {
                    $(this).css(opt.option.style);
                }).click(() => {
                    $select.html(item);
                    $optionsWrapper.hide();
                });
                $ul.append($li);
            });
            $optionsWrapper.mouseenter(()=>{

            }).mouseleave(()=>{
                $ul.slideUp(200);
            });






            return this;//返回jQuery本身
        };
    };

    if (jQuery === 'undefined') {
        throw new Error("jquery_beautifySelect requires jQuery");
    }
    beautifySelect(jQuery);
})();