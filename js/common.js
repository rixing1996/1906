//封装a-b的随机整数，包含a、b
function getRandomNum(a, b) {
    return parseInt(Math.random() * (b - a + 1) + a);
}

//封装一个随机颜色 rgb(0-255,0-255,0-255)
function getRandomColor() {
    var r = getRandomNum(0, 255);
    var g = getRandomNum(0, 255);
    var b = getRandomNum(0, 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

//封装设置、获取、移除cookie
var Cookie = {
    setCookie: function (name, value, data, path) {
        var str = `${name}=${value}`;
        if (data) {
            str += `; expires=${data.toUTCString()}`;
        }
        if (path) {
            str += `; path=${path}`;
        }

        document.cookie = str;
    },
    getCookie: function (name) {
        var cookieArr = document.cookie.split("; ");
        var res = "";
        cookieArr.forEach(function (item) {
            var arr = item.split("=");
            if (arr[0] == name) {
                res = arr[1];
            }
        })
        return res;
    },
    removeCookie: function (name, path) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        this.setCookie(name, "", d, path)
    },
    clearCookie: function (path) {
        var cookieArr = document.cookie.split("; ");
        var arr = [];
        cookieArr.forEach(function (item) {
            var arr2 = item.split("=");
            arr.push(arr2[0]);
        })
        arr.forEach((item) => {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            this.setCookie(item, "", d, path);
        })
    }
}

// 封装一个日期date的n天后日期
function afterDate(date, n) {
    var d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}

// 封装一个放大镜
(function ($) {
    $.fn.crxAmplify = function (url) {
        $(this).html("").css({
            position: "relative",
            cursor: "move"
        })
        var init = () => {
            smallImg();
            sign();
            bigArea();
            magnify();
        }
        //创建一个img，小区域的img
        var smallImg = () => {
            var newImg = $("<img>");
            newImg.appendTo($(this)).css({
                display: "block",
                width: "100%",
                height: "100%"
            }).addClass("cSmallImg").prop("src", url);
        }
        //创建一个遮罩层div,className=sign
        var sign = () => {
            var newDiv = $("<div>");
            newDiv.appendTo($(this)).addClass("sign").css({
                position: "absolute",
                width: $(this).innerWidth() * 0.4,
                height: $(this).innerHeight() * 0.4,
                background: "rgba(254, 77, 251,0.2)",
                top: 0,
                left: 0,
                display: "none"
            })
        }
        //创建右边的放大区域
        var bigArea = () => {
            var newDiv = $("<div>");
            newDiv.appendTo($(this)).css({
                width: $(this).innerWidth() * 0.8,
                height: $(this).innerHeight() * 0.8,
                position: "absolute",
                top: "10px",
                left: $(this).outerWidth() + 5,
                overflow: "hidden",
                display: "none"
            }).addClass("rightBig");
            var newImg = $("<img>");
            newImg.appendTo(newDiv).css({
                display: "block",
                width: $(this).innerWidth() * 2,
                height: $(this).innerHeight() * 2,
                position: "absolute"
            }).prop("src", url);
        }
        //放大功能
        var magnify = () => {
            var $sign = $(this).children(".sign");
            var $img = $(this).children(".rightBig").children("img");
            $(this).mouseenter(() => {
                $sign.show();
                $img.parent().show();
                $(this).mousemove((e) => {
                    var e = e || e.event;
                    var x = e.pageX - $sign.outerWidth() / 2 - $(this)
                        .offset().left;
                    var y = e.pageY - $sign.outerHeight() / 2 - $(this)
                        .offset().top;
                    var max_x = $(this).innerWidth() - $sign
                        .outerWidth();
                    var max_y = $(this).innerHeight() - $sign
                        .outerHeight();
                    if (x > max_x) {
                        x = max_x;
                    }
                    if (x <= 0) {
                        x = 0;
                    }
                    if (y > max_y) {
                        y = max_y;
                    }
                    if (y <= 0) {
                        y = 0;
                    }
                    $sign.css({
                        left: x,
                        top: y
                    })
                    $img.css({
                        left: -x * 2,
                        top: -y * 2
                    })
                })
            }).mouseleave(() => {
                $sign.hide();
                $img.parent().hide();
            })
        }
        init();
        return this;
    }
})(jQuery);

// 封装轮播图
(function ($) {
    $.fn.crxCarousel = function (obj1) {
        var obj0 = {
            type: "horizontal", //有三种类型，水平horizontal(默认)、垂直vertical、淡入淡出fade
            imgUrl: [], //图片的路径,必须要有
            aUrl: [], //a标签的跳转路径,必须要有
            zykey: true, //是否需要左右按键，默认为需要
            page: true, //是否需要页码，默认需要
            position: "center" //页码的位置，默认中间
        }
        var obj = Object.assign({}, obj0, obj1);
        var arr = [obj.imgUrl[0], obj.imgUrl[obj.imgUrl.length - 1], obj.aUrl[0], obj.aUrl[
            obj.aUrl.length - 1]];
        obj.imgUrl.push(arr[0]);
        obj.imgUrl.unshift(arr[1]);
        obj.aUrl.push(arr[2]);
        obj.aUrl.unshift(arr[3]);
        var cIndex = 1; //索引
        var cWidth = $(this).outerWidth(); //轮播区域的宽度
        var cHeight = $(this).outerHeight(); //轮播区域的高度
        var cLength = obj.imgUrl.length; //图片的数量
        var timer; //定义一个定时器
        //初始化，创建ul,li
        var init = () => {
            $(this).css({
                position: "relative",
                overflow: "hidden"
            });
            var newUl = $("<ul></ul>");
            $(this).append(newUl);
            for (var i = 0; i < cLength; i++) {
                var newLi = $("<li></li>");
                $(newUl).append(newLi);
                var newA = $("<a></a>");
                newLi.append(newA);
                newA.prop("href", obj.aUrl[i]);
                var newImg = $("<img>");
                newA.append(newImg);
                newImg.prop("src", obj.imgUrl[i]);
            }
            if (obj.type == "horizontal") {
                newUl.css({
                    position: "absolute",
                    height: cHeight,
                    width: cWidth * cLength,
                    left: -cWidth * cIndex
                }).children().css({
                    width: cWidth,
                    height: cHeight,
                    float: "left"
                }).children().css({
                    display: "block",
                    width: "100%",
                    height: "100%"
                }).children().css({
                    display: "block",
                    width: "100%",
                    height: "100%"
                })
            } else if (obj.type == "vertical") {
                newUl.css({
                    position: "absolute",
                    height: cHeight * cLength,
                    width: cWidth,
                    top: -cHeight * cIndex
                }).children().css({
                    width: cWidth,
                    height: cHeight
                }).children().css({
                    display: "block",
                    width: "100%",
                    height: "100%"
                }).children().css({
                    display: "block",
                    width: "100%",
                    height: "100%"
                })
            } else if (obj.type == "fade") {
                newUl.css({
                    position: "relative",
                    height: cHeight,
                    width: cWidth,
                }).children().css({
                    width: cWidth,
                    height: cHeight,
                    position: "absolute",
                    display: "none"
                }).children().css({
                    display: "block",
                    width: "100%",
                    height: "100%"
                }).children().css({
                    display: "block",
                    width: "100%",
                    height: "100%"
                });
                $(newUl.children()[cIndex]).css("display", "block");
            }
        }
        //创建左右按键
        var zykey = () => {
            var newDiv = $("<div></div>");
            newDiv.appendTo($(this)).css({
                width: "100%",
                height: "10%",
                position: "absolute",
                top: 0.95 * cHeight / 2
            });
            var newSpan1 = $("<span><</span>");
            newSpan1.appendTo(newDiv).css({
                float: "left",
                display: "block",
                height: "100%",
                width: "3.5%",
                background: "rgba(66,66,66,0.6)",
                textAlign: "center",
                color: "white"
            }).css("lineHeight", newSpan1.outerHeight() + "px");
            var newSpan2 = $("<span>></span>");
            newSpan2.appendTo(newDiv).css({
                float: "right",
                display: "block",
                height: "100%",
                width: "3.5%",
                background: "rgba(66,66,66,0.6)",
                textAlign: "center",
                color: "white"
            }).css("lineHeight", newSpan2.outerHeight() + "px");
        }
        //创建页码
        var page = () => {
            var newDiv2 = $("<div></div>");
            newDiv2.appendTo($(this)).css({
                position: "absolute",
                display: "inline-block",
                bottom: "10px"
            });
            for (var i = 0; i < cLength - 2; i++) {
                var newSpan3 = $("<span></span>");
                newSpan3.appendTo(newDiv2).css({
                    float: "left",
                    margin: "0 3px",
                    borderRadius: "50%",
                    background: "grey"
                }).text(i + 1)
            }
            var spans = newDiv2.children();
            $(spans[0]).css("background", "orange");
            if (obj.page) {
                spans.css({
                    width: "30px",
                    height: "30px",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "30px"
                })
            } else {
                spans.css({
                    width: "10px",
                    height: "10px"
                }).text("")
            }
            if (obj.position == "right") {
                newDiv2.css("right", 30)
            } else if (obj.position == "center") {
                newDiv2.css("left", cWidth / 2 - newDiv2.outerWidth() / 2)
            } else if (obj.position == "left") {
                newDiv2.css("left", 30)
            }
        }
        //页码变色
        var pageColor = () => {
            var $spans = $(this).children().last().children();
            $spans.css("background", "grey");
            if (cIndex == cLength - 1 || cIndex == 1) {
                $($spans[0]).css("background", "orange");
            } else if (cIndex == 0 || cIndex == cLength - 2) {
                $($spans[$spans.length - 1]).css("background", "orange");
            } else {
                $($spans[cIndex - 1]).css("background", "orange");
            }
        }
        //上一页的功能
        var prev = () => {
            cIndex--;
            var $ul = $(this).children("ul");
            var $li = $ul.children();
            if (obj.type == "horizontal") {
                $ul.animate({
                    "left": -cWidth * cIndex
                }, 1000);
                if (cIndex == 0) {
                    setTimeout(() => {
                        cIndex = cLength - 2;
                        $ul.css({
                            "left": -cWidth * cIndex
                        });
                    }, 1200)
                }
                pageColor();
            } else if (obj.type == "vertical") {
                $ul.animate({
                    "top": -cHeight * cIndex
                }, 1000);
                if (cIndex == 0) {
                    setTimeout(() => {
                        cIndex = cLength - 2;
                        $ul.css({
                            "top": -cHeight * cIndex
                        });
                    }, 1200)
                }
                pageColor();
            } else if (obj.type == "fade") {
                $li.fadeOut(1000);
                $($li[cIndex]).fadeIn(1000);
                if (cIndex == 0) {
                    cIndex = cLength - 2;
                }
                pageColor();
            }
        }
        //下一页的功能
        var next = () => {
            cIndex++;
            var $ul = $(this).children("ul");
            var $li = $ul.children();
            if (obj.type == "horizontal") {
                $ul.animate({
                    "left": -cWidth * cIndex
                }, 1000);
                if (cIndex == cLength - 1) {
                    setTimeout(() => {
                        cIndex = 1;
                        $ul.css({
                            "left": -cWidth * cIndex
                        });
                    }, 1200)
                }
                pageColor();
            } else if (obj.type == "vertical") {
                $ul.animate({
                    "top": -cHeight * cIndex
                }, 1000);
                if (cIndex == cLength - 1) {
                    setTimeout(() => {
                        cIndex = 1;
                        $ul.css({
                            "top": -cHeight * cIndex
                        });
                    }, 1200)
                }
                pageColor();
            } else if (obj.type == "fade") {
                $li.fadeOut(1000);
                $($li[cIndex]).fadeIn(1000);
                if (cIndex == cLength - 1) {
                    cIndex = 1;
                }
                pageColor();
            }
        }
        //自动轮播
        var auto = () => {
            timer = setInterval(() => {
                next();
            }, 4000)
        }
        init();
        if (obj.zykey) {
            zykey();
        }
        page();
        auto();
        $(this).hover(() => {
            clearInterval(timer);
        }, () => {
            auto();
        });
        var $zkey = $(this).children("div").first().children().first();
        var $ykey = $zkey.next();
        $ykey.click(() => {
            next();
        });
        $zkey.click(() => {
            prev();
        });
        var $pages = $(this).children("div").last().children();
        $pages.mouseenter(function () {
            var cIdx = Array.from($pages).indexOf(this);
            if (cIndex >= cIdx + 1) {
                cIndex = cIdx + 2;
                prev();
            } else {
                cIndex = cIdx;
                next();
            }

        })
        return this;
    }
})(jQuery);

//封装一个随机验证码
class RandomCode {
    constructor(ele) {
        this.ele = ele; //canvas元素
        this.width = ele.offsetWidth; //canvas元素的宽
        this.height = ele.offsetHeight; //canvas元素的高
        this.res = []; //获取随机码返回
        this.draw();
        return this.res;
    }
    // 显示随机码
    draw() {
        this.ctx = this.ele.getContext("2d"); //获取canvas的画图环境
        this.ele.width = this.width; //利用画布宽高重置属性 清除画布内容
        this.ele.height = this.height;
        var code =
            "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9";
        var arrCode = code.split(",");
        var arrLength = arrCode.length;
        for (let i = 0; i < 4; i++) { //控制验证码的位数
            var index = this.randomNum(0, arrLength - 1); //获取随机的索引值
            var rad = this.randomNum(-3, 3) * Math.PI / 180; //获取随机的弧度
            var txt = arrCode[index]; //获取一个随机值
            this.res.push(txt.toLowerCase());
            var x = 10 + i * 10; //随机码在canvas上的x坐标
            var y = 10 + Math.random() * 10; //随机码在canvas上的y坐标
            this.ctx.font = "18px Arial"; //设置随机码的字体大小和类型
            this.ctx.fillStyle = this.randomColor(); //给随机码一个随机颜色
            this.ctx.rotate(rad); //将随机码旋转
            this.ctx.fillText(txt, x, y); //在x，y坐标出画出一个文本，内容为txt
        }
        this.line();
        this.point();
    }
    // 显示线条
    line() {
        for (let i = 0; i < 2; i++) { //控制线条的数量
            this.ctx.strokeStyle = this.randomColor(); //线条的颜色
            this.ctx.beginPath(); //开始画线
            //线条的初始位置
            this.ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
            //线条的结束位置
            this.ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
            this.ctx.stroke(); //画线，连接初始与结束位置
        }
    }
    // 显示小点
    point() {
        for (let i = 0; i < 20; i++) { //控制小点的数量
            this.ctx.strokeStyle = this.randomColor(); //小点的颜色
            this.ctx.beginPath(); //开始画点
            var x = this.randomNum(0, this.width);
            var y = this.randomNum(0, this.height);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + 1, y + 1);
            this.ctx.stroke();
        }
    }
    randomNum(min, max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    }
    randomColor() {
        var r = this.randomNum(0, 255);
        var g = this.randomNum(0, 255);
        var b = this.randomNum(0, 255);
        return `rgb(${r},${g},${b})`;
    }
}