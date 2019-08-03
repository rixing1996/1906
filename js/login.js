$(function () {
    new Promise(function (resolve, reject) {
        $("#head").load("../html/head.html", "body", function () {
            resolve();
        });
    }).then(function () {

    })
})