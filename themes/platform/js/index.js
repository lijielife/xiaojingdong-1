
jQuery(function(){

	//日历插件
	rili("#calendar");
	rili("#calendar02"); 
	rili("#calendar03");  

	 //搜索按钮绑定
    jQuery('#search_btn1').bind('click',function(){
    	jQuery('#search_btn1').html('<i class="search_icon"></i>搜索中...');

        var city = jQuery('#hotelCity').val();
        var checkin = jQuery('#calendar').val();
        var checkout = jQuery('#calendar02').val();
        var keywords = jQuery('#keywords').val();
        var kwtype = jQuery('#keywords').attr('kwtype');
        if(!city){
            alert('请先选择入住城市');
            return;
        }
        // jQuery(this).hide();
        // jQuery(this).next().show();

        jQuery.ajax({
            url : 'hotel_search.php?act=ajax_search_pre&city=' + encodeURI(city),
            dataType : 'json',
            success : function(data){
                if(data.err == 1){
                    alert(data.msg)
                }else{
                    var s_url = 'hotel_search.php?act=list&city='+ encodeURI(city) + '&cityid=' + jQuery('#hotelCity').attr('cityid') + '&checkin=' + checkin + '&checkout=' + checkout + '&keywords=' + keywords + '&kwtype=' + kwtype;
                    // console.log(s_url);
                    window.location.href = s_url;
                }
            },
            error : function(data){
                console.log(data);
            }
        })
    })


    //住宿预订和宴席预订切换
    jQuery('ul[class="idx_b01_nav clearfix"] li').each(function(k,v){
    	jQuery(this).bind('click',function(){
    		jQuery(this).attr('class','act');
    		if( k == 0){
    			jQuery('ul[class="idx_b01_nav clearfix"] li').last().attr('class','');
    			jQuery('div[class="idx_b01_box"]').eq(0).show();
    			jQuery('div[class="idx_b01_box"]').eq(1).hide();

    		}
    		else
    		{
    			jQuery('ul[class="idx_b01_nav clearfix"] li').first().attr('class','');
    			jQuery('div[class="idx_b01_box"]').eq(0).hide();
    			jQuery('div[class="idx_b01_box"]').eq(1).show();

    		}
    	})
    })


})

          

function rili(a){
	//var j = jQuery.noConflict();
	$(a).regMod("calendar","6.0", {
		options: {
		autoShow: !1,
		showWeek: !0,
		maxDate: function() {
		var a = (new Date).addYears(1);
			return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()
		}()
		},
		listeners:{
			onBeforeShow: function() {},
			onChange: function() {}
		}
	})
}

