$(document).ready(function(){
    $('.ev_zhichi').css('display','none');
        //隐藏foot.tpl引入文件的小图标
    $('#fixedShopCar').remove();
})

//点赞弹窗
function showAllzz(tit, jsons) {
    var allZZ = $('<div id="allZZ" class="allzz"><div class="alertDiv"><div class="promptText">回复成功</div><div class="promptBut"><a href="###">继续回复</a><a href="###">关闭</a></div></div></div>'),
        h = $(document).height(),
        ah = $(document).scrollTop() + $(window).height() / 2,
        wh = $(window).height();/* 获取框体高度 */
        i = 0;

    allZZ.find(".promptText").html(tit), alertDiv = allZZ.find(".alertDiv");

    if (!jsons) {
        jsons = {
            '关闭': 'javascript:;'
        };
    }

    var x, aArray = "";
    for (var x in jsons) {
        i++;
        aArray += '<a href="' + jsons[x] + '">' + x + '</a>';
    }
    allZZ.find(".promptBut").html(aArray);


    allZZ.find(".promptBut").find("a").css({
        'width': 100 / i + "%"
    }).click(function() {
        allZZ.remove();
    });

    allZZ.css({
        "height": h + "px"
    }).appendTo('body');
    alertDiv.css({
        "margin-top": (wh/2) - alertDiv.height() / 2
    });
}