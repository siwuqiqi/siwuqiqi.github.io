(function(e,t,a){e.popup={numbers:0,index:1e3,domName:["","Alert","Confirm","Prompt","Layer","Iframe","Loading","Taps"]};var o=function(e){var a=this,o={addTarget:t("body"),type:1,cName:"",shade:{yes:1,bgColor:"#000000",opacity:.5,animate:{type:1,target:.2},close:!1},area:{w:"auto",h:"auto"},offset:{fix:1,t:"auto",r:"auto",b:"auto",l:"auto"},zIndex:{yes:0,val:1e3},animate:{type:1,target:1},autoClose:{yes:0,time:0},move:{yes:1,handle:".evPopupHead"},head:{yes:1,text:"系统提示"},opBut:{yes:1,close:1,min:0,max:0},con:{text:[1,"提示信息"],img:[1,"wran"],src:"http://www.evyun.cn",html:"<p>这是html代码</p>"},but:{yes:0,button:{}},bfun:function(){}};switch(e.type){case 1:o.but.yes=1,o.but.button={but_1:{text:"确定",fun:function(){}}};break;case 2:case 3:o.but.yes=1,o.but.button={but_1:{text:"确定",fun:function(){}},but_2:{text:"取消",fun:function(){}}};break;case 4:case 5:break;case 6:o.head.yes=0,o.opBut.yes=0,o.con.img[0]=1,o.con.img[1]="loading";break;case 7:o.head.yes=0,o.opBut.yes=0}a.j=t.extend(!0,{},o,e),popup.numbers++,a.numbers=popup.numbers,a.j.zIndex.yes?a.index=a.j.zIndex.val:a.index=Math.max.apply(null,t.map(t("body > *"),function(e,a){var o=parseInt(t(e).css("z-index"));return o>2e9&&(o=1e3),o||1e3})),a.createDom()};o.pt=o.prototype,o.pt.winAttr=function(a){this.winW=t(e).width(),this.winH=t(e).height(),this.domW=t(document).width(),this.domH=t(document).height(),this.domST=t(document).scrollTop(),this.domSL=t(document).scrollLeft(),this.popupW=a.width(),this.popupH=a.height()},o.pt.createDom=function(){var e=this,a=e.j,o=t('<div class="evPopupShade" id="evPopupShade_'+e.numbers+'"></div>'),i=t('<div class="evPopup bounceScale" id="evPopup_'+e.numbers+'"></div>'),p=t('<small class="funBut rmovePopup"></small>'),n=t('<small class="funBut hidePopup"></small>'),s=t('<small class="funBut showPopup"></small>'),d=t('<div class="evPopupOpbut"></div>'),u=t('<div class="evPopupHead"><div class="evPopupHeadL"></div><div class="evPopupHeadC"><div class="evPopupHeadName">'+a.head.text+'</div></div><div class="evPopupHeadR"></div></div>'),c=t('<div class="evPopupBody"><div class="evPopupBodyT"><div class="evPopupBodyTL"></div><div class="evPopupBodyTC"></div><div class="evPopupBodyTR"></div></div><div class="evPopupBodyC"><div class="evPopupBodyCL"></div><div class="evPopupBodyCR"></div><div class="evPopupBodyCC"></div></div><div class="evPopupBodyB"><div class="evPopupBodyBL"></div><div class="evPopupBodyBC"></div><div class="evPopupBodyBR"></div></div></div>'),r=t('<div class="ev'+popup.domName[a.type]+'Con"></div>'),v=t('<div class="evPopupButArea"><div class="evPopupBut"></div></div>');if(o.data("dataIndex",e.numbers).addClass("evShade"+popup.domName[a.type]).css({"z-index":++e.index,"background-color":a.shade.bgColor,opacity:a.shade.opacity}).attr("data-dataIndex",e.numbers),i.data("dataIndex",e.numbers).addClass("evPopup"+popup.domName[a.type]+" "+a.cName).css({"z-index":++e.index}).attr("data-dataIndex",e.numbers),p.data("dataIndex",e.numbers).on("click",function(){e.closeAnimate(o,a.shade.animate),e.closeAnimate(i,a.animate)}).appendTo(i),n.data("dataIndex",e.numbers).on("click",function(){e.popupHide(o),e.popupHide(i)}).appendTo(i),s.data("dataIndex",e.numbers).on("click",function(){e.popupShow(o),e.popupShow(i)}).appendTo(i),popup.index+=2,a.opBut.yes){if(a.opBut.close){var h=t('<span class="evOpbutClose"></span>');h.attr({title:"关闭"}).data("dataIndex",e.numbers).on({mouseenter:function(){t(this).addClass("evOpbutCloseHover")},mouseleave:function(){t(this).removeClass("evOpbutCloseHover")},click:function(){p.trigger("click")}}).appendTo(d)}if(a.opBut.min){var l=t('<span class="evOpbutMin"></span>');l.attr({title:"最小化"}).data("dataIndex",e.numbers).on({mouseenter:function(){t(this).addClass("evOpbutMinHover")},mouseleave:function(){t(this).removeClass("evOpbutMinHover")},click:function(){}}).appendTo(d)}if(a.opBut.max){l=t('<span class="evOpbutMin"></span>');var m=t('<span class="evOpbutManmin"></span>');l.attr({title:"最大化"}).data("dataIndex",e.numbers).on({mouseenter:function(){t(this).addClass("evOpbutManHover")},mouseleave:function(){t(this).removeClass("evOpbutManHover")},click:function(){}}).appendTo(d),m.attr({title:"还原"}).data("dataIndex",e.numbers).on({mouseenter:function(){t(this).addClass("evOpbutManminHover")},mouseleave:function(){t(this).removeClass("evOpbutManminHover")},click:function(){}}).appendTo(d)}d.appendTo(i)}switch(a.type){case 1:case 2:var f=1==a.con.text[0]?'<span class="hintText">'+a.con.text[1]+"</span>":"";w=1==a.con.img[0]?'<em class="icon '+a.con.img[1]+'Icon"></em>':"";r.append(w,f);break;case 3:var y=t('<div class="inputTextE"><div class="inputText"><input type="text"></div></div>');1==a.con.text[0]&&y.find("input").attr("placeholder",a.con.text[1]),r.append(y);break;case 4:var b="object"==typeof a.con.html?a.con.html.html():a.con.html;r.append(b);break;case 5:var x=t('<iframe src="'+a.con.src+'" frameborder="0" scrolling="no" allowTransparency="true" name="popupIframe_'+e.numbers+'" id="popupIframe_'+e.numbers+'"></iframe>');x.css({height:"auto"}).appendTo(r);break;case 6:var g=t('<div class="loadingImg"></div>'),w=t('<em class="'+a.con.img[1]+'Icon"></em>');r.append(g.append(w));break;case 7:var P=t('<p class="tapsText">'+a.con.text[1]+"</p>");r.append(P)}if(c.find(".evPopupBodyCC").append(r),a.but.yes){if(1==a.type||2==a.type||3==a.type){var B=0,T=null,C=null,H=null,k=null;t.each(a.but.button,function(e,a){B++,T=a.cName||"",a.href&&1===a.href.yes?(C=a.href.url,H='target="'+(a.href.target||"_blank")+'"'):(C="javascript:;",H=""),k=t('<a href="'+C+'" '+H+' class="popupBut popupBut_'+B+" "+T+'"><b class="popupButI">'+a.text+"</b></a>"),k.data("data-name",e).appendTo(v.children(".evPopupBut"))}),v.find(".popupBut").each(function(){t(this).width(100/B+"%")}),v.on({click:function(){var e=t(this).data("data-name");"function"==typeof a.but.button[e].fun&&a.but.button[e].fun(),p.trigger("click")}},".popupBut")}v.appendTo(i)}a.shade.yes&&(o.appendTo(a.addTarget),e.shadeCountWH(o),e.openAnimate(o,a.shade.animate),a.shade.close&&o.on("click",function(){e.closeAnimate(o,a.shade.animate),e.closeAnimate(i,a.animate)})),a.head.yes&&u.prependTo(i),i.append(c).appendTo(a.addTarget),e.popupCountWH(i),e.winAttr(i),e.popupOffset(i),e.openAnimate(i,a.animate),a.autoClose.yes&&setTimeout(function(){p.trigger("click")},1e3*a.autoClose.time),a.move.yes&&e.popupMove(i)},o.pt.popupCountWH=function(e){var a=this,o=a.j,i=0,p=0,n=0,s=e.find(".evPopupBodyCC");if(o.head.yes){i=e.find(".evPopupHead").height();var d=i-e.children("div.evPopupBody").children("div.evPopupBodyT").height();s.css({"padding-top":d+"px"}),n-=i}if(o.but.yes&&(p=e.find(".evPopupButArea").height(),s.css({"padding-bottom":p+"px"}),n-=p),"auto"!=o.area.w&&e.css({width:o.area.w+"px"}),"auto"!=o.area.h?(e.css({height:o.area.h+"px"}),n=o.area.h-e.children("div.evPopupBody").children("div.evPopupBodyT").height()-e.children("div.evPopupBody").children(".evPopupBodyB").height()+n):n=e.height()-e.children("div.evPopupBody").children("div.evPopupBodyT").height()-e.children("div.evPopupBody").children(".evPopupBodyB").height()+n,s.css({height:n+"px"}),5==o.type)if("auto"==o.area.w&&"auto"==o.area.h){var u=t('<div class="loadingWait"></div>'),c=s.outerHeight(),r=s.find("iframe");u.css({height:c+"px"}).appendTo(s),r.load(function(){u.remove(),r[0].contentWindow.iframeNumber=a.numbers;var t=r.contents().width(),o=r.contents().height();s.children("div.evIframeCon").css({width:t+"px",height:o+"px"}),r.css({width:t+"px",height:o+"px"});var i=e.find(".evPopupBodyC").outerWidth();e.css({width:i+"px"}),a.winAttr(e),a.popupOffset(e)})}else{var v=e.children(".evPopupBody").find("div.evIframeCon").width(),h=e.children(".evPopupBody").find("div.evIframeCon").height();u=t('<div class="loadingWait"></div>'),c=s.outerHeight(),r=s.find("iframe");u.css({height:c+"px",width:"100%"}).appendTo(s),r.css({width:v+"px",height:h+"px",top:"10px"}),r.load(function(){r[0].contentWindow.iframeNumber=a.numbers,u.remove()})}if(6==o.type&&"auto"==o.area.w&&"auto"==o.area.h){var l=s.find("img");l.load(function(){var t=l.width(),o=l.width();s.children("div.evLoadingCon").css({width:t+"px",height:o+"px"}),a.winAttr(e),a.popupOffset(e)})}},o.pt.shadeCountWH=function(e){var t=this,a=t.j;a.offset.fix?e.css({position:"fixed",left:"0px",top:"0px",width:t.winW+"px",height:t.winH+"px"}):e.css({position:"absolute",left:"0px",top:"0px",width:t.winW+"px",height:t.domH+"px"})},o.pt.popupOffset=function(e){var t=this,a=t.j,o=0,i=0;a.offset.fix?(e.css({position:"fixed"}),o="auto"==a.offset.t?(t.winH-t.popupH)/2:a.offset.t):o="auto"==a.offset.t?t.domST+(t.winH-t.popupH)/2:t.domST+a.offset.t,i="auto"!=a.offset.l?a.offset.l:(t.winW-t.popupW)/2,o<0&&(o=0),e.css({left:i+"px",top:o+"px"})},o.pt.openAnimate=function(e,t){switch(t.type){case 0:break;case 1:e.css({opacity:0}),e.animate({opacity:t.target},300);break;case 2:var a=e.height();e.css({"margin-top":-a+"px",opacity:0}),e.animate({marginTop:0,opacity:1},300);break;case 3:var o=e.width();e.css({"margin-left":o+"px",opacity:0}),e.animate({marginLeft:0,opacity:1},300);break;case 4:a=e.height();e.css({"margin-top":a+"px",opacity:0}),e.animate({marginTop:0,opacity:1},300);break;case 5:o=e.width();e.css({"margin-left":-o+"px",opacity:0}),e.animate({marginLeft:0,opacity:1},300)}},o.pt.closeAnimate=function(e,t){switch(t.type){case 0:e.remove();break;case 1:e.animate({opacity:0},300,function(){e.remove()});break;case 2:var a=e.height();e.animate({marginTop:-a,opacity:0},300,function(){e.remove()});break;case 3:var o=e.width();e.animate({marginLeft:o,opacity:0},300,function(){e.remove()});break;case 4:a=e.height();e.animate({marginTop:a,opacity:0},300,function(){e.remove()});break;case 5:o=e.width();e.animate({marginLeft:-o,opacity:0},300,function(){e.remove()})}},o.pt.popupMove=function(a){var o=this,i=o.j;a.find(i.move.handle).on({mousedown:function(p){o.winAttr(a);p=p||e.event;var n=a.width(),s=a.height(),d=a.offset().left,u=a.offset().top,c=1*a.css("z-index")+1,r=p.pageX,v=p.pageY,h=r-d,l=v-u,m=0,f=0,y=0,b=0,x=0,g=t('<div class="evPopupMoveShade"><div></div></div>');return g.css({width:n+"px",height:s+"px",left:d+"px",top:u+"px","z-index":c}).children("div").css({height:s-2+"px"}),t(document).on({mousemove:function(a){a=a||e.event;return x=Math.abs(a.pageX-r),x>1&&(1!=g.data("data-have")&&(g.appendTo(i.addTarget),g.data("data-have",1)),t(document).find("body").css({cursor:"move"}),y=m=a.pageX-h,b=f=a.pageY-l,m<0?(m=0,y=0):m>o.winW-n&&(m=o.winW-n,y=o.winW-n),i.offset.fix?(b=a.pageY-l-o.domST,f<o.domST?(f=o.domST,b=0):f>o.domST+o.winH-s&&(f=o.domST+o.winH-s,b=f-o.domST)):f<0?(f=0,b=0):f>o.domH-s&&(f=o.domH-s,b=o.domH-s),g.css({left:m+"px",top:f+"px"})),!1},mouseup:function(){x>1&&(g.remove(),t(this).off("mousemove mouseup"),a.css({left:y+"px",top:b+"px"}),t(document).find("body").css({cursor:"default"})),t(this).off("mousemove mouseup")}}),!1}})},o.pt.popupHide=function(e){e.css({display:"none"})},o.pt.popupShow=function(e){e.css({display:"block"})},t.popup=function(e){var t=new o(e);return t.numbers},t.popupClose=function(e){e*=1,t("body").children("div.evPopup").each(function(a,o){o=t(o),1*o.data("dataIndex")===e&&o.children("small.rmovePopup").trigger("click")})},t.popupHide=function(e){t("body").children("div.evPopup").each(function(a,o){o=t(o),1*o.data("dataIndex")===e&&o.children("small.hidePopup").trigger("click")})},t.popupShow=function(e){t("body").children("div.evPopup").each(function(a,o){o=t(o),1*o.data("dataIndex")===e&&o.children("small.showPopup").trigger("click")})}})(window,jQuery);