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

                    }
                });
            })
        })



    })
})