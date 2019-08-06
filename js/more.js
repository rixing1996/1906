$(function () {
    new Promise(function (resolve, reject) {
        $("#head").load("./head.html", "body", function () {
            resolve();
        })
    }).then(function () {
        var gid = location.search.slice(1).split("=")[1];
        $.ajax({
            url: "../api/more1.php",
            data: {
                gid: gid
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                $(".content>h2").text(`${res.desc2}`);
                // 创建小图片
                var urlArr = res.imgUrl2.split(",");
                var $imgs = $(".imgs");
                $imgs.html("");
                for (var i = 0; i < urlArr.length; i++) {
                    var newLi = $("<li>");
                    newLi.appendTo($imgs).html(`
                        <img src="${urlArr[i]}" alt="">
                    `)
                    if (i == 0) {
                        newLi.addClass("color");
                    }
                }
                // 放大区域
                
            }
        });
    })
})