// -------------------------------------------------------切换页面
$("#goto-register").on("click", function () {
    $("#login").hide();
    $("#register").show();
})
$("#goto-login").on("click", function () {
    $("#login").show();
    $("#register").hide();
})
// 正则校验用户注册信息
var form = layui.form;
form.verify({
    // -------------正则校验
    username: function (val) {
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(val)) {
            return '用户名不能有特殊字符';
        }
        if (/(^\_)|(\__)|(\_+$)/.test(val)) {
            return '用户名首尾不能出现下划线\'_\'';
        }
        if (/^\d+\d+\d$/.test(val)) {
            return '用户名不能全为数字';
        }
        if (new RegExp("^[a-zA-Z0-9]{6,12}$").test(val) == false) {
            return '用户名6-12个字符';
        }
    },
    // layui校验的两种方式都可以
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    same: function (val) {
        var pwd = $("#pwd").val()
        if (pwd !== val) {
            return '两次密码不一致'
        }
    }
})
// -------------------------------------------------------注册功能
$("#zc").on("submit", function (e) {
    e.preventDefault();
    var params = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/api/reguser",
        data: params,
        success: function (res) {
            // 弹窗显示res.message
            if (res.status == 0) {
                layer.msg(res.message);
                $("#login").show();
                $("#register").hide();
                // console.log(res);
                // 输入框清空
                $("#register form")[0].reset();
            }
        }
    })
    // post方式：
    // $.post('http://ajax.frontend.itheima.net/api/reguser', params, function (res) {
    //     console.log(res);
    // })  
})
// -----------------------------------------------------------登录
// enter键登录
$("#dl").on("keyup", function (e) {
    if (e.keyCode == 13) {
        // console.log(1);
        var params = $(this).serialize();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: params,
            success: function (res) {
                // 登陆成功或失败，弹窗显示
                layer.msg(res.message);
                if (res.status == 0) {
                    // console.log(res);
                    //提交成功后，把获取到的token手动保存在本地
                    localStorage.setItem("token", res.token);
                    location.href = "/index.html";
                }
            }
        })
    }
})
// 鼠标登陆
$("#dl").on("submit", function (e) {
    e.preventDefault();
    var params = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/api/login",
        data: params,
        success: function (res) {
            // 登陆成功或失败，弹窗显示
            layer.msg(res.message);
            if (res.status == 0) {
                // console.log(res);
                //提交成功后，把获取到的token手动保存在本地
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        }
    })
})

