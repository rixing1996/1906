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
            
        }
    });
})