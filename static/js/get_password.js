// JavaScript Document
function login_check(){
  var login_name =$('#user_name').val();
  var email =$('#email').val();
  var validatecode=$('#validatecode').val();
  var name_Tip = $('#name_Tip'),email_Tip = $('#email_Tip'),validatecode_Tip = $('#validatecode_Tip');
  if(login_name==''){
    $('#name_Tip').html($PLa.NinDeYongHuMingBuCunZai);
    $('#name_Tip').show();
    $('#user_name').focus();
    return false;
  }else{
    $('#name_Tip').hide();
  }
  if(email==''){
    email_Tip.html($PLa.ZhuCeYouXiangBuNengWeiKong);
    email_Tip.show();
    $('#email').focus();
    return false;
  }else{
    email_Tip.hide();
  }
  if(!checkEmail(email)){
    email_Tip.html($PLa.ZhuCeYouXiangGeShiBuZhengQue);
    email_Tip.show();
    $('#email').focus();
    return false;
  }else{
    email_Tip.hide();
  }
  if(!validatecode){
      $('#code_span').hide();
      validatecode_Tip.html($PLa.YanZhengMaBuNengWeiKong);
      validatecode_Tip.show();
      return false;
    }else{
    var date = new Date();
    var url = "/dom/ajax_captcha.php?ajax=1&captcha="+validatecode+"&t="+date.getTime();
    $.post(url,function(data){
      if(1 == parseInt(data)){
        validatecode_Tip.show();
        $('#code_span').hide();
        return false;
      }else{
        validatecode_Tip.hide();
        $('#code_span').show();
          $('#subing').show();
        $('#sub_now').hide();
        $('#form2').submit();
      }
    });
  }
}




// ----------------手机找回密码----------------
var isSendMsg = 0;
$(function(){
  $("#user_name1").on("blur",function(){
    check_user_name();
  })

  $("#mobile").on("blur",function(){
    check_mobile();
  })

  $("#validatecode1").on("blur",function(){
    check_yzm();
  })

  $("#mobile_code").on("blur",function(){
    check_mobile_code();
  })

  $("#new_pwd").on("blur",function(){
    checkPassword("new_pwd",0);
  })

  $("#confirm_pwd").on("blur",function(){
    checkPassword("confirm_pwd",1);
  })
})

// 检查用户名
function check_user_name(){
  var user_name = $.trim($("#user_name1").val());
  if (user_name == ''){
    $("#name1_Tip").html($PLa.YongHuMingBuNengWeiKong);
    $("#name1_Tip").show();
    return false;
  }else if(/^(\w){6,20}$/.test(user_name)==false){
    $("#name1_Tip").html($PLa.ZhangHaoZiFu);
    $("#name1_Tip").show();
    return false;
  }else{
    $("#name1_Tip").html("");
    $("#name1_Tip").hide();
    return true;
  }
}

// 检查手机号
function check_mobile(){
  var mobile = $.trim($("#mobile").val());
  if (mobile == ''){
    $("#mobile_Tip").html($PLa.ShouJiHaoBuNengWeiKong);
    $("#mobile_Tip").show();
    return false;
  }else if(/(^0{0,1}1[0-9]{1}[0-9]{9}$)/.test(mobile)==false){
    $("#mobile_Tip").html($PLa.ShouJiHaoWeiShuZi);
    $("#mobile_Tip").show();
    return false;
  }else{
    $("#mobile_Tip").html("");
    $("#mobile_Tip").hide();
    return true;
  }
}

// 检查验证码
function check_yzm(){
  var yzm = $.trim($('#validatecode1').val());
  if (!yzm) {
    $("#validatecode1_Tip").html($PLa.YanZhengMaBuNengWeiKong);
    $("#validatecode1_Tip").show();
    return false;
  }else{
    $("#validatecode1_Tip").html("");
    $("#validatecode1_Tip").hide();
    return true;
  }
}

