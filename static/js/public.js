// JavaScript Document
var G_ = [];
var wsf = {};
/**
 ** 用来得到精确的加、减、乘、除结果
 ** 说明：javascript的四则运算结果会有误差，这个函数返回较为精确的加法结果。
 ** 调用：加：nCount.add(arg1,arg2),
 *  减：nCount.sub(arg1,arg2),
 *  乘：nCount.mul(arg1,arg2),
 *  除：nCount.div(arg1,arg2),
 ** 返回值：arg1和arg2计算后的精确结果
 **/

var nCount = {
    add : function(arg1,arg2){
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
    },
    sub : function(arg1, arg2){
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    mul : function(arg1, arg2){
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    div : function(arg1, arg2){
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
    }
};
//获取主域
var Domain=document.domain;
Domain=trim(Domain);
Domain=Domain.toLowerCase();
if (typeof websiteHostPreg == "undefined") {
    var tmp_arr = Domain.match(/[\w][\w-]*\.(?:com\.cn|net\.cn|org\.cn|com\.hk|com\.au|imipo\.shop|com|cn|co|net|org|gov|cc|biz|info|hn|xyz|hk|icu|us|mobi|art|wang|me|so|top|win|vip|ltd|red|ru|ac\.cn|xn--kput3i|xin|xn--3ds443g|shop|site|club|fun|online|link|gov\.cn|name|pro|work|tv|kim|group|tech|store|cx|ren|ink|pub|live|wiki|design|xn--fiq228c5hs|xn--6qq986b3xl|xn--fiqs8s|xn--ses554g|xn--hxt814e|xn--55qx5d|xn--io0a7i|xn--3bst00m|love)(\/|$)/);
} else {
    var tmp_arr = Domain.match(websiteHostPreg);
}
Domain=tmp_arr[0];

var tmp_url = location.href;
if(tmp_url.indexOf("baike_add")==-1 && tmp_url.indexOf("bbs_add_book")==-1 && tmp_url.indexOf("bbs_thread")==-1 && tmp_url.indexOf("baike_edit")==-1 && tmp_url.indexOf("bbs_edit_book")==-1 && tmp_url.indexOf("/baike_")==-1 && tmp_url.indexOf("/thread_")==-1 && tmp_url.indexOf("/forum_")==-1 && tmp_url.indexOf("/dom/form_iframe.php")==-1 && tmp_url.indexOf("/zd_")==-1 && tmp_url.indexOf("/dom/zhidao")==-1){
    document.domain =Domain;
}

$(function() {
    //文章点赞公用
    wsf.userLike = function(recordId, type, objectId, style, operate, user_name, part, html) {
        //没有登录通过cookie验证是否点赞
        var zz_userid = readCookie('zz_userid');
        if (!zz_userid && operate == 'like') {
            var userLikeRecord = readCookie('user_like_record');
            var tmpStr = type + '*' + recordId;
            //已赞过
            if (userLikeRecord.indexOf(tmpStr) != -1) {
                alert_frame($weisiteLa.YiZanGuo);
                return false;
            }

            //每日限制100次
            var tmpArr = userLikeRecord.split('#');
            if (tmpArr.length >= 100) {
                alert_frame($weisiteLa.MeiRiZuiDuoDianZan);
                return false;
            }
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Public/UserOperate.php',
            data: {
                username: user_name,
                rid: recordId,
                opt: operate,
                type: type,
                part: part,
                t: Date.parse(new Date())
            },
            success: function(data) {
                if (data.errorcode > 0) {
                    alert_frame(data.errormsg);
                } else {
                    var obj = $("#" + objectId);
                    if(html){
                        obj.html(html.replace('{n}', data.num));
                    }else{
                        if (operate == 'browse') {
                            obj.html($weisiteLa.Read+'：'+data.num);
                        } else {
                            obj.html(data.errormsg);
                        }
                    }

                    var styleArr = style.split('#');

                    if (operate == 'like' || data.liked)
                    {
                        obj.data('opt', "unLike");
                        obj.removeClass(styleArr[0]);
                        obj.addClass(styleArr[1]);
                        if(operate == 'like') alert_frame($weisiteLa.DianZanChengGong);
                    }
                    else if (operate == 'unLike')
                    {
                        obj.data('opt', "like");
                        obj.removeClass(styleArr[1]);
                        obj.addClass(styleArr[0]);
                        alert_frame($weisiteLa.QuXiaoChengGong);
                    }
                }
            }
        });
    };
});

//email 判断
function checkEmail(cEmail)
{

   var patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
   if (!patrn.test(cEmail)){
      return false;
   }else{
      return true;
   }
}

//清除空格
function trim(str){
    return rtrim(ltrim(str));
}
function ltrim(s){
    return s.replace(/(^\s*)/g, "");
}
 //去右空格;
function rtrim(s){
  return s.replace(/(\s*$)/g, "");
}

//电话
function phonecheck(s){
    var str=s;
    //var reg=/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{3,4}\-[0-9]{7,8}\-[0-9]{3,4}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{1}[0-9]{9}$)/;
    var reg=/(^(\d{2,4}[-_－―]?)?\d{3,8}([-_－―]?\d{3,8})?([-_－―]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
    //alert(reg.test(str));
    if (reg.test(str)==false){
        return false;
    }else{
        return true;
    }
}
//字符长度
function strLen(key){
    var l=escape(key),len
    len=l.length-(l.length-l.replace(/\%u/g,"u").length)*4
    l=l.replace(/\%u/g,"uu")
    len=len-(l.length-l.replace(/\%/g,"").length)*2
    return len;
}
//时间戳
function UTCTimeDemo(){
       var now = new Date().getTime();
       var datestr=escape(now*1000+Math.round(Math.random()*1000));
       return datestr;
}
function isChinese(str){
     var badChar ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     badChar += "abcdefghijklmnopqrstuvwxyz";
     badChar += "0123456789";
     badChar += "_";
     if(""==str)
     {
         return false;
     }
     for(var i=0;i<str.length;i++)
     {
         var c = str.charAt(i);//字符串str中的字符
         if(badChar.indexOf(c) == -1)
         {
             return true;
         }
     }
     return false;
}

//收藏信息处理
function copyToClipBoard(){
    var clipBoardContent="";
    clipBoardContent+=window.location.href;
    if (window.clipboardData){
        if(window.clipboardData.setData("Text",clipBoardContent)){
            alert($weisiteLa.FuZhiChengGong);
        }
    }else{
        var flashcopier = 'flashcopier';
        if(!document.getElementById(flashcopier)) {
            var divholder = document.createElement('div');
            divholder.id = flashcopier;
            document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        clipBoardContent = clipBoardContent.replace(/\"/g,'\'');
        var divinfo = '<embed src="/_clipboard.swf" FlashVars="clipboard='+clipBoardContent+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
        alert($weisiteLa.FuZhiChengGong);
   }
}

function killErrors()
{
    return true;
}
window.onerror = killErrors;

function login_out(){
    writeCookie('zz_userid','');
    window.location.reload();
}

//座机号码
function isTel(s){
    var str=s;
    var reg=/^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/;
    //alert(reg.test(str));
    if (reg.test(str)==false){
        return false;
    }else{
        return true;
    }
}
//手机
function isMobil(s)
{
    var patrn = /^[0-9]{11}$/;
    if(patrn.exec(s)) {
        return true;
    }else{
        return false;
    }
}

//邮政编码
function postcodecheck(s){
    var re= /^[0-9][0-9]{5}$/
    if(re.test(s)){
      return true;
    }else
    {
        return false;
    }
}

//商城关键字
function check_mall_key(tag){
    var key_word=$('#keyWord').val();
    key_word=trim(key_word);
    if(tag==2 && key_word==''){
        $('#keyWord').val($weisiteLa.SouCuoChanPin);
    }
    if(tag==1 && key_word==$weisiteLa.SouCuoChanPin){
        $('#keyWord').val('');
    }
}

//商城搜索
function check_mall_search(){
    $("#mall_search").submit(function(){
    var key_word=$('#keyWord').val();
    key_word=trim(key_word);
    if(key_word=='' || key_word==$weisiteLa.SouCuoChanPin){
        alert($weisiteLa.QingShuRuChaZhaoShangPin);
        $('#keyWord').focus();
        return false;
    }
    //$('#mall_search').submit();
});
}


//显示消息
function set_msg_new(width,height,title,content,true_fn,false_fn,no_close){

    if(!width)width=370;
    if(!height)height=200;
    var tmp_arr = set_bg(width);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];
    var close_style=no_close?'style="display:none"':'';

    var false_html = '';
    var css_style = '';
    if (false_fn) {
        false_html = '<input type="button" class="msg_button" value="取 消" onclick="'+false_fn+'"/>';
    } else {
        css_style = ' style="text-align: center; margin-left: 0px;" ';
    }

    var float_div = '<div class="msg_main"  id="float" style="left:'+left_width+'px;top:'+top_height+'px;width:'+width+'px;height:'+height+'px;"><div class="msg_tit"><strong>'+title+'</strong><span class="msg_close" '+close_style+'><a href="javascript:remove_div(\'float\')"><img src="http://img.ev123.com/pic/vip_msg/18.gif" border="0" /></a></span></div><div class="msg_contents"><span class="msg_info">'+content+'</span></div><div class="msg_buttons" '+ css_style +'><input type="button"  class="msg_button" value="确 定" onclick="'+true_fn+'" />'+ false_html +'</div><div class="msg_foot"><a href="#"></a></div></div>';
    $('body').append(float_div);
}


//清除浮动
function remove_div(div_id){
    $('#bg_div').remove();
    $('#float').remove();
    $('#'+div_id+'').remove();
}

//设置背景
function set_bg(tmp_width,tmp_height){

    setTimeout(set_bg2,200);
    if(!tmp_height){
        tmp_height=200;
    }

    //显示出已经添加完以后的数据
    var offset_height = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
    var offset_width = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
    var offset_top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
    var top_height = offset_top+(offset_height - tmp_height)/2;
    var left_width = (offset_width - tmp_width)/2;

    var tmp_arr = new Array(top_height,left_width);
    return tmp_arr;
}

function set_bg2(){
    //将背景变灰
    var height=$(document).height();
    var height2=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
    height=(height>height2)?height:height2;
    var bg_div = '<div id="bg_div" style= "position:absolute;left:0px;top:0px;filter:alpha(opacity=30);z-index:40;width:'+$(document).width()+'px;height:'+height+'px;background:#000;opacity:0.3" align="center"><iframe style="position:absolute; visibility:inherit; top:0px; left:0px; width:'+$(document).width()+'px; height:'+height+'px; z-index:-1;filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\';" frameborder="0"></iframe></div>';
    $('body').append(bg_div);
}
//产品最终页产品规格选择老。
function select_param(param_id,obj){
    $('#pro_param_'+param_id+' span').addClass('nor');
    $('#pro_param_'+param_id+' span').removeClass('act');
    $(obj).addClass('act');
    var tmp_val=$(obj).html();
    $('#pro_param_'+param_id+' input').val(tmp_val);
}

/*
//* arithmetic = add  购买数量加1
//* arithmetic = reduce  购买数量减1
*/
function add_reduce_num3(arithmetic){
    if ($(".reduce").attr('data-noclick') == 1) {
        return false;
    }
    var currencyType = $("#currency").val();
    var Is_suppliers =$('#Is_suppliers').val();
    var shop_num = $('#pro_num').val();
    var Real_stock =$('#Real_stock').val();
    var Minimum_ord =$('#Minimum_ord').val();
    var prounit = $("#shopUnit").html();
    var tmp_num;
    var tmp_num2;
    var jifen_name = $("#jifen_name").val();
    var is_jifen_limit = $("#is_jifen_limit").val();
    var jifen_must_num = $("#jifen_must_num").val();
    //var price =$('#shop_price').html();
    //var shop_price = Number(price.substring(1));
    var shop_price =$("#Real_price").val();
    prounit = '';

    Is_suppliers >0 ?   tmp_num=parseInt(Real_stock)    :   tmp_num=99999;
    Minimum_ord >0  ? tmp_num2=parseInt(Minimum_ord)    :   tmp_num2=1;

    if(tmp_num<tmp_num2){
        $("#Go_Wu_Back").show();
        $("#Go_Wu_Back2").show();
        alert($weisiteLa.gongHuoBuZu);
        return false;
    }

    if(tmp_num==0){
        alert($weisiteLa.zanWuGongHuo);
        $('#pro_num').val(0);
        return false;
    }
    if($("#restrict_num").length > 0){
        var restrict_num = parseInt($('#restrict_num').val()); //获取限购数量
        if(restrict_num < tmp_num){
            tmp_num = restrict_num;
        }
    }

    if(arithmetic == 'reduce'){
        if(shop_num > tmp_num2  &&  shop_num <= tmp_num){
             reality_num = Number(shop_num) - 1;
        }else{
            alert($weisiteLa.GouMaiShuLiangBuNengXiaoYu+tmp_num2+$weisiteLa.HuoZheDaYu+tmp_num);
            return false;
        }
    }else if(arithmetic == 'add'){
        if(shop_num >= tmp_num2 &&  shop_num < tmp_num){
            reality_num = Number(shop_num) + 1;
        }else{

            alert($weisiteLa.GouMaiShuLiangBuNengXiaoYu+tmp_num2+$weisiteLa.HuoZheDaYu+tmp_num);
            return false;
        }
    }
    var must_html = '';
    if (is_jifen_limit == 2 && jifen_must_num > 0) {
        must_html = '<em id="all_must_jifen">&nbsp;+'+jifen_must_num*reality_num+jifen_name+'</em>';
    }
    $('#pro_num').val(reality_num);
    var allMoney = nCount.mul(Number(shop_price), Number(reality_num));
    var obj =  $("input:checkbox[name='check_ids[]']:checked");
    var n=0;
    $.each(obj,function(i,item){
        var num = parseInt($(item).parent().find(".newPrice em").html().slice(1));
        n+=num;
    });
    n+=allMoney;
    $("#commend_price").html(currencyType+n);
    $('#pro_total').html('<b>'+$weisiteLa.zongJi+' </b><span class="newPrice"><em>'+ currencyType + allMoney +'</em>'+prounit+must_html+'</span>');
}


function keyboard_num(){
    if($("#pro_num").attr('data-noclick')==1 || !id){ return false; }
    /* 商品数量判断*/
    var reality_num = $('#pro_num').val();
    var is_number_var = /^[0-9]+.?[0-9]*$/;
    var is_number_zheng =  /^[1-9]+[0-9]*]*$/;
    var Minimum_ord =$('#Minimum_ord').val();
    var Real_stock =$('#Real_stock').val();
    var Is_suppliers =$('#Is_suppliers').val();
    var currencyType = $("#currency").val();
    var tmp_num2;
    var tmp_num;
    var jifen_name = $("#jifen_name").val();
    var is_jifen_limit = $("#is_jifen_limit").val();
    var jifen_must_num = $("#jifen_must_num").val();
    //var price =$('#shop_price').html();
    //var shop_price = Number(price.substring(1));
    var shop_price =$("#Real_price").val();
    Is_suppliers >0 ?   tmp_num=parseInt(Real_stock)    :   tmp_num=99999;
    Minimum_ord >0  ? tmp_num2=parseInt(Minimum_ord)    :   tmp_num2=1;
    if($("#restrict_num").length > 0){
        var restrict_num = parseInt($('#restrict_num').val()); //获取限购数量
        if(restrict_num < tmp_num){
            tmp_num = restrict_num;
        }
    }
    var must_html = '';

    if(!is_number_var.test(reality_num) || !is_number_zheng.test(reality_num) || reality_num > tmp_num || reality_num<tmp_num2){
        alert($weisiteLa.GouMaiShuLiangBiXuDaYu+tmp_num2+$weisiteLa.XiaoYu+tmp_num+$weisiteLa.DeZhengShu);
        if (is_jifen_limit == 2 && jifen_must_num > 0) {
            must_html = '<em id="all_must_jifen">&nbsp;+'+jifen_must_num*tmp_num2+jifen_name+'</em>';
        }
        $('#pro_num').val(tmp_num2);
        $('#pro_total').html('<b>'+$weisiteLa.zongJi+' </b><span class="newPrice"><em>'+ currencyType + shop_price + '</em>'+must_html+'</span>');
    }else{
        if (is_jifen_limit == 2 && jifen_must_num > 0) {
            must_html = '<em id="all_must_jifen">&nbsp;+'+jifen_must_num*reality_num+jifen_name+'</em>';
        }
        $('#pro_num').val(reality_num);
        $('#pro_total').html('<b>'+$weisiteLa.zongJi+' </b><span class="newPrice"><em>'+ currencyType +  nCount.mul(Number(shop_price), Number(reality_num)) + '</em>'+must_html+'</span>');
      }
}


function backTop(){
    //document.documentElement.scrollTop=0;
    $("html,body").animate({scrollTop:0},1000); ;
}

function check_doc_down(file_id,pass_tag){
    if (!pass_tag) {
        window.location = '/dom/down_doc_pass.php?username='+user_name+'&file_id='+file_id+'&isnopass=1';
    } else {
        var float_div_s='<form enctype="multipart/form-data" method="post" target="_blank" action="/dom/down_doc_pass.php" id="down_form" class="download-key-alert"><input type="hidden" value="'+user_name+'" name="username" id="user_name"> <input type="hidden" value="'+pass_tag+'" name="pass_tag" id="pass_tag"> <input type="hidden" value="'+file_id+'" name="file_id" id="file_id"><ul><li class="li-item"><strong>口令：</strong> <input autocomplete="off" type="password" name="pass_word" id="pass_word" value=""></li><li class="btn-item"><input type="button" value="提交" name="button22" onclick="check_doc_pass()"><input type="button" value="取消" onclick="remove_div()"></li></ul></form>';
        $.popup({
            type : 4,
            cName : "evPopupOpacity",
            head  : {yes:1, text:''},
            con : {
                html : float_div_s
            }
        });
    }
}

function getCookie (NameOfCookie) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(NameOfCookie+"=");
        if (begin != -1) {
            begin += NameOfCookie.length+1;//cookie值的初始位置
            end = document.cookie.indexOf(";", begin);//结束位置
            if (end == -1) end = document.cookie.length;//没有;则end为字符串结束位置
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}

function check_doc_price_pass () {
    $('#down_form').submit();
}

function check_doc_pass(){
    var pass_word=$("#pass_word").val();
    if(pass_word==""){
            alert("请填写口令！");
            return false;
        }else{
            $('#down_form').submit();
            remove_div();
        }
}
//用户登录处理
$(function(){
    var zz_userid=readCookie('zz_userid');

    if(!zz_userid || !user_name){
  }else{
        var time =UTCTimeDemo();
        $.post("/ajax_get_user_info.php", {type:"1",u:time,username:user_name,zz_userid:zz_userid},
            function(data){ $(".top-login").html(data);
        });
    }
})

// 将实体转换为字符
function decodeHtmlEntity(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

//sn生成
function pro_sn (guige_param) {
    if (!guige_param) {
        return false;
    }

    var tmp_sn = '';
    var tmp_sn_param = '';
    for (var i=0; i < guige_param.length; i++) {
        $.each($("#pro_param_"+guige_param[i]+" a"), function (m, item) {
            if ($(this).parent().parent().parent().hasClass('classify-cur')) {
                tmp_sn += guige_param[i] + ':' + parseInt($(this).attr('data-id')) + '|';
            }
        });
    }
    tmp_sn = tmp_sn.substring(0, tmp_sn.length-1);
    tmp_sn_param = Base64.encode(tmp_sn);
    tmp_sn_param = tmp_sn_param.replace(/\+/g, '-').replace(/\//g, '_');
    return tmp_sn_param;
}

// 动态价格查询
function param_combination_price() {
    var fail = 0;

    var Real_stock    = parseInt($('#Real_stock').val()); // 供货数量
    var default_price = parseFloat($("#default_price").val()); // 价格
    var shop_num      = parseInt($('#pro_num').val()); // 数量
    var currencyType  = $("#currency").val();
    var zero          = $('#zero').val();
    var jifen_name = $("#jifen_name").val();
    var is_jifen_limit = $("#is_jifen_limit").val();

    var isShowOldPrice = $("#isShowOldPrice").val();
    
    var id = parseInt($("#id").val());
    if (id < 1 || isNaN(id)) {
        return false;
    }

    if (G_.isCarPro === 1) {
        $(".reduce").removeAttr("data-noclick");

        return false;
    }

    $(".reduce").attr("data-noclick", 1);
    $("#innerNowBuy, #innerAddCat").addClass("but-desabled").attr("data-noclick", 1);

    var sParamVal = '';
    sParamVal = pro_sn(guige_param);
    if (fail == 1 || !sParamVal) {
        return false;
    }


    $.post(
        '/Ajax/GuiGe.php?username='+ user_name,
        {type:18, sn:sParamVal, id:id,isUserInfo:1},
        function (data) {
            if (!data || data == '') {
                $(".reduce").attr("data-noclick", 1);
                $("#pro_num").attr("disabled", "disabled");
                $("#pro_total").html("");
                if ($("#innerNowBuy").length > 0 || $("#innerAddCat").length > 0) {
                    $("#innerNowBuy,#innerAddCat").addClass("but-desabled").attr("data-noclick", 1);
                }
                $("#shop_price").html('<s class="noPrice">'+zero+'</s>');
                $("#Real_price").val(0);
                $("#pro_stock").html(0);
                if ($("#limitNum").length > 0) {
                    $("#limitNumBox").hide();
                    $("#limitNum").html(0);
                }
                $("#Real_stock").val(0);
                $("#weight").hide();
                $("#Real_weight").val(0);
                $("#jifenNum").html(0);
                $("#jifen").hide();
                $("#shopUnit").hide();
                $("#must_jifen").hide();
                $("#max_mony").hide().siblings('.show-coll-pro').addClass('show-coll-pro-nobuy')
                return false;
            }

            var param_id    = parseInt(data.guigeId);
            var weight      = parseFloat(data.weight);
            var num         = parseInt(data.buyStock);
            var shopStock   = parseInt(data.shopStock);
            var price       = parseFloat(data.price);
            var restrict_num= parseInt(data.restrict_num);
            var jifen_must_num = parseInt(data.jifen_must_num);
            var userPro     = data.userPro;
            var presales    = data.presales; 
            var market_price    = parseFloat(data.market_price);
            var pro_type    = parseFloat(data.pro_type);
            $("#jifen_must_num").val(jifen_must_num);
            var show_parice = '';
            (function(){
                var pPreview = $("#pPreview"),
                        bigPics  = pPreview.find('.show-big-pic .pic'),
                        bigPicW = bigPics.width(),
                        bigPicH = bigPics.height(),
                        bigPicsImg = bigPics.find("img");
                if (bigPicsImg.length > 0 && data.imgPath) {
                    var sImgUrl = data.imgPath,
                        oImg = new Image();
                    sImgUrl = sImgUrl.indexOf('?') != '-1' ? sImgUrl.substr(0, sImgUrl.indexOf('?')) : sImgUrl;
                    oImg.src = sImgUrl;
                    bigPicsImg.attr('src','/images/VNew/loading-wait-bg.gif').attr('data-imgsrc', sImgUrl);
                    oImg.onload = function () {
                        bigPicsImg.attr({
                            "src": oImg.src
                        });
                    };
                    oImg.src = sImgUrl + '?x-oss-process=image/resize,m_lfit,limit_1,w_' + parseInt(bigPicW) + ',h_' + parseInt(bigPicH);
                }
            })();

            if ($("#limitNum").length > 0) {
                var limitNum = parseInt(data.limitBuyNum);
                if (limitNum) {
                    $("#limitNum").html(limitNum);
                    $("#limitNumBox").show();
                } else {
                    $("#limitNumBox").hide();
                }
            }

            var actPrice = price;
            if (pro_type == 7) {
                var tbStr = '',className = '',tmp_rebatePrice=0;
                var cur_rebate = userPro['cur_rebate'];
                if (cur_rebate != '') {
                    actPrice = cur_rebate['rebatePrice'];
                }
                var rebate_arr = userPro['rebate_arr']; 
                var rebate_type = userPro['rebate_type'];
                if (userPro['show_zhekou'] == 1 && rebate_arr.length > 0) {
                     
                    $.each(rebate_arr,function(index,item){
                        className = (item['is_now_level'] == 1) ? ' class="cur"' : '';
                        if (0) {
                            if (rebate_type ==1) {
                                tmp_rebate_price = item['rebate_price'];
                                tmp_show = 1;
                            }else{
                                tmp_rebate_price = parseFloat(item['rebate']) /10;
                                tmp_rebate_price = (tmp_rebate_price * data.price).toFixed(2);
                                if (item['rebate'] > 0.00 && item['rebate'] <=10.00){
                                    tmp_show = 1;
                                }else{
                                    tmp_show = 0;
                                }
                            }
                        }
                        

                        if (0 &&  tmp_show == 1){
                            tbStr +='<tr><td'+className+'>'+item['name']+'</td><td'+className+'>'+ currencyType +item['rebate_price']+'</td></tr>';
                        }
                        tbStr +='<tr><td'+className+'>'+item['name']+'</td><td'+className+'>' +item['rebate_price']+'</td></tr>';
                    })
                    $('#userPro tbody').html(tbStr);
                } 
                if (cur_rebate != '') {
                    var tmp_str = cur_rebate['rebateNum']+$weisiteLa.Zhe;
                    var curRebateInfo = currencyType+cur_rebate['rebatePrice']+'<font>'+cur_rebate['level_name']+$weisiteLa.ZhuanXiang+' '+tmp_str+'</font>';
                    if (cur_rebate['oldPrice'] > 0 && nCount.sub(cur_rebate['oldPrice'],price) != 0) {
                        $('.oldPrice').html('<em>'+currencyType+cur_rebate['oldPrice']+'</em>');
                    }
                    
                    $('.new_em').html(curRebateInfo);
                } 
               
            }

            if (price <= 0) {
                show_parice = '<s class="noPrice">'+zero+'</s>';
                $("#jifen").hide();
                $("#shopUnit").hide();
            } else {
                if (isShowOldPrice == 1 && market_price > 0 && nCount.sub(market_price,price) != 0) {
                    if ($('.oldPrice').length > 0) {
                        $('.oldPrice').html('<em>'+currencyType+market_price+'</em>'); 
                    } else {
                        $(".newPrice").parent().append('<span class="oldPrice"> <em>'+currencyType+market_price+'</em> </span>'); 
                    }
                }
                
                show_parice = currencyType + price;
                $("#shopUnit").show();

                if(G_.sendjifen>=0){
                    if(G_.sendjifen>0){
                        $("#jifenNum").html(G_.sendjifen);
                        $("#jifen").show();
                    }
                }else{
                    if (G_.jifen) {
                        var jifen = 0;
                        if (price >= G_.jifen) {
                            jifen = parseInt(actPrice / G_.jifen);
                            $("#jifenNum").html(jifen);
                            $("#jifen").show();
                        } else {
                            $("#jifen").hide();
                        }
                    }
                }
            }

            if (presales && presales.length != 0){
                $('.oldPrice').html(currencyType+presales.price);
                $('#currentPresell').html(currencyType+presales.price);

                var presales_price_list = presales.price_list;
                $.each(presales_price_list,function(index,item){
                    $("#current_"+index).html(currencyType+item.price);
                })
            }
            $("#restrict_num").val(restrict_num);
            $("#restrict_show_num").html(restrict_num);
            $("#shop_price").html(show_parice);
            $("#pro_stock").html(shopStock);
            $("#Real_stock").val(num);
            $("#Real_price").val(actPrice);
            if(weight){
                $("#weight").show();
                $("#pro_weight").html(weight+$weisiteLa.Ke);
            }else{
                $("#weight").hide();
            }
            $("#Real_weight").val(weight);
            $(".param_id").val(param_id);

            if (num == 0) {
                $(".reduce").attr("data-noclick", 1);
                $("#pro_num").attr("disabled", "disabled");
                $("#pro_total").html("");
                if ($("#innerNowBuy").length > 0 || $("#innerAddCat").length > 0) {
                    $("#innerNowBuy, #innerAddCat").addClass("but-desabled").attr("data-noclick", 1);
                }
                $("#max_mony").hide().siblings('.show-coll-pro').addClass('show-coll-pro-nobuy');
                if (parseInt(data.isParentPro) !== 1) {
                    alert($weisiteLa.ZunJingDeGuiShangPinGaoXin);
                }
                return false;
            } else if (price <= 0 && data.buy_for_zero == 0) {
                $(".reduce").attr("data-noclick", 1);
                $("#pro_num").attr("disabled", "disabled");
                $("#pro_total").html("");
                if ($("#innerNowBuy").length > 0 || $("#innerAddCat").length > 0) {
                    $("#innerNowBuy, #innerAddCat").addClass("but-desabled").attr("data-noclick", 1);
                }
                $("#max_mony").hide().siblings('.show-coll-pro').addClass('show-coll-pro-nobuy')
                var Minimum_ord = parseInt($('#Minimum_ord').val());
                if(Minimum_ord > num){
                    alert($weisiteLa.gongHuoBuZu);
                    return false;
                }
            } else {
                var Minimum_ord = parseInt($('#Minimum_ord').val());
                if(Minimum_ord > num){
                    $(".reduce").attr("data-noclick", 1);
                    $("#pro_num").attr("disabled", "disabled");
                    $("#pro_total").html("");
                    if ($("#innerNowBuy").length > 0 || $("#innerAddCat").length > 0) {
                        $("#innerNowBuy, #innerAddCat").addClass("but-desabled").attr("data-noclick", 1);
                    }
                    $("#max_mony").hide().siblings('.show-coll-pro').addClass('show-coll-pro-nobuy')
                    alert($weisiteLa.gongHuoBuZu);
                    return false;
                } else {
                    if (parseInt(data.isBuy)) {
                        $(".reduce").removeAttr("data-noclick");
                    } else {
                        $(".reduce").attr("data-noclick", 1);
                    }
                    var total_price = actPrice*shop_num;
                    var must_html = '';
                    if (is_jifen_limit == 2 && jifen_must_num > 0) {
                        $("#must_jifen").html('&nbsp;+'+jifen_must_num*shop_num+jifen_name).show();
                        must_html = '<em id="all_must_jifen">&nbsp;+'+jifen_must_num*shop_num+jifen_name+'</em>';
                    }
                    $("#pro_total").html('<b>'+$weisiteLa.zongJi+' </b><span class="newPrice"><em>'+ currencyType + total_price + '</em>'+must_html+'</span>');
                    //获取选中推荐产品的价格
                    $("input:checkbox[name='check_ids[]']:checked").each(function(){
                        var pid = $(this).val();
                        var check_price     = parseFloat($('#shop_price_'+pid).html().slice(1));
                        total_price =  nCount.add(total_price ,check_price);
                    });
                    $("#commend_price").html(currencyType + total_price);
                    if ($("#innerNowBuy").length > 0 || $("#innerAddCat").length > 0) {
                        $("#innerNowBuy, #innerAddCat").removeClass("but-desabled").attr("data-noclick", 0);
                    }
                    $("#max_mony").show();
                }
            }
    },
    'json'
    );
        $(".reduce").attr("data-noclick", 1);
        // $("#pro_num").attr("disabled", "disabled");
        $("#pro_total").html("");

        if ($("#innerNowBuy").length > 0 || $("#innerAddCat").length > 0) {
            $("#innerNowBuy,#innerAddCat").addClass("but-desabled").attr("data-noclick", 1);
        }
}

/*****************************关于绑定滑轮滚动时间的方法函数*****************************/
(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
            // AMD. Register as an anonymous module.
            define(['jquery'], factory);
    } else if (typeof exports === 'object') {
            // Node/CommonJS style for Browserify
            module.exports = factory;
    } else {
            // Browser globals
            factory(jQuery);
    }
}
(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
            toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
            slice  = Array.prototype.slice,
            nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
            for ( var i = toFix.length; i; ) {
                    $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
            }
    }

    var special = $.event.special.mousewheel = {
            version: '3.1.9',

            setup: function() {
                    if ( this.addEventListener ) {
                            for ( var i = toBind.length; i; ) {
                                    this.addEventListener( toBind[--i], handler, false );
                            }
                    } else {
                            this.onmousewheel = handler;
                    }
                    // Store the line height and page height for this particular element
                    $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
                    $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
            },

            teardown: function() {
                    if ( this.removeEventListener ) {
                            for ( var i = toBind.length; i; ) {
                                    this.removeEventListener( toBind[--i], handler, false );
                            }
                    } else {
                            this.onmousewheel = null;
                    }
            },

            getLineHeight: function(elem) {
                    return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
            },

            getPageHeight: function(elem) {
                    return $(elem).height();
            },

            settings: {
                    adjustOldDeltas: true
            }
    };

    $.fn.extend({
            mousewheel: function(fn) {
                    return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
            },

            unmousewheel: function(fn) {
                    return this.unbind('mousewheel', fn);
            }
    });


    function handler(event) {
            var orgEvent   = event || window.event,
                    args       = slice.call(arguments, 1),
                    delta      = 0,
                    deltaX     = 0,
                    deltaY     = 0,
                    absDelta   = 0;
            event = $.event.fix(orgEvent);
            event.type = 'mousewheel';

            // Old school scrollwheel delta
            if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
            if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
            if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
            if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

            // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
            if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
                    deltaX = deltaY * -1;
                    deltaY = 0;
            }

            // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
            delta = deltaY === 0 ? deltaX : deltaY;

            // New school wheel delta (wheel event)
            if ( 'deltaY' in orgEvent ) {
                    deltaY = orgEvent.deltaY * -1;
                    delta  = deltaY;
            }
            if ( 'deltaX' in orgEvent ) {
                    deltaX = orgEvent.deltaX;
                    if ( deltaY === 0 ) { delta  = deltaX * -1; }
            }

            // No change actually happened, no reason to go any further
            if ( deltaY === 0 && deltaX === 0 ) { return; }

            // Need to convert lines and pages to pixels if we aren't already in pixels
            // There are three delta modes:
            //   * deltaMode 0 is by pixels, nothing to do
            //   * deltaMode 1 is by lines
            //   * deltaMode 2 is by pages
            if ( orgEvent.deltaMode === 1 ) {
                    var lineHeight = $.data(this, 'mousewheel-line-height');
                    delta  *= lineHeight;
                    deltaY *= lineHeight;
                    deltaX *= lineHeight;
            } else if ( orgEvent.deltaMode === 2 ) {
                    var pageHeight = $.data(this, 'mousewheel-page-height');
                    delta  *= pageHeight;
                    deltaY *= pageHeight;
                    deltaX *= pageHeight;
            }

            // Store lowest absolute delta to normalize the delta values
            absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

            if ( !lowestDelta || absDelta < lowestDelta ) {
                    lowestDelta = absDelta;

                    // Adjust older deltas if necessary
                    if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                            lowestDelta /= 40;
                    }
            }

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                    // Divide all the things by 40!
                    delta  /= 40;
                    deltaX /= 40;
                    deltaY /= 40;
            }

            // Get a whole, normalized value for the deltas
            delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
            deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
            deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

            // Add information to the event object
            event.deltaX = deltaX;
            event.deltaY = deltaY;
            event.deltaFactor = lowestDelta;
            // Go ahead and set deltaMode to 0 since we converted to pixels
            // Although this is a little odd since we overwrite the deltaX/Y
            // properties with normalized deltas.
            event.deltaMode = 0;

            // Add event and delta to the front of the arguments
            args.unshift(event, delta, deltaX, deltaY);

            // Clearout lowestDelta after sometime to better
            // handle multiple device types that give different
            // a different lowestDelta
            // Ex: trackpad = 3 and mouse wheel = 120
            if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
            nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

            return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
            lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
            // If this is an older event and the delta is divisable by 120,
            // then we are assuming that the browser is treating this as an
            // older mouse wheel event and that we should divide the deltas
            // by 40 to try and get a more usable deltaFactor.
            // Side note, this actually impacts the reported scroll distance
            // in older browsers and can cause scrolling to be slower than native.
            // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
            return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }
}));

