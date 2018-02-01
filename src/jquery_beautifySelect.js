(function () {
    var beautifySelect = function ($) {

        $.fn.beautifySelect = function (options) {

            //默认样式
            var opt = {
                outer: {
                    display: "inline-block",
                    position: "relative",
                    boxSizing: "border-box"
                },
                select: {
                    style: {
                        display: "inline-block",
                        position: "relative",
                        width: "200px",
                        height: "40px",
                        lineHeight: "40px",
                        border: "1px solid #E0E2E4",
                        background: "#FFFFFF",
                        borderRadius: "3px",
                        cursor: "pointer",
                        textAlign: "center",
                        zIndex: 999
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
                    paddingTop: "50px",
                    zIndex: -99,
                    display: "none"
                },
                optionsBorder: {
                    maxHeight: "204px",
                    width: "200",
                    border: "1px solid #E0E2E4",
                    boxSizing: "border-box",
                    overflow: "hidden"
                },
                options: { //ul 的样式
                    maxHeight: "220px",
                    width: "218px",
                    overflowY: "scroll",
                    overflowX: "hidden",

                },
                option: { //li
                    style: {
                        height: "36px",
                        lineHeight: "36px",
                        fontSize: "16px",
                        color: "#333",
                        backgroundColor: "#fff",
                        listStyle: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        paddingLeft: "15px"
                    },
                    hoverStyle: {
                        backgroundColor: "#F1F2F4"
                    },
                    focusStyle: {}
                },
                scrollBarStyle: {
                    position: "absolute",
                    top: "50px",
                    right: "0",
                    height: "200px",
                    width: "6px",
                    backgroundColor: "#eff1f3",
                    borderRadius: "100px",
                },
                triangle: {
                    style: {
                        display: "block",
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        width: "0",
                        height: "0",
                        border: "6px solid transparent",
                        borderTopColor: "#999999",
                        zIndex:99999999999
                    },
                    animateEnterStyle: {
                        transform: "rotate(180deg)",
                        transition: "all 0.3s",
                        transformOrigin: "50% 20%"
                    },
                    animateLeaveStyle: {
                        transform: "rotate(0deg)",
                        transition: "all 0.3s",
                        transformOrigin: "50% 20%"
                    },
                    hoverStyle: {},
                    focusStyle: {}
                },
                liSpan: {
                    span1: {
                        style: {
                            display: "inline-block",
                            height: "100%",
                            width: "40%",
                            color: "#333",
                            fontSize: "16px"
                        },
                        hoverStyle: {
                            color: "#868686"
                        }
                    },
                    span2: {
                        style: {
                            display: "inline-block",
                            height: "100%",
                            width: "50%",
                            textAlign: "right",
                            color: "#333",
                            fontSize: "12px"
                        },
                        hoverStyle: {
                            color: "#868686"
                        }
                    }
                },
                defaultVal: "请选择"
            };

            //合并数据
            opt = $.extend(true, {}, opt, options); //和外部输入样式合并




            this.each(function () {

                //设置结构
                let $this = $(this),//获取目标
                    $select = $("<div></div>"),//
                    $optionsWrapper = $("<div></div>"),
                    $optionsBorder = $("<div></div>"),
                    $ul = $("<ul></ul>"),
                    $scrollBar = $("<div></div>"),
                    $triangle = $("<i></i>"),
                    $lists = opt.optionAry,
                    isHover = opt.trigger,
                    listsHeight = 0;


                //设置样式
                $this.css(opt.outer);
                $select.css(opt.select.style).html(opt.defaultVal); //select
                $optionsWrapper.css(opt.optionsWrapper);
                $optionsBorder.css(opt.optionsBorder);
                $ul.css(opt.options);
                $triangle.css(opt.triangle.style);
                $scrollBar.css(opt.scrollBarStyle);

                $this.append($select, $optionsWrapper,$triangle);
                $optionsWrapper.append($optionsBorder);
                $optionsBorder.append($ul, $scrollBar);

                var setSpanStyle = function ($li, type) { //为了li里面能放两个内容,所以要分别对li子元素的span进行设置
                    let children = $li.children(),
                        isHover = type === 'hover';
                    for (let i = 0; i < children.length; i++) {
                        if (i === 0) {
                            isHover ?
                                $(children[i]).css(opt.liSpan.span1.hoverStyle) :
                                $(children[i]).css(opt.liSpan.span1.style);
                        } else {
                            isHover ?
                                $(children[i]).css(opt.liSpan.span2.hoverStyle) :
                                $(children[i]).css(opt.liSpan.span2.style);
                        }
                    }
                };
                var liFunction = function (target) { //对下拉列表的li功能做绑定
                    target.hover(function () {
                        $(this).css(opt.option.hoverStyle);
                        setSpanStyle($(this), "hover");
                    }, function () {
                        $(this).css(opt.option.style);
                        setSpanStyle($(this));
                    }).click(() => {
                        let str = "";
                        str += target.children().html();
                        $select.attr("value", target.attr("value")).html(str);
                        $optionsWrapper.slideUp(300);
                        triangleLeave();
                    });
                };

                var showDropdown = function () { //列表下拉函数
                    var ulHeight = $ul.height(),
                        ulTop = parseInt($optionsWrapper.css("paddingTop")),
                        scrollHeight = Math.floor(parseInt(opt.scrollBarStyle.height) * 0.7),
                        scrollBlank = parseInt(opt.scrollBarStyle.height) - scrollHeight,
                        needScollbar = listsHeight-$ul.height();
                    if(needScollbar<=0){
                        $scrollBar.hide();
                        return;
                    }
                    $scrollBar.height(scrollHeight);
                    $ul.scroll(() => { //自定义滚动条滚动
                        let scroTop = $ul.scrollTop(),
                            outlength = listsHeight - ulHeight,
                            outRate = scrollBlank * (scroTop / outlength);
                        $scrollBar.css({
                            top: ulTop + outRate
                        });
                    });

                };

                var triangleEnter = function () {
                    $triangle.css(opt.triangle.animateEnterStyle);
                };
                var triangleLeave = function () {
                    $triangle.css(opt.triangle.animateLeaveStyle);
                };

                //向ul塞入内容
                $lists.forEach(obj => {
                    var _length = 0;
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            _length++;
                            if (_length === 1) {
                                var $li = $("<li></li>").css(opt.option.style).attr("value", obj[key]);
                                listsHeight += parseInt($li.css("height"));
                                liFunction($li);
                            } else if (_length === 2) {
                                var $span = $("<span></span>").html(obj[key]).css(opt.liSpan.span1.style);
                                $li.append($span);
                            } else {
                                $span = $("<span></span>").html(obj[key]).css(opt.liSpan.span2.style);
                                $li.append($span);
                            }
                        }
                    }
                    $ul.append($li);
                });


                showDropdown();
                //触发select的条件
                if (isHover) {
                    $select.hover(() => {
                        $optionsWrapper.show();
                        $optionsBorder.slideDown(400);
                        showDropdown();
                        triangleEnter();
                    });
                } else {
                    $select.click(() => {
                        $optionsWrapper.show();
                        $optionsBorder.slideDown(400);
                        showDropdown();
                        triangleEnter();
                    });
                }
                $this.mouseleave(() => {
                    $optionsWrapper.slideUp(300);
                    triangleLeave();
                });



            });
            return this;//返回jQuery本身
        };
    };

    if (jQuery === 'undefined') {
        throw new Error("jquery_beautifySelect requires jQuery");
    }
    beautifySelect(jQuery);
})();