// 检查短信验证码
function check_mobile_code(){
  var mobile_code = $.trim($('#mobile_code').val());
  if (!mobile_code) {
    $("#mobilecode_Tip").html($PLa.DuanXinYanZhengMaBuNengKong);
    $("#mobilecode_Tip").show();
    return false;
  }else{
    $("#mobilecode_Tip").html("");
    $("#mobilecode_Tip").hide();
    return true;
  }
}

function checkPassword(id, index) {
    if (!id) return false;
    var sThisVal = $.trim($('#'+id).val());
    var aName = [$PLa.Xin, $PLa.QueRen];
    var aError = ['newpwd_Tip','confirmpwd_Tip'];

    if (sThisVal.length == "") {
        $("#"+aError[index]).html(aName[index] +$PLa.MiMaBuNengWeiKong);
        $("#"+aError[index]).show();
        return false;
    }else if(/^(\w){6,20}$/.test(sThisVal)==false){
        $("#"+aError[index]).html(aName[index] +$PLa.MiMaWeiZiFu);
      $("#"+aError[index]).show();
        return false;
    } else {
      if (id == 'confirm_pwd') {
        sPwdVal = $.trim($('#new_pwd').val());

        if (sPwdVal!= '' && sThisVal==sPwdVal) {
          $("#confirmpwd_Tip").html('');
        $("#confirmpwd_Tip").hide();
            return true;
        } else {
            $("#confirmpwd_Tip").html($PLa.LiangCiMiMaBuYiZhi);
        $("#confirmpwd_Tip").show();
          return false;
        }
      } else {
        $("#"+aError[index]).html('');
      $("#"+aError[index]).hide();
        return true;
      }
    }
}

// 手机找回密码第一步（输入用户名，手机号，验证码和短信验证码）
function find_pwd_step_1(obj){
  $(obj).val($PLa.ChuLiZhong+"...");
  $(obj).removeAttr("onclick");

  var name_check       = check_user_name();
  var mobile_check     = check_mobile();
  var yzm_check        = check_yzm();
  var mobile_code_check= check_mobile_code();
  if (!name_check || !mobile_check || !yzm_check || !mobile_code_check){
    $(obj).val($PLa.XiaYiBu);
    $(obj).attr("onclick",'find_pwd_step_1(this)');
    return false;
  }

  if (!isSendMsg){
    alert_frame($PLa.HuoQuDuanXinYanZhengMa);
    $(obj).html($PLa.XiaYiBu);
    $(obj).attr("onclick",'find_pwd_step_1(this)');
    return false;
  }

  var user_name    = $.trim($("#user_name1").val());
  var mobile       = $.trim($("#mobile").val());
  var validatecode = $.trim($("#validatecode1").val());
  var mobile_code  = $.trim($("#mobile_code").val());
  var url="/dom/ajax_pwd_action.php?username="+username_url;
  $.ajax({
      type: 'POST',
      url: url,
      data:{"type":4,"mobile":mobile,"name":user_name,"validatecode":validatecode,"mobile_code":mobile_code},
      dataType: 'json',
      cache: false,
      error: function(){
          alert($PLa.WangLuoFanMang);
          $(obj).val($PLa.XiaYiBu);
          $(obj).attr("onclick",'find_pwd_step_1(this)');
          return false;
      },
      success:function(data){
        if (data['res'] ==1){
          alert(data['message']);
          $(obj).val($PLa.XiaYiBu);
          $(obj).attr("onclick",'find_pwd_step_1(this)');
          return false;
        }else{
          $("#mobile_check").hide();
        $("#pwd_reset").show();
        }
      }
  })
}

