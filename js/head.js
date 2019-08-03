$(function () {
    // Cookie.setCookie("phone","18814233102");
    var cookie = Cookie.getCookie("phone");
    // 左边的登陆注册区域
    var $span = $(".myOwn_c>div.fl>span");
    if (cookie) {
        $span.html(`
                用户${cookie}
                <button>退出</button>
        `);
    } else {
        $span.html(`
                <a href="javascript:;">[登录]</a>
                <a href="javascript:;">[免费注册]</a>
        `);
    }
    // 退出登录
    $span.children("button").click(function () {
        Cookie.removeCookie("phone");
        location.href = location.href;
    });
    // 登录注册跳转
    $span.children("a").eq(0).click(function () {
        location.href = "http://127.0.0.1:1906/test2second/Projects/1906/html/register.html";
    })
    $span.children("a").eq(1).click(function () {
        location.href = "http://127.0.0.1:1906/test2second/Projects/1906/html/login.html";
    })
    // 点击logo跳转到主页
    $(".logo_img>a").click(function () {
        location.href = "http://127.0.0.1:1906/test2second/Projects/1906/index.html";
    })
    // 购物车部分
    function buyList() {
        if (cookie) {
            $.ajax({
                url: "http://127.0.0.1:1906/test2second/Projects/1906/api/buyList.php",
                data: {
                    phone: cookie
                },
                dataType: "json",
                success: function (res) {
                    if (res) {
                        var num = 0;
                        for (var i = 0; i < res.length; i++) {
                            if (i < 3) {
                                num += Number(res[i].num);
                                var newLi = $("<li>");
                                newLi.addClass("clearfix").attr("data-id", res[i].gid)
                                    .html(`
                                    <a href="javascript:;">
                                        <img src="${res[i].url}"
                                            alt="">
                                    </a>
                                    <a href="javascript:;">
                                        ${res[i].desc}
                                    </a>
                                `).appendTo(".buy_list");
                            }
                        }
                        $(".buy strong").text(num);
                        var $as = $(".buy_list>li>a");
                        $as.click(function () {
                            var id = $(this).parent().attr("data-id");
                            location.href = "http://127.0.0.1:1906/test2second/Projects/1906/html/more.html?id=" + id;
                        })
                    }
                }
            });
            $(".buy_more>div").click(function () {
                location.href = "http://127.0.0.1:1906/test2second/Projects/1906/html/gouwuche.html";
            })
        } else {
            $(".buy_more>div").click(function () {
                location.href = "http://127.0.0.1:1906/test2second/Projects/1906/html/register.html";
            })
        }
    }
    buyList();
    // 选项卡渲染数据
    class SelectRender {
        constructor() {
            this.ul = $(".nav_ul1");
            // 获取导航数据
            var self = this;
            $.ajax({
                url: "http://127.0.0.1:1906/test2second/Projects/1906/api/selectRebder.php",
                dataType: "json",
                success: function (res) {
                    // 创建大的li
                    for (var i = 0; i < res.length; i++) {
                        var newLi = $("<li>");
                        newLi.appendTo(self.ul);
                        self.createA(newLi, res, i);
                    }
                    self.clickA();
                }
            });
        }
        // 创建大li下面的元素
        createA(li, res, i) {
            var self = this;
            li.html(`
                <h3>
                    ${res[i].type}
                    <span>></span>
                </h3>
                <div class="alist1">
                </div>
                <div class="nav_div2 clearfix">
                </div>
            `);
            var $alist1 = li.children(".alist1");
            var $nav_div2 = li.children(".nav_div2");
            var arr = res[i].types;
            for (var j = 0; j < arr.length; j++) {
                var newA = $("<a>");
                newA.appendTo($alist1).attr("href", "javascript:;")
                    .text(arr[j]);
            }
            self.createB($nav_div2, res, i);
        }
        // 创建隐藏div下面的元素
        createB(div, res, i) {
            var self = this;
            div.html(`
                <ul></ul>
                <div></div>
            `);
            var $ul1 = div.children("ul");
            var arr1 = res[i].list;
            for (var j = 0; j < arr1.length; j++) {
                var newLi = $("<li>");
                newLi.appendTo($ul1).html(`
                    <span>${arr1[j].title}</span>
                    <div class="clearfix"></div>
                `).addClass("clearfix");
                var adiv = newLi.children("div.clearfix");
                var arr2 = arr1[j].more;
                for (var k = 0; k < arr2.length; k++) {
                    var newA = $("<a>");
                    newA.appendTo(adiv).attr("href", "javascript:;")
                        .text(arr2[k]);
                }
            }
            var $div = div.children("div");
            $div.html(`
                <h4>推荐品牌</h4>
                <ul class="clearfix"></ul>
                <img src="${res[i].url}" alt="">
            `);
            var $ul2 = $div.children("ul.clearfix");
            var arr3 = res[i].brand;
            for(var j=0;j<arr3.length;j++){
                var newLi = $("<li>");
                newLi.appendTo($ul2).html(`
                    <a href="javascript:;">${arr3[j]}</a>
                `);
            }
        }
        // 给a标签添加点击事件
        clickA(){
            var as = $(".nav_ul1 a");
            as.click(function(){
                var typeId = $(this).text();
                location.href = "http://127.0.0.1:1906/test2second/Projects/1906/html/list.html?"+typeId;
            }) 
        }
    }
    new SelectRender();
})