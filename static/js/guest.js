function sendmsg(obj,obj_form){
	//name
	var name= $('#name').val();
	name = trim(name);

	if(is_guest_book===0 && !zz_userid){
		alert("非会员不能留言，请登录或注册！");
		return false;
	}

	if( strLen(name)<4 ){
		document.getElementById("e_name").innerHTML ="<span style='font-size:12px;color:red'>名字不能少于4个字符，2个汉字</span>";
		return false;
	}else{
		document.getElementById("e_name").innerHTML ="<span style='font-size:12px;color:green'>正确</span>";
	}

	//company
	var Company= $('#Company').val();
	Company = trim(Company);

	if( strLen(Company)<8 ){
		document.getElementById("e_company").innerHTML ="<span style='font-size:12px;color:red'>公司名字不能少于8个字符，4个汉字</span>";
		return false;
	}else{
		document.getElementById("e_company").innerHTML ="<span style='font-size:12px;color:green'>正确</span>"
	}

	//e_mail
	var e_mail= $('#e_mail').val();
	e_mail = trim(e_mail);
	var tag=checkEmail(e_mail);
	if(tag==false){
		document.getElementById("e_ml").innerHTML ="<span style='font-size:12px;color:red'> 请填写正确的邮件地址</span>";
		return false;
	}else{
		document.getElementById("e_ml").innerHTML ="<span style='font-size:12px;color:green';> 正确</span>"
	}
	//tel
	var tel= $('#tel').val();
	tag = phonecheck(tel);
	if(tag==false){
		document.getElementById("e_tel").innerHTML ="<span style='font-size:12px;color:red'> 请填写正确的电话号码</span>";
		return false;
	}else{
		document.getElementById("e_tel").innerHTML ="<span style='font-size:12px;color:green' > 正确</span>"
	}

	//content
	var content= $('#content').val();
	content = trim(content);
	if( strLen(content)<20){
		document.getElementById("e_content").innerHTML ="<span style='font-size:12px;color:red'> 留言内容不能少于20个字符，10个汉字</span>";
		return false;
	}else if(strLen(content)>400){
		document.getElementById("e_content").innerHTML ="<span style='font-size:12px;color:red'> 留言内容不能超过400个字符，200个汉字</span>";
		return false;
	}else{
		document.getElementById("e_content").innerHTML ="<span style='font-size:12px;color:green'> 正确</span>";
	}

	var validatecode= $('#validatecode').val();
	validatecode = trim(validatecode);
	if(validatecode==''){
		$("#e_validatecode").html("<span style='font-size:12px;color:red'>请填写验证码！</span>");
		return false;
	}else{
		$("#e_validatecode").html("<span style='font-size:12px;color:green'> 正确</span>");
	}
	if($(obj).data('des') !=1){
		$(obj).val('提交中...').data('des',1);
		$('#messageForm').submit();
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

//字符长度
function strLen(key){
	var l=escape(key),len
	len=l.length-(l.length-l.replace(/\%u/g,"u").length)*4
	l=l.replace(/\%u/g,"uu")
	len=len-(l.length-l.replace(/\%/g,"").length)*2
	return len;
}

//email 判断
function checkEmail(cEmail)
{
　 var arr=cEmail.split('@');
　 var c=true;
　 if(arr.length!=2)
　　c=false;
　 else if(!arr[0].length||!arr[1].length)
　　c=false;
　 else if(arr[1].split('.').length!=2)
　　c=false;
　 else if(!arr[1].split('.')[0].length||arr[1].split('.')[1].length<2||arr[1].split('.')[1].length>4)
　　c=false;
　 return c;
}

//电话
function phonecheck(s){
	var str=s;
	//var reg=/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{3,4}\-[0-9]{7,8}\-[0-9]{3,4}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{1}[0-9]{9}$)/;
	//var reg=/(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
	var reg = /((^(\+86|86)?[0]?1[3578]\d{9})|(^\d{3,4}\-\d{7,8})|(^\d{3,4}\-\d{7,8})\-\d{1,4})$/;
	//alert(reg.test(str));
	if (reg.test(str)==false){
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

//设置背景
function set_bg(tmp_width){

	//将背景变灰
	var bg_div = '<div id="bg_div" style= "position:absolute;left:0px;top:0px;filter:alpha(opacity=60);z-index:98;width:'+$(document).width()+'px;height:'+$(document).height()+'px;background:#000;" align="center"><iframe src="" style="position:absolute; visibility:inherit; top:0px; left:0px; width:'+$(document).width()+'px; height:'+$(document).height()+'px; z-index:-1;filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\';" frameborder="0"></iframe></div>';
	$('body').append(bg_div);

	//显示出已经添加完以后的数据
	var offset_height = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
	var offset_width = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
	var offset_top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
	var top_height = offset_top+(offset_height - 350)/2;
	var left_width = (offset_width - tmp_width)/2;

	var tmp_arr = new Array(top_height,left_width);
	return tmp_arr;
}

//清除浮动
function remove_div(div_id){
	$('#bg_div').remove();
	$('#'+div_id+'').remove();
}


//回复回复
function re_book(re_id){
	var tmp_obj =document.getElementById("add_"+re_id);
	tmp_obj.innerHTML ='<br clear="all"><div><textarea rows="8" style="width:220px;border:1px solid #ccc;height:80px" name="re_content" id="re_content"></textarea>&nbsp;</div><div id="r_error'+re_id+'"></div><br clear="all" /><div class="mt8"><div><input type="button" value="提交" onclick="submit_re_book('+re_id+');"/>&nbsp;<input type="button" value="取消" onclick="rm_book('+re_id+');"/></div>';
}

//new回复回复
function re_newbook(re_id){
	var tmp_obj =document.getElementById("add_"+re_id);
	tmp_obj.innerHTML ='<textarea name="re_content" id="re_content"></textarea><p id="r_error'+re_id+'"></p><div class="replySubmit-but"><input type="button" value="提交" onclick="submit_re_book('+re_id+');"/>&nbsp;<input type="button" value="取消" onclick="rm_book('+re_id+');"/></div>';
}

function rm_book(re_id){
	re_id=parseInt(re_id);
	var tmp_obj =document.getElementById("add_"+re_id);
	tmp_obj.innerHTML ='';
}
function submit_re_book(re_id){

	if(is_re_guest_book==0 && zz_userid==0){
		alert("非会员不能留言，请登录或注册！");
		return false;
	}

	var sss =document.getElementById("re_content").value;
	sss = trim(sss);
	if(sss==''){
		document.getElementById("r_error"+re_id).innerHTML ="<span style='font-size:12px;color:red'>回复内容不能为空</span>";
		return false;
	}
	if(strLen(sss)>400){
		document.getElementById("r_error"+re_id).innerHTML ="<span style='font-size:12px;color:red'>回复内容不能大于400个字符，200个汉字</span>";
		return false;
	}

	if (parseInt(isTj) === 1) {
        if(!tncode_div){
            tncode.init('MessageBut',1);
            tncode_div =true;
        }else{
            tncode.show();
        }

        $TN.onsuccess(function(){
            var time=UTCTimeDemo();
            $.post(
                "/Ajax/GuestBook.php",
                {type:1,des:sss,re_id:re_id,u:time,username:user_name,tn_r:tncode._mark_offset},
                function(data){
                    tncode_div = false;

                    if(parseInt(data.status) === 200){
                        rm_book(re_id);
                        get_re_book(re_id);
                    }else{
                        alert(data.msg);
                    }
                },
                "json"
            );
        });
    } else {
        var time=UTCTimeDemo();
        $.post("../ajax_set_info.php", {type:"9",des:sss,re_id:re_id,u:time,u_name:user_name},
               function(data){
                   if(data==0){
                   }else{
                       rm_book(data);
                       get_re_book(data);
                   }
               }
        );
    }
}

function get_re_book(re_id){
	re_id=parseInt(re_id);
	var url =  "../ajax_set_info.php?type=7&u_name="+user_name+"&re_id="+re_id+"&u="+UTCTimeDemo();
	//alert(url);
	$('#re_'+re_id).load(url).ajaxSuccess(
		function(){
			$(this).show();
		}
	);
}
function get_re_re(re_ids){
	if(re_ids==0){
	}else{
		var tmp_arr =re_ids.split(",");
		for(var i = 0; i < tmp_arr.length; i++){
			get_re_book(tmp_arr[i]);
		}
	}
}

//时间戳
function UTCTimeDemo(){
	   var now = new Date().getTime();
	   var datestr=escape(now*1000+Math.round(Math.random()*1000));
	   return datestr;
}
