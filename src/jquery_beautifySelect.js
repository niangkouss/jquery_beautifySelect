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
                    overflow:"hidden"
                },
                options:{
                    border: "1px solid #E0E2E4",
                    overflowY: "scroll",
                    maxHeight: "202px"
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
                transition:"all 5s"
            };

            //默认样式与输入样式合并
           opt = $.extend(true,{},opt,options);
            let $this = $(this),//获取目标
                $select = $("<div></div>"),
                $optionsWrapper = $("<div></div>"),
                $ul = $("<ul></ul>"),
                $lists = opt.optionAry,
                isOpen=false,
                isHover = opt.trigger
            ;

            //设置样式
            $this.css({
                display: "inline-block",
                position:"relative"
            });
            $select.css(opt.select.style); //select
            $this.append($select,$optionsWrapper);
            $optionsWrapper.append($ul);
            $ul.css(opt.options);
            $optionsWrapper.css(opt.optionsWrapper);
            $ul.scroll(function () {
                console.log(this);
            });
            if(isHover){
                $select.hover(()=>{
                    $optionsWrapper.show();
                });
            }else{
                $select.click(()=>{
                    $optionsWrapper.show();
                });
            }


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
                $optionsWrapper.css("visibility","hidden");
            });


            return this;//返回jQuery本身
        };
    };

    if (jQuery === 'undefined') {
        throw new Error("jquery_beautifySelect requires jQuery");
    }
    beautifySelect(jQuery);
})();