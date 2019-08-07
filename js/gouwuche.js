$(function () {
    var $addPrice = $(".addPrice");
    var $ul = $(".content>ul");
    var cookie = Cookie.getCookie("phone");
    $.ajax({
        url: "../api/gouwuche1.php",
        data: {
            phone: cookie
        },
        dataType: "json",
        success: function (res) {
            $ul.html("");
            if (res.length == 0) {
                $addPrice.html(`
                    应付商品金额：<span>￥0</span>元
                `)
            } else {
                for (var i = 0; i < res.length; i++) {
                    var newLi = $("<li>");
                    newLi.addClass("clearfix").appendTo($ul).html(`
                        <span class="xuhao fl">${i+1}</span>
                        <a href="javascript:;" class="fl name" data-id="${res[i].gid}">${res[i].desc1}</a>
                        <span class="fl otherPrice">${res[i].price2.slice(1)}</span>
                        <span class="fl ownPrice">${res[i].price1}</span>
                        <input type="text" class="num fl" value="${res[i].num}">
                        <span class="add fl">${res[i].num*res[i].price1}</span>
                        <span class="fl sc">转入收藏夹</span>
                        <button class="fl remove">删除</button>
                    `).attr("data-id", res[i].gid);
                }
            }
            // 封装一个函数，当价格改变的时候，修改总价格
            function allPrice() {
                var dPrices = $ul.find(".add");
                var allprice = 0;
                for (var i = 0; i < dPrices.length; i++) {
                    allprice += Number(dPrices[i].innerText)
                }
                $addPrice.html(`
                    应付商品金额：<span>￥${allprice}</span>元
                `);
            }
            allPrice();
            // 点击商品名称跳转到详情页
            var $as = $ul.find("a");
            $as.click(function () {
                location.href = './more.html?id=' + $(this).attr("data-id");
            })
            // 输入框里的数值变化时修改价格
            var $inputs = $ul.find(".num");
            // 封装一个重复函数
            function repeat(phone, gid, num) {
                if (num) {
                    $.ajax({
                        url: "../api/gouwuche2.php",
                        data: {
                            phone: phone,
                            gid: gid,
                            num: num
                        },
                        success: function (response) {

                        }
                    });
                }
            }
            // 实时监听输入框的值
            $inputs.on("input", function () {
                var $gid = $(this).parents("li").attr("data-id");
                if (!Number($(this).val())) {
                    $(this).val("");
                    $(this).blur(function () {
                        if ($(this).val() == "") {
                            $(this).val("1");
                            $(this).next().text($(this).val() * $(this).prev().text());
                            allPrice();
                            repeat(cookie, $gid, $(this).val());
                        }
                    })
                }
                $(this).next().text($(this).val() * $(this).prev().text());
                allPrice();
                repeat(cookie, $gid, $(this).val());
            })
            // 点击删除的功能
            var $sc = $ul.find("button.remove");
            $sc.click(function () {
                var gid2 = $(this).parents("li").attr("data-id");
                $.ajax({
                    url: "../api/gouwuche3.php",
                    data: {
                        phone: cookie,
                        gid: gid2
                    },
                    success: function (response) {
                        location.href = "./gouwuche.html";
                    }
                });
            })
            // 购物车清空
            var qkBtn = $(".qs>a").eq(1);
            qkBtn.click(function () {
                $.ajax({
                    url: "../api/gouwuche4.php",
                    data: {
                        phone: cookie
                    },
                    success: function (response) {
                        location.href = "./gouwuche.html";
                    }
                });
            })
        }
    });
})