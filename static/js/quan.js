//自适应
var htmlFontCount = function (x, min, max) {
        min = min || 320;
        var docEl = document.documentElement,
            clientWidth = null,
            countFun = function () {
                clientWidth = Math.max(docEl.clientWidth, min);
                clientWidth = max ? Math.min(clientWidth, max) : clientWidth;
                if (clientWidth) {
                    docEl.style.fontSize = 100 * (clientWidth / x) + 'px';
                }
            };
        window.addEventListener('resize', countFun, false);
        countFun();
    };
htmlFontCount(750);
$(function() {
    //圈子设置弹窗  提现规则  操作提示
    $('.reward,.accum-gz,.Oper-hin').click(function() {
        $('.zhe').show();
        $('.alert-reward,.accum-alert,.hints-alert ').show();
    });
    $('.btn-xq,.sure,.hin-sure').click(function() {
        $('.zhe').hide();
        $('.alert-reward,.accum-alert,.hints-alert ').hide();
    });

    //选规则
    $('.circle-list-p').click(function() {
         $(this).addClass('active').siblings().removeClass('active');
    });

    //收益提现记录

    $('.accum-tab').find('a').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $(".accum-ul ul li").eq($(this).index()).show().siblings().hide()
    });

    //单选
    $('.edit-tag-fl').find('a').click(function() {
        $(this).addClass('active').siblings().removeClass('active');

    });


    //删除标签
    $(".edit-tag-right a").click(function() {
          $(this).remove(); 
    });
      
    //换背景
    $('.rep-c-xz').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //切换type 对 标签和置顶帖的操作
    $('.index-nav').find('a').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        if($(this).hasClass('fresh')){
          $('.navtab-main').show();
           $('.shrinkage').show();
        }else{
          $('.navtab-main').hide();
           $('.shrinkage').hide();
        }
    });


    //展开
    $('.shr-btn').click(function() {
        if($(this).hasClass('cur')){
                $(this).removeClass('cur');
            }else{
                $(this).addClass('cur').siblings().removeClass('cur');
            }
        $('.shr-hidden').toggle();
    });

    //推荐 、加入、我的 圈子
        

    $('.qz-tab-min').find('a').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $(".qz-m-ul li").eq($(this).index()).show().siblings().hide()
    });
    // 10-10 点击移除图片

    $('.reply-list').click(function() {
        $(this).remove();
    });
    var hiddenDiv = $('#hiddenDiv');

    hiddenDiv.on('click', '.hidden-left', function(){
        hiddenDiv.animate({
            top:"100%"},
            100, function() {
            /* stuff to do after animation is complete */
        });
    });



    // 10-10 点击关闭 精华 置顶 设置 编辑 删除 收藏 举报
    $('.gr-share').click(function() {
        console.log(123);
        $('.mpt-alert').show();
    });

    $('.mqt-gb,.mpt-alert').click(function() {
        $('.mpt-alert').hide();
    });
    $('.Rea-btn').click(function() {
        $('.Reasons-alert').show();
        $('.mpt-alert').hide();

    });
    $('.Rea-no').click(function() {
        $('.Reasons-alert').hide();
    });



    //删除 提示弹窗
    $('#dele-sc').click(function() {
        $('.dell-alert-ts').show();
      
    });
    $('.dell-xq').click(function() {
        $('.dell-alert-ts').hide();
     
    });

    // $('.reply-a').click(function() {
    //     $(".reply-footer li").eq($(this).index()).show().siblings().hide()
    // });
    
    // 关闭帖子分享图
    $('#cloShare').click(function() {
        $('.conform').css('display','none');
    });
});


//公共弹窗
function showAllzz(tit, jsons) {
    var allZZ = $('<div id="allZZ" class="allzz"><div class="alertDiv"><div class="promptText">回复成功</div><div class="promptBut"><a href="###">继续回复</a><a href="###">关闭</a></div></div></div>'),
        h = $(document).height(),
        ah = $(window).height() / 2,
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
        aArray += typeof(jsons[x]) === 'string' ? '<a href="' + jsons[x] + '">' + x + '</a>' : '<a href="' + jsons[x].url + '">' + jsons[x].title + '</a>';
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
        "margin-top": ah - alertDiv.height() / 2
    });
}

//公共提示框
function wqShowMsg(bgcolor,msg){
    if(!$("#showMsg").length){
        str='<div id="showMsg" style="background:'+bgcolor+';color:#fff;z-index:3;height:0.94rem;line-height:0.94rem;font-size:0.24rem;width:100%;position:fixed;text-align:center;transition: top 0.5s;top:0;box-sizing:border-box">'+msg+'</div>'
        $('body').append(str);
    }else{
        $("#showMsg").css({"background":bgcolor,"top":0}).text(msg);
    }
    setTimeout(function(){
        $("#showMsg").css({"top":"-100px"});
    },2500)
}

//弹出回复框
function showhf(){
    var hiddenDiv = $('#hiddenDiv');
    hiddenDiv.animate({
       top: 0},
       100, function() {
    });
}
// 关闭回复框
function hidehf(){
    var hiddenDiv = $('#hiddenDiv');
    hiddenDiv.animate({
       top:"100%"},
       100, function() {
    });
}


//公共弹窗
function showAlert(title,content,id,quanx) {
    var alertWin = $('<div class="pageshadow"><div class="alertMsg"><div class="close"><img src="/images/quan/images/close.png"></div><div class="img"><img src="/images/quan/images/nopersonal.png"></div><h4>你好</h4><p>###</p><div class="btn"><div class="exit">取消</div><div class="join" onclick="join('+id+')">去加入</div></div></div></div>');
    alertWin.find("p").html(content);
    alertWin.find("h4").html(title);
    alertWin.find(".join").attr('data-sub',id);
    
    //黑名单弹框
    if(quanx == 3){
        alertWin.find(".btn").html('<div class="configs">确定</div>');
        alertWin.find(".configs").click(function() {
          alertWin.remove();
        });
    }
    if(quanx == 7 || quanx == 8){//删除帖子和回复
        alertWin.find(".join").removeAttr("onclick");
        alertWin.find(".join").html('删除');
        if(quanx == 7){//删除帖子
           alertWin.find(".join").attr("onclick","ajaxDel("+id+");");
        }else{//删除回复
            alertWin.find(".join").attr("onclick","ajaxRepDel("+id+");");
        }   
    }
    alertWin.find(".exit").click(function() {
        alertWin.remove();
    });
    alertWin.find(".close").click(function() {
        alertWin.remove();
    });
    alertWin.appendTo($('body'));
}
