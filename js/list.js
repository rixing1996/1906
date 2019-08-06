$(function () {
    new Promise(function (resolve, reject) {
        $("#head").load("./head.html", "body", function () {
            resolve();
        })
    }).then(function () {
        var localUrl = decodeURIComponent(location.href);
        var type = localUrl.split("?")[1];
        new Promise(function (resolve, reject) {
            // 下拉菜单
            $.ajax({
                url: "../api/list.php",
                dataType: "json",
                success: function (res) {
                    var $content_l = $(".content_l");
                    for (let i = 0; i < res.length; i++) {
                        var newDiv = $("<div>");
                        newDiv.addClass("down").appendTo($content_l)
                            .html(`
                        <h3>
                            <span>+</span>
                            ${res[i].title}
                        </h3>
                        <ul></ul>
                    `);
                        var $ul = newDiv.children("ul");
                        for (let j = 0; j < res[i].list.length; j++) {
                            var newLi = $(`<li>${res[i].list[j]}</li>`);
                            newLi.appendTo($ul);
                        }
                    }
                    var $h3 = $content_l.find(".down>h3");
                    $h3.click(function () {
                        var $type = $(this).children("span");
                        if ($type.text() == "+") {
                            $type.text("-");
                        } else {
                            $type.text("+");
                        }
                        $(this).next().toggle();
                    })
                }
            });
            resolve();
        }).then(function () {
            // 一周销量排行榜
            new Promise(function (resolve, reject) {
                $.ajax({
                    url: "../api/list1.php",
                    data: {
                        type: type
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res.length >= 3) {
                            var $parent = $(".content_l");
                            var newDiv2 = $("<div>");
                            newDiv2.appendTo($parent).addClass("rank").html(`
                                <h3>一周销量排行榜</h3>
                            `);
                            for (var i = 0; i < 3; i++) {
                                var newDiv3 = $("<div>");
                                newDiv3.appendTo(newDiv2).html(`
                                    <a href="javascript:;" data-id="${res[i].gid}">
                                        <img src="${res[i].imgUrl1}"
                                            alt="">
                                    </a>
                                    <a href="javascript:;" data-id="${res[i].gid}">${res[i].desc1}</a>
                                    <div>￥${res[i].price1}</div>
                                `)
                            }
                            newDiv2.find("a").click(function () {
                                var $index = $(this).attr("data-id");
                                location.href = "./more.html?id=" + $index;
                            })
                        }
                        resolve();
                    }
                });
            }).then(function () {
                class listRender {
                    constructor(url) {
                        this.getRes(url);
                    }
                    // =====数据渲染部分=====

                    // 从后台获取数据
                    getRes(url) {
                        var self = this;
                        $.ajax({
                            url: url,
                            data: {
                                type: type
                            },
                            dataType: "json",
                            success: function (res) {
                                $(".sort>span.fr").text(`共${res.length}个商品`);
                                self.res = res;
                                self.page = 0;
                                self.pageNum = Math.ceil(res.length / 20);
                                self.render();
                            }
                        });
                    }
                    // 渲染数据
                    render() {
                        var $ul = $(".spRender");
                        var resArr = this.res.slice(this.page * 20, this.page * 20 + 20);
                        $ul.html("");
                        for (var i = 0; i < resArr.length; i++) {
                            var newLi = $("<li>");
                            newLi.appendTo($ul).attr("data-id", resArr[i].gid).html(`
                                <a href="javascript:;">
                                    <img src="${resArr[i].imgUrl1}"
                                        alt="">
                                </a>
                                <div>
                                    <a href="javascript:;">${resArr[i].desc1}</a>
                                </div>
                                <p>￥${resArr[i].price1}<span>(${resArr[i].count})</span></p>
                                <button class="btnBuy">加入购物车</button>
                                <button>收藏</button>
                            `)
                        }
                        this.clickA($ul);
                        this.clickBtnBuy($ul);
                    }
                    // 点击a标签跳转到详情页
                    clickA(ul) {
                        var self = this;
                        var $as = ul.find("a");
                        $as.click(function () {
                            var id = $(this).parents("li").attr("data-id");
                            location.href = "./more.html?id=" + id;
                        })
                    }
                    // 加入购物车功能
                    clickBtnBuy(ul) {
                        var self = this;
                        var $btn = ul.find(".btnBuy");
                        $btn.click(function () {
                            var cookie = Cookie.getCookie("phone");
                            if (!cookie) {
                                location.href = "./register.html";
                            } else {
                                var id = $(this).parents("li").attr("data-id");
                                $.ajax({
                                    url: "../api/get1mysql.php",
                                    data: {
                                        gid: id
                                    },
                                    dataType: "json",
                                    success: function (res) {
                                        $.ajax({
                                            url: "../api/insertGouwuche.php",
                                            data: {
                                                phone: cookie,
                                                gid: id,
                                                url: res.imgUrl1,
                                                desc: res.desc1,
                                                price1: res.price1,
                                                price2: res.price3
                                            },
                                            success: function (res1) {
                                                console.log(res1);
                                            }
                                        });
                                    }
                                });

                            }
                        })
                    }
                }
                new listRender("../api/list1.php");
            })
        })



    })
})