$(function () {
    new Promise(function (resolve, reject) {
        $("#head").load("./head.html", "body", function () {
            resolve();
        })
    }).then(function () {
        var gid = location.search.slice(1).split("=")[1];
        var $type2;
        new Promise(function (resolve, reject) {
            $.ajax({
                url: "../api/more1.php",
                data: {
                    gid: gid
                },
                dataType: "json",
                success: function (res) {
                    $type2 = res.type2;
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
                    var $bigImg = $(".bigImg");
                    $bigImg.crxAmplify(urlArr[0]);
                    // 滑上小图片放大区域更换图片
                    var imgLis = $imgs.children();
                    imgLis.mouseenter(function () {
                        imgLis.removeClass("color");
                        $(this).addClass("color");
                        $bigImg.crxAmplify($(this).children().prop("src"));
                    })
                    // 右边的详情信息部分
                    var $detail = $(".detail");
                    var imgSrc;
                    if (res.grade == 0) {
                        imgSrc = "../images/lingxing.png";
                    } else {
                        imgSrc = "../images/wuxing.png";
                    }
                    $detail.html(`
                    <h2 class="desc1">
                        ${res.desc2}
                    </h2>
                    <div class="gNumber">
                        商品编号：${res.gcode}
                    </div>
                    <div class="price clearfix">
                        <div class="fl ownPrice">
                            No5 价：<strong>￥${res.price1}</strong>
                        </div>
                        <div class="otherPrice fl">
                            市场价： ￥${res.price3}
                        </div>
                        <div class="fl count">
                            折扣： ${res.count}
                        </div>
                    </div>
                    <div class="brand">
                        所属品牌：<span>${res.brand}</span>
                    </div>
                    <div class="type">
                        所属分类：<span>${res.type}</span>
                    </div>
                    <div class="user">
                        用户评分：
                        <img src="${imgSrc}" alt="">
                        <span>已有<strong>${res.comment}</strong>条评论</span>
                    </div>
                    <div class="transport">
                        运费说明：
                        <strong>购物满80元免费快递</strong> <span>查看运费详情</span>
                    </div>
                    <div class="safe">
                        消费保障：
                        <img src="../images/baozhang1.png" alt="">品质承诺
                        <img src="../images/baozhang2.png" alt="">货到付款
                        <img src="../images/baozhang3.png" alt="">不满意退货
                        <img src="../images/baozhang4.png" alt="">可靠包装
                    </div>
                    <div class="server">
                        服 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：
                        本商品由 <strong>${res.address}</strong> 销售
                    </div>
                    <div class="buy">
                        <span>我要买：</span>
                        <button class="jian">-</button>
                        <input type="text" value="1">
                        <button class="jia">+</button>
                        <button class="jr">
                            <img src="../images/gouwuche2.png" alt="">
                            加入购物车
                        </button>
                        <button class="sc">
                            <img src="../images/shoucang.png" alt="">
                            收 &nbsp;&nbsp;&nbsp;&nbsp;藏
                        </button>
                    </div>
                `);
                    // 对加入购物车部分进行操作
                    var $jian = $(".jian");
                    var $jia = $(".jia");
                    var $input = $(".buy>input");
                    var $jr = $(".jr");
                    $input.blur(function () {
                        var $value = $(this).val();
                        if (!Number($value)) {
                            $(this).val("1");
                        }
                    })
                    $jia.click(function () {
                        $input.val(Number($input.val()) + 1);
                    })
                    $jian.click(function () {
                        if (Number($input.val()) > 1) {
                            $input.val(Number($input.val()) - 1);
                        } else {
                            $input.val("1");
                        }
                    })
                    $jr.click(function () {
                        var num = $input.val();
                        var cookie = Cookie.getCookie("phone");
                        if (cookie) {
                            $.ajax({
                                url: "../api/more2.php",
                                data: {
                                    phone: cookie,
                                    gid: res.gid,
                                    url: res.imgUrl1,
                                    desc: res.desc1,
                                    price1: res.price1,
                                    price2: res.price3,
                                    num: num
                                },
                                success: function (response) {
                                    buyList();
                                }
                            });
                        } else {
                            location.href = "../html/register.html";
                        }
                    })
                    resolve();
                }
            });
        }).then(function () {
            console.log($type2);
            var $tjUl = $(".tj>ul");
            // 编辑推荐区域
            $.ajax({
                url: "../api/more3.php",
                dataType: "json",
                success: function (res) {
                    for (var i = 0; i < res.length; i++) {
                        var newLi = $("<li>");
                        newLi.appendTo($tjUl).attr("data-id", res[i].gid)
                            .html(`
                                <a href="javascript:;">
                                    <img src="${res[i].imgUrl1}"
                                        alt="">
                                </a>
                                <a href="javascript:;">
                                    ${res[i].desc1}
                                </a>
                                <p>￥${res[i].price1}</p>
                            `);
                    }
                    $tjUl.find("a").click(function () {
                        var $id = $(this).parents("li").attr("data-id");
                        location.href = "./more.html?id=" + $id;
                    })
                }
            });
            // 同品牌热销区域
            var $rxUl = $(".rx>ul");
            $.ajax({
                url: "../api/more4.php",
                data: {
                    type2: $type2
                },
                dataType: "json",
                success: function (res) {
                    for (var i = 0; i < res.length; i++) {
                        var newLi = $("<li>");
                        newLi.addClass("clearfix").appendTo($rxUl)
                            .html(`
                                <a href="javascript:;">
                                    <img src="${res[i].imgUrl1}"
                                        alt="">
                                </a>
                                <div>
                                    <a href="javascript:;">
                                        ${res[i].desc1}
                                    </a>
                                    <p>￥${res[i].price1}</p>
                                </div>
                            `).attr("data-id", res[i].gid);
                    }
                    $rxUl.find("a").click(function () {
                        var $id2 = $(this).parents("li").attr("data-id");
                        location.href = "./more.html?id=" + $id2;
                    })
                }
            });
            // 评论区域
            class Comment {
                constructor() {
                    this.ele = $(".remark_r>div");
                    this.getData();
                }
                getData() {
                    var self = this;
                    $.ajax({
                        url: "../api/comment1.php",
                        data: {
                            gid: gid
                        },
                        dataType: "json",
                        success: function (res) {
                            self.res = res;
                            self.page = 0;
                            self.pageNum = Math.ceil(res.length / 5);
                            self.render();
                            self.renderPage();
                            self.addComment();
                        }
                    });
                }
                // 评论渲染
                render() {
                    var self = this;
                    this.ele.html("").html(`
                        <h2>购买评论</h2>
                        <ul>
                            
                        </ul>
                        <div class="clearfix">
                            <div class="fr">
                                
                            </div>
                        </div>
                        <textarea name="" id=""></textarea>
                        <button>发表评论</button>
                    `);
                    this.render2();
                }
                render2() {
                    var self = this;
                    var resArr = this.res.slice(this.page * 5, this.page * 5 + 5);
                    var $ul = this.ele.children("ul");
                    if (resArr.length == 0) {
                        $ul.html("暂无评论");
                    } else {
                        $ul.html("");
                        for (var i = 0; i < resArr.length; i++) {
                            var newLi = $("<li>");
                            newLi.addClass("clearfix").appendTo($ul)
                                .html(`
                                    <div class="fl">
                                        <p>${resArr[i].comment1}</p>
                                        <img src="../images/wuxing.png" alt="">
                                    </div>
                                    <div class="fr">
                                        <p>用户${resArr[i].phone}</p>
                                        <div>${resArr[i].time}</div>
                                    </div>
                                `)
                        }
                    }
                }
                // 点击换页部分
                renderPage() {
                    var btnDiv = this.ele.find("div.clearfix>div");
                    if (this.pageNum > 1) {
                        for (var i = 0; i < this.pageNum; i++) {
                            var newBtn = $("<button>");
                            newBtn.appendTo(btnDiv).text(`${i+1}`);
                            if (i == 0) {
                                newBtn.addClass("color");
                            }
                        }
                    }
                    this.pageClick(btnDiv.children("button"));
                }
                pageClick(btn){
                    var self = this;
                    btn.click(function(){
                        var $index = $(this).index();
                        btn.removeClass("color");
                        $(this).addClass("color");
                        self.page = $index;
                        self.render2();
                    });
                }
                // 添加评论部分
                addComment(){
                    
                }
            }
            new Comment();
        })

    })
})