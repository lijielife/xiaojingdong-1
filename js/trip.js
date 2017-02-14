/*头部导航*/
$(".shead_navr>div").mouseover(function(){
	$(this).addClass("divlink");
	$(this).find("ul").show();
	$(this).prev("div").find("span").css("borderRight","1px solid #f7f9f8");
	$(this).find("span").css("borderRight","1px solid #e0e0e0");
})
$(".shead_navr>div").mouseout(function(){
	$(this).removeClass("divlink");
	$(this).find("ul").hide();
	$(this).prev("div").find("span").css("borderRight","1px solid #fcfafa");
	$(this).find("span").css("borderRight","1px solid #fcfafa");
})

/*banner预定 start*/
function tabs(tabTit,on,tabCon,event){
    $(tabTit).children().on(event,function(){
        $(this).addClass(on).siblings().removeClass(on);
        var index = $(tabTit).children().index(this);
       	$(tabCon).children().eq(index).show().siblings().hide();
	});
};
tabs('.idx_b01_nav','act','.idx_b01_cont','click');
$(function(){ 
	$(".input_select,.drop img").click(function(){ 
		var ul = $(this).siblings("ul"); 
		if(ul.css("display")=="none"){ 
		  ul.slideDown("fast"); 
		}else{ 
		  ul.slideUp("fast"); 
		} 
	}); 
	
	$(".drop ul li a").click(function(){ 
		var txt = $(this).text(); 
		$(this).parents('ul').siblings(".input_select").val(txt);  
		var value = $(this).attr("rel"); 
		$(this).parents('ul').hide(); 
	}); 
});
/*banner预定 end*/

/*banner轮播 start*/
$(function () {
    $('.front-banner ul').cycle({
		fx: 'curtainY',
		speed: 1000,
		timeout: 2500,
		pager: '.front-banner-nav',
	});
	if ($(".front-banner ul li").length == 1) {
			$(".front-banner-nav").hide();
	}
});
/*banner轮播 end*/

/*平台动态轮播 start*/
$(function () {
    $('.front-banner02 ul').cycle({
		fx: 'growX',
		speed: 1000,
		timeout: 2500,
		pager: '.front-banner-nav02',
	});
	if ($(".front-banner02 ul li").length == 1) {
			$(".front-banner-nav02").hide();
	}
});
/*平台动态轮播 end*/

/*广告 start*/
$(".idx_gg a").hover(function(){
	$(this).stop().animate({"top":"-8px"},500);
},function(){
	$(this).stop().animate({"top":"0"});
})
/*广告 end*/

/*商务预订 start*/
$(".ydbox").hover(function(){
  $(this).find("em").stop().animate({"top":"140px"},500);
},function(){
  $(this).find("em").stop().animate({"top":"150px"},500);
})
/*商务预订 end*/

/*热卖商品 start*/
$(".htbox").mouseenter(function(){
	$(this).find(".main02_s1").stop().animate({width:"50%"});
	$(this).find(".main02_s2").stop().animate({width:"50%"});
	$(this).find(".main02_s3").stop().animate({height:"100%"});
	$(this).find(".main02_s4").stop().animate({height:"100%"});
	$(this).find(".main02_s5").stop().animate({width:"50%"});
	$(this).find(".main02_s6").stop().animate({width:"50%"});
	
})
$(".htbox").mouseleave(function(){
	$(this).find(".main02_s1").stop().animate({width:"0"});
	$(this).find(".main02_s2").stop().animate({width:"0"});
	$(this).find(".main02_s3").stop().animate({height:"0"});
	$(this).find(".main02_s4").stop().animate({height:"0"});
	$(this).find(".main02_s5").stop().animate({width:"0"});
	$(this).find(".main02_s6").stop().animate({width:"0"});
})
/*热卖商品 end*/

/*资讯信息 start*/
$(".zxnb_ul02 p").click(function(){
  $(this).toggleClass("zxnb_ul02p");
})
$(".zxnewbox").hover(function(){
	$(this).find(".zxnb_det").stop().animate({"left":"-5px"});
},function(){
	$(this).find(".zxnb_det").stop().animate({"left":"0"});
})
/*资讯信息 end*/

/*右侧悬浮 start*/
//检测页面滚动事件
window.onscroll = function(){		
	//Firefox只能通过document.documentElement.scrollTop获取滚动顶部距离
	var top=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	if(top>400){
		$(".fR").css("display","block");
	}else{
		$(".fR").css("display","none");
	}
}
$("#topPanel").click(function(){
	$("html,body").animate({scrollTop :0}, 500);
})
$(".fR li").hover(function(){
	$(this).find("span").stop().animate({"right":"50px","opacity":"1"});
},function(){
	$(this).find("span").stop().animate({"right":"40px","opacity":"0"});
})
/*右侧悬浮 end*/