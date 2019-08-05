$(function () {
    new Promise(function (resolve, reject) {
        $("#head").load("./html/head.html", "body", function () {
            resolve();
        })
    }).then(function () {
        // 轮播图
        $.ajax({
            url: "./api/index.php",
            data: {
                "type": 0
            },
            dataType: "json",
            success: function (res) {
                var imgUrlArr = [];
                var aUrlArr = [];
                for (var i = 0; i < res.length; i++) {
                    imgUrlArr.push(res[i].imgUrl);
                    aUrlArr.push(res[i].aUrl);
                }
                $(".lunbo").crxCarousel({
                    type: "fade",
                    imgUrl: imgUrlArr,
                    aUrl: aUrlArr,
                    zykey: false,
                    position: "left"
                });
            }
        });
        // 楼层1，滑动更换产品
        function floor1(typeLi) {
            var typeC = typeLi || "本周特价";
            $.ajax({
                url: "./api/index1.php",
                data: {
                    "typeC": typeC
                },
                dataType: "json",
                success: function (res) {
                    $(".floor1_s").html("").html(`
                        <div class="floor1_s1">
                            <a href="javascript:;" data-id="${res[0].gid}">
                                <img src="${res[0].imgUrl1}" alt="">
                            </a>
                            <a href="javascript:;" data-id="${res[0].gid}">
                                ${res[0].desc1}
                            </a>
                            <p>${res[0].other}</p>
                            <div>
                                ￥${res[0].price1}
                                <span>(${res[0].count})</span>
                            </div>
                        </div>
                        <div class="floor1_s2">
                            <div class="floor1_s2_t clearfix">
                                <div class="floor1_s2_t1 fl">
                                    <a href="javascript:;" data-id="${res[1].gid}">
                                        <img src="${res[1].imgUrl1}" alt="">
                                    </a>
                                    <a href="javascript:;" data-id="${res[1].gid}">
                                        ${res[1].desc1}
                                    </a>
                                    <div>
                                        ￥${res[1].price1}
                                        <span>(${res[1].count})</span>
                                    </div>
                                </div>
                                <div class="floor1_s2_t2 fl">
                                    <a href="javascript:;" data-id="${res[2].gid}">
                                        ${res[2].desc1}
                                    </a>
                                    <div>
                                        ￥${res[2].price1}
                                        <span>(${res[2].count})</span>
                                    </div>
                                    <a href="javascript:;" data-id="${res[2].gid}">
                                        <img src="${res[2].imgUrl1}" alt="">
                                    </a>
                                </div>

                            </div>
                            <div class="floor1_s2_b clearfix">
                                <a href="javascript:;" data-id="${res[3].gid}">
                                    <img src="${res[3].imgUrl1}" alt="">
                                </a>
                                <div>
                                    <a href="javascript:;" data-id="${res[3].gid}">
                                        ${res[3].desc1}
                                    </a>
                                    <p>${res[3].other}</p>
                                    <div>
                                        ￥${res[3].price1}
                                        <span>(${res[3].count})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="floor1_s3">
                            <a href="javascript:;" data-id="${res[4].gid}">
                                ${res[4].desc1}
                            </a>
                            <p>${res[4].other}</p>
                            <div>
                                ￥${res[4].price1}
                                <span>(${res[4].count})</span>
                            </div>
                            <a href="javascript:;" data-id="${res[4].gid}">
                                <img src="${res[4].imgUrl1}" alt="">
                            </a>
                        </div>
                        <div class="floor1_s4">
                            <div class="floor1_s4_t">
                                <a href="javascript:;" data-id="${res[5].gid}">
                                    <img src="${res[5].imgUrl1}" alt="">
                                </a>
                                <a href="javascript:;" data-id="${res[5].gid}">
                                    ${res[5].desc1}
                                </a>
                                <div>
                                    ￥${res[5].price1}
                                    <span>(${res[5].count})</span>
                                </div>
                            </div>
                            <div class="floor1_s4_b">
                                <a href="javascript:;" data-id="${res[6].gid}">
                                    <img src="${res[6].imgUrl1}" alt="">
                                </a>
                                <a href="javascript:;" data-id="${res[6].gid}">
                                    ${res[6].desc1}
                                </a>
                                <div>
                                    ￥${res[6].price1}
                                    <span>(${res[6].count})</span>
                                </div>
                            </div>
                        </div>
                    `);
                    $(".floor1_s").find("a").click(function () {
                        location.href = "./html/more.html?id=" + $(this).attr("data-id");
                    })
                }
            });
        }
        floor1();
        $(".floor1_t").children().mouseenter(function () {
            $(".floor1_t").children().removeClass("color");
            $(this).addClass("color");
            floor1($(this).text());
        })
        // 楼层2,渲染皮肤数据
        function floor3(obj) {
            var divB = obj.ele;
            $.ajax({
                url: "./api/index2.php",
                data: {
                    "typeC": obj.type
                },
                dataType: "json",
                success: function (res) {
                    divB.html("");
                    var $h2 = $("<h2>");
                    $h2.appendTo(divB).html(`
                        <p>${obj.title}</p>
                        <ul class="fr"></ul>
                    `).addClass("clearfix");
                    var $ul1 = $h2.children("ul");
                    for (var i = 0; i < obj.list.length; i++) {
                        var newLi = $("<li>");
                        newLi.appendTo($ul1).html(`
                            <a href="javascript:;">${obj.list[i]}</a>
                        `)
                    }
                    var $divR = $("<div>");
                    $divR.appendTo(divB).addClass("render clearfix").html(`
                        <img src="${obj.url}" alt="">
                        <div class="render1 fl">
                            <div class="render1_t clearfix">
                                <div class="render1_t1 fl clearfix">
                                    <a href="javascript:;" data-id="${res[0].gid}">
                                        <img src="${res[0].imgUrl1}"
                                            alt="">
                                    </a>
                                    <div class="fl">
                                        <a href="javascript:;" data-id="${res[0].gid}">
                                            ${res[0].desc1}
                                        </a>
                                        <p>${res[0].other}</p>
                                        <div>
                                            ￥${res[0].price1}<span>(${res[0].count})</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="render1_t2 fl clearfix">
                                    <a href="javascript:;" data-id="${res[1].gid}">
                                        <img src="${res[1].imgUrl1}"
                                            alt="">
                                    </a>
                                    <div class="fl">
                                        <a href="javascript:;" data-id="${res[1].gid}">
                                            ${res[1].desc1}
                                        </a>
                                        <p>${res[1].other}</p>
                                        <div>
                                            ￥${res[1].price1}<span>(${res[1].count})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="render1_b clearfix">
                                <div class="render1_b1 fl">
                                    <a href="javascript:;" data-id="${res[2].gid}">
                                        ${res[2].desc1}
                                    </a>
                                    <p>${res[2].other}</p>
                                    <div>
                                        ￥${res[2].price1}<span>(${res[2].count})</span>
                                    </div>
                                    <a href="javascript:;" data-id="${res[2].gid}">
                                        <img src="${res[2].imgUrl1}"
                                            alt="">
                                    </a>
                                </div>
                                <div class="render1_b2 fl">
                                    <a href="javascript:;" data-id="${res[3].gid}">
                                        ${res[3].desc1}
                                    </a>
                                    <p>${res[3].other}</p>
                                    <div>
                                        ￥${res[3].price1}<span>(${res[3].count})</span>
                                    </div>
                                    <a href="javascript:;" data-id="${res[3].gid}">
                                        <img src="${res[3].imgUrl1}"
                                            alt="">
                                    </a>
                                </div>
                                <div class="render1_b3 fl">
                                    <a href="javascript:;" data-id="${res[4].gid}">
                                        ${res[4].desc1}
                                    </a>
                                    <p>${res[4].other}</p>
                                    <div>
                                        ￥${res[4].price1}<span>(${res[4].count})</span>
                                    </div>
                                    <a href="javascript:;" data-id="${res[4].gid}">
                                        <img src="${res[4].imgUrl1}"
                                            alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="render2 fr">
                            <h3>${obj.type}热销</h3>
                            <div>
                                <div class="clearfix">
                                    <a href="javascript:;" data-id="${res[5].gid}">
                                        <img src="${res[5].imgUrl1}"
                                            alt="">
                                    </a>
                                    <a href="javascript:;" data-id="${res[5].gid}">
                                        ${res[5].desc1}
                                    </a>
                                    <div>
                                        ￥${res[5].price1}
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <span class="fl">2</span>
                                    <p>${res[6].desc1}</p>
                                </div>
                                <div class="clearfix">
                                    <span class="fl">3</span>
                                    <p>${res[7].desc1}</p>
                                </div>
                                <div class="clearfix">
                                    <span class="fl">4</span>
                                    <p>${res[8].desc1}</p>
                                </div>
                                <div class="clearfix">
                                    <span class="fl">5</span>
                                    <p>${res[9].desc1}</p>
                                </div>
                                <div class="clearfix">
                                    <span class="fl">6</span>
                                    <p>${res[10].desc1}</p>
                                </div>
                            </div>
                        </div>
                    `);
                    var $divs = $divR.find(".render2>div>div");
                    $divs.mouseenter(function () {
                        var $index = $(this).index();
                        for (let i = 0; i < 6; i++) {
                            if (i == $index) {
                                $divs.eq(i).html(`
                                    <a href="javascript:;" data-id="${res[i+5].gid}">
                                        <img src="${res[i+5].imgUrl1}"
                                            alt="">
                                    </a>
                                    <a href="javascript:;" data-id="${res[i+5].gid}">
                                        ${res[i+5].desc1}
                                    </a>
                                    <div>
                                        ￥${res[i+5].price1}
                                    </div>
                                `);
                                continue;
                            }
                            $divs.eq(i).html(`
                                <span class="fl">${i+1}</span>
                                <p>${res[i+5].desc1}</p>
                            `)
                        }
                        $divs.find("a").click(function () {
                            location.href = "./html/more.html?id=" + $(this).attr("data-id");
                        })
                    })
                    var $as = divB.find(".render a");
                    $as.click(function () {
                        location.href = "./html/more.html?id=" + $(this).attr("data-id");
                    })
                }
            });
        }
        floor3({
            ele: $(".floor3"),
            type: "护肤",
            title: "护肤<strong>SKIN CARE</strong>",
            list: ["倩碧三步曲", "小黑瓶", "卸妆油", "补水保湿", "保湿面膜", "小棕瓶", "红石榴"],
            url: "http://photo.no5.com.cn/page_2014_images/19061214445593240333.jpg"
        });
        // 楼层3彩妆渲染
        floor3({
            ele: $(".floor4"),
            type: "彩妆",
            title: "彩妆<strong>MAKE UP</strong>",
            list: ["气垫BB霜", "粉饼", "指甲油", "睫毛膏", "眼影", "口红", "迪奥"],
            url: "http://photo.no5.com.cn/page_2014_images/19061214451781703315.jpg"
        });
        // 楼层4香水渲染
        floor3({
            ele: $(".floor5"),
            type: "香水",
            title: "香水<strong>PERFUME</strong>",
            list: ["Dior", "香奈儿", "女士香水", "男士香水", "套装", "Q版"],
            url: "http://photo.no5.com.cn/page_2014_images/17060514304584697090.jpg"
        });
        // 渲染品牌图标
        function renderBrand(obj) {
            var ele = obj.ele;
            $.ajax({
                url: "./api/index3.php",
                data: {
                    typeId: obj.typeId
                },
                dataType: "json",
                success: function (res) {
                    for (var i = 0; i < res.length; i++) {
                        var newA = $("<a>");
                        newA.attr("href", "javascript:;").appendTo(ele)
                            .html(`
                                <img src="${res[i].imgUrl}" alt="">
                        `);
                    }
                }
            });
        }
        renderBrand({
            ele: $(".floor3-b"),
            typeId: 0
        });
        renderBrand({
            ele: $(".floor4-b"),
            typeId: 1
        });
        renderBrand({
            ele: $(".floor5-b"),
            typeId: 2
        });
        renderBrand({
            ele: $(".floor6-b"),
            typeId: 3
        });
        renderBrand({
            ele: $(".floor7-b"),
            typeId: 4
        });
        // 楼层5，男士用品数据渲染
        function floorRender(obj) {
            var $parent = obj.ele;
            $.ajax({
                url: "./api/index2.php",
                data: {
                    typeC: obj.type
                },
                dataType: "json",
                success: function (res) {
                    $parent.html("");
                    var $h22 = $("<h2>");
                    $h22.appendTo($parent).addClass("clearfix").html(`
                        <span>${obj.title}</span>
                        <ul class="fr clearfix"></ul>
                    `)
                    var ul2 = $h22.children("ul");
                    for (var i = 0; i < obj.list.length; i++) {
                        var newLi = $("<li>");
                        newLi.appendTo(ul2).html(`
                            <a href="javascript:;">${obj.list[i]}</a>
                        `)
                    }
                    var $f3Render = $("<div>");
                    $f3Render.appendTo($parent).addClass("clearfix f3Render");
                    var $f3Render1 = $("<div>");
                    $f3Render1.appendTo($f3Render).addClass("f3Render1 fl clearfix");
                    for (var i = 0; i < 6; i++) {
                        var newDiv = $("<div>");
                        newDiv.appendTo($f3Render1).html(`
                            <a href="javascript:;" data-id="${res[i].gid}">
                                <img src="${res[i].imgUrl1}"
                                    alt="">
                            </a>
                            <a href="javascript:;" data-id="${res[i].gid}">
                                ${res[i].desc1}
                            </a>
                            <div>
                                ￥${res[i].price1}<span>(${res[i].count})</span>
                            </div>
                        `)
                    }
                    var $img = $("<img>");
                    $img.appendTo($f3Render).prop("src", obj.url);
                    var $f3Render2 = $("<div>");
                    $f3Render2.appendTo($f3Render).html(`
                        <h3>${obj.type}热销</h3>
                        <ul></ul>
                    `).addClass("f3Render2 fr clearfix");
                    var $ul2 = $f3Render2.children("ul");
                    for (var i = 0; i < 6; i++) {
                        var newLi = $("<li>");
                        if (i == 0) {
                            newLi.appendTo($ul2).html(`
                                <a href="javascript:;" data-id="${res[i+6].gid}">
                                    <img src="${res[i+6].imgUrl1}"
                                        alt="">
                                </a>
                                <a href="javascript:;" data-id="${res[i+6].gid}">
                                    ${res[i+6].desc1}
                                </a>
                                <div>
                                    ￥${res[i+6].price1}
                                </div>
                            `);
                            continue;
                        }
                        newLi.appendTo($ul2).html(`
                            <span>${i+1}</span>
                            <p>${res[i+6].desc1}</p>
                        `)
                    }
                    var $lis = $ul2.children("li");
                    $lis.mouseenter(function () {
                        var $index2 = $(this).index();
                        for (var i = 0; i < 6; i++) {
                            if (i == $index2) {
                                $lis.eq(i).html(`
                                    <a href="javascript:;" data-id="${res[i+6].gid}">
                                    <img src="${res[i+6].imgUrl1}"
                                        alt="">
                                    </a>
                                    <a href="javascript:;" data-id="${res[i+6].gid}">
                                        ${res[i+6].desc1}
                                    </a>
                                    <div>
                                        ￥${res[i+6].price1}
                                    </div>
                                `)
                                continue;
                            }
                            $lis.eq(i).html(`
                                <span>${i+1}</span>
                                <p>${res[i+6].desc1}</p>
                            `)
                        }
                        $lis.find("a").click(function () {
                            location.href = "./html/more.html?id=" + $(this).attr("data-id");
                        })
                    })
                    var $as2 = $f3Render.find("a");
                    $as2.click(function () {
                        location.href = "./html/more.html?id=" + $(this).attr("data-id");
                    })

                }
            });
        }
        floorRender({
            ele: $(".floor6"),
            type: "男士",
            list: ["剃须", "碧欧泉男士", "控油祛痘", "洁面膏", "Zippo", "瑞士军刀"],
            title: "男士<strong>MEN`S</strong>",
            url: "http://photo.no5.com.cn/page_2014_images/14080813135583528419.jpg"
        });
        // 楼层6，美体美发数据渲染
        floorRender({
            ele: $(".floor7"),
            type: "美体美发",
            title: "美体美发<strong>BODY&HAIR</strong>",
            list: ["护手霜", "洗发护发", "丰胸", "润体乳", "防脱发", "沐浴", "染发"],
            url: "http://photo.no5.com.cn/page_2014_images/16021416594389025703.jpg"
        });

        // 美容资讯数据渲染
        $.ajax({
            url: "./api/index4.php",
            dataType: "json",
            success: function (res) {
                var $parent = $(".floor8_l");
                $parent.html(`
                    <h2>美容资讯</h2>
                    <div class="clearfix">
                        <div class="fl">
                            <img src="${res.url}" alt="">
                            <h3>${res.title}</h3>
                            <p>${res.content}</p>
                        </div>
                        <div class="fr">
                        </div>
                    </div>
                `);
                var $rcon = $(".floor8_l>div>div.fr");
                for (var i = 0; i < res.list.length; i++) {
                    var newDiv = $("<div>");
                    newDiv.appendTo($rcon).addClass("clearfix");
                    newDiv.html(`
                        <img src="${res.list[i].url}" alt="">
                        <div class="fr">
                            <h3><strong>${res.list[i].span}</strong>${res.list[i].title}</h3>
                            <p>${res.list[i].content}</p>
                        </div>
                    `)
                }
            }
        });

        // 编辑推荐数据渲染
        $.ajax({
            url: "./api/index2.php",
            data: {
                typeC: "编辑推荐"
            },
            dataType: "json",
            success: function (res) {
                var $tjDiv = $(".floor8_r");
                $tjDiv.html("").html(`
                    <h2>编辑推荐</h2>
                    <ul></ul>
                `);
                var newUl = $tjDiv.children("ul");
                for (var i = 0; i < res.length; i++) {
                    var newLi = $("<li>");
                    newLi.appendTo(newUl).addClass("clearfix").html(`
                        <div class="fl">
                            <a href="javascript:;" data-id="${res[i].gid}">
                                ${res[i].desc1}
                            </a>
                            <div>
                                <strong>编辑推荐：</strong>${res[i].desc2}
                            </div>
                        </div>
                        <a href="javascript:;" data-id="${res[i].gid}">
                            <img src="${res[i].imgUrl1}"
                                alt="">
                        </a>
                    `);
                }
                var $as3 = newUl.find("a");
                $as3.click(function () {
                    var $index3 = $(this).attr("data-id");
                    location.href = "./html/more.html?id=" + $index3;
                })
            }
        });
    })
})