// 手机找回密码第二步（输入新密码和确认密码并验证）
function find_pwd_step_2(obj){
  $(obj).val($PLa.ChuLiZhong+"...");
  $(obj).removeAttr("onclick");

  var new_pwd_check = checkPassword("new_pwd",0);
  if (!new_pwd_check){
    $(obj).val($PLa.XiaYiBu);
    $(obj).attr("onclick",'find_pwd_step_2(this)');
    return false;
  }
  var confirm_pwd_check = checkPassword("confirm_pwd",0);
  if(!confirm_pwd_check){
      $(obj).val($PLa.XiaYiBu);
      $(obj).attr("onclick",'find_pwd_step_2(this)');
      return false;
  }

  var user_name    = $.trim($("#user_name1").val());
  var mobile       = $.trim($("#mobile").val());
  var confirm_pwd  = $.trim($("#confirm_pwd").val());
  var new_pwd      = $.trim($("#new_pwd").val());
  var url="/dom/ajax_pwd_action.php?username="+username_url;
  $.ajax({
      type: 'POST',
      url: url,
      data:{"type":3,"mobile":mobile,"name":user_name,"confirm_pwd":confirm_pwd,"new_pwd":new_pwd},
      dataType: 'json',
      cache: false,
      error: function(){
          alert($PLa.WangLuoFanMang);
          $(obj).val($PLa.XiaYiBu);
          $(obj).attr("onclick",'find_pwd_step_2(this)');
          return false;
      },
      success:function(data){
        if (data['res'] ==1){
          alert(data['message']);
          $(obj).val($PLa.QueRen);
          $(obj).attr("onclick",'find_pwd_step_2(this)');
          return false;
        }else{
          alert($PLa.MiMaXiuGaiChengGong);
          window.location.href="/dom/denglu.php?username="+username_url;
        }
      }
  })
}

/***********************发送手机验证码***************************/
var tncode_div_pc = false;
function send_mob_code(type,obj){
  var this_ = $('#'+obj);
  var name_check= check_user_name();
  var mobile_check= check_mobile();
  var yzm_check   = check_yzm();
  if (!name_check || !mobile_check || !yzm_check){
    return false;
  }
  if(this_.attr("data-get")=="true"){
    var user_id   = this_.data('userid');
    var mobile    = $.trim($("#mobile").val());
    if(type && mobile && user_id){
        if(!tncode_div_pc){
            tncode.init('get-yzm-but',1);
            tncode_div_pc =true;
        }else{
            tncode.show();
        }
        $TN.onsuccess(function(){
            this_.attr("data-get","false");
            this_.html($PLa.FaSongZhong+"...");
            var url = "/dom/ajax_zhuce_code.php?type="+type+"&userid="+user_id+"&mobile="+mobile+"&username="+user_name+"&tn_r="+tncode._mark_offset;
            $.post(url, function(data){
                if (data == 1) {
                    showAllzz($PLa.ShouJiHaoMaYiBangDing);
                    return false;
                }
                if(data == 'success'){
                    change_miao(this_);
                }else{
                    showAllzz($PLa.WangLuoFanMang);
                    this_.html($PLa.HuoQuYanZhengMa);
                    this_.attr("data-get","true");
                    this_.removeClass("butFalse");
                }
            });
        })
    }
  }else{
    return false;
  }
}

function change_miao(obj){
  obj.addClass("butFalse");
  var a = 60;
  var time = setInterval(function(){
    isSendMsg = 1;
  obj.html(a+$PLa.MiaoHouKeChongXinHuoQu);
  if(a == 0){
    clearInterval(time);
    obj.html($PLa.HuoQuYanZhengMa);
    obj.attr("data-get","true");
    obj.removeClass("butFalse");
    var new_html='<span>'+$PLa.YiFaYanZhengMaMeiShouDao+'：<a onclick="send_mob_code(5,\'send_miao\')" class="hqyzm" id="hqyzm_id" href="javascript:;">'+$PLa.ChongXinHuoQuYanZhengMa+'</a></span>';
    $("#mobileCodeError").html(new_html);
  }
  a--;
  },1000);
}
