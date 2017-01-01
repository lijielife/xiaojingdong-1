// JavaScript Document

//banner上的机票类型
function shide(a,b,c,d){
	$(a).click(function(){
		$(b).removeClass("on");
		$(a).addClass("on");
		$(c).css('display','block');
		$(d).css('display','none');
	})
	$(b).click(function(){
		$(a).removeClass("on");
		$(b).addClass("on");
		$(d).css('display','block');
		$(c).css('display','none');
	})
}
shide(".title_tabs01",".title_tabs02",".keywords_wrap01",".keywords_wrap02");
shide(".title_tabso01",".title_tabso02",".keywords_wrapo01",".keywords_wrapo02");//首页
shide(".sh_subnav li:eq(0)",".sh_subnav li:eq(1)",".seen_list",".hot_list");//搜索结果浏览与热卖

//banner上的旅游类型
/*选项卡切换*/
$(function(){
    function tabs(tabTit,on,tabCon){
        $(tabTit).children().hover(function(){
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
           	$(tabCon).children().eq(index).show().siblings().hide();
    	});
	};
    tabs(".cate_channel>ul","on",".cate_channel_option");//首页
	tabs(".filter_posi_type","on",".filter_posi_show"); //搜索结果
});
/*选项卡切换end*/

/*搜索结果 start*/
/*头部*/
$(".language").hover(function(){
	$(this).addClass("languaget");
	$(this).find("p").show();
},function(){
	$(this).removeClass("languaget");
	$(this).find("p").hide();
})

$(".account").hover(function(){
	$(".drop_box_log").show();
},function(){
	$(".drop_box_log").hide();
})

$(".online_phone").hover(function(){
	$(".on_phonnum").show();
},function(){
	$(".on_phonnum").hide();
})

/*筛选条件*/
$(".filter_cb_list li").toggle(function(){
	$(this).addClass("on");
	$(this).parents(".filter_cb_list").siblings(".filter_unlimited").removeClass("filter_unlimited_on");
},function(){
	$(this).removeClass("on");
})

$(".filter_unlimited").click(function(){
	$(this).addClass("filter_unlimited_on");
	$(".filter_cb_list li").removeClass("on");
})

$(".filter_more").click(function(){
	if($(this).is('.icon_hl_more1')){
		$(this).addClass("icon_hl_more2").removeClass("icon_hl_more1");
		$(this).siblings(".filter_cb_list").find("li:eq(7)").nextAll().slideDown();
		$(this).siblings(".more_finfo").show();
		$(".filter_close").click(function(){
			$(".more_finfo").hide();
			$(".more_finfo").siblings(".filter_more").addClass("icon_hl_more1").removeClass("icon_hl_more2");
		});
	}else{
		$(this).addClass("icon_hl_more1").removeClass("icon_hl_more2");
		$(this).siblings(".filter_cb_list").find("li:eq(7)").nextAll().slideUp();
		$(this).siblings(".more_finfo").hide();
	
	}
});

$(".brand_list ul li").toggle(function(){
	$(this).addClass("on");
},function(){
	$(this).removeClass("on");
})

$(".icon_close_hl").click(function(){
	$(this).parent().remove();
})
$(".cond-list>a").click(function(){
	$(this).parent(".cond-list").find("span").remove();
})
//地铁选择
$(".subway_station ul li a").click(function(){
	$(this).addClass("on").parents("li").siblings("li").find("a").removeClass("on");
})

//展开服务设施
$(".filter_box>.filter_item:eq(4)").nextAll().hide();
$(".filter_btn").click(function(){
	$(".filter_box>.filter_item:eq(4)").nextAll().slideToggle();
})
//底部酒店信息
$(".icon_SEO_e").click(function(){
	$(this).toggleClass("icon_SEO_c");
	$(".hotelsNearby").slideToggle();
})
/*搜索结果 end*/

/*右侧悬浮 start*/
$(".fix_tool ul li").hover(function(){
	$(this).find("a").hide();
	$(this).find("span").show();
},function(){
	$(this).find("span").hide();
	$(this).find("a").show();
})
/*右侧悬浮 end*/


