/*
 * @Author       : zq
 * @description  : description
 * @Date         : 2021-04-27 19:19:48
 * @LastEditors  : zq
 * @LastEditTime : 2021-04-27 19:20:02
 * @FilePath     : \vip_test\js\wap\app_return_js.js
 */
function getCookie(cookieName) {
    var allCookies = document.cookie;
    var cookiePos = allCookies.indexOf(cookieName);
    //把cookiePos放在值的开始，只要给值加1即可。
    cookiePos += cookieName.length + 1;
    var cookieEnd = allCookies.indexOf(";", cookiePos);
    if (cookieEnd == -1) {
        cookieEnd = allCookies.length;
    }
    var value = allCookies.substring(cookiePos, cookieEnd); //这里就可以得到你想要的cookie的值了。。。
    return value;
}

// 只判断了在安卓下物理返回生效
if (getCookie("is_app") == 1 && getCookie("ios") != 1) {
    var androidBackClick = 0;
    function androidOnBack() {
        androidBackClick += 1;
        if (androidBackClick == 1) {
            // 返回上一级
            window.android.goBack();
            setTimeout(function() {
                androidBackClick = 0;
            }, 1500);
        } else if (androidBackClick > 1) {
            // 退出app
            // window.android.close("{}");
        }
    }
    window.android.updateBackupType(
        JSON.stringify({
            type: true,
            callback: "androidOnBack()",
        })
    );
}