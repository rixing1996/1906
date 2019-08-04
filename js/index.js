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
        $(".floor1_t").children().mouseenter(function(){
            $(".floor1_t").children().removeClass("color");
            $(this).addClass("color");
            floor1($(this).text());
        })
    })
})