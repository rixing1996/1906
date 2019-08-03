$(function () {
    new Promise(function (resolve, reject) {
        $("#head").load("../html/head.html", "body", function () {
            resolve();
        });
    }).then(function () {
        // 验证账号
        var phone_type = false;
        var pwd1_type = false;
        var pwd2_type = false;
        var email_type = false;
        var code_type = false;
        var txt = new RandomCode($("#canvas")[0]).join("");
        class Verify {
            constructor() {
                this.ins = $(".content>div>input");
                this.ins.val("");
                this.pwd;
                this.phoneTest();
                this.pwd1Test();
                this.pwd2Test();
                this.emailTest();
                this.codeTest();
                this.clickButton();
            }
            // 验证手机号
            phoneTest() {
                var phone_reg = /^1[3-9]\d{9}$/;
                this.ins.eq(0).focus(function () {
                    phone_type = false;
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(1, 1, 139)"
                    });
                    $(this).next().show().text("请输入您常用的手机号码")
                        .css("color", "rgb(82, 82, 82)");
                }).blur(function () {
                    var phone_value = $(this).val().trim();
                    if (phone_reg.test(phone_value)) {
                        $(this).next().hide();
                        phone_type = true;
                        $(this).css({
                            "background": "white",
                            "border": "1px solid rgb(127, 157, 185)"
                        })
                    } else {
                        $(this).next().show().text("手机号输入不正确")
                            .css("color", "red");
                        phone_type = false;
                        $(this).css({
                            "background": "rgb(255, 253, 223)",
                            "border": "1px solid rgb(128, 1, 1)"
                        })
                    }
                })
            }
            // 验证密码设置是否符合
            pwd1Test() {
                var self = this;
                var pwd1_reg = /^[\w!@#$%\^&*\-]{6,16}$/;
                this.ins.eq(1).focus(function () {
                    pwd1_type = false;
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(1, 1, 139)"
                    });
                    $(this).next().show().text("6-16位,建议使用数字、字母与特殊字符")
                        .css("color", "rgb(82, 82, 82)");
                }).blur(function () {
                    var pwd1_value = $(this).val().trim();
                    if (pwd1_reg.test(pwd1_value)) {
                        $(this).next().hide();
                        pwd1_type = true;
                        self.pwd = pwd1_value;
                        $(this).css({
                            "background": "white",
                            "border": "1px solid rgb(127, 157, 185)"
                        })
                    } else {
                        $(this).next().show().text("密码格式输入不正确")
                            .css("color", "red");
                        pwd1_type = false;
                        $(this).css({
                            "background": "rgb(255, 253, 223)",
                            "border": "1px solid rgb(128, 1, 1)"
                        })
                    }
                })
            }
            // 验证两次密码是否一致
            pwd2Test() {
                var self = this;
                this.ins.eq(2).focus(function () {
                    pwd2_type = false;
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(1, 1, 139)"
                    });
                    $(this).next().show().text("请再次输入密码")
                        .css("color", "rgb(82, 82, 82)");
                }).blur(function () {
                    var pwd2_value = $(this).val().trim();
                    if (self.pwd == pwd2_value) {
                        $(this).next().hide();
                        pwd2_type = true;
                        $(this).css({
                            "background": "white",
                            "border": "1px solid rgb(127, 157, 185)"
                        })
                    } else {
                        $(this).next().show().text("两次密码不一致")
                            .css("color", "red");
                        pwd2_type = false;
                        $(this).css({
                            "background": "rgb(255, 253, 223)",
                            "border": "1px solid rgb(128, 1, 1)"
                        })
                    }
                })
            }
            // 验证邮箱是否正确
            emailTest() {
                var email_reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                this.ins.eq(3).focus(function () {
                    email_type = false;
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(1, 1, 139)"
                    });
                    $(this).next().show().text("请再次输入密码")
                        .css("color", "rgb(82, 82, 82)");
                }).blur(function () {
                    var email_value = $(this).val().trim();
                    if (email_reg.test(email_value)) {
                        $(this).next().hide();
                        email_type = true;
                        $(this).css({
                            "background": "white",
                            "border": "1px solid rgb(127, 157, 185)"
                        })
                    } else {
                        $(this).next().show().text("邮箱输入不正确")
                            .css("color", "red");
                        email_type = false;
                        $(this).css({
                            "background": "rgb(255, 253, 223)",
                            "border": "1px solid rgb(128, 1, 1)"
                        })
                    }
                })
            }
            // 验证随机码
            codeTest() {
                var self = this;
                this.ins.eq(4).focus(function () {
                    code_type = false;
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(1, 1, 139)"
                    });
                    $(this).nextAll().eq(1).show().text("请输入有图的验证码")
                        .css("color", "rgb(82, 82, 82)");
                }).blur(function () {
                    var code_value = $(this).val().trim().toLowerCase();
                    if (txt == code_value) {
                        $(this).nextAll().eq(1).hide();
                        code_type = true;
                        $(this).css({
                            "background": "white",
                            "border": "1px solid rgb(127, 157, 185)"
                        })
                    } else {
                        $(this).nextAll().eq(1).show().text("验证码错误")
                            .css("color", "red");
                        code_type = false;
                        $(this).css({
                            "background": "rgb(255, 253, 223)",
                            "border": "1px solid rgb(128, 1, 1)"
                        })
                    }
                })
                $("#canvas").click(function () {
                    txt = new RandomCode($("#canvas")[0]).join("");
                    self.ins.eq(4).trigger("focus").trigger("blur");
                })
            }
            // 点击注册
            clickButton() {
                $(".content>button").click(function () {
                    if (phone_type && pwd1_type && pwd2_type && email_type && code_type) {
                        var select = $(".protocol>input")[0];
                        if (select.checked) {
                            var cPhone_value = $(".content>div>input").eq(0).val().trim();
                            var cPwd_value = $(".content>div>input").eq(1).val().trim();
                            var cEmail_value = $(".content>div>input").eq(3).val().trim();
                            $.ajax({
                                url: "../api/login.php",
                                data: {
                                    "phone": cPhone_value,
                                    "pwd": $.md5(cPwd_value),
                                    "email": cEmail_value
                                },
                                success: function (res) {
                                    if (res) {
                                        alert("登陆成功");
                                        var afday = afterDate(new Date(), 7);
                                        Cookie.setCookie("phone", cPhone_value, afday);
                                        location.href = "../index.html";
                                    } else {
                                        alert("手机号已被注册");
                                    }
                                }
                            });
                        } else {
                            alert("协议还没勾选");
                        }
                    } else {
                        alert("数据填写不完整");
                    }
                })
            }
        }
        new Verify();
    })
})