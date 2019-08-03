$(function () {
    new Promise(function (resolve, reject) {
        $("#head").load("../html/head.html", "body", function () {
            resolve();
        });
    }).then(function () {
        // 验证账号是否正确
        class Test {
            constructor() {
                this.phoneReg = /^1[3-9]\d{9}$/;
                this.type = false;
                this.code = false;
                this.ins = $(".content_c>div>input");
                this.ins.val("");
                this.txt = new RandomCode($("#canvas")[0]).join("");
                this.phoneTest();
                this.pwdTest();
                this.codeTest();
                this.buttonTest();
            }
            // 手机号
            phoneTest() {
                var self = this;
                this.ins.eq(0).focus(function () {
                    self.type = false;
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(0, 0, 139)"
                    })
                }).blur(function () {
                    $(this).css({
                        "background": "rgb(255, 255, 255)",
                        "border": "1px solid rgb(128, 157, 185)"
                    });
                    var phone_value = $(this).val().trim();
                    if (self.phoneReg.test(phone_value)) {
                        self.type = true;
                    }
                })
            }
            // 密码
            pwdTest() {
                var self = this;
                this.ins.eq(1).focus(function () {
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(0, 0, 139)"
                    })
                }).blur(function () {
                    $(this).css({
                        "background": "rgb(255, 255, 255)",
                        "border": "1px solid rgb(128, 157, 185)"
                    });
                })
            }
            // 验证码
            codeTest() {
                var self = this;
                this.ins.eq(2).focus(function () {
                    self.code = false;
                    $(this).css({
                        "background": "rgb(234, 245, 255)",
                        "border": "1px solid rgb(0, 0, 139)"
                    })
                }).blur(function () {
                    $(this).css({
                        "background": "rgb(255, 255, 255)",
                        "border": "1px solid rgb(128, 157, 185)"
                    });
                    var code_value = $(this).val().trim().toLowerCase();
                    if (self.txt == code_value) {
                        self.code = true;
                    }
                });
                $("#canvas").click(function () {
                    self.txt = new RandomCode($("#canvas")[0]).join("");
                    self.ins.eq(2).trigger("focus").trigger("blur");
                })
            }
            // 登录
            buttonTest() {
                var self = this;
                $(".content_c>button").click(function () {
                    var phone_value = self.ins.eq(0).val().trim();
                    var pwd_value = self.ins.eq(1).val().trim();
                    var code_value = self.ins.eq(2).val().trim();
                    if (!self.type) {
                        if (phone_value == "") {
                            alert("手机号不能为空");
                        } else {
                            alert("手机号格式不正确");
                        }
                    } else if (pwd_value == "") {
                        alert("密码不能为空");
                    } else if (!self.code) {
                        if (code_value == "") {
                            alert("验证码不能为空");
                        } else {
                            alert("验证码不正确");
                        }
                    } else {
                        alert("登录成功");
                    }
                })
            }
        }
        new Test();
    })
})