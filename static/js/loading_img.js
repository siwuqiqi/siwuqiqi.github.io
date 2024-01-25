var loading_img = function(obj,loading_src){
	var objs = $("#"+obj);
   var $winH = $(window).height();
   var $img = $("#"+obj).find("img");
   var $imgH = parseInt($img.height()/2);
   var $srcDef = loading_src;
   runing();
   $(window).scroll(function(){
    runing();
   })
   function runing(){
    $img.each(function(i){
     var $src = $img.eq(i).attr("rel");
     var $scroTop = $img.eq(i).offset();
     if($scroTop.top + $imgH >= $(window).scrollTop() && $(window).scrollTop() + $winH >= $scroTop.top + $imgH)
     {
      if($img.eq(i).attr("src") == $srcDef){
       $img.eq(i).hide();
      }
      $img.eq(i).attr("src",function(){return $src}).fadeIn(1000);
     }
    })
   }
  };
