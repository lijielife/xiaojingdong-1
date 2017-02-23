//引用公共头部与底部
jQuery(function(){
	jQuery.get('head.html',function(data){
		jQuery('#head').html(data);
	});
	jQuery.get('foot.html',function(data){
		jQuery('#foot').html(data);
	});
	jQuery.get('myR.html',function(data){
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
tabs('.myhy_tit','myhy_ulink','.my_vipcont','click');  /*会员升级*/
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

/*咨询信息 start*/
jQuery(".zx_yd").hover(function(){
	$(this).find("p").animate({"top":"45px"});
	$(this).find("p span").animate({"marginBottom":"10px"});
},function(){
	$(this).find("p").animate({"top":"55px"});
	$(this).find("p span").animate({"marginBottom":"0"});
})
/*咨询信息 end*/

/*咨询信息 详情 start*/
 jQuery(function(){
	  jQuery("#gp_detarea").keyup(function(){   /*textarea的字数实时判断*/
		   var len = jQuery(this).val().length;
		   if(len > 999){
			   jQuery(this).val($(this).val().substring(0,1000));  /*字数超出截取*/
		   }
		   jQuery("#gp_detspan").text(len);  /*字数传递到某个数字，实时给用户看文字的个数*/
	  });
}); 
/*咨询信息 详情 end*/

/*注册支付 start*/
jQuery(".zczf_pay ul li").click(function(){
	jQuery(this).addClass("zczf_li").siblings("li").removeClass("zczf_li");
})
/*注册支付 end*/

/*注册 start*/
jQuery(function(){ 
    jQuery(".logdrop img,.logdiv").click(function(){
		jQuery(".logdrop ul").slideToggle(250);
	})
	jQuery(".logdrop ul li").click(function(){
		var logHtml=jQuery(this).html();
		var logDhtml=jQuery(".logdiv").html();
		jQuery(".logdiv").empty();
		jQuery(".logdiv").html(logHtml);
		jQuery(".logdrop ul").slideUp(250);
	})
});

jQuery(".logLbox03 i input").toggle(function(){
	jQuery(".logLbox03 i img").show();
	jQuery(this).attr('checked','checked');
},function(){
	jQuery(".logLbox03 i img").hide();
	jQuery(this).removeAttr('checked');
})
/*注册 end*/

// /*个人中心 start*/
// jQuery(document).ready(function(e) {
//     jQuery('.myhy_div').each(function(index, element) {
//     if(jQuery(this).hasClass('myhy_divon')){
// 		jQuery(this).find('ul').show();
// 	}
// });
// });

// jQuery(".myhy_list .myhy_div").click(function(){
// 	var _this = jQuery(this);
// 	if(!_this.hasClass('myhy_divon')){
// 		_this.addClass("myhy_divon");
// 		_this.find("ul").slideDown();
// 		_this.siblings(".myhy_div").find("ul").slideUp();
// 		_this.siblings(".myhy_div").removeClass("myhy_divon");
// 	}else{
// 		_this.removeClass("myhy_divon");
// 		_this.find("ul").slideUp();
// 	}	
// })
// /*个人中心 end*/

/*个人设置 start*/
jQuery(".my_bfbox label").click(function(){
	jQuery(this).find("span").show();
	jQuery(this).siblings("label").find("span").hide();
})
/*个人设置 end*/

/*修改地址 弹窗 start*/
jQuery('.tfocus').focus(function() {
	var text=jQuery(this).val();
	if(text=='不需要重复填写省市区，不小于5个字符，不超过120个字符'){
		jQuery(this).val('');
	 }
});
jQuery('.tfocus').blur(function() {
	var text=jQuery(this).val();
	if(text==''){
		jQuery(this).val('不需要重复填写省市区，不小于5个字符，不超过120个字符');
	}
});

jQuery(".my_window").click(function(){
	jQuery(this).hide();
	jQuery(".my_addtc").hide();
})
jQuery(".my_addtcimg").click(function(){
	jQuery(".my_window").hide();
	jQuery(".my_addtc").hide();
})
/*修改地址 弹窗 end*/