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
})