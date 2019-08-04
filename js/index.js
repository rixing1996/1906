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
    })
})