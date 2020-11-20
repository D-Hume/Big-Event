// --------------------------------------------获取用户信息
$.ajax({
    type: "get",
    url: "http://ajax.frontend.itheima.net/my/userinfo",
    // 带有/my的接口需要有token令牌才能获取成功，需要设置请求头，从本地获取token发送给后台验证
    headers: { "Authorization": localStorage.getItem("token") },
    success: function (res) {
        // console.log(res);
        if (res.status == 0) {
            // 获取用户信息成功后渲染返回的数据，如果有昵称则显示昵称，如果没有昵称则显示用户名，这种情况的选择用||来表示，不用if判断
            var name = res.data.nickname || res.data.username;
            $(".username").text(name);
            // 如果有头像则显示头像，如果没有头像
            if (res.data.user_pic == true) {
                $(".layui-nav-img").attr("src", res.data.user_pic).show();
                $(".avatar").hide();
            }
            // 如果没有头像则显示用户名或昵称的首字母
            // toUpperCase()使字母大写
            else {
                var t = name.substr(0, 1).toUpperCase();
                $(".avatar").text(t).css("display", "inline-block");
                $(".layui-nav-img").hide();
            }
        }
    }
})

// ----------------------------------------------------退出
$("#logout").on("click", function () {
    layer.confirm('确定要退出么？', {
        btn: ['取消', '确定'],//可以无限个按钮
    },
        function (index) {
            // 跳转回本页面的方式，页面会有刷新，用户体验不好，下边的方法直接关闭弹窗
            // location.href = "/index.html";
            layer.close(index);
        },
        function (index) {
            // 退出即跳转到登录页面
            location.href = "/login.html";
            // 退出即把token删除
            localStorage.removeItem("token")
        });
})
// 设置如果本地没有token的话，即返回login页面
if (!localStorage.getItem("token")) {
    location.href = "/login.html";
}
