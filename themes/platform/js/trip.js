//引用公共头部与底部
jQuery.noConflict();
jQuery(function(){
	jQuery.get('themes/platform/head.html',function(data){
		jQuery('#head').html(data);
	});
	jQuery.get('themes/platform/foot.html',function(data){
		jQuery('#foot').html(data);
	});
	jQuery.get('themes/platform/myR.html',function(data){
		jQuery('#myR').html(data);
	});
})

/*头部导航*/
jQuery(".shead_navr>div").live('mouseover',function(){
	jQuery(this).addClass("divlink");
	jQuery(this).find("ul").show();
	jQuery(this).prev("div").find("span").css("borderRight","1px solid #f7f9f8");
	jQuery(this).find("span").css("borderRight","1px solid #e0e0e0");
})
jQuery(".shead_navr>div").live('mouseout',function(){
	jQuery(this).removeClass("divlink");
	jQuery(this).find("ul").hide();
	jQuery(this).prev("div").find("span").css("borderRight","1px solid #fcfafa");
	jQuery(this).find("span").css("borderRight","1px solid #fcfafa");
})
/*banner预定 start*/
function tabs(tabTit,on,tabCon,event){
    jQuery(tabTit).children().on(event,function(){
        jQuery(this).addClass(on).siblings().removeClass(on);
        var index = jQuery(tabTit).children().index(this);
       	jQuery(tabCon).children().eq(index).show().siblings().hide();
	});
};
tabs('.idx_b01_nav','act','.idx_b01_cont','click');
jQuery(function(){ 
	jQuery(".input_select,.drop img").click(function(){ 
		var ul = jQuery(this).siblings("ul"); 
		if(ul.css("display")=="none"){ 
		  ul.slideDown("fast"); 
		}else{ 
		  ul.slideUp("fast"); 
		} 
	}); 
	
	jQuery(".drop ul li a").click(function(){ 
		var txt = jQuery(this).text(); 
		jQuery(this).parents('ul').siblings(".input_select").val(txt);  
		var value = jQuery(this).attr("rel"); 
		jQuery(this).parents('ul').hide(); 
	}); 
});							

jQuery(".idx_b01_msg02 input").focus(function(){
  jQuery(this).siblings(".window_div").show();
});
jQuery(".idx_b01_msg02 input").blur(function(){
  jQuery(this).siblings(".window_div").hide();
});
/*banner预定 end*/

/*banner轮播 start*/
jQuery(function () {
    jQuery('.front-banner ul').cycle({
		fx: 'toss',
		speed: 1000,
		timeout: 2500,
		pager: '.front-banner-nav',
	});
	if (jQuery(".front-banner ul li").length == 1) {
			jQuery(".front-banner-nav").hide();
	}
});
/*banner轮播 end*/

/*平台动态轮播 start*/
jQuery(function () {
    jQuery('.front-banner02 ul').cycle({
		fx: 'growX',
		speed: 1000,
		timeout: 2500,
		pager: '.front-banner-nav02',
	});
	if (jQuery(".front-banner02 ul li").length == 1) {
			jQuery(".front-banner-nav02").hide();
	}
});
/*平台动态轮播 end*/

/*广告 start*/
jQuery(".idx_gg a").hover(function(){
	jQuery(this).stop().animate({"top":"-8px"},500);
},function(){
	jQuery(this).stop().animate({"top":"0"});
})
/*广告 end*/

/*商务预订 start*/
jQuery(".ydbox").hover(function(){
  jQuery(this).find("em").stop().animate({"top":"140px"},500);
},function(){
  jQuery(this).find("em").stop().animate({"top":"150px"},500);
})
/*商务预订 end*/

/*热卖商品 start*/
jQuery(".htbox").mouseenter(function(){
	jQuery(this).find(".main02_s1").stop().animate({width:"50%"});
	jQuery(this).find(".main02_s2").stop().animate({width:"50%"});
	jQuery(this).find(".main02_s3").stop().animate({height:"100%"});
	jQuery(this).find(".main02_s4").stop().animate({height:"100%"});
	jQuery(this).find(".main02_s5").stop().animate({width:"50%"});
	jQuery(this).find(".main02_s6").stop().animate({width:"50%"});
	
})
jQuery(".htbox").mouseleave(function(){
	jQuery(this).find(".main02_s1").stop().animate({width:"0"});
	jQuery(this).find(".main02_s2").stop().animate({width:"0"});
	jQuery(this).find(".main02_s3").stop().animate({height:"0"});
	jQuery(this).find(".main02_s4").stop().animate({height:"0"});
	jQuery(this).find(".main02_s5").stop().animate({width:"0"});
	jQuery(this).find(".main02_s6").stop().animate({width:"0"});
})
/*热卖商品 end*/

/*资讯信息 start*/
jQuery(".zxnb_ul02 p").click(function(){
  jQuery(this).toggleClass("zxnb_ul02p");
})
jQuery(".zxnewbox").hover(function(){
	jQuery(this).find(".zxnb_det").stop().animate({"left":"-5px"});
},function(){
	jQuery(this).find(".zxnb_det").stop().animate({"left":"0"});
})
/*资讯信息 end*/

/*右侧悬浮 start*/
//检测页面滚动事件
window.onscroll = function(){		
	//Firefox只能通过document.documentElement.scrollTop获取滚动顶部距离
	var top=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	if(top>400){
		jQuery(".fR").css("display","block");
	}else{
		jQuery(".fR").css("display","none");
	}
}
jQuery("#topPanel").live('click',function(){
	jQuery("html,body").animate({scrollTop :0}, 500);
})
jQuery(".fR li").live('mouseover',function(){
	jQuery(this).find("span").stop().animate({"right":"50px","opacity":"1"});
});
jQuery(".fR li").live('mouseout',function(){
	jQuery(this).find("span").stop().animate({"right":"40px","opacity":"0"});
});
/*右侧悬浮 end*/

/*创业动态_详情banner轮播 start*/
jQuery(function () {
    jQuery('.front-neiban ul').cycle({
		fx: 'fadeZoom',
		speed: 1500,
		timeout: 2500,
		pager: '.front-neiban-nav',
	});
	if (jQuery(".front-neiban ul li").length == 1) {
			jQuery(".front-neiban-nav").hide();
	}
});
/*创业动态_详情banner轮播 end*/