/**
 * 生成sn标识
 * @param  {[type]} val [description]
 * @param  {[type]} ids [description]
 * @return {[type]}     [description]
 *
 * 2016/3/313 aliang add
 */
function encoderSn(val, ids)
{
    if (!val || !ids) {
        return false;
    }

    var sn = val +'|'+ ids;
    sn = Base64.encode(sn);
    return sn.replace(/\+/g, '-').replace(/\//g, '_');
}

/*****************************关于自定义滚动条的函数方法**************************/
(function($){
    $.fn.extend({
        cScroll : function(_j){
            return this.each(function(){
                var j = {
                  w : 12,
                  tbB : true,
                  fun : function(){}
                };
                j = $.extend(j,_j);

                var that = this,
                    _this = $(that),
                    Stime,
                    curT = 0,
                    bw = j.tbB ? j.w : 0,
                    maxT = 0,
                    whellPx = 0,
                    Sp = 0,
                    barMH = 0,
                    barH = 0,
                    curP = 1,
                    mouseD = true,
                    thatH = _this.height(),
                    thatCH = _this.children().height(),
                    oj = {};
                if(thatH < thatCH){ //判断内容的高度是否大于外边的高度
                    addScroll();
                }else{
                    if(_this.children(".c-scrollbar").length==1){
                        //_this.children(".c-scrollbar").remove();
                        addScroll();
                    }
                }
                function addScroll(){   //添加滚动条
                    var borderW1 =j.w/2-1;
                    var borderW2 = j.w-4;
                    _this.addClass("c-scroll").css({overflow:"hidden",position:"relative",padding:"0px"});
                    if(_this.children(".c-scrollbar").length==0){//存在性检测
                        _this.wrapInner("<div class='c-scrollcon' style='top:0px;zoom:1;position:relative;z-index:1'></div>");
                        _this.append('<div class="c-scrollbar" style="z-index:2; width:'+j.w+'px;"><div class="barbut-t"><em style="border-width:0px '+borderW1+'px '+borderW2+'px;"></em></div><div class="bar-m"><div class="bar-m-bg"></div><div class="bar"></div></div><div class="barbut-b"><em style="border-width:'+borderW2+'px '+borderW1+'px 0px;"></em></div><div class="c-pagenumber"><b class="num">1</b><small></small></div></div>');
                    }
                    oj.scrollcon = _this.children(".c-scrollcon"),
                    oj.scrollbar = _this.children(".c-scrollbar"),
                    oj.barButT = oj.scrollbar.children(".barbut-t"),
                    oj.barM = oj.scrollbar.children(".bar-m"),
                    oj.barM_bg = oj.barM.children(".bar-m-bg"),
                    oj.bar = oj.barM.children(".bar"),
                    oj.barButB = oj.scrollbar.children(".barbut-b");
                    oj.barPageNum = oj.scrollbar.children('.c-pagenumber');
                    barCount();
                    _this.on({
                        mouseenter : function(){
                            _this.data("chover",1);
                            oj.scrollbar.addClass("c-scrollbar-h");
                        },
                        mouseleave : function(){
                            _this.data("chover",0);
                            !mouseD || oj.scrollbar.removeClass('c-scrollbar-h');
                        },
                        mousewheel : function(event, delta, deltaX, deltaY){
                            if(delta > 0){curT -= whellPx;}else{curT += whellPx;};
                            setT();
                            if(delta < 0){
                                if(curT < maxT){
                                    return false;
                                }
                            }else{
                                if(curT > 0){
                                    return false;
                                }
                            }
                        }
                    });
                    oj.scrollbar.on({
                        mouseenter : function(){
                            $(this).data("chover",1);
                            $(this).addClass("c-scrollbar-me");
                        },
                        mouseleave : function(){
                            $(this).data("chover",0);
                            !mouseD || $(this).removeClass('c-scrollbar-me');
                        }
                    });
                    oj.bar.on({
                        mouseenter : function(){
                            $(this).data("chover",1);
                            !mouseD || $(this).addClass("bar-me");
                        },
                        mouseleave : function(){
                            $(this).data("chover",0);
                            !mouseD || $(this).removeClass('bar-me');
                        },
                        mousedown : function(e){
                            mouseD = false;
                            $(this).addClass("bar-md");
                            var pageY = e.pageY ,t = parseInt($(this).css("top"));

                            $(document).mousemove(function(e2){
                                curT =t+ e2.pageY - pageY;//pageY浏览器可视区域鼠标位置，screenY屏幕可视区域鼠标位置
                                setT();
                                return false;
                            });
                            $(document).mouseup(function(){
                                mouseD = true;
                                oj.bar.removeClass('bar-md');
                                if(_this.data("chover") == 0){
                                    _this.trigger('mouseleave');
                                }
                                if(oj.scrollbar.data("chover") == 0){
                                    oj.scrollbar.trigger('mouseleave');
                                }
                                if(oj.bar.data("chover") == 0){
                                    oj.bar.trigger('mouseleave');
                                }
                                $(document).unbind();
                            });
                            return false;
                        }
                    });
                    oj.barM_bg.on({
                        mousedown : function(e){
                            $(this).addClass("bar-m-bg-md");
                            //var cpx = e.pageY - oj.scrollbar.offset().top - barH/2 - bw;

                            curT = e.pageY - oj.scrollbar.offset().top - barH/2 - bw;
                            asetT();
                            return false;

                        },
                        mouseup : function(){
                            $(this).removeClass('bar-m-bg-md');
                        }
                    });
                    oj.barButT.on({
                        mouseenter : function(){
                            $(this).addClass("barbut-t-me");
                        },
                        mouseleave : function(){
                            $(this).removeClass('barbut-t-me');
                        },
                        mousedown : function(){
                            $(this).addClass("barbut-t-md");
                            timeSetT('u');
                            $(document).mouseup(function(){
                                oj.barButT.removeClass("barbut-t-md");
                                $(document).unbind();
                                clearTimeout(Stime);
                                Sp=0;
                            });
                        }
                    });
                    oj.barButB.on({
                        mouseenter : function(){
                            $(this).addClass("barbut-b-me");
                        },
                        mouseleave : function(){
                            $(this).removeClass('barbut-b-me');
                        },
                        mousedown : function(){
                            $(this).addClass("barbut-b-md");
                            timeSetT('d');
                            $(document).mouseup(function(){
                                oj.barButT.removeClass("barbut-b-md");
                                $(document).unbind();
                                clearTimeout(Stime);
                                Sp=0;
                            });
                        },
                        mouseup : function(){
                            $(this).removeClass('barbut-b-md');
                        }
                    });
                }
                function timeSetT(d){
                    //var self=this;
                    if(d == "u"){curT -= whellPx;}else{curT += whellPx;};
                    setT();
                    Sp += 2;
                    var t = 500 - Sp*50;
                    if(t<=0){t=0};
                    Stime = setTimeout(function(){timeSetT(d);},t);
                }
                function barCount(){
                    j.fun.call(that);
                    var cH = oj.scrollcon.height();
                    oj.scrollbar.height(thatH);
                    if(j.tbB){
                        barMH = thatH - j.w * 2;
                    }else{
                        barMH = thatH;
                        oj.barButB.css("display","none");
                        oj.barButT.css("display","none");
                    }
                    barH = (thatH / thatCH) * barMH;
                    barH = barH < 20 ? 20 : barH;
                    maxT = barMH - barH;
                    whellPx = barH / 4;
                    oj.barM.height(barMH);
                    oj.barM_bg.height(barMH);
                    oj.bar.height(barH);
                }
                function setT(){
                    j.fun.call(that);
                    if(curT > maxT){curT = maxT;}
                    if(curT < 0){curT = 0;}
                    oj.bar.css({top:curT});
                    var scT = (curT / maxT) * (thatCH - thatH + (thatH / 10));
                    oj.scrollcon.css({top:-scT});
                }
                function asetT(){
                    j.fun.call(that);
                    if(curT > maxT){curT = maxT;}
                    if(curT < 0){curT = 0;}
                    oj.bar.css({top:curT});
                    var scT = -(curT / maxT) * (thatCH - thatH + (thatH / 40));
                    oj.scrollcon.animate({top:scT},1000);
                }
            });
        }
    })
})(jQuery);
