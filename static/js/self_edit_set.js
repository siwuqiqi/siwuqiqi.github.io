// JavaScript Document
var location_arr=window.location.href.split("#");
var end_tag=location_arr[location_arr.length-1];
if(end_tag=='evedit')ini_self_edit();
//初始编辑
function ini_self_edit(){
	$("a").each(function(){
		$("a").attr("target","_self");
		var tmp_href=$(this).attr('href');
		if(tmp_href!=undefined){
			tmp_href=trim(tmp_href);
			var pos=tmp_href.indexOf("javascript");
			if(tmp_href!='' && pos==-1  && tmp_href!='#' && tmp_href!='###'){
				if(tmp_href=='/vip_'+user_name+'.html'){
					tmp_href='/self_define/index.php?username='+user_name+'&is_frame=1&is_action=2';
				}else{
					tmp_href=tmp_href+'#evedit';
				}
				$(this).attr('href',tmp_href);
			}
		}
	});
	//内页可编辑状态
	//if(is_edit==1)
	set_qu_edit();
}
