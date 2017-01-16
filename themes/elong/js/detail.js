// 酒店详情页的js

//小图展示的个数
var show_small_pic = 2;

$(function(){

	//百度地图展示
	var map = new BMap.Map('mymap');
	var lng = $('#mymap').attr('lng')
	var lat = $('#mymap').attr('lat')
    var new_point = new BMap.Point(lng,lat);
    var marker = new BMap.Marker(new_point);  // 创建标注
    map.centerAndZoom(new_point, 16);
    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
    map.addControl(new BMap.MapTypeControl()); //调用卫星地图
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
    map.addEventListener("tilesloaded",function(){//地图加载完毕后的事件
		map.addOverlay(marker);// 将标注添加到地图中
		map.panTo(new_point); 
    	map.panTo(new_point);});
    var localSearch = new BMap.LocalSearch(map);
    localSearch.enableAutoViewport(); //允许自动调节窗体大小

    //页面顶部点击“地图”字样
    $('#traffictopmap').bind('click',function(){
    	window.location.href = window.location.href.split('#')[0] + '#mapLocation';
    })


    /***************************** 酒店图片的逻辑处理 start **************************************/
    
    //todo 点击大图，出现浮层弹窗效果


    //初始化，只展示8个小图
    var l = $('#hrela_spic ul[data="allImage"] li').length;
    if(l > show_small_pic){
    	$('#hrela_spic ul[data="allImage"] li').each(function(k,v){
    		if(k >= show_small_pic){
    			$(this).hide();
    		}
    	})
    }
    

    //点击分类的逻辑
    $('#hotelDetailTabHandle li').each(function(key,value){
    	var _this = this;
    	$(this).bind('click',function(){
    		$(_this).attr('class','cur on');
    		$('#hotelDetailTabHandle li').each(function(k,v){
    			if(k != key){
    				$(this).attr('class','cur');
    			}
    		})
    		var data_handle = $(this).attr('data-handle');
    		$('#hrela_spic ul').each(function(){
    			var ul_data_handle = $(this).attr('data');
    			if(ul_data_handle == data_handle){
    				$(this).show();
    				var url = $(this).children('li').eq(0).children('img').eq(0).attr('data-big');
    				$('#wac').children('img').eq(0).attr('src',url);

    				//小图片只展示8个
    				var li_length = $(this).children('li').length;
    				if(li_length > 8){
    					$(this).children('li').each(function(k,v){
    						if(k > 8){
    							$(this).hide();
    						}
    					})
    				}
    			}else{
    				$(this).hide();
    			}
    		})
    	})
    })

    //点击小图，展示大图
    $('#hrela_spic li').each(function(){
    	var _this = this;
    	$(this).bind('click',function(){
    		$(_this).attr('class','on');
    		var url = $(this).children('img').eq(0).attr('data-big');
    		$('#wac').children('img').eq(0).attr('src',url);
    		$(_this).parent('ul').children('li').each(function(k,v){
    			if(v != _this){
    				$(this).attr('class','');
    			}
    		})

    	})
    })

    //点击左箭头图片切换
    var length = $('#hrela_spic ul:visible li').length;
    // $('#small_img_prev').bind('click',function(){
    // 	$('#hrela_spic ul:visible li').each(function(k,v){
    // 		var class_name = $(this).attr('class');
    // 		if(class_name == 'on' && k!=0){
    // 			// 如果已经是最左，效果不变
    // 			$(this).attr('class','');
    // 			$('#hrela_spic ul:visible').children().eq(k-1).attr('class','on');
    // 			var url = $('#hrela_spic ul:visible').children().eq(k-1).children('img').eq(0).attr('data-big');
    // 			$('#wac').children('img').eq(0).attr('src',url);
    // 		}
    // 	})
    // })
    $('#small_img_prev').bind('click',function(){
    	var index = 0;
    	$('#hrela_spic ul:visible li').each(function(k,v){
    		var class_name = $(this).attr('class');
    		if(class_name == 'on'){
    			index = k; // 获取目前在点的照片的索引
    			return false;
    		}
    	})
    	var mo = parseInt(index/show_small_pic);	
		if(mo == 0){
			//已经是最左，效果不变
		}
		else{
			var pre_index = (mo - 1) * show_small_pic;
			var now_index = mo * show_small_pic;
			$('#hrela_spic ul:visible li').each(function(k,v){
				if( k >= pre_index && k <= now_index){
					$(this).show();
				}else{
					$(this).hide();
				}
			})
		}
    })

    //点击右箭头图片切换
    // $('#small_img_next').bind('click',function(){
    // 	var length = $('#hrela_spic ul:visible li').length;
    // 	$('#hrela_spic ul:visible li').each(function(k,v){
    // 		var class_name = $(this).attr('class');
    // 		if(class_name == 'on' && k!=length-1){
    // 			// 如果已经是最右，效果不变
    // 			$(this).attr('class','');
    // 			$('#hrela_spic ul:visible').children().eq(k+1).attr('class','on');
    // 			var url = $('#hrela_spic ul:visible').children().eq(k+1).children('img').eq(0).attr('data-big');
    // 			$('#wac').children('img').eq(0).attr('src',url);
    // 			return false;//找到第一张的class=on以后，后面的不用在找
    // 		}
    // 	})
    // })
    $('#small_img_next').bind('click',function(){
    	var index = 0;
    	$('#hrela_spic ul:visible li').each(function(k,v){
    		var class_name = $(this).attr('class');
    		if(class_name == 'on'){
    			
    			index = k + 1; // 获取目前在点的照片的索引
    			if(index <= (parseInt(length/show_small_pic))*show_small_pic ){
    				$(this).attr('class','');
    			}
    			return false;
    			
    		}
    	})
    	var mo = parseInt(index/show_small_pic) + 1;
    	console.log(mo);
		if( mo * show_small_pic >= length ){
			//已经是最右边，效果不变
		}
		else{
			var next_index = (mo + 1) * show_small_pic;
			var now_index = mo  * show_small_pic;
			console.log(now_index,next_index);
			$('#hrela_spic ul:visible li').each(function(k,v){
				if( k== now_index){
					$(this).attr('class','on'); // 每次更新一批，都是焦点移到第一张图
				}
				if( k >= now_index && k < next_index ){
					$(this).show();
				}else{
					$(this).hide();
				}
			})
		}

    })
    /***************************** 酒店图片的逻辑处理 end ****************************************************/


    

    /***************************** 时间选择逻辑处理 start **************************************/

    


    /***************************** 时间选择逻辑处理 end **************************************/


    /***************************** 页面滚定逻辑处理 start **************************************/
    //房型、酒店信息、交通信息、点评tab切换
    var location = window.location.href.split('#')[0]
    $('#tabMenu ul[class="subnav_list left"]').children('li').each(function(k,v){
    	$(this).bind('click',function(){
    		if(k == 0){
    			window.location.href = location + '#roomTab';
    		}
    		else if(k == 1){
    			window.location.href = location + '#hotelContent';
    		}
    		else if(k == 2){
    			window.location.href = location + '#mapLocation';
    		}
    		else if(k == 3){
    			window.location.href = location + '#review';
    		}
			$('#searchTabHandler ul[class="subnav_list left"] li').each(function(key,val){
				if(k == key){
					$(this).attr('class','on');
				}else{
					$(this).attr('class','');
				}
			})
			$('#searchTabHandler').show();
    	})
    })

    $('#searchTabHandler ul[class="subnav_list left"]').children('li').each(function(k,v){
    	$(this).bind('click',function(){
    		if(k == 0){
    			window.location.href = location + '#roomTab';
    			$('#searchTabHandler').hide();
    		}
    		else if(k == 1){
    			window.location.href = location + '#hotelContent';
    		}
    		else if(k == 2){
    			window.location.href = location + '#mapLocation';
    		}
    		else if(k == 3){
    			window.location.href = location + '#review';
    		}
			$('#searchTabHandler ul[class="subnav_list left"] li').each(function(key,val){
				if(k == key){
					$(this).attr('class','on');
				}else{
					$(this).attr('class','');
				}
			})
			//$('#searchTabHandler').show();
    	})
    })

    //页面滚动。导航tab页的隐藏
    $(window).scroll(function(){
    	var offset = $('#tabMenu').offset().top; 
	    var height = $('#tabMenu').outerHeight(true);
	    var scrollTop = $(window).scrollTop();
	    if( scrollTop > height + offset){
	    	$('#searchTabHandler').show();

	    	//滚动到评价信息时，tab页的评价信息的class=on
	    	var review_offset = $('#review').offset().top;
	    	if(scrollTop >=  review_offset){
	    		$('#searchTabHandler ul[class="subnav_list left"] li').each(function(k,v){
	    			if(k == 3){
	    				$(this).attr('class','on');
	    			}else{
	    				$(this).attr('class','');
	    			}
	    		})
	    		return;
	    	}

	    	//滚动到交通时，tab页的交通信息的class=on
	    	var trafficMap_offset = $('#trafficMap').offset().top;
	    	if(scrollTop >=  trafficMap_offset){
	    		$('#searchTabHandler ul[class="subnav_list left"] li').each(function(k,v){
	    			if(k == 2){
	    				$(this).attr('class','on');
	    			}else{
	    				$(this).attr('class','');
	    			}
	    		})
	    		return;
	    	}

	    	//滚动到酒店信息时，tab页的酒店信息的class=on
	    	var hotelContent_offset = $('#hotelContent').offset().top;
	    	if(scrollTop >=  hotelContent_offset){
	    		$('#searchTabHandler ul[class="subnav_list left"] li').each(function(k,v){
	    			if(k == 1){
	    				$(this).attr('class','on');
	    			}else{
	    				$(this).attr('class','');
	    			}
	    		})
	    		return;
	    	}
	    }
	    else{
	    	$('#searchTabHandler').hide();
	    }

    })
    /***************************** 页面滚定逻辑处理 end **************************************/


})




















































































